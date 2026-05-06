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

import { IntegrationParameters, OnSubmit } from 'extensionProps/common';
import { ComponentType, FC } from 'react';
import type { BaseFieldProps } from 'redux-form';

interface FieldProviderInterface extends BaseFieldProps {
  children: React.ReactNode;
}

interface FieldElementInterface extends FieldProviderInterface {
  label: string;
  description?: string;
  className?: string;
  childrenClassName?: string;
  withoutProvider?: boolean;
  dataAutomationId?: string;
  isRequired?: boolean;
  disabled?: boolean;
}

interface FieldErrorHintInterface {
  children?: React.ReactNode;
  error?: string;
  active?: boolean;
  staticHint?: boolean;
  widthContent?: boolean;
  darkView?: boolean;
  provideHint?: boolean;
  touched?: boolean;
  dataAutomationId?: string;
  hintType?: 'bottom' | 'top' | 'top-right' | 'bottom-left';
}

interface FieldTextInterface {
  maxLength?: number;
  defaultWidth?: boolean;
  disabled?: boolean;
}

interface BtsAuthFieldsInfo {
  fieldsConfig: { value: string; message: string }[];
}

interface IntegrationSettings {
  data: {
    creator: string;
    enabled: boolean;
    id: number;
    integrationParameters: IntegrationParameters;
    integrationType: {
      type: number;
      name: string;
      enabled: boolean;
      creationDate: number;
      groupType: string;
      details: {
        allowedCommands: string[];
        binaryData: { icon: string; main: string; metadata: string };
        commonCommands: string[];
        description: string;
        documentationLink: string;
        id: string;
        metadata: { embedded: boolean; multiple: boolean };
        name: string;
        resources: string;
        version: string;
      };
    };
    name: string;
  };
  goToPreviousPage: () => void;
  onUpdate: OnSubmit;
  editAuthConfig?: {
    content?: JSX.Element;
    onClick: (testConnection: () => void) => void;
  };
  isGlobal: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formFieldsComponent: ComponentType<any>;
  formKey?: string;
  isEmptyConfiguration?: boolean;
  preventTestConnection?: boolean;
}

export interface IntegrationFormFieldsComponentsInterface {
  FieldElement: FC<FieldElementInterface>;
  FieldErrorHint: FC<FieldErrorHintInterface>;
  FieldText: FC<FieldTextInterface>;
  FieldTextFlex: FC;
}

export type FieldElementComponent = FC<FieldElementInterface>;
export type FieldErrorHintComponent = FC<FieldErrorHintInterface>;
export type FieldTextComponent = FC<FieldTextInterface>;

type BtsPropertiesForIssueForm = FC<FieldProviderInterface>;

export interface IntegrationSettingsComponentsInterface {
  IntegrationSettings: FC<IntegrationSettings>;
  BtsAuthFieldsInfo: FC<BtsAuthFieldsInfo>;
  BtsPropertiesForIssueForm: BtsPropertiesForIssueForm;
  FieldElement: FC<FieldElementInterface>;
  FieldErrorHint: FC<FieldErrorHintInterface>;
  FieldText: FC<FieldTextInterface>;
}
