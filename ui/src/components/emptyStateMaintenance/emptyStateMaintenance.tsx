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
/*
 * Copyright 2026 EPAM Systems
 * ...
 */

import { Button, RefreshIcon } from '@reportportal/ui-kit';
import classNames from 'classnames/bind';
import parse from 'html-react-parser';
import RpLogo from 'icons/logo-white.svg';
import SatelliteIllustration from 'icons/satellite.svg';
import { messages } from 'messages/cloudDevices';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

import { SocialLinks } from '../socialLinks';
import styles from './emptyStateMaintenance.scss';

const cx = classNames.bind(styles);

export interface EmptyStateMaintenanceProps {
  onRefreshClick: () => void;
}

const EmptyStateMaintenance = ({
  onRefreshClick,
}: EmptyStateMaintenanceProps): React.ReactElement => {
  const intl = useIntl();

  const handleRefresh = useCallback(() => {
    onRefreshClick();
  }, [onRefreshClick]);

  return (
    <div className={cx('maintenance-page')}>
      {/* Логотип теперь вынесен выше луны, в космическую зону */}
      <div className={cx('logo')}>{parse(RpLogo)}</div>

      {/* Большой круг (Луна) */}
      <div className={cx('moon-wrapper')}>
        {/* Спутник внутри луны, жестко контролируется по размеру */}
        <div className={cx('satellite')} aria-hidden="true">
          {parse(SatelliteIllustration)}
        </div>

        {/* Основной контент внутри луны */}
        <div className={cx('content')}>
          <div className={cx('text-group')}>
            <h2 className={cx('title')}>{intl.formatMessage(messages.maintenanceTitle)}</h2>
            <p className={cx('description')}>
              {intl.formatMessage(messages.maintenanceDescription)}
            </p>

            <Button
              variant="primary"
              onClick={handleRefresh}
              icon={<RefreshIcon />}
              iconPlace="start"
              className={cx('refresh-btn')}
            >
              {intl.formatMessage(messages.maintenanceButtonRefresh)}
            </Button>
          </div>

          <div className={cx('social-section')}>
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyStateMaintenance;
