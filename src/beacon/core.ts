import Logger from './lib/logger';
import { IConfig, IPayload } from './interfaces';
import { getNow } from './lib/utils';
import SessionController from './lib/session';
import UserController from './lib/user';
import { applyIdentityStrategy, getDefaultSettings } from './lib/settings';
import PageTracker from './trackers/page';
import ClickTracker from './trackers/click';
import FormTracker from './trackers/form';

let self: Core;

class Core {
  public loaded: boolean;
  public enabled: boolean;
  public config: IConfig;
  public window: Window & typeof globalThis;
  public logger: Logger;
  public trackers: Map<string, PageTracker | ClickTracker | FormTracker>;
  public context: any;
  private sessionController: SessionController;
  private userController: UserController;

  constructor(window: Window & typeof globalThis, queue: Array<any> = []) {
    self = this;
    // By setting loaded as false, we make sure we wait until this function is full loaded before performing next steps
    this.loaded = false;
    this.enabled = false;
    this.window = window;
    this.trackers = new Map();

    this.config = {
      log: false,
      identity: 'noPii',
      apiRoot: 'http://localhost',
      settings: getDefaultSettings(false, 'noPii'),
      trackers: [],
    };

    this.logger = new Logger({
      name: 'Core',
      isEnabled: false,
    });

    // Register the session controller
    this.sessionController = new SessionController(this.config, this);
    this.userController = new UserController(this.config, this);
  }

  public getConfig() {
    return this.config;
  }

  // This function will loop through the trackers you enabled in the `trackers` field in the config
  // and will create them, and init them for their initial run or hooking onto elements of a page.
  // If you want to add a new tracker, this is the place to initialize it.
  private async registerTrackers() {
    for (const trackerName of this.config.trackers) {
      switch (trackerName) {
        case 'page':
          this.trackers.set('page', new PageTracker(this.window, this));
          break;
        case 'click':
          this.trackers.set('click', new ClickTracker(this.window, this));
          break;
        case 'form':
          this.trackers.set('form', new FormTracker(this.window, this));
          break;
        default:
          this.logger!.warn(
            `Tracker ${trackerName} doesnt exist and cannot be registered`
          );
          break;
      }
    }

    // Now that we have loaded all trackers, let's init them
    this.trackers.forEach(async (tracker) => {
      tracker.init && (await tracker.init());
    });
  }

  // This function will init the full core, which will apply the config that is passed in
  // It will also register and init user and session controllers and every configured tracker
  public async init(config?: IConfig) {
    if (config) {
      this.applyConfig(config);
    }

    // If user tracking is enabled
    if (this.config.settings.user.enabled) await this.userController.init();

    // If sessions are enabled
    if (this.config.settings.session.enabled)
      await this.sessionController.init();

    // Register all of our trackers
    await this.registerTrackers();

    this.loaded = true;
  }

  private mergeConfig(current: any, update: any) {
    Object.keys(update).forEach((key) => {
      // if update[key] exist, and it's not a string or array,
      // we go in one level deeper
      if (
        current.hasOwnProperty(key) &&
        typeof current[key] === 'object' &&
        !(current[key] instanceof Array)
      ) {
        this.mergeConfig(current[key], update[key]);

        // if update[key] doesn't exist in current, or it's a string
        // or array, then assign/overwrite current[key] to update[key]
      } else {
        current[key] = update[key];
      }
    });
    return current;
  }

  public applyConfig(config: IConfig) {
    this.mergeConfig(this.config, config);

    // If we've enabled logging, then we want to enable the logger
    this.logger.isEnabled = this.config.log;

    this.logger.debug('config loaded', config);
    this.logger.debug('version [VI]{version}, built on {date}[/VI]');

    // In this case we want to force the identity
    // strategy over top of any settings
    this.config.settings = applyIdentityStrategy(
      this.config.settings,
      this.config.identity
    );

    // Fix apiRoot if it ends with a /, remove it
    if (this.config.apiRoot.endsWith('/')) {
      this.config.apiRoot = this.config.apiRoot.slice(0, -1);
    }

    this.enabled = true;
  }

  public identify(externalId: string, traits?: any) {
    this.userController.identify(externalId, traits);
  }

  public track(type: string, event: string, properties: any) {
    if (type === 'track' || type === 'event') {
      this.processActivity(type, event, properties);
    } else if (type === 'click') {
      let tracker = this.trackers.get(type) as ClickTracker;
      if (!tracker) {
        tracker = new ClickTracker(this.window, this);
      }
      // @TODO: Will need to revisit this
      // In this case, properties, is the element itself
      // tracker.track(event, properties);
    } else if (type === 'page') {
      let tracker = this.trackers.get(type) as PageTracker;
      if (!tracker) {
        tracker = new PageTracker(this.window, this);
      }
      tracker.track();
    } else if (type === 'form') {
      const tracker = this.trackers.get(type) as FormTracker;
      tracker?.track && tracker.track();
    } else {
      this.logger.warn(`track type of ${type} doesn't exist`);
    }
  }

  public trackClick(e: Element) {
    self.track('click', `Link`, e);
  }

  public trackButtonClick(e: Element) {
    self.track('click', `Button`, e);
  }

  public trackCurrentPage() {
    self.track('page', 'PageViewed', {});
  }

  public autoTrack() {
    this.trackers.forEach((tracker) => {
      tracker.track && tracker.track();
    });
  }

  public async processActivity(type: string, event: any, properties?: any) {
    const {
      screen: { width, height },
      navigator: { language, userAgent },
      location: { hostname, pathname, search },
      document,
    } = window;

    let context: any = {
      channel: 'web',
      screen: `${width}x${height}`,
      language,
      url: `${pathname}${search}`,
      referrer: document.referrer,
      hostname,
    };

    // If we also need to track userAgent, then we'll add it, although this is disabled by default
    if (this.config.settings.context.trackUserAgent) {
      context = {
        ...context,
        userAgent,
      };
    }

    // Get a User if one exists and add it to the context
    if (this.userController && this.userController.userId) {
      context = {
        userId: this.userController.userId,
        ...context,
      };
    }

    // Get a Session if one exists and add it to the context
    if (this.sessionController && this.sessionController.sessionId) {
      context = {
        sessionId: this.sessionController.sessionId,
        ...context,
      };
    }

    // Set a detailed context to support better data enrichment
    const payload = {
      type: type,
      event: event,
      properties: properties,
      context: context,
      originalTimestamp: getNow(),
    };

    this.logger.debug('sendToApi', payload);
    await this.sendActivity(payload);
  }

  public async sendActivity(payload: IPayload) {
    // Note: removed localStorage queue for now

    // This is used for out of the box beacon usage
    if (this.config.settings.transport.method === 'sendBeacon') {
      const payloadBlob = new Blob([JSON.stringify(payload)]);

      navigator.sendBeacon(
        `${this.config.apiRoot}${this.config.settings.transport.apiRoute}`,
        payloadBlob
      );
    }
  }
}

export { Core };
