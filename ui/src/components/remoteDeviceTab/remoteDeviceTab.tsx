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
import { LOG_PAGE_EVENTS } from 'analyticsEvents/logPageEvents';
import classNames from 'classnames/bind';
import { PLUGIN_NAME } from 'constants/common';
import { RpAttribute } from 'extensionProps/common';
import { ExtensionPropsContext, useExtensionProps } from 'hooks/useExtensionProps';
import { useMobitruVideo } from 'hooks/useMobitruVideo';
import type { APITypes, PlyrInstance, PlyrOptions, PlyrSource } from 'plyr-react';
import { Plyr } from 'plyr-react';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useTracking } from 'react-tracking';
import type { ExtensionProps } from 'types/extensionProps';

import styles from './remoteDeviceTab.scss';

const cx = classNames.bind(styles);

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
  videoRecordTitle: {
    id: 'LogTab.videoRecordTitle',
    defaultMessage: 'VIDEO RECORD',
  },
  empty: {
    id: 'LogTab.empty',
    defaultMessage: 'No Mobitru video evidence is available for this test item.',
  },
});

interface LogItem {
  id: number;
  attributes?: RpAttribute[];
}

interface LogTabProps {
  logItem: LogItem;
}

const RemoteDeviceTabInner = ({ logItem }: LogTabProps) => {
  const { formatMessage } = useIntl();
  const { trackEvent } = useTracking();
  const plyrInstanceRef = useRef<PlyrInstance | null>(null);
  const { videoSrc, loading } = useMobitruVideo(logItem.id);
  const {
    utils: { URLS },
  } = useExtensionProps();

  const handlePlayVideo = useCallback(() => {
    trackEvent(LOG_PAGE_EVENTS.PLAY_MOBITRU_VIDEO);
  }, [trackEvent]);

  const setPlayerRef = useCallback(
    (api: APITypes | null) => {
      if (plyrInstanceRef.current) {
        plyrInstanceRef.current.off('play', handlePlayVideo);
        plyrInstanceRef.current = null;
      }

      const player = api?.plyr;

      if (player && typeof player.on === 'function') {
        player.on('play', handlePlayVideo);
        plyrInstanceRef.current = player;
      }
    },
    [handlePlayVideo]
  );

  useEffect(
    () => () => {
      if (plyrInstanceRef.current) {
        plyrInstanceRef.current.off('play', handlePlayVideo);
      }
    },
    [handlePlayVideo]
  );

  const playerOptions = useMemo(
    (): PlyrOptions => ({
      ...BASE_PLAYER_OPTIONS,
      iconUrl: URLS.pluginPublicFile(PLUGIN_NAME, 'plyr.svg'),
    }),
    [URLS]
  );

  const playerSource: PlyrSource = {
    type: 'video',
    sources: [
      {
        src: videoSrc,
        type: 'video/mp4',
      },
    ],
  };

  const getVideoBlock = () =>
    videoSrc ? (
      <div className={cx('video-player')}>
        <Plyr ref={setPlayerRef} options={playerOptions} playsInline source={playerSource} />
      </div>
    ) : (
      <div className={cx('empty')}>
        <SystemMessage mode="info" caption={formatMessage(messages.empty)} />
      </div>
    );

  return (
    <div className={cx('root')} key={logItem.id}>
      <div className={cx('columns')}>
        <section className={cx('column')} aria-label={formatMessage(messages.videoRecordTitle)}>
          <div className={cx('column-title')}>{formatMessage(messages.videoRecordTitle)}</div>
          <div className={cx('video-block')}>{loading ? <BubblesLoader /> : getVideoBlock()}</div>
        </section>
      </div>
    </div>
  );
};

const RemoteDeviceTab = ({ logItem, ...extensionProps }: ExtensionProps & LogTabProps) => (
  <ExtensionPropsContext.Provider value={extensionProps}>
    <RemoteDeviceTabInner logItem={logItem} />
  </ExtensionPropsContext.Provider>
);

export { RemoteDeviceTab };
