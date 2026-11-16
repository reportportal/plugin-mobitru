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

export const ExtensionPropsContext = createContext<ExtensionProps>(
  // default props aren't used, real extensionProps are mandatory for ExtensionPropsContext.Provider
  null as unknown as ExtensionProps
);

export const useExtensionProps = (): ExtensionProps =>
  useContext(ExtensionPropsContext) as ExtensionProps;
