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
import { SOCIAL_LINKS } from 'constants/socialLinks';
import { getCloudDeviceSocialIconClickEvent } from 'events/cloudDevicePageEvents';
import parse from 'html-react-parser';
import GithubIcon from 'icons/github.svg';
import LinkedinIcon from 'icons/linkedin.svg';
import SlackIcon from 'icons/slack.svg';
import XIcon from 'icons/x.svg';
import YoutubeIcon from 'icons/youtube.svg';
import { messages } from 'messages/cloudDevices';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useTracking } from 'react-tracking';

import styles from './socialLinks.scss';

const cx = classNames.bind(styles);

const SocialLinks = (): React.ReactElement => {
  const { formatMessage } = useIntl();
  const { trackEvent } = useTracking();

  const handleSocialClick = useCallback(
    (platform: string) => {
      trackEvent(getCloudDeviceSocialIconClickEvent(platform));
    },
    [trackEvent]
  );

  return (
    <div className={cx('social-footer')}>
      <p className={cx('social-label')}>{formatMessage(messages.maintenanceSocialsLabel)}</p>

      <div className={cx('social-icons')}>
        <a
          href={SOCIAL_LINKS.slack}
          target="_blank"
          rel="noopener noreferrer"
          className={cx('social-icon', 'slack')}
          title={formatMessage(messages.socialSlack)}
          aria-label={formatMessage(messages.socialSlack)}
          onClick={() => handleSocialClick('slack')}
        >
          {parse(SlackIcon)}
        </a>

        <a
          href={SOCIAL_LINKS.x}
          target="_blank"
          rel="noopener noreferrer"
          className={cx('social-icon', 'x')}
          title={formatMessage(messages.socialX)}
          aria-label={formatMessage(messages.socialX)}
          onClick={() => handleSocialClick('twitter')}
        >
          {parse(XIcon)}
        </a>

        <a
          href={SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={cx('social-icon', 'linkedin')}
          title={formatMessage(messages.socialLinkedIn)}
          aria-label={formatMessage(messages.socialLinkedIn)}
          onClick={() => handleSocialClick('linkedin')}
        >
          {parse(LinkedinIcon)}
        </a>

        <a
          href={SOCIAL_LINKS.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className={cx('social-icon', 'youtube')}
          title={formatMessage(messages.socialYouTube)}
          aria-label={formatMessage(messages.socialYouTube)}
          onClick={() => handleSocialClick('youtube')}
        >
          {parse(YoutubeIcon)}
        </a>

        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className={cx('social-icon', 'github')}
          title={formatMessage(messages.socialGitHub)}
          aria-label={formatMessage(messages.socialGitHub)}
          onClick={() => handleSocialClick('github')}
        >
          {parse(GithubIcon)}
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
