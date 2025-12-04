/**
 * @jest-environment jsdom
 */
'use strict';

import { defaultConfig } from '../beacon/lib/jest';

import * as entrypoint from '../entrypoint';

declare global {
  interface Window {
    beacon: any;
  }
}

// This adds a stub for navigator.sendBeacon implementation
function setupMocks() {
  Object.assign(window.navigator, {
    sendBeacon: jest.fn().mockImplementation(() => Promise.resolve()),
  });
}

describe('Entrypoint', () => {
  beforeAll(() => {
    setupMocks();
    // TODO: need a better way than doing this to actually evaluate and run the entrypoint
    console.log(entrypoint);
  });

  it('can be loaded with default configuration', async () => {
    // load the initiatialization script
    window.beacon.init(
      defaultConfig({
        identity: 'noPii',
        log: false,
        trackers: [],
      })
    );

    expect(window.beacon.enabled).toEqual(true);
  });

  // it('can register window._beacon.call(init) directly', async () => {
  //   // load the initiatialization script
  //   window._beacon.call(
  //     'init',
  //     defaultConfig({
  //       identity: 'noPii',
  //       log: false,
  //       trackers: [],
  //     })
  //   );

  //   expect(window.beacon.enabled).toEqual(true);
  // });

  // it('can register window._beacon.call(track) calls directly', async () => {
  //   window._beacon.call(
  //     'init',
  //     defaultConfig({
  //       identity: 'noPii',
  //       log: false,
  //       trackers: [],
  //     })
  //   );

  //   // Run a number of the track calls
  //   window.beacon.call('track');
  //   window.beacon.call('page');
  //   window.beacon.call('click');
  //   window.beacon.call('form');
  //   window.beacon.call('dataLayer');

  //   expect(window.beacon.enabled).toEqual(true);
  // });

  // it('can register window._beacon.trackCurrentPage directly', async () => {
  //   // load the initiatialization script
  //   window._beacon.call(
  //     'init',
  //     defaultConfig({
  //       identity: 'noPii',
  //       log: false,
  //       trackers: [],
  //     })
  //   );

  //   window.beacon.call('trackCurrentPage');
  // });

  // it('can register window._beacon.fallbacknotfound directly', async () => {
  //   // load the initiatialization script
  //   window._beacon.call(
  //     'init',
  //     defaultConfig({
  //       identity: 'noPii',
  //       log: false,
  //       trackers: [],
  //     })
  //   );

  //   // Call something else random just to show that it works
  //   window.beacon.call('fallbacknotfound');
  // });
});
