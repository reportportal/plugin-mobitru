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

import { ExtensionPropsContext } from 'hooks/useExtensionProps';
import { defineMessages, useIntl } from 'react-intl';
import type { ExtensionProps } from 'types/extensionProps';

const messages = defineMessages({
  title: {
    id: 'PluginTemplate.projectSettings.title',
    defaultMessage: 'Template plugin — project settings',
  },
  lead: {
    id: 'PluginTemplate.projectSettings.lead',
    defaultMessage: 'Tab id projectSettingsTemplate (general is reserved by RP).',
  },
  body: {
    id: 'PluginTemplate.projectSettings.body',
    defaultMessage: 'Replace with per-project plugin settings.',
  },
});

const ProjectSettingsTabContent = () => {
  const { formatMessage } = useIntl();

  return (
    <section>
      <h1>{formatMessage(messages.title)}</h1>
      <p>{formatMessage(messages.lead)}</p>
      <p>{formatMessage(messages.body)}</p>
    </section>
  );
};

const ProjectSettingsTab = (props: ExtensionProps) => (
  <ExtensionPropsContext.Provider value={props}>
    <ProjectSettingsTabContent />
  </ExtensionPropsContext.Provider>
);

export default ProjectSettingsTab;
