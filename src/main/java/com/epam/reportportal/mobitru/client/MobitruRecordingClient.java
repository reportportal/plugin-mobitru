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

import static com.epam.reportportal.mobitru.model.Constants.GET_RECORDING;

import com.epam.reportportal.base.infrastructure.persistence.entity.integration.Integration;
import com.epam.reportportal.base.infrastructure.rules.exception.ErrorType;
import com.epam.reportportal.base.infrastructure.rules.exception.ReportPortalException;
import com.epam.reportportal.mobitru.model.IntegrationProperties;
import com.epam.reportportal.mobitru.model.RecordingAttachmentData;
import com.epam.reportportal.mobitru.utils.ValidationUtils;
import lombok.extern.slf4j.Slf4j;
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

  public MobitruRecordingClient(RestClientBuilder restClient) {
    this.restClient = restClient;
  }

  public RecordingAttachmentData downloadRecording(Integration integration,
      String attachmentExternalId) {
    ValidationUtils.validateIntegrationParams(integration.getParams());
    IntegrationProperties properties = new IntegrationProperties(integration.getParams().getParams());
    RestTemplate restTemplate = restClient.buildRestTemplate(properties);

    try {
      String recordingUrl = String.format(GET_RECORDING, properties.getBillingUnit(),
          attachmentExternalId);
      ResponseEntity<byte[]> response = restTemplate.exchange(recordingUrl, HttpMethod.GET, null,
          byte[].class);
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
    } catch (ReportPortalException e) {
      throw e;
    } catch (Exception e) {
      log.error("Failed to download recording '{}'", attachmentExternalId, e);
      throw new ReportPortalException(ErrorType.UNABLE_INTERACT_WITH_INTEGRATION,
          "Failed to download recording.");
    }
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
