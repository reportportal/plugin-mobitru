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

package com.epam.reportportal.mobitru.model;

/**
 * Downloaded Mobitru recording payload with the metadata required to persist it as an attachment.
 *
 * @param fileName    user-visible file name
 * @param contentType MIME type reported by Mobitru
 * @param content     binary file content
 */
public record RecordingAttachmentData(String fileName, String contentType, byte[] content) {
}
