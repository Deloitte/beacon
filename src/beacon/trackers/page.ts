import BaseTracker from './base';
import { PAGE_AUTOTRACK_DELAY } from '../lib/constants';
import { Core } from '../core';
import {
  getPageName,
  getPageEntityProperties,
  getPageProperties,
} from '../lib/meta';

export default class PageTracker extends BaseTracker {
  constructor(parent: (Window & typeof globalThis) | Document, core: Core) {
    super(parent, core, 'PageTracker');
  }

  // The page tracker by default will init and track a page view as soon as it loads
  public async init() {
    // Delay load slightly just to free up the main thread
    await this.waitForIt();

    // Setup listeners to handle state changes (e.g. from a SPA like React)
    await this.handleStates();

    await this.track();
  }

  private async handleStates() {
    // Override PushState
    const oldPushState = history.pushState;
    history.pushState = function pushState(...args) {
      const appliedState = oldPushState.apply(this, args);
      window.dispatchEvent(new Event('pushstate'));
      window.dispatchEvent(new Event('locationchange'));
      return appliedState;
    };

    // Override ReplaceState
    const oldReplaceState = history.replaceState;
    history.replaceState = function replaceState(...args) {
      const appliedState = oldReplaceState.apply(this, args);
      window.dispatchEvent(new Event('replacestate'));
      window.dispatchEvent(new Event('locationchange'));
      return appliedState;
    };

    // Override PopState
    window.addEventListener('popstate', function () {
      window.dispatchEvent(new Event('locationchange'));
    });

    // Now finally listen for these changes and track the event when this occurs
    window.addEventListener(
      'locationchange',
      async () => {
        await this.waitForIt();
        await this.track();
      },
      false
    );
  }

  // Automatically tracks page from the window
  public async track() {
    const pageMeta = {
      pageName: getPageName(this.core, document),
      entity: getPageEntityProperties(this.core, document),
      properties: getPageProperties(this.core, window),
    };

    // Pass the data to our track event
    this.sendTrack('page', 'PageViewed', {
      page: pageMeta.pageName,
      ...pageMeta.properties,
      ...(pageMeta.entity && { entity: pageMeta.entity }),
    });
  }

  // Makes the track event on page load wait for a short bit of time to make sure
  // we're not blocking the main thread
  waitForIt = () =>
    new Promise((resolve) => setTimeout(resolve, PAGE_AUTOTRACK_DELAY));
}
