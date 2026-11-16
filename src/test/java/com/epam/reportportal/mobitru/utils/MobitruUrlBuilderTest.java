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

package com.epam.reportportal.mobitru.utils;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.epam.reportportal.mobitru.model.IntegrationProperties;
import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.Test;

class MobitruUrlBuilderTest {

  @Test
  void buildsUrlWithoutWorkspaceSegmentWhenWorkspaceIdIsNotConfigured() {
    IntegrationProperties properties = properties(null);

    String url = MobitruUrlBuilder.buildAutomationApiUrl("https://app.mobitru.com", properties,
        "/automation/api/recording/%s", "rec-1");

    assertEquals("https://app.mobitru.com/billing/unit/demo-slug/automation/api/recording/rec-1",
        url);
  }

  @Test
  void buildsUrlWithWorkspaceSegmentWhenWorkspaceIdIsConfigured() {
    IntegrationProperties properties = properties("demo-workspace");

    String url = MobitruUrlBuilder.buildAutomationApiUrl("https://app.mobitru.com", properties,
        "/automation/api/recording/%s", "rec-1");

    assertEquals("https://app.mobitru.com/billing/unit/demo-slug/workspace/demo-workspace"
        + "/automation/api/recording/rec-1", url);
  }

  @Test
  void buildsUrlWithoutWorkspaceSegmentWhenWorkspaceIdIsBlank() {
    IntegrationProperties properties = properties("   ");

    String url = MobitruUrlBuilder.buildAutomationApiUrl("https://app.mobitru.com", properties,
        "/automation/api/device/ios");

    assertEquals("https://app.mobitru.com/billing/unit/demo-slug/automation/api/device/ios", url);
  }

  @Test
  void supportsMultiplePathArguments() {
    IntegrationProperties properties = properties("demo-workspace");

    String url = MobitruUrlBuilder.buildAutomationApiUrl("https://app.mobitru.com", properties,
        "/automation/api/device/%s", "android");

    assertEquals(
        "https://app.mobitru.com/billing/unit/demo-slug/workspace/demo-workspace"
            + "/automation/api/device/android",
        url);
  }

  private IntegrationProperties properties(String workspaceId) {
    Map<String, Object> params = new HashMap<>();
    params.put("apiKey", "token-123");
    params.put("billingUnit", "demo-slug");
    if (workspaceId != null) {
      params.put("workspaceId", workspaceId);
    }
    return new IntegrationProperties(params);
  }
}
