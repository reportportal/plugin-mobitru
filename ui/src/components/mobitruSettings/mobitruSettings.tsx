import { IntegrationSettingsInterface, MobitruIntegrationParameters } from 'extensionProps/common';
import { useMemo } from 'react';

import { createMobitruFormFields } from './createMobitruFormFields';

const validateHttpsUrl = (value: string) => {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') {
      return 'Please provide a valid HTTPS URL';
    }
  } catch {
    return 'Please provide a valid URL';
  }
  return undefined;
};

const API_KEY_MASK = '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022';

type Props = IntegrationSettingsInterface;

export const MobitruSettings = ({
  data,
  goToPreviousPage,
  onUpdate,
  isGlobal,
  components,
  validators,
  constants,
  actions,
}: Props) => {
  const { IntegrationSettings, BtsAuthFieldsInfo, FieldElement, FieldErrorHint, FieldText } =
    components;
  const { requiredField } = validators;
  const { SECRET_FIELDS_KEY } = constants;

  const params = data.integrationParameters as unknown as MobitruIntegrationParameters;

  const authFieldsConfig = [
    { value: params.url ?? '', message: 'Mobitru URL' },
    { value: params.apiKey ? API_KEY_MASK : '', message: 'API key' },
    { value: params.billingUnit ?? '', message: 'Mobitru Billing unit (slug)' },
  ];

  const editAuthClickHandler = (testConnection: () => void) => {
    actions.showModalAction({
      id: 'addIntegrationModal',
      data: {
        isGlobal,
        onConfirm: (integrationData: object, metaData: object) => {
          onUpdate(
            integrationData,
            () => {
              actions.hideModalAction();
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
    });
  };

  const editAuthConfig = {
    content: <BtsAuthFieldsInfo fieldsConfig={authFieldsConfig} />,
    onClick: editAuthClickHandler,
  };

  const FormFieldsComponent = useMemo(
    () =>
      createMobitruFormFields({
        FieldElement,
        FieldErrorHint,
        FieldText,
        requiredField,
        SECRET_FIELDS_KEY,
        validateHttpsUrl,
      }),
    [FieldElement, FieldErrorHint, FieldText, requiredField, SECRET_FIELDS_KEY]
  );

  return (
    <IntegrationSettings
      data={data}
      onUpdate={onUpdate}
      goToPreviousPage={goToPreviousPage}
      isGlobal={isGlobal}
      formFieldsComponent={FormFieldsComponent}
      formKey={constants.BTS_FIELDS_FORM}
      editAuthConfig={editAuthConfig}
      preventTestConnection
    />
  );
};
