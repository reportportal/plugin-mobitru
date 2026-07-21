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
import { MobitruVideoLog } from 'hooks/useMobitruVideos';
import parse from 'html-react-parser';
import NavigateArrowIcon from 'icons/navigate-arrow.svg';
import PlayIcon from 'icons/play.svg';
import React, { KeyboardEvent, MouseEvent } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { formatLogTime } from 'utils/formatLogTime';

import styles from '../remoteDeviceTab.scss';

const cx = classNames.bind(styles);

const messages = defineMessages({
  jumpToLog: {
    id: 'LogTab.jumpToLog',
    defaultMessage: 'Jump to Log',
  },
});

interface VideoListItemProps {
  video: MobitruVideoLog;
  isSelected: boolean;
  onActivate: (logId: number) => void;
  onJumpToLog?: (logId: number, itemId: number) => void;
}

const VideoListItem = ({
  video,
  isSelected,
  onActivate,
  onJumpToLog = undefined,
}: VideoListItemProps) => {
  const { formatMessage } = useIntl();

  const handleRowClick = () => {
    if (isSelected) {
      return;
    }

    onActivate(video.id);
  };

  const handleRowKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (isSelected || event.target !== event.currentTarget) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onActivate(video.id);
    }
  };

  const handleJumpToClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onJumpToLog?.(video.id, video.itemId);
  };

  return (
    <div
      role={isSelected ? undefined : 'button'}
      tabIndex={isSelected ? undefined : 0}
      className={cx('video-list-item', { 'video-list-item--selected': isSelected })}
      onClick={isSelected ? undefined : handleRowClick}
      onKeyDown={isSelected ? undefined : handleRowKeyDown}
    >
      <span className={cx('video-list-item-play')} aria-hidden="true">
        {parse(PlayIcon)}
      </span>
      <span className={cx('video-list-item-time')}>{formatLogTime(video.time)}</span>
      {onJumpToLog && (
        <button
          type="button"
          className={cx('video-list-item-jump')}
          onClick={handleJumpToClick}
          aria-label={formatMessage(messages.jumpToLog)}
        >
          {formatMessage(messages.jumpToLog)}
          <i className={cx('video-list-item-jump-icon')}>{parse(NavigateArrowIcon)}</i>
        </button>
      )}
    </div>
  );
};

export { VideoListItem };
