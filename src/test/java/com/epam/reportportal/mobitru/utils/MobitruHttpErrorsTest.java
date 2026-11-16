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

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.nio.charset.StandardCharsets;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;

class MobitruHttpErrorsTest {

  @Test
  void recognizesNoAvailableDevices404() {
    assertTrue(MobitruHttpErrors.isNoAvailableDevices(httpError(HttpStatus.NOT_FOUND,
        "{\"error\":{\"message\":\"There are no available devices found\"}}")));
  }

  @Test
  void ignoresOther404Payloads() {
    assertFalse(MobitruHttpErrors.isNoAvailableDevices(
        httpError(HttpStatus.NOT_FOUND, "{\"error\":{\"message\":\"Unknown billing unit\"}}")));
  }

  @Test
  void ignoresSameMessageWithDifferentStatus() {
    assertFalse(MobitruHttpErrors.isNoAvailableDevices(httpError(HttpStatus.BAD_REQUEST,
        "{\"error\":{\"message\":\"There are no available devices found\"}}")));
  }

  private HttpClientErrorException httpError(HttpStatus status, String body) {
    return HttpClientErrorException.create(status, status.getReasonPhrase(), HttpHeaders.EMPTY,
        body.getBytes(StandardCharsets.UTF_8), StandardCharsets.UTF_8);
  }
}
