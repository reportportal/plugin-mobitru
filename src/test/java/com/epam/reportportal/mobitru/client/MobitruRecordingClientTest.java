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
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;
import org.junit.jupiter.api.Test;

class MobitruRecordingClientTest {

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
      RecordingAttachmentData result = new MobitruRecordingClient(new RestClientBuilder(null))
          .downloadRecording(integration(server), "rec-1");

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
      RecordingAttachmentData result = new MobitruRecordingClient(new RestClientBuilder(null))
          .downloadRecording(integration(server), "rec-2");

      assertEquals("rec-2.mp4", result.fileName());
      assertEquals("video/mp4", result.contentType());
      assertArrayEquals(body, result.content());
    } finally {
      server.stop(0);
    }
  }

  private Integration integration(HttpServer server) {
    Integration integration = new Integration();
    Map<String, Object> params = new HashMap<>();
    params.put("url", "http://localhost:" + server.getAddress().getPort());
    params.put("apiKey", "token-123");
    params.put("billingUnit", "demo-slug");
    integration.setParams(new IntegrationParams(params));
    return integration;
  }
}
