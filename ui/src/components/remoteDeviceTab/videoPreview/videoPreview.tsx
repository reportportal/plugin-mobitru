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

import { BubblesLoader, SystemMessage } from '@reportportal/ui-kit';
import classNames from 'classnames/bind';
import { PLUGIN_NAME } from 'constants/common';
import { LOG_PAGE_EVENTS } from 'events/logPageEvents';
import { useExtensionProps } from 'hooks/useExtensionProps';
import type { APITypes, PlyrInstance, PlyrOptions, PlyrSource } from 'plyr-react';
import { Plyr } from 'plyr-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useTracking } from 'react-tracking';

import styles from '../remoteDeviceTab.scss';

const cx = classNames.bind(styles);

const PAUSE_DEBOUNCE_MS = 75;

const BASE_PLAYER_OPTIONS: Omit<PlyrOptions, 'iconUrl'> = {
  controls: [
    'play-large',
    'progress',
    'play',
    'mute',
    'volume',
    'current-time',
    'duration',
    'fullscreen',
  ],
  clickToPlay: true,
  keyboard: {
    focused: true,
    global: false,
  },
  ratio: '16:9',
  tooltips: {
    controls: false,
    seek: false,
  },
};

const messages = defineMessages({
  videoPreviewAriaLabel: {
    id: 'LogTab.videoPreviewAriaLabel',
    defaultMessage: 'Video preview',
  },
  empty: {
    id: 'LogTab.empty',
    defaultMessage: 'No Mobitru video evidence is available for this test item.',
  },
  videoLoadError: {
    id: 'LogTab.videoLoadError',
    defaultMessage: 'Video could not be loaded',
  },
});

export interface PlaybackAction {
  type: 'play' | 'pause';
  id: number;
}

interface VideoPreviewProps {
  videoSrc: string;
  loading: boolean;
  error: string;
  hasSelection: boolean;
  selectedLogId: number | null;
  shouldAutoplay: boolean;
  onAutoplayHandled: () => void;
  onPlayingChange: (isPlaying: boolean) => void;
  playbackAction: PlaybackAction | null;
  onPlaybackActionHandled: () => void;
  consumePlayFromVideoTable: () => boolean;
  clearPlayFromVideoTable: () => void;
}

const VideoPreview = ({
  videoSrc,
  loading,
  error,
  hasSelection,
  selectedLogId,
  shouldAutoplay,
  onAutoplayHandled,
  onPlayingChange,
  playbackAction,
  onPlaybackActionHandled,
  consumePlayFromVideoTable,
  clearPlayFromVideoTable,
}: VideoPreviewProps) => {
  const { formatMessage } = useIntl();
  const { trackEvent } = useTracking();
  const plyrInstanceRef = useRef<PlyrInstance | null>(null);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldAutoplayRef = useRef(shouldAutoplay);
  const loadingRef = useRef(loading);
  const [playerVersion, setPlayerVersion] = useState(0);
  const {
    utils: { URLS },
  } = useExtensionProps();

  useEffect(() => {
    shouldAutoplayRef.current = shouldAutoplay;
  }, [shouldAutoplay]);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  const setPlayerRef = useCallback((api: APITypes | null) => {
    const player = api?.plyr;

    if (player && typeof player.on === 'function') {
      if (plyrInstanceRef.current !== player) {
        plyrInstanceRef.current = player;
        setPlayerVersion((version) => version + 1);
      }

      return;
    }

    plyrInstanceRef.current = null;
  }, []);

  useEffect(() => {
    const player = plyrInstanceRef.current;

    if (!player || typeof player.on !== 'function') {
      return undefined;
    }

    const clearPauseTimer = () => {
      if (pauseTimerRef.current !== null) {
        clearTimeout(pauseTimerRef.current);
        pauseTimerRef.current = null;
      }
    };

    const handlePlay = () => {
      clearPauseTimer();
      const fromVideoTable = consumePlayFromVideoTable();
      trackEvent(
        fromVideoTable
          ? LOG_PAGE_EVENTS.PLAY_MOBITRU_VIDEO_FROM_TABLE
          : LOG_PAGE_EVENTS.PLAY_MOBITRU_VIDEO
      );
      onPlayingChange(true);
    };
    const handlePause = () => {
      if (shouldAutoplayRef.current || loadingRef.current) {
        return;
      }

      clearPauseTimer();
      pauseTimerRef.current = setTimeout(() => {
        pauseTimerRef.current = null;
        onPlayingChange(false);
      }, PAUSE_DEBOUNCE_MS);
    };
    const handleEnded = () => {
      clearPauseTimer();
      onPlayingChange(false);
    };

    player.on('play', handlePlay);
    player.on('pause', handlePause);
    player.on('ended', handleEnded);

    return () => {
      clearPauseTimer();
      if (typeof player.off === 'function') {
        player.off('play', handlePlay);
        player.off('pause', handlePause);
        player.off('ended', handleEnded);
      }
    };
  }, [consumePlayFromVideoTable, onPlayingChange, playerVersion, trackEvent]);

  const playerOptions = useMemo(
    (): PlyrOptions => ({
      ...BASE_PLAYER_OPTIONS,
      iconUrl: URLS.pluginPublicFile(PLUGIN_NAME, 'plyr.svg'),
    }),
    [URLS]
  );

  const playerSource = useMemo(
    (): PlyrSource => ({
      type: 'video',
      sources: [
        {
          src: videoSrc,
          type: 'video/mp4',
        },
      ],
    }),
    [videoSrc]
  );

  useEffect(() => {
    if (!shouldAutoplay || !videoSrc || loading || error) {
      return undefined;
    }

    let cancelled = false;
    let attachedPlayer: PlyrInstance | null = null;

    const startPlayback = () => {
      if (cancelled || !attachedPlayer) {
        return;
      }

      const playResult = attachedPlayer.play();

      if (playResult && typeof playResult.then === 'function') {
        playResult
          .catch(() => {
            if (!cancelled) {
              clearPlayFromVideoTable();
              onPlayingChange(false);
            }
          })
          .then(() => {
            if (!cancelled) {
              onAutoplayHandled();
            }
          });
        return;
      }

      onAutoplayHandled();
    };

    const bindAutoplay = (player: PlyrInstance) => {
      attachedPlayer = player;
      player.once('loadeddata', startPlayback);

      window.requestAnimationFrame(() => {
        if (!cancelled && player.media && player.media.readyState >= 2) {
          startPlayback();
        }
      });
    };

    const player = plyrInstanceRef.current;

    if (player) {
      bindAutoplay(player);
    }

    return () => {
      cancelled = true;
      attachedPlayer = null;
    };
  }, [
    clearPlayFromVideoTable,
    error,
    loading,
    onAutoplayHandled,
    onPlayingChange,
    playerVersion,
    selectedLogId,
    shouldAutoplay,
    videoSrc,
  ]);

  useEffect(() => {
    if (!playbackAction) {
      return undefined;
    }

    if (error || !hasSelection) {
      clearPlayFromVideoTable();
      onPlaybackActionHandled();
      return undefined;
    }

    if (!videoSrc || loading) {
      return undefined;
    }

    const player = plyrInstanceRef.current;

    if (!player) {
      return undefined;
    }

    if (playbackAction.type === 'pause') {
      player.pause();
      onPlaybackActionHandled();
      return undefined;
    }

    let cancelled = false;

    const playResult = player.play();

    if (playResult && typeof playResult.then === 'function') {
      playResult
        .catch(() => {
          if (!cancelled) {
            clearPlayFromVideoTable();
            onPlayingChange(false);
          }
        })
        .then(() => {
          if (!cancelled) {
            onPlaybackActionHandled();
          }
        });

      return () => {
        cancelled = true;
      };
    }

    onPlaybackActionHandled();
    return undefined;
  }, [
    clearPlayFromVideoTable,
    error,
    hasSelection,
    loading,
    onPlaybackActionHandled,
    onPlayingChange,
    playbackAction,
    playerVersion,
    videoSrc,
  ]);

  const renderPreviewContent = () => {
    if (!hasSelection) {
      if (loading) {
        return (
          <div className={cx('video-list-loader')}>
            <BubblesLoader />
          </div>
        );
      }

      return (
        <div className={cx('empty')}>
          <SystemMessage mode="info" caption={formatMessage(messages.empty)} />
        </div>
      );
    }

    if (!videoSrc) {
      if (error) {
        return (
          <div className={cx('empty')}>
            <SystemMessage mode="error" caption={formatMessage(messages.videoLoadError)} />
          </div>
        );
      }

      return (
        <div className={cx('video-list-loader')}>
          <BubblesLoader />
        </div>
      );
    }

    return (
      <div className={cx('video-player', { 'video-player--loading': loading })}>
        <Plyr ref={setPlayerRef} options={playerOptions} playsInline source={playerSource} />
        {loading && (
          <div className={cx('video-player-loader')}>
            <BubblesLoader />
          </div>
        )}
        {error && (
          <div className={cx('video-player-error')}>
            <SystemMessage mode="error" caption={formatMessage(messages.videoLoadError)} />
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      className={cx('preview-panel')}
      aria-label={formatMessage(messages.videoPreviewAriaLabel)}
    >
      <div className={cx('video-block')}>{renderPreviewContent()}</div>
    </section>
  );
};

export { VideoPreview };
