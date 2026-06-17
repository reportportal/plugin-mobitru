/*
 * Copyright 2024 EPAM Systems
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

package com.epam.reportportal.mobitru.client;

import com.epam.reportportal.mobitru.model.IntegrationProperties;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import lombok.Getter;
import org.jasypt.util.text.BasicTextEncryptor;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.web.client.RestTemplate;

@Getter
public class RestClientBuilder {

  private final RestTemplate restTemplate = new RestTemplateBuilder().build();
  private final BasicTextEncryptor textEncryptor;

  public RestClientBuilder(BasicTextEncryptor textEncryptor) {
    this.textEncryptor = textEncryptor;
  }

  public String bearerAuthHeader(IntegrationProperties sp) {
    return "Bearer " + textEncryptor.decrypt(sp.getApiKey());
  }

  public String basicAuthHeader(IntegrationProperties sp) {
    String credentials = sp.getBillingUnit() + ":" + textEncryptor.decrypt(sp.getApiKey());
    String encodedCredentials = Base64.getEncoder()
        .encodeToString(credentials.getBytes(StandardCharsets.UTF_8));
    return "Basic " + encodedCredentials;
  }
}
