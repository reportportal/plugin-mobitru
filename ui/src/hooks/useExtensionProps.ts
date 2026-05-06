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

import { createContext, useContext } from 'react';
import { type ExtensionProps } from 'types/extensionProps';

const defaultExtensionProps: ExtensionProps = {
  lib: {},
  components: {},
  constants: {},
  selectors: {},
  actions: {},
  utils: {},
  validators: {},
  icons: {},
  HOCs: {},
  componentLibrary: {},
  portalRootIds: {
    tooltipRoot: 'tooltip-root',
    modalRoot: 'modal-root',
    popoverRoot: 'popover-root',
    notificationRoot: 'notification-root',
    screenLockRoot: 'screen-lock-root',
  },
};

export const ExtensionPropsContext = createContext<ExtensionProps>(defaultExtensionProps);

export const useExtensionProps = (): ExtensionProps => useContext(ExtensionPropsContext);
