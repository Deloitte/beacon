import { Core } from '../core';
import { IConfig } from '../interfaces';
import Logger from './logger';
import { LocalStorage } from './storage';
import { UUID, getTimestamp } from './utils';

export default class SessionController {
  private config: IConfig;
  private core: Core;
  public logger: Logger;
  public sessionId?: string;
  public session?: any;

  constructor(config: IConfig, core: Core) {
    this.config = config;
    this.core = core;
    this.logger = new Logger({
      name: 'SessionController',
      isEnabled: this.config.log && this.config.settings.session.log,
    });
  }

  public async init() {
    const storage = new LocalStorage();

    // Check if a session exists
    this.session = await storage.getJson(
      this.config.settings.session.storeName
    );

    if (this.session) {
      const now = getTimestamp();

      if (
        now - this.session.lastEvent >=
        this.config.settings.session.duration
      ) {
        this.logger.debug(`Session timeout exceeded, starting new session`);

        await this.startSession(this.session);
      } else {
        this.logger.debug(
          `Session active and not timed out, extending session ${this.session.sessionId}`
        );

        this.extendSession({
          ...this.session,
          lastEvent: now,
        });
      }
    } else {
      this.logger.debug('No active session');
      await this.startSession();
    }
  }

  public async trackSessionEnd(session: any) {
    if (this.config.settings.session.trackEvents) {
      await this.core.processActivity('session', 'SessionEnded', session);
    }
  }

  private async trackSessionStart(session: any) {
    if (this.config.settings.session.trackEvents) {
      await this.core.processActivity('session', 'SessionStarted', session);
    }
  }

  public async startSession(oldSession: any = undefined) {
    const now = getTimestamp();

    if (oldSession) {
      await this.trackSessionEnd(oldSession);
    }

    // Set the sessionId so we can use it in core as needed
    this.sessionId = UUID();

    const sessionData = {
      sessionId: this.sessionId,
      firstEvent: now,
      lastEvent: now,
    };

    // Save the session to LocalStorage
    await new LocalStorage().setJson(
      this.config.settings.session.storeName,
      sessionData
    );

    // Now, let's track the new session start
    await this.trackSessionStart(sessionData);
  }

  public async extendSession(properties: any) {
    // Set the sessionId so we can use it in core as needed
    this.sessionId = properties.sessionId;

    await new LocalStorage().setJson(
      this.config.settings.session.storeName,
      properties
    );
  }
}
