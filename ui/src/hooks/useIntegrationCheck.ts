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

import { useSelector } from 'react-redux';
import type { HostSelector } from 'types/extensionProps';

export interface UseIntegrationCheckProps {
  projectIntegrationsSelector: HostSelector;
  organizationIntegrationsSelector: HostSelector;
  globalIntegrationsSelector: HostSelector;
}

interface AvailableIntegration {
  id?: number;
  enabled?: boolean;
}

export interface IntegrationCheckResult {
  isIntegrated: boolean;
  integrationId?: number;
}

const pickEnabledIntegration = (
  integrations: AvailableIntegration[] | undefined
): AvailableIntegration | undefined => {
  if (!Array.isArray(integrations)) {
    return undefined;
  }

  return integrations.find((item) => item.enabled);
};

const resolveIntegration = (
  projectIntegrations: AvailableIntegration[] | undefined,
  organizationIntegrations: AvailableIntegration[] | undefined,
  globalIntegrations: AvailableIntegration[] | undefined
): AvailableIntegration | undefined =>
  pickEnabledIntegration(projectIntegrations) ??
  pickEnabledIntegration(organizationIntegrations) ??
  pickEnabledIntegration(globalIntegrations);

export const useIntegrationCheck = ({
  projectIntegrationsSelector,
  organizationIntegrationsSelector,
  globalIntegrationsSelector,
}: UseIntegrationCheckProps): IntegrationCheckResult => {
  const projectIntegrations = useSelector(projectIntegrationsSelector) as
    | AvailableIntegration[]
    | undefined;
  const organizationIntegrations = useSelector(organizationIntegrationsSelector) as
    | AvailableIntegration[]
    | undefined;
  const globalIntegrations = useSelector(globalIntegrationsSelector) as
    | AvailableIntegration[]
    | undefined;

  const integration = resolveIntegration(
    projectIntegrations,
    organizationIntegrations,
    globalIntegrations
  );

  return {
    isIntegrated: Boolean(integration),
    integrationId: integration?.id,
  };
};
