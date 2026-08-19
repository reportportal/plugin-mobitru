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

import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpStatusCodeException;

/**
 * Recognizes known Mobitru HTTP error payloads that the plugin should treat as a non-failure.
 */
public final class MobitruHttpErrors {

  public static final String NO_AVAILABLE_DEVICES_MESSAGE = "There are no available devices found";

  private MobitruHttpErrors() {
  }

  public static boolean isNoAvailableDevices(Throwable throwable) {
    if (!(throwable instanceof HttpStatusCodeException exception)) {
      return false;
    }
    return exception.getStatusCode().value() == HttpStatus.NOT_FOUND.value()
        && exception.getResponseBodyAsString().contains(NO_AVAILABLE_DEVICES_MESSAGE);
  }
}
