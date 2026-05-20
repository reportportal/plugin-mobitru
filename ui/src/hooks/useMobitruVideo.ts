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
import { useEffect, useRef, useState } from 'react';
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
  const currentObjectUrlRef = useRef<string>('');
  const {
    utils: { fetch, URLS },
    selectors: { projectInfoSelector },
  } = useExtensionProps();
  const { projectKey } = useSelector(projectInfoSelector);

  useEffect(() => {
    const fetchItemLogs = async (id: number, signal: AbortSignal) => {
      const logsRes = await fetch<LogItemsResponse>(URLS.logItems(projectKey, id), {
        params: {
          'filter.eq.level': MOBITRU_LOG_LEVEL,
        },
        signal,
      });

      return logsRes.content;
    };

    const getVideo = async (itemId: number, signal: AbortSignal) => {
      setLoading(true);
      setError('');
      try {
        const logList = await fetchItemLogs(itemId, signal);
        // select a single video for the 1st iteration
        const logBinaryContent = logList[0]?.binaryContent;

        if (logBinaryContent) {
          const fileData = await fetch<Blob>(
            URLS.getFileById(projectKey, Number(logBinaryContent.id)),
            {
              responseType: 'blob',
              signal,
            }
          );

          if (signal.aborted) {
            return;
          }

          const videoObjectUrl = URL.createObjectURL(fileData);

          if (currentObjectUrlRef.current) {
            URL.revokeObjectURL(currentObjectUrlRef.current);
          }

          currentObjectUrlRef.current = videoObjectUrl;
          setVideoSrc(videoObjectUrl);
        }
      } catch (e: unknown) {
        if (signal.aborted) {
          return;
        }
        const errorMessage = e instanceof Error ? e.message : String(e);
        setError(errorMessage);
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    const abortController = new AbortController();

    getVideo(testItemId, abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [URLS, fetch, projectKey, testItemId]);

  useEffect(
    () => () => {
      if (currentObjectUrlRef.current) {
        URL.revokeObjectURL(currentObjectUrlRef.current);
      }
    },
    []
  );

  return { videoSrc, loading, error };
};
