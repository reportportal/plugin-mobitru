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

import com.epam.reportportal.extension.CommonPluginCommand;
import com.epam.reportportal.extension.PluginCommand;
import com.epam.reportportal.extension.ReportPortalExtensionPoint;
import com.epam.reportportal.mobitru.command.TestConnectionCommand;
import com.google.common.collect.ImmutableMap;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Supplier;
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

  private final Supplier<Map<String, PluginCommand<?>>> pluginCommandMapping = new MemoizingSupplier<>(
      this::getCommands);

  @Override
  public Map<String, ?> getPluginParams() {
    Map<String, Object> params = new HashMap<>();
    params.put(ALLOWED_COMMANDS, new ArrayList<>(pluginCommandMapping.get().keySet()));
    params.put(DOCUMENTATION_LINK_FIELD, DOCUMENTATION_LINK);
    params.put(NAME_FIELD, PLUGIN_NAME);
    return params;
  }

  @Override
  public CommonPluginCommand getCommonCommand(String commandName) {
    throw new UnsupportedOperationException("Plugin commands are not supported");
  }

  @Override
  public PluginCommand getIntegrationCommand(String commandName) {
    return pluginCommandMapping.get().get(commandName);
  }

  private Map<String, PluginCommand<?>> getCommands() {
    return ImmutableMap.<String, PluginCommand<?>>builder()
        .put("testConnection", new TestConnectionCommand())
        .build();
  }
}
