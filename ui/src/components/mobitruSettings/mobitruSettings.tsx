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

import { IntegrationSettingsInterface, MobitruIntegrationParameters } from 'extensionProps/common';
import { messages } from 'messages/integration';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

const API_KEY_MASK = '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022';

type Props = IntegrationSettingsInterface;

export const MobitruSettings = ({
  data,
  goToPreviousPage,
  onUpdate,
  isGlobal,
  components,
  actions,
}: Props) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const { IntegrationSettings, BtsAuthFieldsInfo } = components;

  const params = data.integrationParameters as unknown as MobitruIntegrationParameters;

  const authFieldsConfig = [
    { value: params.apiKey ? API_KEY_MASK : '', message: formatMessage(messages.apiKey) },
    { value: params.billingUnit ?? '', message: formatMessage(messages.billingUnit) },
    { value: params.workspaceId ?? '', message: formatMessage(messages.workspaceId) },
  ];

  const editAuthClickHandler = (testConnection: () => void) => {
    dispatch(
      actions.showModalAction({
        id: 'addIntegrationModal',
        data: {
          isGlobal,
          onConfirm: (integrationData: object, metaData: object) => {
            onUpdate(
              integrationData,
              () => {
                dispatch(actions.hideModalAction());
                testConnection();
              },
              metaData
            );
          },
          instanceType: data.integrationType.name,
          customProps: {
            initialData: {
              ...params,
              integrationName: data.name,
            },
            editAuthMode: true,
          },
        },
      })
    );
  };

  const editAuthConfig = {
    content: <BtsAuthFieldsInfo fieldsConfig={authFieldsConfig} />,
    onClick: editAuthClickHandler,
  };

  return (
    <IntegrationSettings
      data={data}
      onUpdate={onUpdate}
      goToPreviousPage={goToPreviousPage}
      isGlobal={isGlobal}
      editAuthConfig={editAuthConfig}
      hideInlineForm
    />
  );
};
