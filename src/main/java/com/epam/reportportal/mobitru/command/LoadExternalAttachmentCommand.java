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

import com.epam.reportportal.api.model.PluginCommandRQ;
import com.epam.reportportal.base.infrastructure.persistence.binary.AttachmentBinaryDataService;
import com.epam.reportportal.base.infrastructure.persistence.dao.LaunchRepository;
import com.epam.reportportal.base.infrastructure.persistence.dao.LogRepository;
import com.epam.reportportal.base.infrastructure.persistence.dao.ProjectRepository;
import com.epam.reportportal.base.infrastructure.persistence.dao.ProjectUserRepository;
import com.epam.reportportal.base.infrastructure.persistence.dao.organization.OrganizationRepository;
import com.epam.reportportal.base.infrastructure.persistence.dao.organization.OrganizationUserRepository;
import com.epam.reportportal.base.infrastructure.persistence.entity.attachment.AttachmentMetaInfo;
import com.epam.reportportal.base.infrastructure.persistence.entity.integration.Integration;
import com.epam.reportportal.base.infrastructure.persistence.entity.item.TestItem;
import com.epam.reportportal.base.infrastructure.persistence.entity.launch.Launch;
import com.epam.reportportal.base.infrastructure.persistence.entity.log.Log;
import com.epam.reportportal.extension.command.AbstractExtensionCommand;
import com.epam.reportportal.mobitru.client.MobitruRecordingClient;
import com.epam.reportportal.mobitru.file.ByteArrayMultipartFile;
import com.epam.reportportal.mobitru.model.RecordingAttachmentData;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.Instant;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.MediaType;

/**
 * Downloads a Mobitru recording and attaches it to an existing ReportPortal log.
 */
@Slf4j
public class LoadExternalAttachmentCommand extends AbstractExtensionCommand<Void> {

  public static final String COMMAND_NAME = "loadExternalAttachment";
  public static final String LOG_ID_PARAM = "logId";
  public static final String PROJECT_ID_PARAM = "projectId";
  public static final String LAUNCH_ID_PARAM = "launchId";
  public static final String TEST_ITEM_ID_PARAM = "testItemId";
  public static final String ATTACHMENT_EXTERNAL_ID_PARAM = "attachmentExternalId";
  public static final String ATTACHMENT_ATTRIBUTE_KEY_PARAM = "attachmentAttributeKey";

  private static final String DEFAULT_FILE_NAME = "mobitru-recording";

  private final MobitruRecordingClient recordingClient;
  private final LogRepository logRepository;
  private final LaunchRepository launchRepository;
  private final AttachmentBinaryDataService attachmentBinaryDataService;
  private final ObjectMapper objectMapper;

  public LoadExternalAttachmentCommand(MobitruRecordingClient recordingClient,
      LogRepository logRepository, LaunchRepository launchRepository,
      AttachmentBinaryDataService attachmentBinaryDataService,
      ProjectRepository projectRepository, OrganizationUserRepository organizationUserRepository,
      OrganizationRepository organizationRepository, ProjectUserRepository projectUserRepository,
      ObjectMapper objectMapper) {
    super(projectRepository, organizationUserRepository, organizationRepository,
        projectUserRepository);
    this.recordingClient = recordingClient;
    this.logRepository = logRepository;
    this.launchRepository = launchRepository;
    this.attachmentBinaryDataService = attachmentBinaryDataService;
    this.objectMapper = objectMapper;
  }

  @Override
  public Void executeCommand(Integration integration, PluginCommandRQ pluginCommandRq) {
    Map<String, Object> params = pluginCommandRq.getArguments();
    Long logId = resolveLong(params, LOG_ID_PARAM);
    String attachmentExternalId = resolveString(params, ATTACHMENT_EXTERNAL_ID_PARAM);

    if (logId == null || StringUtils.isBlank(attachmentExternalId)) {
      log.warn("Skipping Mobitru attachment load: command params are incomplete");
      return null;
    }

    var rpLog = logRepository.findById(logId);
    if (rpLog.isEmpty()) {
      log.warn("Skipping Mobitru attachment load for rpLog {}: rpLog was not found", logId);
      return null;
    }

    Log logEntity = rpLog.get();

    Long projectId = resolveProjectId(params, logEntity);
    if (projectId == null) {
      log.warn("Skipping Mobitru attachment load for rpLog {}: projectId could not be resolved",
          logId);
      return null;
    }

    Launch launch = resolveLaunch(params, logEntity).orElse(null);
    if (launch == null || StringUtils.isBlank(launch.getUuid())) {
      log.warn("Skipping Mobitru attachment load for rpLog {}: launch could not be resolved",
          logId);
      return null;
    }

    String attachmentAttributeKey = resolveString(params, ATTACHMENT_ATTRIBUTE_KEY_PARAM);

    RecordingAttachmentData attachmentData = recordingClient.downloadRecording(integration,
        attachmentExternalId, attachmentAttributeKey);

    byte[] content = attachmentData.content();
    if (content == null || content.length == 0) {
      log.warn("Skipping Mobitru attachment load for rpLog {}: downloaded file is empty", logId);
      return null;
    }

    String fileName = resolveFileName(attachmentData, attachmentExternalId);
    String contentType = Optional.ofNullable(attachmentData.contentType())
        .orElse(MediaType.APPLICATION_OCTET_STREAM_VALUE);

    attachmentBinaryDataService.saveFileAndAttachToLog(
        new ByteArrayMultipartFile(resolveMultipartFieldName(fileName), fileName, contentType,
            content),
        AttachmentMetaInfo.builder()
            .withProjectId(projectId)
            .withLaunchId(launch.getId())
            .withItemId(resolveTestItemId(params, logEntity))
            .withLogId(logEntity.getId())
            .withLaunchUuid(launch.getUuid())
            .withLogUuid(logEntity.getUuid())
            .withFileName(fileName)
            .withCreationDate(Optional.ofNullable(logEntity.getLogTime()).orElse(Instant.now()))
            .build());
    return null;
  }

  @Override
  public String getName() {
    return COMMAND_NAME;
  }

  private Long resolveProjectId(Map<String, Object> params, Log logEntity) {
    Long projectId = resolveLong(params, PROJECT_ID_PARAM);
    return projectId != null ? projectId : logEntity.getProjectId();
  }

  private Optional<Launch> resolveLaunch(Map<String, Object> params, Log logEntity) {
    Long launchId = resolveLong(params, LAUNCH_ID_PARAM);
    if (launchId == null && logEntity.getLaunch() != null) {
      launchId = logEntity.getLaunch().getId();
    }
    if (launchId == null && logEntity.getTestItem() != null) {
      launchId = logEntity.getTestItem().getLaunchId();
    }
    if (launchId == null) {
      return Optional.empty();
    }
    if (logEntity.getLaunch() != null && Objects.equals(logEntity.getLaunch().getId(), launchId)) {
      return Optional.of(logEntity.getLaunch());
    }
    return launchRepository.findById(launchId);
  }

  private Long resolveTestItemId(Map<String, Object> params, Log logEntity) {
    Long testItemId = resolveLong(params, TEST_ITEM_ID_PARAM);
    if (testItemId != null) {
      return testItemId;
    }
    TestItem testItem = logEntity.getTestItem();
    return testItem == null ? null : testItem.getItemId();
  }

  private Long resolveLong(Map<String, Object> params, String key) {
    if (params == null) {
      return null;
    }
    Object value = params.get(key);
    if (value == null) {
      return null;
    }
    if (value instanceof Number number) {
      return number.longValue();
    }
    try {
      return Long.parseLong(value.toString());
    } catch (NumberFormatException e) {
      log.warn("Unable to parse '{}' command parameter value '{}' as long", key, value);
      return null;
    }
  }

  private String resolveString(Map<String, Object> params, String key) {
    if (params == null) {
      return null;
    }
    Object value = params.get(key);
    return value == null ? null : value.toString();
  }

  private String resolveFileName(RecordingAttachmentData attachmentData,
      String attachmentExternalId) {
    return Optional.ofNullable(attachmentData.fileName()).orElse(attachmentExternalId);
  }

  private String resolveMultipartFieldName(String fileName) {
    String baseName = StringUtils.substringBeforeLast(fileName, ".");
    return StringUtils.defaultIfBlank(baseName, DEFAULT_FILE_NAME);
  }
}
