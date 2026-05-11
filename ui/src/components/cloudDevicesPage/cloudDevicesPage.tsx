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
import { useIntl } from 'react-intl';
import {
  Device,
  DeviceCardProps,
  DeviceGroupProps,
  DevicesData,
  Platform,
} from 'types/cloudDevices';

import { MOBITRU_DEVICES_URL, MOBITRU_DOCS_URL, PLATFORMS } from '../../constants/cloudDevices';
import { messages } from '../../messages/cloudDevices';
import styles from './cloudDevicesPage.scss';
import { DeviceCardExternalLinkIcon } from './DeviceCardExternalLinkIcon';
import { ExploreExternalLinkIcon } from './ExploreExternalLinkIcon';
import MobitruIcon from './mobitruIcon';
import { MOCK_ANDROID_DEVICES, MOCK_IOS_DEVICES, type RawDevice } from './mockData';

const cx = classNames.bind(styles);

const openInNewTab = () => window.open(MOBITRU_DEVICES_URL, '_blank', 'noopener,noreferrer');

const mapToDevice = (raw: RawDevice): Device => ({
  id: raw.id,
  name: raw.name,
  version: `${raw.platform} ${raw.version}`,
  imageUrl: raw.image,
});

const groupRawDevices = (devices: RawDevice[]): DevicesData => ({
  premium: devices.filter((d) => d.premium).map(mapToDevice),
  available: devices.filter((d) => !d.premium).map(mapToDevice),
});

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
