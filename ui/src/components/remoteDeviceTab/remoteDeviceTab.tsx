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
import { RpAttribute } from 'extensionProps/common';
import { ExtensionPropsContext } from 'hooks/useExtensionProps';
import { useMobitruVideos } from 'hooks/useMobitruVideos';
import React, { useCallback, useEffect, useState } from 'react';
import type { ExtensionProps } from 'types/extensionProps';

import styles from './remoteDeviceTab.scss';
import { VideoPreview } from './videoPreview/videoPreview';
import { VideosPanel } from './videosPanel/videosPanel';

const cx = classNames.bind(styles);

interface ActiveRetry {
  id: number;
  path: string;
}

interface LogTabProps {
  logItem: { id: number; attributes?: RpAttribute[] };
  activeRetry: ActiveRetry;
  excludedRetryParentId?: number;
  onJumpToLog?: (logId: number, itemId: number) => void;
}

const RemoteDeviceTabInner = ({
  logItem,
  activeRetry,
  excludedRetryParentId = undefined,
  onJumpToLog = undefined,
}: LogTabProps) => {
  const [selectedLogId, setSelectedLogId] = useState<number | null>(null);
  const [shouldAutoplay, setShouldAutoplay] = useState(false);

  const { videos, listLoading, listError, videoSrc, videoLoading, videoError } = useMobitruVideos({
    activeRetryPath: activeRetry.path,
    excludedRetryParentId,
    selectedLogId,
  });

  useEffect(() => {
    setSelectedLogId(null);
    setShouldAutoplay(false);
  }, [activeRetry.id, logItem.id]);

  useEffect(() => {
    if (!listLoading && videos.length && selectedLogId === null) {
      setSelectedLogId(videos[0].id);
      setShouldAutoplay(false);
    }
  }, [listLoading, selectedLogId, videos]);

  const handleActivateVideo = useCallback((logId: number) => {
    setSelectedLogId(logId);
    setShouldAutoplay(true);
  }, []);

  const handleAutoplayHandled = useCallback(() => {
    setShouldAutoplay(false);
  }, []);

  const playerScopeId = `${logItem.id}-${activeRetry.id}`;

  return (
    <div className={cx('root')}>
      <div className={cx('columns')}>
        <VideosPanel
          videos={videos}
          loading={listLoading}
          listError={listError}
          selectedLogId={selectedLogId}
          onActivate={handleActivateVideo}
          onJumpToLog={onJumpToLog}
        />
        <VideoPreview
          key={playerScopeId}
          videoSrc={videoSrc}
          loading={videoLoading}
          error={videoError}
          hasSelection={selectedLogId !== null}
          selectedLogId={selectedLogId}
          shouldAutoplay={shouldAutoplay}
          onAutoplayHandled={handleAutoplayHandled}
        />
      </div>
    </div>
  );
};

const RemoteDeviceTab = ({
  logItem,
  activeRetry,
  excludedRetryParentId = undefined,
  onJumpToLog = undefined,
  ...extensionProps
}: ExtensionProps & LogTabProps) => (
  <ExtensionPropsContext.Provider value={extensionProps}>
    <RemoteDeviceTabInner
      logItem={logItem}
      activeRetry={activeRetry}
      excludedRetryParentId={excludedRetryParentId}
      onJumpToLog={onJumpToLog}
    />
  </ExtensionPropsContext.Provider>
);

export { RemoteDeviceTab };
