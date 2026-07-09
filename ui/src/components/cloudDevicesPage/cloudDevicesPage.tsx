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

import { BubblesLoader, Button, ExternalLinkIcon, SegmentedControl } from '@reportportal/ui-kit';
import classNames from 'classnames/bind';
import { MOBITRU_DEVICES_URL, MOBITRU_DOCS_URL, PLATFORMS } from 'constants/cloudDevices';
import { PLUGIN_NAME } from 'constants/common';
import { CLOUD_DEVICE_PAGE_EVENTS, getPlatformTabClickEvent } from 'events/cloudDevicePageEvents';
import { ExtensionPropsContext, useExtensionProps } from 'hooks/useExtensionProps';
import { useIntegrationCheck } from 'hooks/useIntegrationCheck';
import { messages } from 'messages/cloudDevices';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useTracking } from 'react-tracking';
import {
  Device,
  DeviceCardProps,
  DeviceGroupProps,
  DevicesData,
  Platform,
} from 'types/cloudDevices';
import type { ExtensionProps } from 'types/extensionProps';

import { EmptyStateMaintenance } from '../emptyStateMaintenance';
import { EmptyStateNoIntegration } from '../emptyStateNoIntegration';
import styles from './cloudDevicesPage.scss';
import MobitruIcon from './mobitruIcon';
import { MOCK_ANDROID_DEVICES, MOCK_IOS_DEVICES, type RawDevice } from './mockData';

const cx = classNames.bind(styles);

interface RouteLink {
  type: string;
  payload?: Record<string, string>;
}

interface LocationBreadcrumb {
  title: string;
  link?: RouteLink;
  children?: LocationBreadcrumb[];
}

interface LocationHeaderLayoutProps {
  title: string;
  children?: React.ReactNode;
  breadcrumbs?: LocationBreadcrumb[];
  tree?: LocationBreadcrumb[];
  className?: string;
  titleEllipsis?: boolean;
}

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

const DeviceCard = ({ device }: DeviceCardProps) => {
  const { trackEvent } = useTracking();

  return (
    <button
      className={cx('device-card')}
      onClick={() => {
        trackEvent(CLOUD_DEVICE_PAGE_EVENTS.DEVICE_NAME_CLICK);
        openInNewTab();
      }}
      type="button"
    >
      <div className={cx('device-info')}>
        <div className={cx('device-name-row')}>
          <span className={cx('device-name')}>{device.name}</span>
          <span className={cx('external-link-icon')} aria-hidden="true">
            <ExternalLinkIcon />
          </span>
        </div>
        <span className={cx('device-version')}>{device.version}</span>
      </div>
      <img className={cx('device-image')} src={device.imageUrl} alt={device.name} />
    </button>
  );
};

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

const CloudDevicesPageInner = () => {
  const { formatMessage } = useIntl();
  const { components, selectors, constants, lib, utils } = useExtensionProps();
  const reduxSelect = lib?.useSelector as <R>(fn: (state: unknown) => R) => R | undefined;
  const dispatch = useDispatch();

  const [activePlatform, setActivePlatform] = useState<Platform>('ios');
  const [serviceState, setServiceState] = useState<'loading' | 'ok' | 'error'>('loading');
  const [refreshKey, setRefreshKey] = useState(0);

  const projectName =
    reduxSelect?.((selectors?.projectNameSelector ?? (() => '')) as (state: unknown) => string) ??
    '';
  const organizationName =
    reduxSelect?.(
      (selectors?.activeOrganizationNameSelector ?? (() => '')) as (state: unknown) => string
    ) ?? '';
  const organizationSlug =
    reduxSelect?.(
      (selectors?.urlOrganizationSlugSelector ?? (() => '')) as (state: unknown) => string
    ) ?? '';
  const projectSlug =
    reduxSelect?.(
      (selectors?.urlProjectSlugSelector ?? (() => '')) as (state: unknown) => string
    ) ?? '';

  const { isIntegrated, integrationId } = useIntegrationCheck({
    projectIntegrationsSelector: selectors.projectIntegrationsSelector,
    organizationIntegrationsSelector: selectors.organizationIntegrationsSelector,
    globalIntegrationsSelector: selectors.globalIntegrationsSelector,
  });
  const projectInfo =
    reduxSelect?.(
      (selectors?.projectInfoSelector ?? (() => ({}))) as (state: unknown) => {
        projectId?: number;
      }
    ) ?? {};
  const activeOrganization = reduxSelect?.(
    (selectors?.activeOrganizationSelector ?? (() => undefined)) as (
      state: unknown
    ) => { id?: number } | undefined
  );
  const { trackEvent } = useTracking();
  const pageViewTracked = useRef(false);

  useEffect(() => {
    if (pageViewTracked.current) return;

    if (!isIntegrated) {
      trackEvent(CLOUD_DEVICE_PAGE_EVENTS.EMPTY_STATE_PAGE_VIEW);
      pageViewTracked.current = true;
    } else if (serviceState === 'ok') {
      trackEvent(CLOUD_DEVICE_PAGE_EVENTS.PAGE_VIEW);
      pageViewTracked.current = true;
    }
  }, [isIntegrated, serviceState, trackEvent]);

  useEffect(() => {
    if (!isIntegrated) {
      return undefined;
    }
    if (integrationId == null || projectInfo.projectId == null) {
      setServiceState('error');
      return undefined;
    }
    let cancelled = false;
    setServiceState('loading');
    utils
      .fetch(utils.URLS.pluginsCommandsCommon(PLUGIN_NAME, 'getDevices'), {
        method: 'POST',
        data: {
          context: {
            integration_id: integrationId,
            project_id: projectInfo.projectId,
            ...(activeOrganization?.id != null ? { org_id: activeOrganization.id } : {}),
          },
          arguments: { platform: 'ios' },
        },
      })
      .then(() => {
        if (!cancelled) setServiceState('ok');
      })
      .catch(() => {
        if (!cancelled) setServiceState('error');
      });
    return () => {
      cancelled = true;
    };
  }, [
    activeOrganization?.id,
    integrationId,
    isIntegrated,
    projectInfo.projectId,
    refreshKey,
    utils,
  ]);

  const handleRefresh = useCallback(() => setRefreshKey((k) => k + 1), []);
  const handleOpenSettings = useCallback(() => {
    trackEvent(CLOUD_DEVICE_PAGE_EVENTS.EMPTY_STATE_OPEN_SETTINGS_CLICK);
    if (organizationSlug && projectSlug && dispatch) {
      const PROJECT_SETTINGS_TAB_PAGE = String(constants?.PROJECT_SETTINGS_TAB_PAGE ?? '');
      dispatch({
        type: PROJECT_SETTINGS_TAB_PAGE,
        payload: { organizationSlug, projectSlug, settingsTab: 'integrations' },
        query: { subPage: PLUGIN_NAME },
      });
    }
  }, [organizationSlug, projectSlug, dispatch, constants?.PROJECT_SETTINGS_TAB_PAGE, trackEvent]);
  const handleOpenDocs = useCallback(() => {
    trackEvent(CLOUD_DEVICE_PAGE_EVENTS.EMPTY_STATE_DOCS_LINK_CLICK);
    window.open(MOBITRU_DOCS_URL, '_blank', 'noopener,noreferrer');
  }, [trackEvent]);
  const handleExploreDevices = useCallback(() => {
    trackEvent(CLOUD_DEVICE_PAGE_EVENTS.EXPLORE_DEVICES_CLICK);
    window.open(MOBITRU_DEVICES_URL, '_blank', 'noopener,noreferrer');
  }, [trackEvent]);

  const platformSegmentOptions = useMemo(
    () =>
      PLATFORMS.map(({ key, messageKey }) => ({
        value: key,
        label: formatMessage(messages[messageKey]),
        selected: activePlatform === key,
      })),
    [activePlatform, formatMessage]
  );

  const routeCrumbData = useMemo(() => {
    const ORGANIZATIONS_PAGE = String(constants?.ORGANIZATIONS_PAGE ?? '');
    const ORGANIZATION_PROJECTS_PAGE = String(constants?.ORGANIZATION_PROJECTS_PAGE ?? '');

    const rootCrumb: LocationBreadcrumb = {
      title: formatMessage(messages?.allOrganizations),
      link: { type: ORGANIZATIONS_PAGE },
      children: [],
    };
    let lastCrumb: LocationBreadcrumb;

    if (organizationSlug) {
      const organizationCrumb: LocationBreadcrumb = {
        title: organizationName ?? '',
        ...(projectSlug
          ? { link: { type: ORGANIZATION_PROJECTS_PAGE, payload: { organizationSlug } } }
          : {}),
        children: [],
      };
      rootCrumb.children = [organizationCrumb];
      lastCrumb = organizationCrumb;

      if (projectSlug) {
        const projectCrumb: LocationBreadcrumb = {
          title: projectName ?? '',
        };
        organizationCrumb.children = [projectCrumb];
        lastCrumb = projectCrumb;
      }
    } else {
      lastCrumb = { title: rootCrumb.title };
      rootCrumb.link = undefined;
    }

    return { rootCrumb, lastCrumb };
  }, [
    constants?.ORGANIZATIONS_PAGE,
    constants?.ORGANIZATION_PROJECTS_PAGE,
    formatMessage,
    organizationName,
    organizationSlug,
    projectName,
    projectSlug,
  ]);

  const currentDevices = useMemo(
    () => groupRawDevices(activePlatform === 'ios' ? MOCK_IOS_DEVICES : MOCK_ANDROID_DEVICES),
    [activePlatform]
  );

  const hasDevices = currentDevices.premium.length > 0 || currentDevices.available.length > 0;

  const LocationHeaderLayout = components?.LocationHeaderLayout as
    | React.FC<LocationHeaderLayoutProps>
    | undefined;

  const pageTitle = formatMessage(messages.pageTitle);

  const renderPageHeader = (children?: React.ReactNode) => {
    if (LocationHeaderLayout) {
      return (
        <div className={cx('header')}>
          <LocationHeaderLayout
            title={pageTitle}
            className={cx('location-header')}
            titleEllipsis={false}
            breadcrumbs={[routeCrumbData.lastCrumb]}
            tree={[routeCrumbData.rootCrumb]}
          >
            {children}
          </LocationHeaderLayout>
        </div>
      );
    }

    return (
      <div className={cx('header-fallback')}>
        {children ?? <h1 className={cx('page-title')}>{pageTitle}</h1>}
      </div>
    );
  };

  const pageBreadcrumbProps = {
    breadcrumbs: [routeCrumbData.lastCrumb],
    breadcrumbTree: [routeCrumbData.rootCrumb],
  };

  if (!isIntegrated) {
    return (
      <EmptyStateNoIntegration
        onSettingsClick={handleOpenSettings}
        onDocsClick={handleOpenDocs}
        {...pageBreadcrumbProps}
      />
    );
  }

  if (serviceState === 'loading') {
    return (
      <div className={cx('page')}>
        <BubblesLoader />
      </div>
    );
  }

  if (serviceState === 'error') {
    return <EmptyStateMaintenance onRefreshClick={handleRefresh} {...pageBreadcrumbProps} />;
  }

  const renderPlatformToolbar = (startContent?: React.ReactNode) => (
    <div className={cx('header-toolbar')}>
      <div className={cx('header-toolbar-start')}>{startContent}</div>
      <SegmentedControl
        className={cx('platform-segment')}
        options={platformSegmentOptions}
        onChange={(value) => {
          const platform = String(value) as Platform;
          trackEvent(getPlatformTabClickEvent(platform));
          setActivePlatform(platform);
        }}
        ariaLabel={formatMessage(messages.platformFilterAriaLabel)}
      />
      <div className={cx('header-toolbar-end')}>
        <Button
          type="button"
          variant="primary"
          className={cx('explore-button')}
          icon={<ExternalLinkIcon />}
          iconPlace="end"
          onClick={handleExploreDevices}
        >
          {formatMessage(messages.exploreDevices)}
        </Button>
      </div>
    </div>
  );

  return (
    <div className={cx('page')}>
      {renderPageHeader(renderPlatformToolbar())}

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

const CloudDevicesPage = (props: ExtensionProps) => (
  <ExtensionPropsContext.Provider value={props}>
    <CloudDevicesPageInner />
  </ExtensionPropsContext.Provider>
);

export default CloudDevicesPage;
