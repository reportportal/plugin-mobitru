export type Platform = 'ios' | 'android';

export interface Device {
  id: string;
  name: string;
  version: string;
  imageUrl?: string;
}

export interface DevicesData {
  premium: Device[];
  available: Device[];
}

export interface DeviceGroupProps {
  title: string;
  devices: Device[];
}

export interface DeviceCardProps {
  device: Device;
}

export interface DeviceCapabilities {
  platformName?: string;
  platformVersion?: string;
  deviceName?: string;
  udid?: string;
  premium?: boolean;
  image?: string;
}

export interface GetDevicesItem {
  desiredCapabilities?: DeviceCapabilities;
}
