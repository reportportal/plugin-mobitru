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
import { messages } from 'messages/integration';
import { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';

type Validator = (value: string) => string | undefined;

interface MobitruFormFieldsProps {
  initialize: (data: object) => void;
  disabled: boolean;
  initialData: object;
  components: {
    FieldElement: FieldElementComponent;
    FieldErrorHint: FieldErrorHintComponent;
    FieldText: FieldTextComponent;
  };
  validators: {
    requiredField: Validator;
  };
}

type Props = MobitruFormFieldsProps;

export const MobitruFormFields = ({
  initialize,
  disabled,
  initialData,
  validators,
  components,
}: Props) => {
  const { formatMessage } = useIntl();
  const { FieldElement, FieldErrorHint, FieldText } = components;
  const { requiredField } = validators;

  const validateHttpsUrl = useCallback(
    (value: string) => {
      if (!value) return undefined;
      try {
        const url = new URL(value);
        if (url.protocol !== 'https:') {
          return formatMessage(messages.invalidHttpsUrl);
        }
      } catch {
        return formatMessage(messages.invalidUrl);
      }
      return undefined;
    },
    [formatMessage]
  );

  // run only on mount — re-running on dep change would reset the form
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    initialize(initialData);
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <div>
      <FieldElement
        name="url"
        label={formatMessage(messages.url)}
        isRequired
        validate={[requiredField, validateHttpsUrl]}
      >
        <FieldErrorHint provideHint={false}>
          <FieldText disabled={disabled} defaultWidth={false} />
        </FieldErrorHint>
      </FieldElement>
      <FieldElement
        name="apiKey"
        label={formatMessage(messages.apiKey)}
        isRequired
        validate={[requiredField]}
      >
        <FieldErrorHint provideHint={false}>
          <FieldText disabled={disabled} defaultWidth={false} />
        </FieldErrorHint>
      </FieldElement>
      <FieldElement
        name="billingUnit"
        label={formatMessage(messages.billingUnit)}
        isRequired
        validate={[requiredField]}
      >
        <FieldErrorHint provideHint={false}>
          <FieldText disabled={disabled} defaultWidth={false} />
        </FieldErrorHint>
      </FieldElement>
    </div>
  );
};
