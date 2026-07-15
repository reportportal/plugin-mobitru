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

import { Button, ExternalLinkIcon } from '@reportportal/ui-kit';
import classNames from 'classnames/bind';
import parse from 'html-react-parser';
import ZeroFormIcon from 'icons/zero-form.svg';
import { messages } from 'messages/cloudDevices';
import { useIntl } from 'react-intl';

import { PageBreadcrumb, PageBreadcrumbs } from '../pageBreadcrumbs';
import styles from './emptyStateNoIntegration.scss';

const cx = classNames.bind(styles);

export interface EmptyStateNoIntegrationProps {
  onSettingsClick: () => void;
  onDocsClick: () => void;
  canUpdateSettings?: boolean;
  breadcrumbs?: PageBreadcrumb[];
  breadcrumbTree?: PageBreadcrumb[];
}

const EmptyStateNoIntegration = ({
  onSettingsClick,
  onDocsClick,
  canUpdateSettings = false,
  breadcrumbs = [],
  breadcrumbTree = [],
}: EmptyStateNoIntegrationProps): React.ReactElement => {
  const { formatMessage } = useIntl();

  return (
    <div className={cx('container')}>
      <PageBreadcrumbs breadcrumbs={breadcrumbs} breadcrumbTree={breadcrumbTree} />

      <div className={cx('content')}>
        {parse(ZeroFormIcon)}

        <h2 className={cx('title')}>{formatMessage(messages.noIntegrationTitle)}</h2>

        <p className={cx('description')}>
          {formatMessage(messages.noIntegrationDescription)}
          {canUpdateSettings && (
            <>
              <br />
              {formatMessage(messages.noIntegrationDescriptionContinue)}
            </>
          )}
        </p>

        <div className={cx('actions')}>
          {canUpdateSettings && (
            <Button variant="primary" onClick={onSettingsClick}>
              {formatMessage(messages.noIntegrationButtonSettings)}
            </Button>
          )}

          <Button
            variant="text"
            icon={<ExternalLinkIcon />}
            iconPlace="end"
            onClick={onDocsClick}
            className={cx('docs')}
          >
            {formatMessage(messages.noIntegrationButtonDocs)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyStateNoIntegration;
