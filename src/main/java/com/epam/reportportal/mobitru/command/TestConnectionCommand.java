/*
 * Copyright 2019 EPAM Systems
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

import static com.epam.reportportal.mobitru.model.Constants.MOBITRU_BASE_URL;
import static com.epam.reportportal.mobitru.model.Constants.TEST_CONNECTION;

import com.epam.reportportal.api.model.PluginCommandRQ;
import com.epam.reportportal.base.infrastructure.persistence.dao.ProjectRepository;
import com.epam.reportportal.base.infrastructure.persistence.dao.ProjectUserRepository;
import com.epam.reportportal.base.infrastructure.persistence.dao.organization.OrganizationRepository;
import com.epam.reportportal.base.infrastructure.persistence.dao.organization.OrganizationUserRepository;
import com.epam.reportportal.base.infrastructure.persistence.entity.integration.Integration;
import com.epam.reportportal.base.infrastructure.rules.exception.ErrorType;
import com.epam.reportportal.base.infrastructure.rules.exception.ReportPortalException;
import com.epam.reportportal.extension.command.AbstractExtensionCommand;
import com.epam.reportportal.mobitru.client.RestClientBuilder;
import com.epam.reportportal.mobitru.model.IntegrationProperties;
import com.epam.reportportal.mobitru.utils.MobitruUrlBuilder;
import com.epam.reportportal.mobitru.utils.ValidationUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

/**
 * @author <a href="mailto:pavel_bortnik@epam.com">Pavel Bortnik</a>
 */
@Slf4j
public class TestConnectionCommand extends AbstractExtensionCommand<Boolean> {

  private final RestClientBuilder restClient;

  public TestConnectionCommand(RestClientBuilder restClient, ProjectRepository projectRepository,
      OrganizationUserRepository organizationUserRepository,
      OrganizationRepository organizationRepository, ProjectUserRepository projectUserRepository) {
    super(projectRepository, organizationUserRepository, organizationRepository,
        projectUserRepository);
    this.restClient = restClient;
  }

  @Override
  public Boolean executeCommand(Integration integration, PluginCommandRQ pluginCommandRq) {
    ValidationUtils.validateIntegrationParams(integration.getParams());
    IntegrationProperties sp = new IntegrationProperties(integration.getParams().getParams());
    RestTemplate restTemplate = restClient.getRestTemplate();

    try {
      String assetsUrl = MobitruUrlBuilder.buildAutomationApiUrl(MOBITRU_BASE_URL, sp,
          TEST_CONNECTION);
      HttpHeaders headers = new HttpHeaders();
      headers.set(HttpHeaders.AUTHORIZATION, restClient.bearerAuthHeader(sp));
      ResponseEntity<String> forObject = restTemplate.exchange(assetsUrl, HttpMethod.GET,
          new HttpEntity<>(headers), String.class);
      if (forObject.getStatusCode().is2xxSuccessful()) {
        return true;
      } else {
        throw new ReportPortalException(ErrorType.UNABLE_INTERACT_WITH_INTEGRATION,
            "Connection refused.");
      }
    } catch (Exception e) {
      log.error("Test connection failed", e);
      throw new ReportPortalException(ErrorType.UNABLE_INTERACT_WITH_INTEGRATION,
          "Connection refused.");
    }
  }


  @Override
  public String getName() {
    return "testConnection";
  }
}
