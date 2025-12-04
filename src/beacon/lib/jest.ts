import { Core } from '../core';
import { IConfig } from '../interfaces';
import { getDefaultSettings } from './settings';

const windowCopy = window;

export { windowCopy as window };

// This adds a stub for navigator.sendBeacon implementation
export function setupMocks() {
  Object.assign(window.navigator, {
    sendBeacon: jest.fn().mockImplementation(() => Promise.resolve()),
  });
}

export function defaultConfig({
  identity = 'noPii',
  log = false,
  trackers = [],
}: ICoreSetup): IConfig {
  return {
    log: log,
    apiRoot: 'http://localhost:8080',
    identity: identity,
    settings: getDefaultSettings(false, identity),
    trackers: trackers,
  };
}

export interface ICoreSetup {
  identity?: 'noPii' | 'userAndSession' | 'user' | 'session';
  log?: boolean;
  trackers?: Array<string>;
}

export function setupCore({
  identity = 'noPii',
  log = true,
  trackers = [],
}: ICoreSetup) {
  let config: IConfig = defaultConfig({ identity, log, trackers });

  const core = new Core(global.window);
  core.init(config);
  return core;
}

export function mockStorage() {
  var store: any = {};
  return {
    getItem: function (key: string) {
      return store[key];
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem: function (key: string) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
  };
}

export function fixPayload(recievedValue: any, mockedValue: any) {
  recievedValue.originalTimestamp = mockedValue.originalTimestamp;
  recievedValue.context.userAgent = mockedValue.context.userAgent;

  return recievedValue;
}

export function setupTrackerTestCase(
  trackerType: string,
  mockFile: string
): ITrackerTestCase {
  const core = setupCore({ trackers: [trackerType] });

  // Mock the trackActivity event we have on core so that we can intercept it
  const sendMock = jest.fn().mockImplementation((data) => data);
  core.sendActivity = sendMock;

  // Get our tracker
  const tracker = core.trackers.get(trackerType);

  // console.log(tracker);

  // // Mock the trackActivity event like we do on window.blueprint in the beacon.ts object
  // window.beacon = {
  //   call: jest.fn().mockImplementation(),
  //   track: jest.fn().mockImplementation(core.track),
  // };

  // window._beacon = {
  //   call: jest.fn().mockImplementation(),
  // };

  const { title, head, body, payload } = require(
    `../trackers/__mocks__/${trackerType}/${mockFile}`
  );

  document.head.innerHTML = head;
  document.body.innerHTML = body;
  document.title = title;

  return {
    core,
    window,
    document,
    tracker,
    sendMock,
    case: { title, body, payload },
  };
}

export type ITrackerTestCase = {
  core: any;
  window: any;
  document: any;
  tracker: any;
  sendMock: any;
  case: { title: any; body: any; payload: any };
};
