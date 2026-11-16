/*
 * Copyright 2026 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.epam.reportportal.mobitru.client;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

import com.epam.reportportal.base.infrastructure.persistence.entity.integration.Integration;
import com.epam.reportportal.base.infrastructure.persistence.entity.integration.IntegrationParams;
import com.epam.reportportal.mobitru.model.RecordingAttachmentData;
import com.sun.net.httpserver.HttpServer;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.time.Duration;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;
import org.jasypt.util.text.BasicTextEncryptor;
import org.junit.jupiter.api.Test;

class MobitruRecordingClientTest {

  private static final BasicTextEncryptor ENCRYPTOR = createEncryptor();
  private static final String MOBILE_RECORDING_ID_KEY = "mobitru_mobile_recording_id";
  private static final String PLAYWRIGHT_RECORDING_ID_KEY = "mobitru_playwright_recording_id";
  private static final String SELENIUM_RECORDING_ID_KEY = "mobitru_selenium_recording_id";

  private static BasicTextEncryptor createEncryptor() {
    BasicTextEncryptor encryptor = new BasicTextEncryptor();
    encryptor.setPassword("test-secret");
    return encryptor;
  }

  @Test
  void downloadsRecordingUsingMobitruEndpointAndHeaders() throws Exception {
    byte[] body = "video".getBytes(StandardCharsets.UTF_8);
    AtomicReference<String> requestPath = new AtomicReference<>();
    AtomicReference<String> authorizationHeader = new AtomicReference<>();
    HttpServer server = HttpServer.create(new InetSocketAddress(0), 0);
    server.createContext("/billing/unit/demo-slug/automation/api/recording/rec-1", exchange -> {
      requestPath.set(exchange.getRequestURI().getPath());
      authorizationHeader.set(exchange.getRequestHeaders().getFirst("Authorization"));
      exchange.getResponseHeaders().add("Content-Type", "video/mp4");
      exchange.getResponseHeaders().add("Content-Disposition",
          "attachment; filename=\"session.mp4\"");
      exchange.sendResponseHeaders(200, body.length);
      exchange.getResponseBody().write(body);
      exchange.close();
    });
    server.start();

    try {
      RecordingAttachmentData result = client(server).downloadRecording(integration(), "rec-1",
          MOBILE_RECORDING_ID_KEY);

      assertEquals("/billing/unit/demo-slug/automation/api/recording/rec-1", requestPath.get());
      assertEquals("Bearer token-123", authorizationHeader.get());
      assertEquals("session.mp4", result.fileName());
      assertEquals("video/mp4", result.contentType());
      assertArrayEquals(body, result.content());
    } finally {
      server.stop(0);
    }
  }

  @Test
  void downloadsRecordingUsingWorkspaceEndpointWhenWorkspaceIdIsConfigured() throws Exception {
    byte[] body = "video".getBytes(StandardCharsets.UTF_8);
    AtomicReference<String> requestPath = new AtomicReference<>();
    AtomicReference<String> authorizationHeader = new AtomicReference<>();
    HttpServer server = HttpServer.create(new InetSocketAddress(0), 0);
    server.createContext(
        "/billing/unit/demo-slug/workspace/demo-workspace/automation/api/recording/rec-1",
        exchange -> {
          requestPath.set(exchange.getRequestURI().getPath());
          authorizationHeader.set(exchange.getRequestHeaders().getFirst("Authorization"));
          exchange.getResponseHeaders().add("Content-Type", "video/mp4");
          exchange.sendResponseHeaders(200, body.length);
          exchange.getResponseBody().write(body);
          exchange.close();
        });
    server.start();

    try {
      RecordingAttachmentData result = client(server).downloadRecording(
          integration("demo-workspace"), "rec-1", MOBILE_RECORDING_ID_KEY);

      assertEquals(
          "/billing/unit/demo-slug/workspace/demo-workspace/automation/api/recording/rec-1",
          requestPath.get());
      assertEquals("Bearer token-123", authorizationHeader.get());
      assertEquals("rec-1.mp4", result.fileName());
      assertEquals("video/mp4", result.contentType());
      assertArrayEquals(body, result.content());
    } finally {
      server.stop(0);
    }
  }

  @Test
  void fallsBackToRecordingIdWhenResponseHasNoFilename() throws Exception {
    byte[] body = "video".getBytes(StandardCharsets.UTF_8);
    HttpServer server = HttpServer.create(new InetSocketAddress(0), 0);
    server.createContext("/billing/unit/demo-slug/automation/api/recording/rec-2", exchange -> {
      exchange.getResponseHeaders().add("Content-Type", "video/mp4");
      exchange.sendResponseHeaders(200, body.length);
      exchange.getResponseBody().write(body);
      exchange.close();
    });
    server.start();

    try {
      RecordingAttachmentData result = client(server).downloadRecording(integration(), "rec-2");

      assertEquals("rec-2.mp4", result.fileName());
      assertEquals("video/mp4", result.contentType());
      assertArrayEquals(body, result.content());
    } finally {
      server.stop(0);
    }
  }

  @Test
  void downloadsSeleniumRecordingUsingBrowserHubEndpoint() throws Exception {
    byte[] body = "browser-video".getBytes(StandardCharsets.UTF_8);
    AtomicReference<String> requestPath = new AtomicReference<>();
    AtomicReference<String> authorizationHeader = new AtomicReference<>();
    HttpServer server = HttpServer.create(new InetSocketAddress(0), 0);
    server.createContext("/recordings/browser-session-1", exchange -> {
      requestPath.set(exchange.getRequestURI().getPath());
      authorizationHeader.set(exchange.getRequestHeaders().getFirst("Authorization"));
      exchange.getResponseHeaders().add("Content-Type", "video/webm");
      exchange.sendResponseHeaders(200, body.length);
      exchange.getResponseBody().write(body);
      exchange.close();
    });
    server.start();

    try {
      RecordingAttachmentData result = client(server).downloadRecording(integration(),
          "browser-session-1", SELENIUM_RECORDING_ID_KEY);

      assertEquals("/recordings/browser-session-1", requestPath.get());
      assertEquals("Basic " + Base64.getEncoder()
              .encodeToString("demo-slug:token-123".getBytes(StandardCharsets.UTF_8)),
          authorizationHeader.get());
      assertEquals("browser-session-1.webm", result.fileName());
      assertEquals("video/webm", result.contentType());
      assertArrayEquals(body, result.content());
    } finally {
      server.stop(0);
    }
  }

  @Test
  void downloadsPlaywrightRecordingUsingBrowserHubSessionEndpoint() throws Exception {
    byte[] body = "playwright-video".getBytes(StandardCharsets.UTF_8);
    AtomicReference<String> requestPath = new AtomicReference<>();
    AtomicReference<String> authorizationHeader = new AtomicReference<>();
    HttpServer server = HttpServer.create(new InetSocketAddress(0), 0);
    server.createContext("/recordings/playwright-session-1", exchange -> {
      requestPath.set(exchange.getRequestURI().getPath());
      authorizationHeader.set(exchange.getRequestHeaders().getFirst("Authorization"));
      exchange.getResponseHeaders().add("Content-Type", "video/webm");
      exchange.sendResponseHeaders(200, body.length);
      exchange.getResponseBody().write(body);
      exchange.close();
    });
    server.start();

    try {
      RecordingAttachmentData result = client(server).downloadRecording(integration(),
          "playwright-session-1", PLAYWRIGHT_RECORDING_ID_KEY);

      assertEquals("/recordings/playwright-session-1", requestPath.get());
      assertEquals("Basic " + Base64.getEncoder()
              .encodeToString("demo-slug:token-123".getBytes(StandardCharsets.UTF_8)),
          authorizationHeader.get());
      assertEquals("playwright-session-1.webm", result.fileName());
      assertEquals("video/webm", result.contentType());
      assertArrayEquals(body, result.content());
    } finally {
      server.stop(0);
    }
  }

  @Test
  void retriesOnTransientFailureAndSucceeds() throws Exception {
    byte[] body = "video".getBytes(StandardCharsets.UTF_8);
    AtomicInteger requestCount = new AtomicInteger();
    HttpServer server = HttpServer.create(new InetSocketAddress(0), 0);
    server.createContext("/billing/unit/demo-slug/automation/api/recording/rec-3", exchange -> {
      if (requestCount.incrementAndGet() < 3) {
        exchange.sendResponseHeaders(500, -1);
        exchange.close();
        return;
      }
      exchange.getResponseHeaders().add("Content-Type", "video/mp4");
      exchange.sendResponseHeaders(200, body.length);
      exchange.getResponseBody().write(body);
      exchange.close();
    });
    server.start();

    try {
      RecordingAttachmentData result = client(server, Duration.ofMillis(1))
          .downloadRecording(integration(), "rec-3", MOBILE_RECORDING_ID_KEY);

      assertEquals(3, requestCount.get());
      assertEquals("video/mp4", result.contentType());
      assertArrayEquals(body, result.content());
    } finally {
      server.stop(0);
    }
  }

  private MobitruRecordingClient client(HttpServer server) {
    String baseUrl = "http://localhost:" + server.getAddress().getPort();
    return new MobitruRecordingClient(new RestClientBuilder(ENCRYPTOR), baseUrl, baseUrl);
  }

  private MobitruRecordingClient client(HttpServer server, Duration retryDelay) {
    String baseUrl = "http://localhost:" + server.getAddress().getPort();
    return new MobitruRecordingClient(new RestClientBuilder(ENCRYPTOR), baseUrl, baseUrl,
        retryDelay);
  }

  private Integration integration() {
    return integration(null);
  }

  private Integration integration(String workspaceId) {
    Integration integration = new Integration();
    Map<String, Object> params = new HashMap<>();
    params.put("apiKey", ENCRYPTOR.encrypt("token-123"));
    params.put("billingUnit", "demo-slug");
    if (workspaceId != null) {
      params.put("workspaceId", workspaceId);
    }
    integration.setParams(new IntegrationParams(params));
    return integration;
  }
}
