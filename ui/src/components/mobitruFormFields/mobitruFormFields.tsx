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

import { SECRET_FIELDS_KEY } from 'constants/common';
import {
  FieldElementComponent,
  FieldErrorHintComponent,
  FieldTextComponent,
} from 'extensionProps/components';
import { messages } from 'messages/integration';
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useIntl } from 'react-intl';

type Validator = (value: string) => string | undefined;

interface MobitruFormFieldsProps {
  initialize: (data: object) => void;
  disabled: boolean;
  initialData: object;
  updateMetaData: (meta: object) => void;
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
  updateMetaData,
  validators,
  components,
}: Props) => {
  const { formatMessage } = useIntl();
  const { FieldElement, FieldErrorHint, FieldText } = components;
  const { requiredField } = validators;

  const initialDataRef = useRef(initialData);
  initialDataRef.current = initialData;

  const hasMountedRef = useRef(false);

  const initializeWithoutApiKey = useCallback(
    (data: object) => {
      initialize({
        ...data,
        apiKey: undefined,
      });
    },
    [initialize]
  );

  useEffect(() => {
    updateMetaData({
      [SECRET_FIELDS_KEY]: ['apiKey'],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    const isMount = !hasMountedRef.current;
    hasMountedRef.current = true;

    if (isMount || disabled) {
      initializeWithoutApiKey(initialDataRef.current);
    }
  }, [disabled, initializeWithoutApiKey]);

  return (
    <div>
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
