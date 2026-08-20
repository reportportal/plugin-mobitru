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
const VIDEO_LIST_PAGE_SIZE = 100;

export interface MobitruVideoLog {
  id: number;
  itemId: number;
  time: string;
  binaryContent: { id: string; fileName?: string; contentType?: string };
}

interface LogItem {
  id: number;
  itemId: number;
  binaryContent?: { contentType: string; fileName: string; id: string };
  level: string;
  time: string;
}

interface LogItemsResponse {
  content: LogItem[];
  page?: { totalPages?: number };
}

interface StreamLinkResponse {
  url: string;
}

const mapVideoLogs = (content: LogItem[]): MobitruVideoLog[] =>
  content
    .filter((log) => log.binaryContent?.id)
    .map((log) => ({
      id: log.id,
      itemId: log.itemId,
      time: log.time,
      binaryContent: log.binaryContent!,
    }));

interface UseMobitruVideosParams {
  activeRetryPath: string;
  excludedRetryParentId?: number;
  selectedLogId: number | null;
}

export const useMobitruVideos = ({
  activeRetryPath,
  excludedRetryParentId,
  selectedLogId,
}: UseMobitruVideosParams) => {
  const [videos, setVideos] = useState<MobitruVideoLog[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState('');
  const [videoError, setVideoError] = useState('');
  const [loadedVideo, setLoadedVideo] = useState<{ logId: number; src: string } | null>(null);
  const [displayedVideo, setDisplayedVideo] = useState<{ logId: number; src: string } | null>(null);
  const {
    utils: { fetch, URLS, resolveApiPath },
    selectors: { projectInfoSelector },
  } = useExtensionProps();
  const { projectKey } = useSelector(projectInfoSelector);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchVideoList = async () => {
      setListLoading(true);
      setListError('');
      setVideos([]);
      setLoadedVideo(null);
      setDisplayedVideo(null);
      setVideoError('');

      try {
        const fetchLogsPage = async (
          page: number,
          totalPages = 1,
          accumulated: LogItem[] = []
        ): Promise<LogItem[]> => {
          if (abortController.signal.aborted || page > totalPages) {
            return accumulated;
          }

          const logsRes = await fetch<LogItemsResponse>(
            URLS.logsUnderPath(projectKey, activeRetryPath, excludedRetryParentId),
            {
              params: {
                'filter.eq.level': MOBITRU_LOG_LEVEL,
                'filter.ex.binaryContent': true,
                'page.sort': 'logTime,ASC',
                'page.size': VIDEO_LIST_PAGE_SIZE,
                'page.page': page,
              },
              signal: abortController.signal,
            }
          );

          if (abortController.signal.aborted) {
            return accumulated;
          }

          const content = [...accumulated, ...(logsRes.content ?? [])];
          const nextTotalPages = logsRes.page?.totalPages ?? 1;

          return fetchLogsPage(page + 1, nextTotalPages, content);
        };

        const allLogs = await fetchLogsPage(1);

        if (abortController.signal.aborted) {
          return;
        }

        setVideos(mapVideoLogs(allLogs));
      } catch (e: unknown) {
        if (abortController.signal.aborted) {
          return;
        }
        const errorMessage = e instanceof Error ? e.message : String(e);
        setListError(errorMessage);
      } finally {
        if (!abortController.signal.aborted) {
          setListLoading(false);
        }
      }
    };

    fetchVideoList();

    return () => {
      abortController.abort();
    };
  }, [URLS, activeRetryPath, excludedRetryParentId, fetch, projectKey]);

  useEffect(() => {
    if (!selectedLogId) {
      setLoadedVideo(null);
      setDisplayedVideo(null);
      setVideoError('');
      return undefined;
    }

    const selectedVideo = videos.find((video) => video.id === selectedLogId);

    if (!selectedVideo?.binaryContent?.id) {
      setLoadedVideo(null);
      setVideoError('');
      return undefined;
    }

    const abortController = new AbortController();

    const fetchVideoStreamLink = async () => {
      setVideoError('');

      try {
        const response = await fetch<StreamLinkResponse>(
          URLS.createStreamLink(projectKey, Number(selectedVideo.binaryContent.id)),
          {
            method: 'post',
            signal: abortController.signal,
          }
        );

        if (abortController.signal.aborted) {
          return;
        }

        if (!response?.url) {
          setLoadedVideo(null);
          setVideoError('No video URL returned');
          return;
        }

        setLoadedVideo({ logId: selectedLogId, src: resolveApiPath(response.url) });
      } catch (e: unknown) {
        if (abortController.signal.aborted) {
          return;
        }
        setLoadedVideo(null);
        const errorMessage = e instanceof Error ? e.message : String(e);
        setVideoError(errorMessage);
      }
    };

    fetchVideoStreamLink();

    return () => {
      abortController.abort();
    };
  }, [URLS, fetch, projectKey, resolveApiPath, selectedLogId, videos]);

  useEffect(() => {
    if (!selectedLogId) {
      setDisplayedVideo(null);
      return;
    }

    if (loadedVideo && loadedVideo.logId === selectedLogId) {
      setDisplayedVideo(loadedVideo);
    }
  }, [loadedVideo, selectedLogId]);

  const isSelectedVideoReady = loadedVideo !== null && loadedVideo.logId === selectedLogId;

  return {
    videos,
    listLoading,
    listError,
    videoSrc: displayedVideo?.src ?? '',
    videoLoading: Boolean(selectedLogId) && !isSelectedVideoReady && !videoError,
    videoError,
  };
};
