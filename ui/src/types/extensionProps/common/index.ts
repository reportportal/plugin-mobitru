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

import { ActionsInterface } from 'extensionProps/actions';
import {
  IntegrationFormFieldsComponentsInterface,
  IntegrationSettingsComponentsInterface,
} from 'extensionProps/components';
import { UtilsInterface } from 'extensionProps/utils';
import { ValidatorsInterface } from 'extensionProps/validators';

export interface Metadata {
  [key: string]: unknown;
}

export interface IntegrationParameters {
  integrationName: string;
  project: string;
  url: string;
  defectFormFields?: [];
}

export interface IntegrationFormFieldsInterface {
  initialize: (initialData?: IntegrationParameters) => void;
  disabled: boolean;
  lineAlign: 'left' | 'center' | 'start' | 'end' | 'right' | 'justify';
  initialData: IntegrationParameters;
  updateMetaData: (metadata: Metadata) => void;
  components: IntegrationFormFieldsComponentsInterface;
  validators: ValidatorsInterface;
  constants: { SECRET_FIELDS_KEY: 'SECRET_FIELDS_KEY'; BTS_FIELDS_FORM: 'BTS_FIELDS_FORM' };
}

export interface MobitruIntegrationParameters {
  url?: string;
  apiKey?: string;
  billingUnit?: string;
}

export interface IntegrationSettingsInterface {
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
  onUpdate: (data: object, cb: () => void, metaData: object) => void;
  isGlobal: boolean;
  actions: ActionsInterface;
  components: IntegrationSettingsComponentsInterface;
  utils: UtilsInterface;
  validators: ValidatorsInterface;
  constants: { SECRET_FIELDS_KEY: 'SECRET_FIELDS_KEY'; BTS_FIELDS_FORM: 'BTS_FIELDS_FORM' };
}

export interface OnSubmit {
  (
    integrationData: Metadata,
    callback: () => void,
    metaData: { fields: Metadata; checkedFieldsIds: { key: string; value: any }[] }
  ): void;
}
