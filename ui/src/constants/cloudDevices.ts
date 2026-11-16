import { messages } from 'messages/cloudDevices';
import { Platform } from 'types/cloudDevices';

export const PLATFORMS: { key: Platform; messageKey: keyof typeof messages }[] = [
  { key: 'ios', messageKey: 'tabIos' },
  { key: 'android', messageKey: 'tabAndroid' },
];

export const MOBITRU_DEVICES_URL = 'https://app.mobitru.com/#!/devices';
export const MOBITRU_DOCS_URL =
  'https://reportportal.io/docs/integrations/infrastructure-providers/Mobitru/';

export const MOBITRU_DEVICE_IMAGE_SIZE = 'x120';
export const MOBITRU_DEVICE_IMAGES_BASE_URL = `https://app.mobitru.com/static/public/device-images/${MOBITRU_DEVICE_IMAGE_SIZE}`;

export const buildDeviceImageUrl = (image: string): string =>
  `${MOBITRU_DEVICE_IMAGES_BASE_URL}/${image}`;
