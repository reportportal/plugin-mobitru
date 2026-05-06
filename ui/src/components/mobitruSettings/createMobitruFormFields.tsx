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
