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

import androidPixel10 from '../../device-images/android/google_pixel_10.png';
import androidPixel10ProXl from '../../device-images/android/google_pixel_10_pro_xl.png';
import androidPixel8Pro from '../../device-images/android/google-pixel-8-pro.png';
import androidPixel9 from '../../device-images/android/google-pixel-9.png';
import androidPixel9Pro from '../../device-images/android/google-pixel-9-pro.png';
import androidOnePlus10Pro from '../../device-images/android/oneplus_10_pro.png';
import androidSamsungA55 from '../../device-images/android/samsung_galaxy_a55.png';
import androidSamsungS24Plus from '../../device-images/android/sm-s926u1.png';
import androidSamsungS25Ultra from '../../device-images/android/sm-s938b.png';
import androidSamsungS22Ultra from '../../device-images/android/smg-galaxy-s22-ultra.png';
import iosIpadAirM3 from '../../device-images/ios/apple-ipad-air-m3-11-inch.png';
import iosIpadMini6 from '../../device-images/ios/ipad_mini_6.png';
import iosIpadPro11Gen5 from '../../device-images/ios/ipad_pro_11_inch_5th_gen.png';
import iosIpadPro129Gen6 from '../../device-images/ios/ipad_pro_12.9_inch_6th_gen.png';
import iosIpad10gen from '../../device-images/ios/ipad-10-gen.png';
import iosIphone17Pro from '../../device-images/ios/iphone_17_pro.png';
import iosIphone14Pro from '../../device-images/ios/iphone-14-pro.png';
import iosIphone15Pro from '../../device-images/ios/iphone-15-pro.png';
import iosIphone16 from '../../device-images/ios/iphone-16.png';
import iosIphone16Pro from '../../device-images/ios/iphone-16-pro.png';

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
    id: 'ios-ipad-pro-11-5gen-17-0',
    name: 'iPad Pro 11" 5th gen',
    version: '17.0',
    platform: 'iOS',
    image: iosIpadPro11Gen5,
    premium: true,
  },
  {
    id: 'ios-ipad-pro-129-6gen-16-6',
    name: 'iPad Pro 12.9" 6th gen',
    version: '16.6',
    platform: 'iOS',
    image: iosIpadPro129Gen6,
    premium: true,
  },
  {
    id: 'ios-ipad-air-m3-11-18-0',
    name: 'iPad Air M3 11"',
    version: '18.0',
    platform: 'iOS',
    image: iosIpadAirM3,
    premium: true,
  },
  {
    id: 'ios-ipad-mini-6-16-0',
    name: 'iPad mini 6',
    version: '16.0',
    platform: 'iOS',
    image: iosIpadMini6,
    premium: true,
  },
  {
    id: 'ios-iphone-17-pro-18-5',
    name: 'iPhone 17 Pro',
    version: '18.5',
    platform: 'iOS',
    image: iosIphone17Pro,
    premium: true,
  },
  {
    id: 'ios-ipad-10-gen-16-3',
    name: 'iPad 10th gen',
    version: '16.3',
    platform: 'iOS',
    image: iosIpad10gen,
    premium: false,
  },
  {
    id: 'ios-iphone-16-pro-18-3',
    name: 'iPhone 16 Pro',
    version: '18.3',
    platform: 'iOS',
    image: iosIphone16Pro,
    premium: false,
  },
  {
    id: 'ios-iphone-16-18-1',
    name: 'iPhone 16',
    version: '18.1',
    platform: 'iOS',
    image: iosIphone16,
    premium: false,
  },
  {
    id: 'ios-iphone-15-pro-17-4',
    name: 'iPhone 15 Pro',
    version: '17.4',
    platform: 'iOS',
    image: iosIphone15Pro,
    premium: false,
  },
  {
    id: 'ios-iphone-14-pro-17-2',
    name: 'iPhone 14 Pro',
    version: '17.2',
    platform: 'iOS',
    image: iosIphone14Pro,
    premium: false,
  },
];

export const MOCK_ANDROID_DEVICES: RawDevice[] = [
  {
    id: 'android-pixel-10-pro-xl-16',
    name: 'Google Pixel 10 Pro XL',
    version: '16',
    platform: 'Android',
    image: androidPixel10ProXl,
    premium: true,
  },
  {
    id: 'android-samsung-s25-ultra-15',
    name: 'Samsung Galaxy S25 Ultra',
    version: '15',
    platform: 'Android',
    image: androidSamsungS25Ultra,
    premium: true,
  },
  {
    id: 'android-samsung-s24-plus-14',
    name: 'Samsung Galaxy S24+',
    version: '14',
    platform: 'Android',
    image: androidSamsungS24Plus,
    premium: true,
  },
  {
    id: 'android-pixel-9-pro-15',
    name: 'Google Pixel 9 Pro',
    version: '15',
    platform: 'Android',
    image: androidPixel9Pro,
    premium: true,
  },
  {
    id: 'android-oneplus-10-pro-14',
    name: 'OnePlus 10 Pro',
    version: '14',
    platform: 'Android',
    image: androidOnePlus10Pro,
    premium: true,
  },
  {
    id: 'android-pixel-10-16',
    name: 'Google Pixel 10',
    version: '16',
    platform: 'Android',
    image: androidPixel10,
    premium: false,
  },
  {
    id: 'android-pixel-9-15',
    name: 'Google Pixel 9',
    version: '15',
    platform: 'Android',
    image: androidPixel9,
    premium: false,
  },
  {
    id: 'android-samsung-a55-14',
    name: 'Samsung Galaxy A55',
    version: '14',
    platform: 'Android',
    image: androidSamsungA55,
    premium: false,
  },
  {
    id: 'android-samsung-s22-ultra-13',
    name: 'Samsung Galaxy S22 Ultra',
    version: '13',
    platform: 'Android',
    image: androidSamsungS22Ultra,
    premium: false,
  },
  {
    id: 'android-pixel-8-pro-14',
    name: 'Google Pixel 8 Pro',
    version: '14',
    platform: 'Android',
    image: androidPixel8Pro,
    premium: false,
  },
];
