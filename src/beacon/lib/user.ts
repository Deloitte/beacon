import { Core } from '../core';
import { IConfig } from '../interfaces';
import Logger from './logger';
import { LocalStorage } from './storage';
import { UUID } from './utils';

export default class UserController {
  private config: IConfig;
  private core: Core;
  public logger: Logger;
  public userId?: string;

  constructor(config: IConfig, core: Core) {
    this.config = config;
    this.core = core;
    this.logger = new Logger({
      name: 'UserController',
      isEnabled: this.config.log && this.config.settings.user.log,
    });
  }

  public async identify(externalId: string, traits?: any) {
    let userEvent = {
      external_id: externalId,
      type: 'identified',
    };

    if (traits) {
      userEvent = {
        ...userEvent,
        ...traits,
      };
    }

    await this.core.processActivity('identity', 'identified', userEvent);
  }

  private async seedAnonymous(storage: LocalStorage) {
    // Seed identity (we'll use an anonymous blueprint record as the source)
    this.logger.debug('Seeding anonymous identity');

    // Create a unique UUID
    this.userId = UUID();

    // The data event we'll send for both analytics and storage
    const userEvent = {
      id: this.userId,
      type: 'anonymous',
    };

    if (this.config.settings.user.trackEvents) {
      // Track an identify event
      await this.core.processActivity('identity', 'anonymous', userEvent);
    }

    // Save that UUID into the user storage
    await storage.setJson(this.config.settings.user.storeName, userEvent);
  }

  private async attemptIdentity(storage: LocalStorage) {
    if (this.config.settings.user.seedAnonymous) {
      // If we are set to seed anonymous users
      await this.seedAnonymous(storage);
    }

    // If assumeIdentity is set, then let's try to do that first
    // if (this.config.settings.user.assumeIdentity) {
    //   const { type, key } = this.config.settings.user.assumeIdentity;
    // // Assume identity (often from a cookie or header)
    // this.logger.debug(`Assuming identity via ${type} with ${key}`);
    // let self = this;
    // let identityValue;
    // if (type === 'window') {
    //   setTimeout(function () {
    //     // @ts-ignore
    //     identityValue = parent[key];
    //     if (identityValue) {
    //       self.core.processIdentity('identity', 'assume', {
    //         type,
    //         key,
    //         value: identityValue,
    //       });
    //     }
    //   }, 1000);
    // }
    // if (type === 'cookie') {
    //   identityValue = readCookie(key);
    //   if (identityValue) {
    //     this.logger.debug(`${type} of key ${key} found as ${identityValue}`);
    //     this.track('identity', 'assume', {
    //       type,
    //       key,
    //       value: identityValue,
    //     });
    //   } else {
    //     this.logger.debug(
    //       `${type} of key ${key} was not present, will retry`
    //     );
    //   }
    // }
    // }
  }

  public async init() {
    const storage = new LocalStorage();

    // Check if a user exists in the store
    const user = await storage.getJson(this.config.settings.user.storeName);

    // If there is no ID or Token, we need to set one
    if (!user) {
      await this.attemptIdentity(storage);
    } else {
      this.userId = user.id;
      this.logger.debug(`identity is set as ${this.userId}`);
    }
  }
}
