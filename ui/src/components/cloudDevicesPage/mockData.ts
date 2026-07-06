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

import androidAlcatel1X from '../../device-images/android/alcatel-1x.png';
import androidPixel10ProXl from '../../device-images/android/google_pixel_10_pro_xl.png';
import androidPixel4XL from '../../device-images/android/google-pixel-4-xl.png';
import androidPixel6Pro from '../../device-images/android/google-pixel-6-pro.png';
import androidPixel6a from '../../device-images/android/google-pixel-6a.png';
import androidPixel7 from '../../device-images/android/google-pixel-7.png';
import androidPixel7Pro from '../../device-images/android/google-pixel-7-pro.png';
import androidPixel8 from '../../device-images/android/google-pixel-8.png';
import androidPixel8Pro from '../../device-images/android/google-pixel-8-pro.png';
import androidPixel9 from '../../device-images/android/google-pixel-9.png';
import androidPixel9Pro from '../../device-images/android/google-pixel-9-pro.png';
import androidPixel9ProXl from '../../device-images/android/google-pixel-9-pro-xl.png';
import androidHuaweiMate50Pro from '../../device-images/android/huawei-mate50-pro.png';
import androidHuaweiMatePad10 from '../../device-images/android/huawei-matepad-10.png';
import androidHuaweiP30Pro from '../../device-images/android/huawei-p30-pro.png';
import androidHuaweiP40Pro from '../../device-images/android/huawei-p40-pro.png';
import androidHuaweiP50Pro from '../../device-images/android/huawei-p50-pro.png';
import androidMotoG200 from '../../device-images/android/moto_g200_5g.png';
import androidNexus6 from '../../device-images/android/nexus_6.png';
import androidNokia2 from '../../device-images/android/nokia2.png';
import androidNokia6 from '../../device-images/android/nokia6.png';
import androidPixel2 from '../../device-images/android/pixel_2.png';
import androidPixel4a from '../../device-images/android/pixel-4a.png';
import androidSamsungA51 from '../../device-images/android/samsung-a51.png';
import androidSamsungA13 from '../../device-images/android/sm-a137f.png';
import androidSamsungA32 from '../../device-images/android/sm-a325f.png';
import androidSamsungA35b from '../../device-images/android/smg-galaxy-a356b.png';
import iosIpadAir2 from '../../device-images/ios/air2.png';
import iosIpadAirM3 from '../../device-images/ios/apple-ipad-air-m3-11-inch.png';
import iosIpadMini6 from '../../device-images/ios/ipad_mini_6.png';
import iosIpadPro11Gen5 from '../../device-images/ios/ipad_pro_11_inch_5th_gen.png';
import iosIpadPro129Gen6 from '../../device-images/ios/ipad_pro_12.9_inch_6th_gen.png';
import iosIpad5gen from '../../device-images/ios/ipad-5.png';
import iosIpad7gen from '../../device-images/ios/ipad-7.png';
import iosIpad9gen from '../../device-images/ios/ipad-9gen.png';
import iosIpad10gen from '../../device-images/ios/ipad-10-gen.png';
import iosIpadAir3gen from '../../device-images/ios/ipad-air-3-gen.png';
import iosIpadAir5gen from '../../device-images/ios/ipad-air-5-gen.png';
import iosIpadMini5th from '../../device-images/ios/ipad-mini-5th-gen.png';
import iosIpadPro105 from '../../device-images/ios/ipad-pro-10-5.png';
import iosIpadPro11Gen1 from '../../device-images/ios/ipad-pro-11.png';
import iosIpadPro129Gen3 from '../../device-images/ios/ipad-pro-12-9-inch-3rd.png';
import iosIpad11gen from '../../device-images/ios/ipad11_gen.png';
import iosIphone11ProMax from '../../device-images/ios/iphone-11-pro-max.png';
import iosIphone12Pro from '../../device-images/ios/iphone-12-pro.png';
import iosIphone13 from '../../device-images/ios/iphone-13.png';

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
    id: 'ios-ipad-10gen-18-3-2',
    name: 'iPad 10th gen',
    version: '18.3.2',
    platform: 'iOS',
    image: iosIpad10gen,
    premium: true,
  },
  {
    id: 'ios-ipad-10gen-16-0',
    name: 'iPad 10th gen',
    version: '16.0',
    platform: 'iOS',
    image: iosIpad10gen,
    premium: true,
  },
  {
    id: 'ios-ipad-9gen-17-5',
    name: 'iPad 9th gen',
    version: '17.5',
    platform: 'iOS',
    image: iosIpad9gen,
    premium: true,
  },
  {
    id: 'ios-ipad-9gen-16-6-1',
    name: 'iPad 9th gen',
    version: '16.6.1',
    platform: 'iOS',
    image: iosIpad9gen,
    premium: true,
  },
  {
    id: 'ios-ipad-9gen-18-5',
    name: 'iPad 9th gen',
    version: '18.5',
    platform: 'iOS',
    image: iosIpad9gen,
    premium: true,
  },
  {
    id: 'ios-ipad-air-3gen-18-2-1',
    name: 'iPad Air 3rd gen',
    version: '18.2.1',
    platform: 'iOS',
    image: iosIpadAir3gen,
    premium: true,
  },
  {
    id: 'ios-ipad-air-3gen-26-0',
    name: 'iPad Air 3rd gen',
    version: '26.0',
    platform: 'iOS',
    image: iosIpadAir3gen,
    premium: true,
  },
  {
    id: 'ios-ipad-air-5gen-15-6-2',
    name: 'iPad Air 5th gen',
    version: '15.6.1',
    platform: 'iOS',
    image: iosIpadAir5gen,
    premium: true,
  },
  {
    id: 'ios-ipad-air-5gen-18-3-1',
    name: 'iPad Mini 5th gen',
    version: '18.3.1',
    platform: 'iOS',
    image: iosIpadMini5th,
    premium: true,
  },
  {
    id: 'ios-ipad-mini-6-18-0',
    name: 'iPad Mini 6th gen',
    version: '18.0',
    platform: 'iOS',
    image: iosIpadMini6,
    premium: true,
  },
  {
    id: 'ios-ipad-mini-6-26-0',
    name: 'iPad Mini 6th gen',
    version: '26.0',
    platform: 'iOS',
    image: iosIpadMini6,
    premium: true,
  },
  {
    id: 'ios-ipad-pro-11-gen5-18-3-1',
    name: 'iPad Pro 11 inch 5th Gen',
    version: '18.3.1',
    platform: 'iOS',
    image: iosIpadPro11Gen5,
    premium: true,
  },
  {
    id: 'ios-iphone-11-pro-max-18-5',
    name: 'iPhone 11 Pro Max',
    version: '18.5',
    platform: 'iOS',
    image: iosIphone11ProMax,
    premium: true,
  },
  {
    id: 'ios-iphone-12-pro-18-6-2',
    name: 'iPhone 12 Pro',
    version: '18.6.2',
    platform: 'iOS',
    image: iosIphone12Pro,
    premium: true,
  },
  {
    id: 'ios-iphone-13-16-3-1',
    name: 'iPhone 13',
    version: '16.3.1',
    platform: 'iOS',
    image: iosIphone13,
    premium: true,
  },
  {
    id: 'ios-iphone-13-15-6-1',
    name: 'iPhone 13',
    version: '15.6.1',
    platform: 'iOS',
    image: iosIphone13,
    premium: true,
  },

  {
    id: 'ios-ipad-11gen-18-3-2',
    name: 'iPad 11th Gen',
    version: '18.3.2',
    platform: 'iOS',
    image: iosIpad11gen,
    premium: false,
  },
  {
    id: 'ios-ipad-11gen-18-4-1',
    name: 'iPad 11th Gen',
    version: '18.4.1',
    platform: 'iOS',
    image: iosIpad11gen,
    premium: false,
  },
  {
    id: 'ios-ipad-5gen-16-7-10',
    name: 'iPad 5th gen',
    version: '16.7.10',
    platform: 'iOS',
    image: iosIpad5gen,
    premium: false,
  },
  {
    id: 'ios-ipad-7gen-18-0',
    name: 'iPad 7th gen',
    version: '18.0',
    platform: 'iOS',
    image: iosIpad7gen,
    premium: false,
  },
  {
    id: 'ios-ipad-air-m3-18-3',
    name: 'iPad Air 11-inch 7th Gen',
    version: '18.3',
    platform: 'iOS',
    image: iosIpadAirM3,
    premium: false,
  },
  {
    id: 'ios-ipad-air-m3-18-4',
    name: 'iPad Air 11-inch 7th Gen',
    version: '18.4',
    platform: 'iOS',
    image: iosIpadAirM3,
    premium: false,
  },
  {
    id: 'ios-ipad-air2-15-7-8',
    name: 'iPad Air 2',
    version: '15.7.8',
    platform: 'iOS',
    image: iosIpadAir2,
    premium: false,
  },
  {
    id: 'ios-ipad-air2-15-7-5',
    name: 'iPad Air 2',
    version: '15.7.5',
    platform: 'iOS',
    image: iosIpadAir2,
    premium: false,
  },
  {
    id: 'ios-ipad-air-m3-15-1',
    name: 'iPad Air 3rd gen',
    version: '15.1',
    platform: 'iOS',
    image: iosIpadAir3gen,
    premium: false,
  },
  {
    id: 'ios-ipad-air-m3-18-0',
    name: 'iPad Air 3rd gen',
    version: '18.0',
    platform: 'iOS',
    image: iosIpadAir3gen,
    premium: false,
  },
  {
    id: 'ios-ipad-pro-10-5-14-4-2',
    name: 'iPad Mini 5th gen',
    version: '14.4.2',
    platform: 'iOS',
    image: iosIpadMini5th,
    premium: false,
  },
  {
    id: 'ios-ipad-pro-10-5-15-3-1',
    name: 'iPad Mini 5th gen',
    version: '15.3.1',
    platform: 'iOS',
    image: iosIpadMini5th,
    premium: false,
  },
  {
    id: 'ios-ipad-5gen-b-13-3-1',
    name: 'iPad Pro 10.5-inch 2017',
    version: '13.3.1',
    platform: 'iOS',
    image: iosIpadPro105,
    premium: false,
  },
  {
    id: 'ios-ipad-pro-11-1gen-b-15-5',
    name: 'iPad Pro 11-inch 1st gen',
    version: '15.5',
    platform: 'iOS',
    image: iosIpadPro11Gen1,
    premium: false,
  },
  {
    id: 'ios-ipad-pro-11-1gen-b-17-6-1',
    name: 'iPad Pro 12.9inch 6th Gen',
    version: '17.6.1',
    platform: 'iOS',
    image: iosIpadPro129Gen6,
    premium: false,
  },
  {
    id: 'ios-ipad-pro-129-3gen-b-17.4',
    name: 'iPad Pro 12.9-inch 3rd gen',
    version: '17.4',
    platform: 'iOS',
    image: iosIpadPro129Gen3,
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
    id: 'android-pixel-6-pro',
    name: 'Google Pixel 6 Pro',
    version: '15',
    platform: 'Android',
    image: androidPixel6Pro,
    premium: true,
  },
  {
    id: 'android-pixel-6a',
    name: 'Google Pixel 6a',
    version: '16',
    platform: 'Android',
    image: androidPixel6a,
    premium: true,
  },
  {
    id: 'android-pixel-7',
    name: 'Google Pixel 7',
    version: '16',
    platform: 'Android',
    image: androidPixel7,
    premium: true,
  },
  {
    id: 'android-pixel-7-pro',
    name: 'Google Pixel 7 Pro',
    version: '16',
    platform: 'Android',
    image: androidPixel7Pro,
    premium: true,
  },
  {
    id: 'android-pixel-8',
    name: 'Google Pixel 8',
    version: '17 beta',
    platform: 'Android',
    image: androidPixel8,
    premium: true,
  },
  {
    id: 'android-pixel-8-pro-16',
    name: 'Google Pixel 8 Pro',
    version: '16',
    platform: 'Android',
    image: androidPixel8Pro,
    premium: true,
  },
  {
    id: 'android-pixel-8-pro-14',
    name: 'Google Pixel 8 Pro',
    version: '14',
    platform: 'Android',
    image: androidPixel8Pro,
    premium: true,
  },
  {
    id: 'android-pixel-9-16',
    name: 'Google Pixel 9',
    version: '16',
    platform: 'Android',
    image: androidPixel9,
    premium: true,
  },
  {
    id: 'android-pixel-9-16-beta',
    name: 'Google Pixel 9',
    version: '16 beta',
    platform: 'Android',
    image: androidPixel9,
    premium: true,
  },
  {
    id: 'android-pixel-9-pro-14',
    name: 'Google Pixel 9 Pro',
    version: '14',
    platform: 'Android',
    image: androidPixel9Pro,
    premium: true,
  },
  {
    id: 'android-pixel-9-pro-14-2',
    name: 'Google Pixel 9 Pro',
    version: '14',
    platform: 'Android',
    image: androidPixel9Pro,
    premium: true,
  },
  {
    id: 'android-pixel-9-pro-16',
    name: 'Google Pixel 9 Pro',
    version: '16',
    platform: 'Android',
    image: androidPixel9Pro,
    premium: true,
  },
  {
    id: 'android-pixel-9-pro-xl-15',
    name: 'Google Pixel 9 Pro XL',
    version: '15',
    platform: 'Android',
    image: androidPixel9ProXl,
    premium: true,
  },
  {
    id: 'android-huawei-mate-50-pro-12',
    name: 'Huawei Mate 50 Pro',
    version: '12',
    platform: 'Android',
    image: androidHuaweiMate50Pro,
    premium: true,
  },
  {
    id: 'android-huawei-p50-pro-12',
    name: 'Huawei P50 Pro',
    version: '12',
    platform: 'Android',
    image: androidHuaweiP50Pro,
    premium: true,
  },

  {
    id: 'android-alcatel-1x-8-1',
    name: 'Alcatel 1X',
    version: '8.1.0',
    platform: 'Android',
    image: androidAlcatel1X,
    premium: false,
  },
  {
    id: 'android-google-pixel-2',
    name: 'Google Pixel 2',
    version: '8.0.0',
    platform: 'Android',
    image: androidPixel2,
    premium: false,
  },
  {
    id: 'android-google-pixel-4-xl',
    name: 'Google Pixel 4 XL',
    version: '11',
    platform: 'Android',
    image: androidPixel4XL,
    premium: false,
  },
  {
    id: 'android-google-pixel-4a',
    name: 'Google Pixel 4a',
    version: '13',
    platform: 'Android',
    image: androidPixel4a,
    premium: false,
  },
  {
    id: 'android-huawei-matepad-10-4',
    name: 'Huawei MatePad 10.4',
    version: '10',
    platform: 'Android',
    image: androidHuaweiMatePad10,
    premium: false,
  },
  {
    id: 'android-huawei-p30-pro',
    name: 'Huawei P30 Pro',
    version: '10',
    platform: 'Android',
    image: androidHuaweiP30Pro,
    premium: false,
  },
  {
    id: 'android-huawei-p40-pro',
    name: 'Huawei P40 Pro',
    version: '10',
    platform: 'Android',
    image: androidHuaweiP40Pro,
    premium: false,
  },
  {
    id: 'android-motorola-moto-g200-5g',
    name: 'Motorola Moto G200 5G',
    version: '12',
    platform: 'Android',
    image: androidMotoG200,
    premium: false,
  },
  {
    id: 'android-motorola-nexus-6',
    name: 'Motorola Nexus 6',
    version: '7.1.1',
    platform: 'Android',
    image: androidNexus6,
    premium: false,
  },
  {
    id: 'android-nokia-2-1',
    name: 'Nokia 2.1',
    version: '8.1.0',
    platform: 'Android',
    image: androidNokia2,
    premium: false,
  },
  {
    id: 'android-nokia-6-1-10',
    name: 'Nokia 6.1',
    version: '10',
    platform: 'Android',
    image: androidNokia6,
    premium: false,
  },
  {
    id: 'android-samsung-a13-13',
    name: 'Samsung Galaxy A13',
    version: '13',
    platform: 'Android',
    image: androidSamsungA13,
    premium: false,
  },
  {
    id: 'android-samsung-a32-11',
    name: 'Samsung Galaxy A32',
    version: '13',
    platform: 'Android',
    image: androidSamsungA32,
    premium: false,
  },
  {
    id: 'android-samsung-a35-15',
    name: 'Samsung Galaxy A35 5G',
    version: '15',
    platform: 'Android',
    image: androidSamsungA35b,
    premium: false,
  },

  {
    id: 'android-samsung-galaxy-a51',
    name: 'Samsung Galaxy A51',
    version: '11',
    platform: 'Android',
    image: androidSamsungA51,
    premium: false,
  },
  {
    id: 'android-samsung-galaxy-a51-13',
    name: 'Samsung Galaxy A51',
    version: '13',
    platform: 'Android',
    image: androidSamsungA51,
    premium: false,
  },
];
