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

import { BubblesLoader, SegmentedControl, SystemMessage } from '@reportportal/ui-kit';
import classNames from 'classnames/bind';
import { MobitruVideoLog } from 'hooks/useMobitruVideos';
import React, { useMemo } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import styles from '../remoteDeviceTab.scss';
import { VideoListItem } from './videoListItem';

const cx = classNames.bind(styles);

const messages = defineMessages({
  videosSubTab: {
    id: 'LogTab.videosSubTab',
    defaultMessage: 'Videos',
  },
  deviceLogsSubTab: {
    id: 'LogTab.deviceLogsSubTab',
    defaultMessage: 'Device Logs',
  },
  metadataSubTab: {
    id: 'LogTab.metadataSubTab',
    defaultMessage: 'Metadata',
  },
  subTabsAriaLabel: {
    id: 'LogTab.subTabsAriaLabel',
    defaultMessage: 'Remote device sub-tabs',
  },
  empty: {
    id: 'LogTab.empty',
    defaultMessage: 'No Mobitru video evidence is available for this test item.',
  },
  listLoadError: {
    id: 'LogTab.videosListLoadError',
    defaultMessage: 'Video list could not be loaded',
  },
});

interface VideosPanelProps {
  videos: MobitruVideoLog[];
  loading: boolean;
  listError: string;
  selectedLogId: number | null;
  onActivate: (logId: number) => void;
  onJumpToLog?: (logId: number, itemId: number) => void;
}

const VideosPanel = ({
  videos,
  loading,
  listError,
  selectedLogId,
  onActivate,
  onJumpToLog = undefined,
}: VideosPanelProps) => {
  const { formatMessage } = useIntl();
  const videosSubTabOptions = useMemo(
    () => [
      { value: 'videos', label: formatMessage(messages.videosSubTab), selected: true },
      {
        value: 'deviceLogs',
        label: formatMessage(messages.deviceLogsSubTab),
        disabled: true,
      },
      {
        value: 'metadata',
        label: formatMessage(messages.metadataSubTab),
        disabled: true,
      },
    ],
    [formatMessage]
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className={cx('video-list-loader')}>
          <BubblesLoader />
        </div>
      );
    }

    if (listError) {
      return (
        <div className={cx('video-list-empty')}>
          <SystemMessage mode="error" caption={formatMessage(messages.listLoadError)} />
        </div>
      );
    }

    if (!videos.length) {
      return (
        <div className={cx('video-list-empty')}>
          <SystemMessage mode="info" caption={formatMessage(messages.empty)} />
        </div>
      );
    }

    return (
      <div className={cx('video-list')}>
        {videos.map((video) => (
          <VideoListItem
            key={video.id}
            video={video}
            isSelected={video.id === selectedLogId}
            onActivate={onActivate}
            onJumpToLog={onJumpToLog}
          />
        ))}
      </div>
    );
  };

  return (
    <section className={cx('videos-panel')} aria-label={formatMessage(messages.videosSubTab)}>
      <div className={cx('videos-toolbar')}>
        <SegmentedControl
          className={cx('videos-segment')}
          options={videosSubTabOptions}
          fullWidth
          ariaLabel={formatMessage(messages.subTabsAriaLabel)}
        />
      </div>
      <div className={cx('videos-panel-content')}>{renderContent()}</div>
    </section>
  );
};

export { VideosPanel };
