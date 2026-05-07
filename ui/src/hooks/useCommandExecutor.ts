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

import type { UtilsInterface } from 'extensionProps/utils';

/** Same value as `pluginId` in root `gradle.properties` (first argument to `URLS.pluginsCommandsCommon`). */
export const PLUGIN_NAME = 'template';

/**
 * Example for **organization / instance** UI: **`POST`** on **`URLS.pluginsCommandsCommon`**
 * Pass **`utils`** from host extension props.
 */
export interface UseCommandExecutorProps {
  utils: Required<Pick<UtilsInterface, 'fetch' | 'URLS'>>;
}

export const useCommandExecutor =
  ({ utils: { fetch, URLS } }: UseCommandExecutorProps) =>
  (command: string, data: Record<string, unknown> = {}, params: Record<string, unknown> = {}) =>
    fetch(URLS.pluginsCommandsCommon(PLUGIN_NAME, command), {
      method: 'POST',
      data,
      ...params,
    });
