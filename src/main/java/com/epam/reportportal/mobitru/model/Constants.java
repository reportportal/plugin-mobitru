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

public class Constants {

  public static final String PLATFORM = "platform";
  public static final String MOBITRU_BASE_URL = "https://app.mobitru.com";
  public static final String BROWSERHUB_BASE_URL = "https://browserhub-us.mobitru.com";

  // Reportportal attribute keys
  public static final String MOBILE_RECORDING_ID_KEY = "mobitru_mobile_recording_id";
  public static final String PLAYWRIGHT_RECORDING_ID_KEY = "mobitru_playwright_recording_id";
  public static final String SELENIUM_RECORDING_ID_KEY = "mobitru_selenium_recording_id";

  // endpoints - relative to the billing unit (and, optionally, workspace) segment built by
  // com.epam.reportportal.mobitru.utils.MobitruUrlBuilder
  public static final String TEST_CONNECTION = "/automation/api/device/ios";
  public static final String GET_DEVICES = "/automation/api/device/%s";
  public static final String GET_MOBILE_RECORDING = "/automation/api/recording/%s";
  public static final String GET_PLAYWRIGHT_RECORDING = "/recordings/%s";
  public static final String GET_SELENIUM_RECORDING = "/recordings/%s";


}
