// Copyright 2025-2026 Deloitte Development LLC
// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/

import Logger from '../lib/logger';
import { Core } from '../core';

export default class BaseTracker {
  public parent: (Window & typeof globalThis) | Document;
  public core: Core;
  public logger: Logger;
  public enabled: boolean;

  public track?(...props: any): void;
  public init?(): void;

  constructor(
    parent: (Window & typeof globalThis) | Document,
    core: Core,
    logContext: string
  ) {
    this.parent = parent;
    this.core = core;
    this.logger = new Logger({
      name: logContext,
      isEnabled: this.core.config.log,
    });
    this.enabled = true;
  }

  public sendTrack(type: string, event: any, properties?: any) {
    this.logger.debug('track', { type, event, properties });
    if (this.core) {
      this.core.processActivity(type, event, properties);
    }
  }
}
