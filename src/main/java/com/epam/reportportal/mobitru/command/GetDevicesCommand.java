/*
 * Copyright 2024 EPAM Systems
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

package com.epam.reportportal.mobitru.command;

import static com.epam.reportportal.base.infrastructure.rules.commons.validation.BusinessRule.expect;
import static com.epam.reportportal.mobitru.model.Constants.GET_DEVICES;
import static com.epam.reportportal.mobitru.model.Constants.PLATFORM;

import com.epam.reportportal.base.infrastructure.persistence.commons.Predicates;
import com.epam.reportportal.base.infrastructure.persistence.entity.integration.Integration;
import com.epam.reportportal.base.infrastructure.rules.exception.ErrorType;
import com.epam.reportportal.base.infrastructure.rules.exception.ReportPortalException;
import com.epam.reportportal.extension.PluginCommand;
import com.epam.reportportal.mobitru.client.RestClientBuilder;
import com.epam.reportportal.mobitru.model.DeviceInfo;
import com.epam.reportportal.mobitru.model.IntegrationProperties;
import com.epam.reportportal.mobitru.utils.ValidationUtils;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

/**
 * @author <a href="mailto:pavel_bortnik@epam.com">Pavel Bortnik</a>
 */
@Slf4j
public class GetDevicesCommand implements PluginCommand<List<DeviceInfo>> {

  private static final Set<String> SUPPORTED_PLATFORMS = Set.of("ios", "android");

  private final RestClientBuilder restClient;

  public GetDevicesCommand(RestClientBuilder restClient) {
    this.restClient = restClient;
  }

  @Override
  public List<DeviceInfo> executeCommand(Integration integration, Map params) {
    ValidationUtils.validateIntegrationParams(integration.getParams());
    String platform = resolvePlatform(params);

    IntegrationProperties sp = new IntegrationProperties(integration.getParams().getParams());
    RestTemplate restTemplate = restClient.buildRestTemplate(sp);

    try {
      String devicesUrl = String.format(GET_DEVICES, sp.getBillingUnit(), platform);
      ResponseEntity<List<DeviceInfo>> response = restTemplate.exchange(
          devicesUrl,
          HttpMethod.GET,
          null,
          new ParameterizedTypeReference<>() {
          }
      );
      if (response.getStatusCode().is2xxSuccessful()) {
        List<DeviceInfo> body = response.getBody();
        return body != null ? body : Collections.emptyList();
      }
      throw new ReportPortalException(ErrorType.UNABLE_INTERACT_WITH_INTEGRATION,
          "Failed to retrieve devices.");
    } catch (ReportPortalException e) {
      throw e;
    } catch (Exception e) {
      log.error("Failed to retrieve devices for platform '{}'", platform, e);
      throw new ReportPortalException(ErrorType.UNABLE_INTERACT_WITH_INTEGRATION,
          "Failed to retrieve devices.");
    }
  }

  @Override
  public String getName() {
    return "getDevices";
  }

  private String resolvePlatform(Map<String, Object> params) {
    expect(params, Predicates.notNull()).verify(
        ErrorType.UNABLE_INTERACT_WITH_INTEGRATION, PLATFORM + " parameter should be provided");
    Object raw = params.get(PLATFORM);
    expect(raw, Predicates.notNull()).verify(
        ErrorType.UNABLE_INTERACT_WITH_INTEGRATION, PLATFORM + " parameter should be provided");
    String platform = raw.toString().toLowerCase(Locale.ROOT);
    if (!SUPPORTED_PLATFORMS.contains(platform)) {
      throw new ReportPortalException(ErrorType.UNABLE_INTERACT_WITH_INTEGRATION,
          "Unsupported platform '" + raw + "'. Supported: " + SUPPORTED_PLATFORMS);
    }
    return platform;
  }
}
