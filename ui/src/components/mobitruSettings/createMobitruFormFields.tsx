import {
  FieldElementComponent,
  FieldErrorHintComponent,
  FieldTextComponent,
} from 'extensionProps/components';
import { ComponentType, useEffect, useRef } from 'react';

interface FieldDeps {
  FieldElement: FieldElementComponent;
  FieldErrorHint: FieldErrorHintComponent;
  FieldText: FieldTextComponent;
  requiredField: (value: string) => string | undefined;
  SECRET_FIELDS_KEY: string;
  validateHttpsUrl: (value: string) => string | undefined;
}

interface FormFieldsProps {
  initialize: (data: object) => void;
  disabled: boolean;
  initialData: object;
  updateMetaData: (meta: object) => void;
}

export const createMobitruFormFields = ({
  FieldElement,
  FieldErrorHint,
  FieldText,
  requiredField,
  SECRET_FIELDS_KEY,
  validateHttpsUrl,
}: FieldDeps): ComponentType<FormFieldsProps> => {
  const MobitruFormFields = ({
    initialize,
    disabled,
    initialData,
    updateMetaData,
  }: FormFieldsProps) => {
    const onMountRef = useRef({ initialize, initialData, updateMetaData });

    useEffect(() => {
      onMountRef.current.initialize(onMountRef.current.initialData);
      onMountRef.current.updateMetaData({ [SECRET_FIELDS_KEY]: ['apiKey'] });
    }, []);

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

  MobitruFormFields.displayName = 'MobitruFormFields';

  return MobitruFormFields;
};
