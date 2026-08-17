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

import com.epam.reportportal.mobitru.model.IntegrationProperties;

/**
 * Builds Mobitru "billing unit automation API" URLs, taking the optional {@code workspaceId}
 * integration parameter into account.
 *
 * <p>When {@code workspaceId} is configured on the integration, every URL built by this class
 * gets an extra {@code /workspace/{workspaceId}} path segment right after the billing unit
 * segment, e.g.:
 * <pre>{@code
 * /billing/unit/{billingUnit}/workspace/{workspaceId}/automation/api/...
 * }</pre>
 * Otherwise, the segment is omitted and the URL keeps its original shape:
 * <pre>{@code
 * /billing/unit/{billingUnit}/automation/api/...
 * }</pre>
 *
 * @author <a href="mailto:pavel_bortnik@epam.com">Pavel Bortnik</a>
 */
public final class MobitruUrlBuilder {

  private static final String BILLING_UNIT_SEGMENT = "/billing/unit/%s";
  private static final String WORKSPACE_SEGMENT = "/workspace/%s";

  private MobitruUrlBuilder() {
  }

  /**
   * Builds a full "billing unit automation API" URL.
   *
   * @param baseUrl       scheme + host, e.g. {@code https://app.mobitru.com}
   * @param properties    integration properties holding {@code billingUnit} and, optionally,
   *                      {@code workspaceId}
   * @param pathTemplate  a {@link String#format(String, Object...)} template for the part of the
   *                       path that follows the billing unit (and workspace, if present) segment,
   *                       e.g. {@code "/automation/api/recording/%s"}
   * @param pathArgs      arguments to substitute into {@code pathTemplate}
   * @return the resulting URL, e.g. {@code https://app.mobitru.com/billing/unit/acme/workspace
   *     /ws-1/automation/api/recording/rec-1}
   */
  public static String buildAutomationApiUrl(String baseUrl, IntegrationProperties properties,
      String pathTemplate, Object... pathArgs) {
    return baseUrl + billingUnitPath(properties) + String.format(pathTemplate, pathArgs);
  }

  private static String billingUnitPath(IntegrationProperties properties) {
    String path = String.format(BILLING_UNIT_SEGMENT, properties.getBillingUnit());
    if (properties.hasWorkspaceId()) {
      path += String.format(WORKSPACE_SEGMENT, properties.getWorkspaceId());
    }
    return path;
  }
}
