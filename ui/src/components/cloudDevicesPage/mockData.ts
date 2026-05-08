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

// TODO: remove this file when the real backend is ready.

export const imageBaseURL = 'https://app.mobitru.com/static/app/devices/x160/';
export const buildDeviceImageUrl = (image: string) => `${imageBaseURL}${image}`;

export interface RawDevice {
  id: string;
  name: string;
  version: string;
  platform: string;
  image: string;
  premium: boolean;
}

export const MOCK_IOS_DEVICES: RawDevice[] = [
  {
    id: 'ios-ipad-9-gen-14-1-2',
    name: 'iPad 9-th gen',
    version: '14.1.2',
    platform: 'iOS',
    image: 'ipad-9-gen.png?29042024',
    premium: true,
  },
  {
    id: 'ios-ipad-10-gen-15-3',
    name: 'iPad 10-th gen',
    version: '15.3',
    platform: 'iOS',
    image: 'ipad-10-gen.png?29042024',
    premium: true,
  },
  {
    id: 'ios-ipad-11-gen-17-0',
    name: 'iPad 11-th gen',
    version: '17.0',
    platform: 'iOS',
    image: 'ipad-11-gen.png?29042024',
    premium: true,
  },
  {
    id: 'ios-ipad-pro-10-16-0',
    name: 'iPad Pro 10',
    version: '16.0',
    platform: 'iOS',
    image: 'ipad-pro-10.png?29042024',
    premium: true,
  },
  {
    id: 'ios-ipad-pro-11-17-1',
    name: 'iPad Pro 11',
    version: '17.1',
    platform: 'iOS',
    image: 'ipad-pro-11.png?29042024',
    premium: false,
  },
  {
    id: 'ios-ipad-pro-12-9-14-8',
    name: "iPad Pro 12'9",
    version: '14.8',
    platform: 'iOS',
    image: 'ipad-pro-12-9.png?29042024',
    premium: false,
  },
  {
    id: 'ios-ipad-air-4-16-3',
    name: 'iPad Air 4',
    version: '16.3',
    platform: 'iOS',
    image: 'ipad-air-4.png?29042024',
    premium: false,
  },
  {
    id: 'ios-ipad-5-gen-16-2',
    name: 'iPad 5-th gen',
    version: '16.2',
    platform: 'iOS',
    image: 'ipad-5-gen.png?29042024',
    premium: false,
  },
  {
    id: 'ios-ipad-air-5-17-2',
    name: 'iPad Air 5',
    version: '17.2',
    platform: 'iOS',
    image: 'ipad-air-5.png?29042024',
    premium: true,
  },
  {
    id: 'ios-iphone-15-pro-17-4',
    name: 'iPhone 15 Pro',
    version: '17.4',
    platform: 'iOS',
    image: 'iphone-15-pro.png?29042024',
    premium: false,
  },
];

export const MOCK_ANDROID_DEVICES: RawDevice[] = [
  {
    id: 'android-pixel-8-pro-16',
    name: 'Google Pixel 8 Pro',
    version: '16',
    platform: 'Android',
    image: 'google-pixel-8-pro.png?29042024',
    premium: true,
  },
  {
    id: 'android-galaxy-s24-14',
    name: 'Samsung Galaxy S24',
    version: '14',
    platform: 'Android',
    image: 'samsung-galaxy-s24.png?29042024',
    premium: true,
  },
  {
    id: 'android-oneplus-12-14',
    name: 'OnePlus 12',
    version: '14',
    platform: 'Android',
    image: 'oneplus-12.png?29042024',
    premium: true,
  },
  {
    id: 'android-xiaomi-14-pro-14',
    name: 'Xiaomi 14 Pro',
    version: '14',
    platform: 'Android',
    image: 'xiaomi-14-pro.png?29042024',
    premium: true,
  },
  {
    id: 'android-pixel-7a-13',
    name: 'Google Pixel 7a',
    version: '13',
    platform: 'Android',
    image: 'google-pixel-7a.png?29042024',
    premium: false,
  },
  {
    id: 'android-galaxy-a54-13',
    name: 'Samsung Galaxy A54',
    version: '13',
    platform: 'Android',
    image: 'samsung-galaxy-a54.png?29042024',
    premium: false,
  },
  {
    id: 'android-redmi-note-12-12',
    name: 'Xiaomi Redmi Note 12',
    version: '12',
    platform: 'Android',
    image: 'xiaomi-redmi-note-12.png?29042024',
    premium: false,
  },
  {
    id: 'android-galaxy-tab-s8-13',
    name: 'Samsung Galaxy Tab S8',
    version: '13',
    platform: 'Android',
    image: 'samsung-galaxy-tab-s8.png?29042024',
    premium: false,
  },
  {
    id: 'android-pixel-fold-14',
    name: 'Google Pixel Fold',
    version: '14',
    platform: 'Android',
    image: 'google-pixel-fold.png?29042024',
    premium: true,
  },
  {
    id: 'android-nothing-phone-2-14',
    name: 'Nothing Phone (2)',
    version: '14',
    platform: 'Android',
    image: 'nothing-phone-2.png?29042024',
    premium: false,
  },
];
