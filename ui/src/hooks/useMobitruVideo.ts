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

import { useExtensionProps } from 'hooks/useExtensionProps';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const MOBITRU_LOG_LEVEL = 'mobitru';

interface LogItem {
  id: number;
  binaryContent?: { contentType: string; fileName: string; id: string };
  level: string | 'mobitru';
  message?: string;
  time: string;
  uuid: string;
}

interface LogItemsResponse {
  content: LogItem[];
}

export const useMobitruVideo = (testItemId: number) => {
  const [videoSrc, setVideoSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {
    utils: { fetch, URLS },
    selectors: { projectInfoSelector },
  } = useExtensionProps();
  const { projectKey } = useSelector(projectInfoSelector) as { projectKey: string };

  const fetchItemLogs = async (id: number) => {
    const logsRes = await fetch<LogItemsResponse>(URLS.logItems(projectKey, id), {
      params: {
        'filter.eq.level': MOBITRU_LOG_LEVEL,
      },
    });

    return logsRes.content;
  };

  const getVideo = async (itemId: number) => {
    setLoading(true);
    try {
      const logList = await fetchItemLogs(itemId);
      // select a single video for the 1st iteration
      const logBinaryContent = logList[0]?.binaryContent;

      if (logBinaryContent) {
        const fileData = await fetch<Blob>(
          URLS.getFileById(projectKey, Number(logBinaryContent.id)),
          {
            responseType: 'blob',
          }
        );

        const videoObjectUrl = URL.createObjectURL(fileData);

        setVideoSrc(videoObjectUrl);

        URL.revokeObjectURL(videoObjectUrl);
      }
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVideo(testItemId);
  }, [testItemId]);

  return { videoSrc, loading, error };
};
