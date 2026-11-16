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

package com.epam.reportportal.mobitru.client;

import com.epam.reportportal.base.infrastructure.rules.exception.ErrorType;
import com.epam.reportportal.base.infrastructure.rules.exception.ReportPortalException;
import java.time.Duration;
import java.util.function.Supplier;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.client.RestClientException;

/**
 * Runs an operation with a fixed number of attempts and a fixed delay between attempts,
 * retrying only on {@link RestClientException}.
 */
@Slf4j
public class RetryExecutor {

  static final int DEFAULT_MAX_ATTEMPTS = 3;
  static final Duration DEFAULT_RETRY_DELAY = Duration.ofSeconds(10);

  private final int maxAttempts;
  private final Duration retryDelay;

  public RetryExecutor() {
    this(DEFAULT_MAX_ATTEMPTS, DEFAULT_RETRY_DELAY);
  }

  public RetryExecutor(int maxAttempts, Duration retryDelay) {
    this.maxAttempts = maxAttempts;
    this.retryDelay = retryDelay;
  }

  /**
   * Runs {@code operation}, retrying on {@link RestClientException} up to {@code maxAttempts}
   * times with {@code retryDelay} between attempts.
   *
   * @param operationDescription human-readable description used in log messages and the
   *                             exception raised when the retrying thread is interrupted
   * @param operation            the operation to run
   * @return the result of the first successful attempt
   * @throws RestClientException if every attempt fails
   */
  public <T> T execute(String operationDescription, Supplier<T> operation) {
    for (int attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return operation.get();
      } catch (RestClientException e) {
        if (attempt == maxAttempts) {
          throw e;
        }
        log.warn("Attempt {}/{} to {} failed, retrying in {}s", attempt, maxAttempts,
            operationDescription, retryDelay.getSeconds(), e);
        sleep(operationDescription);
      }
    }
    throw new IllegalStateException("Unable to " + operationDescription);
  }

  private void sleep(String operationDescription) {
    try {
      Thread.sleep(retryDelay.toMillis());
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
      throw new ReportPortalException(ErrorType.UNABLE_INTERACT_WITH_INTEGRATION,
          "Interrupted while retrying " + operationDescription + ".");
    }
  }
}