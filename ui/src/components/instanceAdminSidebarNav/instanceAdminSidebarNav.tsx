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
import instanceNavIcon from 'icons/instance-sidebar.svg';
import type { ComponentType } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import type { ExtensionProps } from 'types/extensionProps';

interface InstanceAdminSidebarNavProps extends ExtensionProps {
  components: { SidebarButton: ComponentType<any> };
  constants: { PLUGIN_UI_EXTENSION_ADMIN_PAGE: string };
}

const messages = defineMessages({
  label: {
    id: 'PluginTemplate.instanceNav.label',
    defaultMessage: 'Template plugin — instance admin',
  },
});

/** Instance sidebar → admin page; `pluginPage` = `name` of the `adminPage` extension. */
const InstanceAdminSidebarNavContent = () => {
  const { formatMessage } = useIntl();

  const {
    components: { SidebarButton },
    constants: { PLUGIN_UI_EXTENSION_ADMIN_PAGE },
  } = useExtensionProps() as InstanceAdminSidebarNavProps;

  const link = {
    type: PLUGIN_UI_EXTENSION_ADMIN_PAGE,
    payload: { pluginPage: 'template' },
  };

  return (
    <SidebarButton
      icon={instanceNavIcon}
      link={link}
      message={formatMessage(messages.label)}
      onClick={() => {}}
    />
  );
};

const InstanceAdminSidebarNav = (props: ExtensionProps) => (
  <ExtensionPropsContext.Provider value={props}>
    <InstanceAdminSidebarNavContent />
  </ExtensionPropsContext.Provider>
);

export default InstanceAdminSidebarNav;
