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

import static com.epam.reportportal.mobitru.model.Constants.BROWSERHUB_BASE_URL;
import static com.epam.reportportal.mobitru.model.Constants.GET_MOBILE_RECORDING;
import static com.epam.reportportal.mobitru.model.Constants.GET_MOBILE_RECORDING_WITH_WORKSPACE;
import static com.epam.reportportal.mobitru.model.Constants.GET_PLAYWRIGHT_RECORDING;
import static com.epam.reportportal.mobitru.model.Constants.GET_SELENIUM_RECORDING;
import static com.epam.reportportal.mobitru.model.Constants.MOBITRU_BASE_URL;
import static com.epam.reportportal.mobitru.model.Constants.PLAYWRIGHT_RECORDING_ID_KEY;
import static com.epam.reportportal.mobitru.model.Constants.SELENIUM_RECORDING_ID_KEY;

import com.epam.reportportal.base.infrastructure.persistence.entity.integration.Integration;
import com.epam.reportportal.base.infrastructure.rules.exception.ErrorType;
import com.epam.reportportal.base.infrastructure.rules.exception.ReportPortalException;
import com.epam.reportportal.mobitru.model.IntegrationProperties;
import com.epam.reportportal.mobitru.model.RecordingAttachmentData;
import com.epam.reportportal.mobitru.utils.ValidationUtils;
import java.time.Duration;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

/**
 * Downloads recording binaries from Mobitru for a concrete integration configuration.
 */
@Slf4j
public class MobitruRecordingClient {

  private final RestClientBuilder restClient;
  private final String mobileRecordingsBaseUrl;
  private final String browserRecordingsBaseUrl;
  private final RetryExecutor retryExecutor;

  public MobitruRecordingClient(RestClientBuilder restClient) {
    this(restClient, MOBITRU_BASE_URL, BROWSERHUB_BASE_URL);
  }

  MobitruRecordingClient(RestClientBuilder restClient, String mobileRecordingsBaseUrl,
      String browserRecordingsBaseUrl) {
    this(restClient, mobileRecordingsBaseUrl, browserRecordingsBaseUrl, new RetryExecutor());
  }

  MobitruRecordingClient(RestClientBuilder restClient, String mobileRecordingsBaseUrl,
      String browserRecordingsBaseUrl, Duration retryDelay) {
    this(restClient, mobileRecordingsBaseUrl, browserRecordingsBaseUrl,
        new RetryExecutor(RetryExecutor.DEFAULT_MAX_ATTEMPTS, retryDelay));
  }

  MobitruRecordingClient(RestClientBuilder restClient, String mobileRecordingsBaseUrl,
      String browserRecordingsBaseUrl, RetryExecutor retryExecutor) {
    this.restClient = restClient;
    this.mobileRecordingsBaseUrl = mobileRecordingsBaseUrl;
    this.browserRecordingsBaseUrl = browserRecordingsBaseUrl;
    this.retryExecutor = retryExecutor;
  }

  public RecordingAttachmentData downloadRecording(Integration integration,
      String attachmentExternalId) {
    return downloadRecording(integration, attachmentExternalId, null);
  }

  public RecordingAttachmentData downloadRecording(Integration integration,
      String attachmentExternalId, String attachmentAttributeKey) {

    ValidationUtils.validateIntegrationParams(integration.getParams());
    IntegrationProperties properties = new IntegrationProperties(
        integration.getParams().getParams());

    RestTemplate restTemplate = restClient.getRestTemplate();

    try {
      String recordingUrl = resolveRecordingUrl(properties, attachmentExternalId,
          attachmentAttributeKey);

      HttpEntity<Void> request = new HttpEntity<>(
          buildAuthHeaders(properties, attachmentAttributeKey));

      ResponseEntity<byte[]> response =
          retryExecutor.execute("download recording from '" + recordingUrl + "'",
              () -> restTemplate.exchange(recordingUrl, HttpMethod.GET, request, byte[].class));

      byte[] body = response.getBody();

      if (!response.getStatusCode().is2xxSuccessful() || body == null || body.length == 0) {
        throw new ReportPortalException(ErrorType.UNABLE_INTERACT_WITH_INTEGRATION,
            "Failed to download recording.");
      }

      String contentType = response.getHeaders().getContentType() == null
          ? MediaType.APPLICATION_OCTET_STREAM_VALUE
          : response.getHeaders().getContentType().toString();

      String fileName = resolveFileName(response, attachmentExternalId, contentType);

      return new RecordingAttachmentData(fileName, contentType, body);
    } catch (Exception e) {
      log.error("Failed to download recording '{}'", attachmentExternalId, e);
      throw new ReportPortalException(ErrorType.UNABLE_INTERACT_WITH_INTEGRATION,
          "Failed to download recording.");
    }
  }

  private String resolveRecordingUrl(IntegrationProperties properties, String attachmentExternalId,
      String attachmentAttributeKey) {
    return resolveBaseUrl(attachmentAttributeKey)
        + resolveRecordingPath(properties, attachmentExternalId, attachmentAttributeKey);
  }

  private String resolveBaseUrl(String attachmentAttributeKey) {
    if (isBrowserHubRecording(attachmentAttributeKey)) {
      return browserRecordingsBaseUrl;
    }
    return mobileRecordingsBaseUrl;
  }

  private HttpHeaders buildAuthHeaders(IntegrationProperties properties,
      String attachmentAttributeKey) {
    HttpHeaders headers = new HttpHeaders();
    String authorization = isBrowserHubRecording(attachmentAttributeKey)
        ? restClient.basicAuthHeader(properties)
        : restClient.bearerAuthHeader(properties);
    headers.set(HttpHeaders.AUTHORIZATION, authorization);
    return headers;
  }

  private String resolveRecordingPath(IntegrationProperties properties, String attachmentExternalId,
      String attachmentAttributeKey) {
    if (PLAYWRIGHT_RECORDING_ID_KEY.equals(attachmentAttributeKey)) {
      return String.format(GET_PLAYWRIGHT_RECORDING, attachmentExternalId);
    }
    if (SELENIUM_RECORDING_ID_KEY.equals(attachmentAttributeKey)) {
      return String.format(GET_SELENIUM_RECORDING, attachmentExternalId);
    }
    if (properties.hasWorkspaceId()) {
      return String.format(GET_MOBILE_RECORDING_WITH_WORKSPACE, properties.getBillingUnit(),
          properties.getWorkspaceId(), attachmentExternalId);
    }
    return String.format(GET_MOBILE_RECORDING, properties.getBillingUnit(), attachmentExternalId);
  }

  private boolean isBrowserHubRecording(String attachmentAttributeKey) {
    return PLAYWRIGHT_RECORDING_ID_KEY.equals(attachmentAttributeKey)
        || SELENIUM_RECORDING_ID_KEY.equals(attachmentAttributeKey);
  }

  private String resolveFileName(ResponseEntity<byte[]> response, String attachmentExternalId,
      String contentType) {
    String fileName = response.getHeaders().getContentDisposition().getFilename();
    if (fileName != null && !fileName.isBlank()) {
      return fileName;
    }
    if (contentType.equalsIgnoreCase("video/mp4")) {
      return attachmentExternalId + ".mp4";
    }
    if (contentType.equalsIgnoreCase("video/webm")) {
      return attachmentExternalId + ".webm";
    }
    return attachmentExternalId;
  }
}
