/*
 * Copyright 2025 EPAM Systems
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

package com.epam.reportportal.extension.mobitru;

import static com.epam.reportportal.extension.util.PluginManifestUtils.readPluginIdFromManifest;

import com.epam.reportportal.base.core.events.domain.PluginDeletedEvent;
import com.epam.reportportal.base.infrastructure.persistence.dao.IntegrationRepository;
import com.epam.reportportal.base.infrastructure.persistence.dao.IntegrationTypeRepository;
import com.epam.reportportal.extension.CommonPluginCommand;
import com.epam.reportportal.extension.PluginCommand;
import com.epam.reportportal.extension.ReportPortalExtensionPoint;
import com.epam.reportportal.extension.mobitru.event.handler.PluginDeletedEventHandler;
import com.epam.reportportal.extension.mobitru.event.listener.PluginDeletedEventListener;
import com.epam.reportportal.extension.mobitru.utils.MemoizingSupplier;
import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Supplier;
import javax.sql.DataSource;
import lombok.extern.slf4j.Slf4j;
import org.pf4j.Extension;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ApplicationEventMulticaster;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Service;

/**
 * @author Andrei Piankouski
 */
@Extension
@Service
@Slf4j
public class MobitruPluginExtension implements ReportPortalExtensionPoint, DisposableBean {

  private static final String DEFAULT_PLUGIN_ID = "mobitru";
  public final String pluginId;

  private final Supplier<Map<String, PluginCommand<?>>> pluginCommandMapping =
      new MemoizingSupplier<>(this::getCommands);

  private final Supplier<Map<String, CommonPluginCommand<?>>> commonPluginCommandMapping =
      new MemoizingSupplier<>(this::getCommonCommands);

  private final Supplier<ApplicationListener<PluginDeletedEvent>> pluginDeletedListener;

  @Autowired
  private ApplicationContext applicationContext;
  @Autowired
  private IntegrationTypeRepository integrationTypeRepository;
  @Autowired
  private IntegrationRepository integrationRepository;
  @Autowired
  private DataSource dataSource;

  public MobitruPluginExtension() {
    this.pluginId = readPluginIdFromManifest(this.getClass(), DEFAULT_PLUGIN_ID);
    pluginDeletedListener = new MemoizingSupplier<>(() -> new PluginDeletedEventListener(
        pluginId,
        new PluginDeletedEventHandler(integrationTypeRepository, integrationRepository)
    ));
  }

  @PostConstruct
  public void initializePlugin() throws IOException {
    initListeners();
    executeMigrationScripts();
  }

  private void executeMigrationScripts() throws IOException {
    try {
      PathMatchingResourcePatternResolver resolver =
          new org.springframework.core.io.support.PathMatchingResourcePatternResolver(this.getClass().getClassLoader());
      Resource[] resources = resolver.getResources("classpath:resources/schema/*.sql");
      if (resources.length == 0) {
        log.warn("No SQL migration scripts found in classpath:resources/schema/*.sql");
        return;
      }
      ResourceDatabasePopulator resourceDatabasePopulator = new ResourceDatabasePopulator(resources);
      resourceDatabasePopulator.execute(dataSource);
    } catch (Exception e) {
      throw new IOException("Failed to execute migration scripts", e);
    }
  }

  private void initListeners() {
    ApplicationEventMulticaster applicationEventMulticaster = applicationContext.getBean(
        AbstractApplicationContext.APPLICATION_EVENT_MULTICASTER_BEAN_NAME,
        ApplicationEventMulticaster.class
    );
    applicationEventMulticaster.addApplicationListener(pluginDeletedListener.get());
  }

  @Override
  public void destroy() {
    removeListeners();
  }

  private void removeListeners() {
    ApplicationEventMulticaster applicationEventMulticaster = applicationContext.getBean(
        AbstractApplicationContext.APPLICATION_EVENT_MULTICASTER_BEAN_NAME,
        ApplicationEventMulticaster.class
    );
    applicationEventMulticaster.removeApplicationListener(pluginDeletedListener.get());
  }

  @Override
  public Map<String, ?> getPluginParams() {
    Map<String, Object> params = new HashMap<>();
    params.put(ALLOWED_COMMANDS, new ArrayList<>(pluginCommandMapping.get().keySet()));
    params.put(COMMON_COMMANDS, new ArrayList<>(commonPluginCommandMapping.get().keySet()));
    return params;
  }

  @Override
  public CommonPluginCommand<?> getCommonCommand(String commandName) {
    return commonPluginCommandMapping.get().get(commandName);
  }

  @Override
  public PluginCommand<?> getIntegrationCommand(String commandName) {
    return pluginCommandMapping.get().get(commandName);
  }

  private Map<String, PluginCommand<?>> getCommands() {
    return new HashMap<>();
  }

  private Map<String, CommonPluginCommand<?>> getCommonCommands() {
    return new HashMap<>();
  }
}
