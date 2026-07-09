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

import { Breadcrumbs } from '@reportportal/ui-kit';
import classNames from 'classnames/bind';
import { useExtensionProps } from 'hooks/useExtensionProps';
import { useMemo } from 'react';

import styles from './pageBreadcrumbs.scss';

const cx = classNames.bind(styles);

interface RouteLink {
  type: string;
  payload?: Record<string, string>;
}

export interface PageBreadcrumb {
  title: string;
  link?: RouteLink;
  children?: PageBreadcrumb[];
}

export interface PageBreadcrumbsProps {
  breadcrumbs?: PageBreadcrumb[];
  breadcrumbTree?: PageBreadcrumb[];
}

type BreadcrumbLinkComponent = React.ComponentType<{
  to: object | string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}>;

export const PageBreadcrumbs = ({
  breadcrumbs = [],
  breadcrumbTree = [],
}: PageBreadcrumbsProps): React.ReactElement | null => {
  const { components } = useExtensionProps();

  const LinkComponent = components?.Link as BreadcrumbLinkComponent | undefined;

  const isLastClickable = Boolean(breadcrumbs[breadcrumbs.length - 1]?.link);
  const isSingleItemClickable = Boolean(breadcrumbTree.length && isLastClickable);
  const shouldShowBreadcrumbs = breadcrumbs.length > 0 || breadcrumbTree.length > 0;

  const breadcrumbDescriptors = useMemo(
    () => breadcrumbs as Parameters<typeof Breadcrumbs>[0]['descriptors'],
    [breadcrumbs]
  );

  const breadcrumbTreeDescriptors = useMemo(
    () => breadcrumbTree as Parameters<typeof Breadcrumbs>[0]['tree'],
    [breadcrumbTree]
  );

  if (!shouldShowBreadcrumbs || !LinkComponent) {
    return null;
  }

  return (
    <div className={cx('breadcrumbs-bar')}>
      <Breadcrumbs
        descriptors={breadcrumbDescriptors}
        tree={breadcrumbTreeDescriptors}
        LinkComponent={LinkComponent}
        className={cx('breadcrumbs')}
        isLastClickable={isLastClickable}
        isSingleItemClickable={isSingleItemClickable}
      />
    </div>
  );
};
