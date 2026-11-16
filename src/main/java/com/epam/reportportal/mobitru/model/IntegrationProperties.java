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

package com.epam.reportportal.mobitru.model;

import static com.epam.reportportal.mobitru.model.IntegrationParametersNames.API_KEY;
import static com.epam.reportportal.mobitru.model.IntegrationParametersNames.BILLING_UNIT;
import static com.epam.reportportal.mobitru.model.IntegrationParametersNames.WORKSPACE_ID;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class IntegrationProperties {

  private final String apiKey;
  private final String billingUnit;
  private final String workspaceId;

  public IntegrationProperties(Map<String, Object> params) {
    this.apiKey = (String) params.get(API_KEY.getName());
    this.billingUnit = (String) params.get(BILLING_UNIT.getName());
    this.workspaceId = (String) params.get(WORKSPACE_ID.getName());
  }

  public boolean hasWorkspaceId() {
    return workspaceId != null && !workspaceId.isBlank();
  }
}
