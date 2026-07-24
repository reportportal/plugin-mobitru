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

import { buildDeviceImageUrl } from 'constants/cloudDevices';
import { Device, DevicesData, GetDevicesItem } from 'types/cloudDevices';

interface MappedDevice extends Device {
  premium: boolean;
}

const mapToDevice = (item: GetDevicesItem): MappedDevice | null => {
  const caps = item.desiredCapabilities;
  if (!caps?.udid) {
    return null;
  }

  return {
    id: caps.udid,
    name: caps.deviceName || caps.udid,
    version: [caps.platformName, caps.platformVersion].filter(Boolean).join(' '),
    ...(caps.image ? { imageUrl: buildDeviceImageUrl(caps.image) } : {}),
    premium: Boolean(caps.premium),
  };
};

const toCardDevice = ({ id, name, version, imageUrl }: MappedDevice): Device => ({
  id,
  name,
  version,
  imageUrl,
});

export const groupDevices = (items: GetDevicesItem[]): DevicesData => {
  const devices = items
    .map(mapToDevice)
    .filter((device): device is MappedDevice => Boolean(device));

  return {
    premium: devices.filter((device) => device.premium).map(toCardDevice),
    available: devices.filter((device) => !device.premium).map(toCardDevice),
  };
};
