/*
 * Copyright 2019 EPAM Systems
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

package com.epam.reportportal.mobitru;

import com.epam.reportportal.base.infrastructure.persistence.binary.AttachmentBinaryDataService;
import com.epam.reportportal.base.infrastructure.persistence.dao.LaunchRepository;
import com.epam.reportportal.base.infrastructure.persistence.dao.LogRepository;
import com.epam.reportportal.base.infrastructure.persistence.dao.ProjectRepository;
import com.epam.reportportal.base.infrastructure.persistence.dao.ProjectUserRepository;
import com.epam.reportportal.base.infrastructure.persistence.dao.organization.OrganizationRepository;
import com.epam.reportportal.base.infrastructure.persistence.dao.organization.OrganizationUserRepository;
import com.epam.reportportal.extension.CommonPluginCommand;
import com.epam.reportportal.extension.PluginCommand;
import com.epam.reportportal.extension.ReportPortalExtensionPoint;
import com.epam.reportportal.extension.command.ExtensionCommand;
import com.epam.reportportal.extension.util.MemoizingSupplier;
import com.epam.reportportal.mobitru.client.MobitruRecordingClient;
import com.epam.reportportal.mobitru.client.RestClientBuilder;
import com.epam.reportportal.mobitru.command.GetDevicesCommand;
import com.epam.reportportal.mobitru.command.LoadExternalAttachmentCommand;
import com.epam.reportportal.mobitru.command.TestConnectionCommand;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableMap;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Supplier;
import org.jasypt.util.text.BasicTextEncryptor;
import org.pf4j.Extension;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author <a href="mailto:pavel_bortnik@epam.com">Pavel Bortnik</a>
 */
@Extension
public class MobitruExtension implements ReportPortalExtensionPoint {

  private static final String DOCUMENTATION_LINK_FIELD = "documentationLink";
  private static final String DOCUMENTATION_LINK = "https://reportportal.io/docs/plugins/Mobitru";

  private static final String NAME_FIELD = "name";

  private static final String PLUGIN_NAME = "Mobitru";

  private final Supplier<Map<String, ExtensionCommand<?>>> extensionCommandMapping =
      new MemoizingSupplier<>(this::getExtensionCommands);

  private final Supplier<RestClientBuilder> restClientSupplier;
  private final Supplier<MobitruRecordingClient> recordingClientSupplier;
  private final Supplier<ObjectMapper> objectMapperSupplier;

  @Autowired
  private BasicTextEncryptor basicEncryptor;

  @Autowired
  private AttachmentBinaryDataService attachmentBinaryDataService;

  @Autowired
  private LogRepository logRepository;

  @Autowired
  private LaunchRepository launchRepository;

  @Autowired
  private ProjectRepository projectRepository;

  @Autowired
  private OrganizationUserRepository organizationUserRepository;

  @Autowired
  private OrganizationRepository organizationRepository;

  @Autowired
  private ProjectUserRepository projectUserRepository;

  @Autowired
  private ObjectMapper objectMapper;

  public MobitruExtension() {
    restClientSupplier = new MemoizingSupplier<>(() -> new RestClientBuilder(basicEncryptor));
    recordingClientSupplier = new MemoizingSupplier<>(
        () -> new MobitruRecordingClient(restClientSupplier.get()));
    objectMapperSupplier = new MemoizingSupplier<>(() -> objectMapper);
  }

  @Override
  public Map<String, ?> getPluginParams() {
    Map<String, Object> params = new HashMap<>();
    params.put(ALLOWED_COMMANDS, new ArrayList<>(extensionCommandMapping.get().keySet()));
    params.put(DOCUMENTATION_LINK_FIELD, DOCUMENTATION_LINK);
    params.put(NAME_FIELD, PLUGIN_NAME);
    return params;
  }

  @Override
  public CommonPluginCommand<?> getCommonCommand(String commandName) {
    return null;
  }

  @Override
  public PluginCommand<?> getIntegrationCommand(String commandName) {
    return null;
  }

  @Override
  public Map<String, ExtensionCommand<?>> getIntegrationExtensionCommands() {
    return extensionCommandMapping.get();
  }

  private Map<String, ExtensionCommand<?>> getExtensionCommands() {
    return ImmutableMap.<String, ExtensionCommand<?>>builder()
        .put("testConnection",
            new TestConnectionCommand(restClientSupplier.get(), projectRepository,
                organizationUserRepository, organizationRepository, projectUserRepository))
        .put("getDevices", new GetDevicesCommand(restClientSupplier.get(), projectRepository,
            organizationUserRepository, organizationRepository, projectUserRepository))
        .put(LoadExternalAttachmentCommand.COMMAND_NAME,
            new LoadExternalAttachmentCommand(recordingClientSupplier.get(), logRepository,
                launchRepository, attachmentBinaryDataService, projectRepository,
                organizationUserRepository, organizationRepository, projectUserRepository, objectMapperSupplier.get()))
        .build();
  }
}
