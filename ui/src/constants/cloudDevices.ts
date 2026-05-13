import { messages } from 'messages/cloudDevices';
import { Platform } from 'types/cloudDevices';

export const PLATFORMS: { key: Platform; messageKey: keyof typeof messages }[] = [
  { key: 'ios', messageKey: 'tabIos' },
  { key: 'android', messageKey: 'tabAndroid' },
];

export const MOBITRU_DEVICES_URL = 'https://app.mobitru.com/#!/devices';
export const MOBITRU_DOCS_URL =
  'https://reportportal.io/docs/integrations/infrastructure-providers/Mobitru';
