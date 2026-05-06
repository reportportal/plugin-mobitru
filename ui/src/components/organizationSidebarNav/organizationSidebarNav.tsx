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

import { ExtensionPropsContext, useExtensionProps } from 'hooks/useExtensionProps';
import orgNavIcon from 'icons/org-sidebar.svg';
import type { ComponentType } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import type { ExtensionProps, HostSelector } from 'types/extensionProps';

interface OrganizationSidebarNavProps extends ExtensionProps {
  components: { SidebarButton: ComponentType<any> };
  constants: { ORGANIZATION_SETTINGS_TAB_PAGE: string };
  selectors: { urlOrganizationSlugSelector: HostSelector };
}

const messages = defineMessages({
  label: {
    id: 'PluginTemplate.orgNav.label',
    defaultMessage: 'Template plugin — organization settings',
  },
});

/** Organization sidebar shortcut → Organization settings tab (same `settingsTab` as org settings extension `name`). */
const OrganizationSidebarNavContent = () => {
  const { formatMessage } = useIntl();

  const {
    components: { SidebarButton },
    constants: { ORGANIZATION_SETTINGS_TAB_PAGE },
    selectors: { urlOrganizationSlugSelector },
  } = useExtensionProps() as OrganizationSidebarNavProps;
  const organizationSlug = useSelector(urlOrganizationSlugSelector);

  const link = {
    type: ORGANIZATION_SETTINGS_TAB_PAGE,
    payload: {
      organizationSlug,
      settingsTab: 'orgSettingsTemplate',
    },
  };

  return (
    <SidebarButton
      icon={orgNavIcon}
      link={link}
      message={formatMessage(messages.label)}
      onClick={() => {}}
    />
  );
};

const OrganizationSidebarNav = (props: ExtensionProps) => (
  <ExtensionPropsContext.Provider value={props}>
    <OrganizationSidebarNavContent />
  </ExtensionPropsContext.Provider>
);

export default OrganizationSidebarNav;
