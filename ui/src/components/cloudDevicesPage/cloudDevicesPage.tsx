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

import classNames from 'classnames/bind';
import React, { useMemo, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import styles from './cloudDevicesPage.scss';
import MobitruIcon from './mobitruIcon';
import {
  buildDeviceImageUrl,
  MOCK_ANDROID_DEVICES,
  MOCK_IOS_DEVICES,
  type RawDevice,
} from './mockData';

const MOBITRU_DEVICES_URL = 'https://app.mobitru.com/#!/devices';
const MOBITRU_DOCS_URL =
  'https://reportportal.io/docs/integrations/infrastructure-providers/Mobitru';

type Platform = 'ios' | 'android';

interface Device {
  id: string;
  name: string;
  version: string;
  imageUrl: string;
}

interface DevicesData {
  premium: Device[];
  available: Device[];
}

const messages = defineMessages({
  pageTitle: { id: 'Mobitru.CloudDevices.pageTitle', defaultMessage: 'Cloud Devices' },
  exploreDevices: { id: 'Mobitru.CloudDevices.exploreDevices', defaultMessage: 'Explore Devices' },
  tabIos: { id: 'Mobitru.CloudDevices.tabIos', defaultMessage: 'iOS' },
  tabAndroid: { id: 'Mobitru.CloudDevices.tabAndroid', defaultMessage: 'Android' },
  premiumDevices: {
    id: 'Mobitru.CloudDevices.premiumDevices',
    defaultMessage: 'Premium devices',
  },
  availableDevices: {
    id: 'Mobitru.CloudDevices.availableDevices',
    defaultMessage: 'Available devices',
  },
  noDevices: { id: 'Mobitru.CloudDevices.noDevices', defaultMessage: 'No devices found.' },
  documentation: { id: 'Mobitru.CloudDevices.documentation', defaultMessage: 'Documentation' },
  poweredByMobitru: {
    id: 'Mobitru.CloudDevices.poweredByMobitru',
    defaultMessage: 'Powered by',
  },
});

const cx = classNames.bind(styles);

const PLATFORMS: { key: Platform; messageKey: keyof typeof messages }[] = [
  { key: 'ios', messageKey: 'tabIos' },
  { key: 'android', messageKey: 'tabAndroid' },
];

const openInNewTab = () => window.open(MOBITRU_DEVICES_URL, '_blank', 'noopener,noreferrer');

const mapToDevice = (raw: RawDevice): Device => ({
  id: raw.id,
  name: raw.name,
  version: `${raw.platform} ${raw.version}`,
  imageUrl: buildDeviceImageUrl(raw.image),
});

const groupRawDevices = (devices: RawDevice[]): DevicesData => ({
  premium: devices.filter((d) => d.premium).map(mapToDevice),
  available: devices.filter((d) => !d.premium).map(mapToDevice),
});

const ExploreExternalLinkIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.09961 3C7.32052 3 7.5 3.17948 7.5 3.40039V3.59961C7.5 3.82052 7.32052 4 7.09961 4H3.33105C2.55875 4 2.00019 4.43856 2 5.15137V11.8486C2.00019 12.5614 2.55874 13 3.33105 13H10C10.7724 13 11 12.713 11 12V8.40039C11 8.17948 11.1795 8 11.4004 8H11.5996C11.8205 8 12 8.17948 12 8.40039V12C12 13 11.3311 14 10 14H3.33105C2.00014 14 1.00021 13.0002 1 11.8486V5.15137C1.00022 3.99978 2.00015 3 3.33105 3H7.09961ZM13.5 1C13.7761 1 14 1.22386 14 1.5V5.5C14 5.77614 13.7761 6 13.5 6C13.2239 6 13 5.77614 13 5.5V2.70703L8.35352 7.35352C8.15825 7.54878 7.84175 7.54878 7.64648 7.35352C7.45122 7.15825 7.45122 6.84175 7.64648 6.64648L12.293 2H9.5C9.22386 2 9 1.77614 9 1.5C9 1.22386 9.22386 1 9.5 1H13.5Z"
      fill="white"
    />
  </svg>
);

const DeviceCardExternalLinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 2C10 1.72386 10.2239 1.5 10.5 1.5H14.5C14.7761 1.5 15 1.72386 15 2V5.99999C15 6.27613 14.7761 6.49999 14.5 6.49999C14.2239 6.49999 14 6.27613 14 5.99999V3.20711L9.35355 7.85355C9.15829 8.04882 8.84171 8.04882 8.64645 7.85355C8.45118 7.65829 8.45118 7.34171 8.64645 7.14645L13.2929 2.5H10.5C10.2239 2.5 10 2.27614 10 2ZM4.33105 4.5C3.55861 4.5 3 4.93872 3 5.65174V12.3483C3 13.0613 3.55861 13.5 4.33105 13.5H11C11.7724 13.5 12 13.213 12 12.5V8.90001C12 8.6791 12.1791 8.50001 12.4 8.50001H12.6C12.8209 8.50001 13 8.6791 13 8.90001V12.5C13 13.5 12.3311 14.5 11 14.5H4.33105C3 14.5 2 13.5 2 12.3483L2 5.65174C2 4.5 3 3.5 4.33105 3.5H8.1C8.32091 3.5 8.5 3.67909 8.5 3.9V4.1C8.5 4.32091 8.32091 4.5 8.1 4.5H4.33105Z"
      fill="#A2AAB5"
    />
  </svg>
);

interface DeviceCardProps {
  device: Device;
}

const DeviceCard = ({ device }: DeviceCardProps) => (
  <button className={cx('device-card')} onClick={openInNewTab} type="button">
    <div className={cx('device-info')}>
      <div className={cx('device-name-row')}>
        <span className={cx('device-name')}>{device.name}</span>
        <span className={cx('external-link-icon')} aria-hidden="true">
          <DeviceCardExternalLinkIcon />
        </span>
      </div>
      <span className={cx('device-version')}>{device.version}</span>
    </div>
    <img className={cx('device-image')} src={device.imageUrl} alt={device.name} />
  </button>
);

interface DeviceGroupProps {
  title: string;
  devices: Device[];
}

const DeviceGroup = ({ title, devices }: DeviceGroupProps) => {
  if (devices.length === 0) return null;
  return (
    <section className={cx('device-group')}>
      <div className={cx('group-header')}>
        <h2 className={cx('group-title')}>{title}</h2>
      </div>
      <div className={cx('devices-grid')}>
        {devices.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </div>
    </section>
  );
};

const CloudDevicesPage = () => {
  const { formatMessage } = useIntl();
  const [activePlatform, setActivePlatform] = useState<Platform>('ios');

  const currentDevices = useMemo(
    () => groupRawDevices(activePlatform === 'ios' ? MOCK_IOS_DEVICES : MOCK_ANDROID_DEVICES),
    [activePlatform]
  );

  const hasDevices = currentDevices.premium.length > 0 || currentDevices.available.length > 0;

  return (
    <div className={cx('page')}>
      <div className={cx('header')}>
        <h1 className={cx('title')}>{formatMessage(messages.pageTitle)}</h1>
        <div className={cx('tabs')} role="tablist">
          {PLATFORMS.map(({ key, messageKey }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={activePlatform === key}
              className={cx('tab', { 'tab-active': activePlatform === key })}
              onClick={() => setActivePlatform(key)}
            >
              {formatMessage(messages[messageKey])}
            </button>
          ))}
        </div>
        <button type="button" className={cx('explore-button')} onClick={openInNewTab}>
          <span>
            <span className={cx('explore-button-text')}>
              {formatMessage(messages.exploreDevices)}
            </span>
            <ExploreExternalLinkIcon />
          </span>
        </button>
      </div>

      <div className={cx('content')}>
        {!hasDevices && (
          <div className={cx('empty-state')}>
            <p className={cx('empty-message')}>{formatMessage(messages.noDevices)}</p>
            <a
              className={cx('docs-link')}
              href={MOBITRU_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {formatMessage(messages.documentation)}
            </a>
          </div>
        )}

        {hasDevices && (
          <>
            <DeviceGroup
              title={formatMessage(messages.premiumDevices)}
              devices={currentDevices.premium}
            />
            <DeviceGroup
              title={formatMessage(messages.availableDevices)}
              devices={currentDevices.available}
            />
            <p className={cx('powered-by')}>
              <span className={cx('powered-by-text')}>
                {formatMessage(messages.poweredByMobitru)}
              </span>
              <MobitruIcon className={cx('powered-by-icon')} />
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CloudDevicesPage;
