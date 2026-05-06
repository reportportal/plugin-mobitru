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

import type { ActionsInterface } from 'extensionProps/actions';
import type { UtilsInterface } from 'extensionProps/utils';
import type { ValidatorsInterface } from 'extensionProps/validators';

/** Shape of the object spread onto every remote extension root by ReportPortal `service-ui` (see `createImportProps`). */
export type HostSelector = (state: unknown) => unknown;

export interface ExtensionProps {
  lib?: Record<string, unknown>;
  components: Record<string, unknown>;
  constants?: Record<string, unknown>;
  selectors?: Record<string, HostSelector>;
  actions?: Partial<ActionsInterface> & Record<string, unknown>;
  utils?: Partial<UtilsInterface> & Record<string, unknown>;
  validators?: Partial<ValidatorsInterface> & Record<string, unknown>;
  icons?: Record<string, unknown>;
  HOCs?: Record<string, unknown>;
  portalRootIds?: Record<string, string>;
  componentLibrary?: Record<string, unknown>;
}
