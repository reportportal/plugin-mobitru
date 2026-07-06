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

import { getBasicClickEventParameters } from './utils';

const CLOUD_DEVICE_PAGE = 'cloud_device';
const CLOUD_DEVICE_EMPTY_STATE_PAGE = 'cloud_device_empty_state';

export const CLOUD_DEVICE_PAGE_EVENTS = {
  PAGE_VIEW: {
    action: 'page_view',
    place: CLOUD_DEVICE_PAGE,
  },
  EMPTY_STATE_PAGE_VIEW: {
    action: 'page_view',
    place: CLOUD_DEVICE_EMPTY_STATE_PAGE,
  },
  EMPTY_STATE_DOCS_LINK_CLICK: {
    category: CLOUD_DEVICE_PAGE,
    action: 'click',
    place: CLOUD_DEVICE_EMPTY_STATE_PAGE,
    link_name: 'documentation',
  },
  EMPTY_STATE_OPEN_SETTINGS_CLICK: {
    category: CLOUD_DEVICE_PAGE,
    action: 'click',
    place: CLOUD_DEVICE_EMPTY_STATE_PAGE,
    element_name: 'open_settings',
  },
  EXPLORE_DEVICES_CLICK: {
    ...getBasicClickEventParameters(CLOUD_DEVICE_PAGE),
    element_name: 'explore_devices',
  },
  DEVICE_NAME_CLICK: {
    ...getBasicClickEventParameters(CLOUD_DEVICE_PAGE),
    element_name: 'device_name',
  },
};

export const getPlatformTabClickEvent = (tabName: string) => ({
  ...getBasicClickEventParameters(CLOUD_DEVICE_PAGE),
  element_name: `tab_${tabName}`,
});

export const getCloudDeviceSocialIconClickEvent = (iconName: string) => ({
  ...getBasicClickEventParameters(CLOUD_DEVICE_PAGE),
  element_name: iconName,
});
