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

/**
 * Message descriptors owned by the ReportPortal host app (service-ui) and reused
 * as-is here instead of forking a parallel translation (see US-CLD-MOB-003).
 *
 * IMPORTANT: this file intentionally does NOT call `defineMessages` — `formatjs
 * extract` only scans `defineMessage(s)` calls, so keeping these as plain object
 * literals keeps them out of this plugin's own locale bundle
 * (`src/locales/*.json`). The host's `IntlProvider` merges core messages with the
 * extension's as `{ ...core[lang], ...extensionMessages }`, so as long as we don't
 * ship a plugin-local value for these ids, `formatMessage` resolves them straight
 * from the host's catalog and automatically stays in sync with it.
 */
export const reusedMessages = {
  allOrganizations: {
    id: 'OrganizationsPage.title',
    defaultMessage: 'All Organizations',
  },
  documentation: {
    id: 'Common.documentation',
    defaultMessage: 'Documentation',
  },
  refreshPage: {
    id: 'ServiceUnavailableScreen.refreshPage',
    defaultMessage: 'Refresh page',
  },
};
