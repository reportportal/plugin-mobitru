import { IntegrationFormFieldsInterface } from 'extensionProps/common';
import { useEffect } from 'react';

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

type Props = IntegrationFormFieldsInterface;

export const MobitruFormFields = ({
  initialize,
  disabled,
  initialData,
  updateMetaData,
  validators,
  components,
  constants,
}: Props) => {
  const { FieldElement, FieldErrorHint, FieldText } = components;
  const { requiredField } = validators;

  // run only on mount — re-running on dep change would reset the form
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    initialize(initialData);
    updateMetaData({ [constants.SECRET_FIELDS_KEY]: ['apiKey'] });
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <div>
      <FieldElement
        name="url"
        label="Mobitru URL"
        isRequired
        validate={[requiredField, validateHttpsUrl]}
      >
        <FieldErrorHint>
          <FieldText disabled={disabled} defaultWidth={false} />
        </FieldErrorHint>
      </FieldElement>
      <FieldElement name="apiKey" label="API key" isRequired validate={[requiredField]}>
        <FieldErrorHint>
          <FieldText disabled={disabled} defaultWidth={false} />
        </FieldErrorHint>
      </FieldElement>
      <FieldElement
        name="billingUnit"
        label="Mobitru Billing unit (slug)"
        isRequired
        validate={[requiredField]}
      >
        <FieldErrorHint>
          <FieldText disabled={disabled} defaultWidth={false} />
        </FieldErrorHint>
      </FieldElement>
    </div>
  );
};
