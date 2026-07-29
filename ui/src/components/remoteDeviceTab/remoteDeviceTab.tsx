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
import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { ExtensionProps } from 'types/extensionProps';

import styles from './remoteDeviceTab.scss';
import { PlaybackAction, VideoPreview } from './videoPreview/videoPreview';
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

const MIN_PANEL_WIDTH = 300;
const SPLITTER_WIDTH = 8;

const RemoteDeviceTabInner = ({
  logItem,
  activeRetry,
  excludedRetryParentId = undefined,
  onJumpToLog = undefined,
}: LogTabProps) => {
  const [selectedLogId, setSelectedLogId] = useState<number | null>(null);
  const [shouldAutoplay, setShouldAutoplay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackAction, setPlaybackAction] = useState<PlaybackAction | null>(null);
  const playbackActionIdRef = useRef(0);
  const playFromVideoTableRef = useRef(false);

  const columnsRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const [leftWidthPx, setLeftWidthPx] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartWidth = useRef(0);

  const { videos, listLoading, listError, videoSrc, videoLoading, videoError } = useMobitruVideos({
    activeRetryPath: activeRetry.path,
    excludedRetryParentId,
    selectedLogId,
  });

  useEffect(() => {
    setSelectedLogId(null);
    setShouldAutoplay(false);
    setIsPlaying(false);
    setPlaybackAction(null);
    playFromVideoTableRef.current = false;
  }, [activeRetry.id, logItem.id]);

  useEffect(() => {
    if (!listLoading && videos.length && selectedLogId === null) {
      setSelectedLogId(videos[0].id);
      setShouldAutoplay(false);
      setIsPlaying(false);
    }
  }, [listLoading, selectedLogId, videos]);

  useEffect(() => {
    setPlaybackAction(null);
  }, [selectedLogId]);

  const handleActivateVideo = useCallback((logId: number) => {
    playFromVideoTableRef.current = true;
    setSelectedLogId(logId);
    setShouldAutoplay(true);
    setIsPlaying(true);
  }, []);

  const handleAutoplayHandled = useCallback(() => {
    setShouldAutoplay(false);
  }, []);

  const handlePlayingChange = useCallback((playing: boolean) => {
    setIsPlaying(playing);
  }, []);

  const handleTogglePlayback = useCallback(() => {
    playbackActionIdRef.current += 1;
    const shouldPause = isPlaying || shouldAutoplay;

    if (shouldPause) {
      setShouldAutoplay(false);
      setIsPlaying(false);
    } else {
      playFromVideoTableRef.current = true;
      setIsPlaying(true);
    }

    setPlaybackAction({
      type: shouldPause ? 'pause' : 'play',
      id: playbackActionIdRef.current,
    });
  }, [isPlaying, shouldAutoplay]);

  const handlePlaybackActionHandled = useCallback(() => {
    setPlaybackAction(null);
  }, []);

  const consumePlayFromVideoTable = useCallback(() => {
    const fromVideoTable = playFromVideoTableRef.current;
    playFromVideoTableRef.current = false;
    return fromVideoTable;
  }, []);

  const clearPlayFromVideoTable = useCallback(() => {
    playFromVideoTableRef.current = false;
  }, []);

  useEffect(() => {
    const container = columnsRef.current;
    if (!container) return undefined;
    const observer = new ResizeObserver(() => {
      setLeftWidthPx((prev) => {
        if (prev === null) return null;
        const maxLeft = container.offsetWidth - SPLITTER_WIDTH - MIN_PANEL_WIDTH;
        return Math.max(MIN_PANEL_WIDTH, Math.min(maxLeft, prev));
      });
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const handleSplitterPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const container = columnsRef.current;
    if (!container) return;
    e.preventDefault();
    dragStartX.current = e.clientX;
    dragStartWidth.current = leftPanelRef.current?.offsetWidth ?? container.offsetWidth * 0.41;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const handleSplitterPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    const container = columnsRef.current;
    if (!container) return;
    const maxLeft = container.offsetWidth - SPLITTER_WIDTH - MIN_PANEL_WIDTH;
    const delta = e.clientX - dragStartX.current;
    const newWidth = Math.max(MIN_PANEL_WIDTH, Math.min(maxLeft, dragStartWidth.current + delta));
    setLeftWidthPx(newWidth);
  }, []);

  const handleSplitterPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
  }, []);

  const handleSplitterLostCapture = useCallback(() => {
    setIsDragging(false);
  }, []);

  const containerWidth = columnsRef.current?.offsetWidth ?? 0;
  const leftPercent =
    containerWidth > 0 && leftWidthPx !== null
      ? Math.round((leftWidthPx / containerWidth) * 100)
      : 41;
  const playerScopeId = `${logItem.id}-${activeRetry.id}`;

  return (
    <div className={cx('root')}>
      <div className={cx('columns', { 'columns--dragging': isDragging })} ref={columnsRef}>
        <div
          ref={leftPanelRef}
          className={cx('left-panel')}
          style={leftWidthPx !== null ? { flexBasis: leftWidthPx } : undefined}
        >
          <VideosPanel
            videos={videos}
            loading={listLoading}
            listError={listError}
            selectedLogId={selectedLogId}
            isPlaying={isPlaying || shouldAutoplay}
            onActivate={handleActivateVideo}
            onTogglePlayback={handleTogglePlayback}
            onJumpToLog={onJumpToLog}
          />
        </div>
        <div
          className={cx('columns-splitter')}
          role="separator"
          aria-label="Resize columns"
          aria-orientation="vertical"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={leftPercent}
          onPointerDown={handleSplitterPointerDown}
          onPointerMove={handleSplitterPointerMove}
          onPointerUp={handleSplitterPointerUp}
          onLostPointerCapture={handleSplitterLostCapture}
        />
        <div className={cx('right-panel')}>
          <VideoPreview
            key={playerScopeId}
            videoSrc={videoSrc}
            loading={listLoading || videoLoading}
            error={videoError}
            hasSelection={selectedLogId !== null}
            selectedLogId={selectedLogId}
            shouldAutoplay={shouldAutoplay}
            onAutoplayHandled={handleAutoplayHandled}
            onPlayingChange={handlePlayingChange}
            playbackAction={playbackAction}
            onPlaybackActionHandled={handlePlaybackActionHandled}
            consumePlayFromVideoTable={consumePlayFromVideoTable}
            clearPlayFromVideoTable={clearPlayFromVideoTable}
          />
        </div>
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
