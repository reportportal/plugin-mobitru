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

package com.epam.reportportal.mobitru.command;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

import com.epam.reportportal.api.model.PluginCommandRQ;
import com.epam.reportportal.base.infrastructure.persistence.binary.AttachmentBinaryDataService;
import com.epam.reportportal.base.infrastructure.persistence.commons.BinaryDataMetaInfo;
import com.epam.reportportal.base.infrastructure.persistence.dao.LaunchRepository;
import com.epam.reportportal.base.infrastructure.persistence.dao.LogRepository;
import com.epam.reportportal.base.infrastructure.persistence.entity.attachment.Attachment;
import com.epam.reportportal.base.infrastructure.persistence.entity.attachment.AttachmentMetaInfo;
import com.epam.reportportal.base.infrastructure.persistence.entity.attachment.BinaryData;
import com.epam.reportportal.base.infrastructure.persistence.entity.integration.Integration;
import com.epam.reportportal.base.infrastructure.persistence.entity.organization.MembershipDetails;
import com.epam.reportportal.base.infrastructure.persistence.entity.launch.Launch;
import com.epam.reportportal.base.infrastructure.persistence.entity.log.Log;
import com.epam.reportportal.mobitru.client.MobitruRecordingClient;
import com.epam.reportportal.mobitru.model.RecordingAttachmentData;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.lang.reflect.Proxy;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;
import org.junit.jupiter.api.Test;
import org.springframework.web.multipart.MultipartFile;

class LoadExternalAttachmentCommandTest {

  private static final String SELENIUM_RECORDING_ID_KEY = "mobitru_selenium_recording_id";

  @Test
  void downloadsAndAttachesRecordingToLog() throws Exception {
    AttachmentBinaryDataServiceStub attachmentService = new AttachmentBinaryDataServiceStub();
    Log log = new Log();
    log.setId(11L);
    log.setUuid("log-uuid");
    log.setProjectId(7L);
    log.setLogTime(Instant.parse("2026-05-13T21:00:00Z"));
    Launch launch = new Launch();
    launch.setId(3L);
    launch.setUuid("launch-uuid");
    AtomicReference<String> attachmentAttributeKey = new AtomicReference<>();

    LoadExternalAttachmentCommand command = new LoadExternalAttachmentCommand(
        new MobitruRecordingClient(null) {
          @Override
          public RecordingAttachmentData downloadRecording(Integration integration,
              String attachmentExternalId, String attributeKey) {
            attachmentAttributeKey.set(attributeKey);
            return new RecordingAttachmentData("session.mp4", "video/mp4", "video".getBytes());
          }
        },
        repositoryProxy(LogRepository.class, log),
        repositoryProxy(LaunchRepository.class, launch),
        attachmentService,
        null, null, null, null,
        new ObjectMapper());

    command.executeCommand(new Integration(), new PluginCommandRQ(null, params()));

    assertEquals(1, attachmentService.saveCalls);
    assertEquals("session", attachmentService.savedFile.getName());
    assertEquals("session.mp4", attachmentService.savedFile.getOriginalFilename());
    assertEquals("video/mp4", attachmentService.savedFile.getContentType());
    assertArrayEquals("video".getBytes(), attachmentService.savedFile.getBytes());
    assertEquals(7L, attachmentService.savedMetaInfo.getProjectId());
    assertEquals(3L, attachmentService.savedMetaInfo.getLaunchId());
    assertEquals(5L, attachmentService.savedMetaInfo.getItemId());
    assertEquals(11L, attachmentService.savedMetaInfo.getLogId());
    assertEquals("launch-uuid", attachmentService.savedMetaInfo.getLaunchUuid());
    assertEquals("log-uuid", attachmentService.savedMetaInfo.getLogUuid());
    assertEquals("session.mp4", attachmentService.savedMetaInfo.getFileName());
    assertEquals(SELENIUM_RECORDING_ID_KEY, attachmentAttributeKey.get());
  }

  @Test
  void doNotSkipsWhenLogAlreadyHasAttachment() {
    AttachmentBinaryDataServiceStub attachmentService = new AttachmentBinaryDataServiceStub();
    Log log = new Log();
    log.setId(11L);
    log.setUuid("log-uuid");
    log.setProjectId(7L);
    log.setAttachment(new Attachment());
    Launch launch = new Launch();
    launch.setId(3L);
    launch.setUuid("launch-uuid");

    LoadExternalAttachmentCommand command = new LoadExternalAttachmentCommand(
        new MobitruRecordingClient(null) {
          @Override
          public RecordingAttachmentData downloadRecording(Integration integration,
              String attachmentExternalId, String attributeKey) {
            return new RecordingAttachmentData("session.mp4", "video/mp4", "video".getBytes());
          }
        },
        repositoryProxy(LogRepository.class, log),
        repositoryProxy(LaunchRepository.class, launch),
        attachmentService,
        null, null, null, null,
        new ObjectMapper());

    command.executeCommand(new Integration(), new PluginCommandRQ(null, params()));

    assertEquals(1, attachmentService.saveCalls);
  }

  private Map<String, Object> params() {
    Map<String, Object> params = new HashMap<>();
    params.put(LoadExternalAttachmentCommand.LOG_ID_PARAM, 11L);
    params.put(LoadExternalAttachmentCommand.PROJECT_ID_PARAM, 7L);
    params.put(LoadExternalAttachmentCommand.LAUNCH_ID_PARAM, 3L);
    params.put(LoadExternalAttachmentCommand.TEST_ITEM_ID_PARAM, 5L);
    params.put(LoadExternalAttachmentCommand.ATTACHMENT_EXTERNAL_ID_PARAM, "rec-1");
    params.put(LoadExternalAttachmentCommand.ATTACHMENT_ATTRIBUTE_KEY_PARAM,
        SELENIUM_RECORDING_ID_KEY);
    return params;
  }

  @SuppressWarnings("unchecked")
  private <T> T repositoryProxy(Class<T> type, Object entity) {
    return (T) Proxy.newProxyInstance(type.getClassLoader(), new Class<?>[]{type},
        (proxy, method, args) -> switch (method.getName()) {
          case "findById" -> Optional.ofNullable(entity);
          case "hashCode" -> System.identityHashCode(proxy);
          case "equals" -> proxy == args[0];
          case "toString" -> type.getSimpleName() + "Proxy";
          default -> defaultValue(method.getReturnType());
        });
  }

  private Object defaultValue(Class<?> type) {
    if (!type.isPrimitive()) {
      return null;
    }
    if (type == boolean.class) {
      return false;
    }
    if (type == char.class) {
      return '\0';
    }
    return 0;
  }

  private static class AttachmentBinaryDataServiceStub implements AttachmentBinaryDataService {

    private int saveCalls;
    private MultipartFile savedFile;
    private AttachmentMetaInfo savedMetaInfo;

    @Override
    public Optional<BinaryDataMetaInfo> saveAttachment(AttachmentMetaInfo attachmentMetaInfo,
        MultipartFile file) {
      return Optional.empty();
    }

    @Override
    public void saveFileAndAttachToLog(MultipartFile file, AttachmentMetaInfo attachmentMetaInfo) {
      saveCalls++;
      savedFile = file;
      savedMetaInfo = attachmentMetaInfo;
    }

    @Override
    public void attachToLog(BinaryDataMetaInfo binaryDataMetaInfo,
        AttachmentMetaInfo attachmentMetaInfo) {
    }

    @Override
    public BinaryData load(Long fileId, MembershipDetails membershipDetails) {
      return null;
    }

    @Override
    public void delete(String fileId) {
    }

    @Override
    public void deleteAllByProjectId(Long projectId) {
    }
  }
}
