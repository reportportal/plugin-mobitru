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

import { Button, RefreshIcon } from '@reportportal/ui-kit';
import classNames from 'classnames/bind';
import parse from 'html-react-parser';
import RpLogo from 'icons/logo-white.svg';
import SatelliteIllustration from 'icons/satellite.svg';
import { messages } from 'messages/cloudDevices';
import { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';

import { PageBreadcrumb, PageBreadcrumbs } from '../pageBreadcrumbs';
import { SocialLinks } from '../socialLinks';
import styles from './emptyStateMaintenance.scss';
const MAXIMAL_HEIGHT = 720;

const cx = classNames.bind(styles);

export interface EmptyStateMaintenanceProps {
  onRefreshClick: () => void;
  breadcrumbs?: PageBreadcrumb[];
  breadcrumbTree?: PageBreadcrumb[];
}

const EmptyStateMaintenance = ({
  onRefreshClick,
  breadcrumbs = [],
  breadcrumbTree = [],
}: EmptyStateMaintenanceProps): React.ReactElement => {
  const { formatMessage } = useIntl();

  useEffect(() => {
    const layoutContentElement = document.querySelector<HTMLElement>('[class*="layout__content"]');

    if (!layoutContentElement) {
      return () => {};
    }

    const handleResize = () => {
      if (window.innerHeight <= MAXIMAL_HEIGHT) {
        layoutContentElement.style.setProperty('overflow-y', 'auto', 'important');
      } else {
        layoutContentElement.style.removeProperty('overflow-y');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      layoutContentElement.style.removeProperty('overflow-y');
    };
  }, []);

  const handleRefresh = useCallback(() => {
    onRefreshClick();
  }, [onRefreshClick]);

  return (
    <div className={cx('maintenance-page')}>
      <PageBreadcrumbs breadcrumbs={breadcrumbs} breadcrumbTree={breadcrumbTree} />

      <div className={cx('logo')}>{parse(RpLogo)}</div>

      <div className={cx('moon-wrapper')}>
        <div className={cx('satellite')} aria-hidden="true">
          {parse(SatelliteIllustration)}
        </div>

        <div className={cx('content')}>
          <div className={cx('text-group')}>
            <h2 className={cx('title')}>{formatMessage(messages.maintenanceTitle)}</h2>
            <p className={cx('description')}>
              {formatMessage(messages.maintenanceDescription)}
              <br />
              {formatMessage(messages.maintenanceDescription2)}
            </p>

            <Button
              variant="primary"
              onClick={handleRefresh}
              icon={<RefreshIcon />}
              iconPlace="start"
              className={cx('refresh-btn')}
            >
              {formatMessage(messages.maintenanceButtonRefresh)}
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
