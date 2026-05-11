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

package com.epam.reportportal.mobitru.utils;

import static com.epam.reportportal.base.infrastructure.rules.commons.validation.BusinessRule.expect;
import static com.epam.reportportal.mobitru.model.IntegrationParametersNames.API_KEY;
import static com.epam.reportportal.mobitru.model.IntegrationParametersNames.BILLING_UNIT;
import static com.epam.reportportal.mobitru.model.IntegrationParametersNames.URL;

import com.epam.reportportal.base.infrastructure.persistence.commons.Predicates;
import com.epam.reportportal.base.infrastructure.persistence.entity.integration.IntegrationParams;
import com.epam.reportportal.base.infrastructure.rules.exception.ErrorType;
import java.util.Map;

/**
 * @author <a href="mailto:pavel_bortnik@epam.com">Pavel Bortnik</a>
 */
public class ValidationUtils {

  public static final String IS_NOT_SPECIFIED = " is not specified.";

  public static void validateIntegrationParams(IntegrationParams integrationParams) {

    expect(integrationParams.getParams(), Predicates.notNull()).verify(
        ErrorType.UNABLE_INTERACT_WITH_INTEGRATION, "Integration parameters shouldn't be empty");

    Map<String, Object> params = integrationParams.getParams();
    expect(params.get(URL.getName()), Predicates.notNull()).verify(
        ErrorType.UNABLE_INTERACT_WITH_INTEGRATION, URL + IS_NOT_SPECIFIED);

    expect(params.get(API_KEY.getName()), Predicates.notNull()).verify(
        ErrorType.UNABLE_INTERACT_WITH_INTEGRATION, API_KEY + IS_NOT_SPECIFIED);

    expect(params.get(BILLING_UNIT.getName()), Predicates.notNull()).verify(
        ErrorType.UNABLE_INTERACT_WITH_INTEGRATION, BILLING_UNIT + IS_NOT_SPECIFIED);
  }
}
