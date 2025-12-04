/**
 * @jest-environment jsdom
 */
'use strict';

import { defaultConfig, setupCore, setupMocks } from '../jest';
import SessionController from '../session';
import { getDefaultSettings } from '../settings';
import { getTimestamp } from '../utils';

// Mocks an older session

describe(SessionController, () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  beforeAll(() => {
    // @TODO: need to mock window?
    setupMocks();
  });

  it('can enable logging if we set it explicitly', async () => {
    const config = {
      log: true,
      apiRoot: 'http://localhost:8080',
      identity: 'noPii' as 'noPii',
      settings: getDefaultSettings(true, 'noPii' as 'noPii'),
      trackers: [],
    };
    const core = setupCore({
      identity: 'noPii',
      log: false,
      trackers: [],
    });
    const sessionController = new SessionController(config, core);
    await sessionController.init();

    expect(sessionController.logger.isEnabled).toBeTruthy();
  });

  it('can enable logging but disable sesssion specific logging', async () => {
    const config = {
      log: true,
      apiRoot: 'http://localhost:8080',
      identity: 'noPii' as 'noPii',
      settings: getDefaultSettings(false, 'noPii' as 'noPii'),
      trackers: [],
    };
    config.settings.session.log = false;
    const core = setupCore({
      identity: 'noPii',
      log: true,
      trackers: [],
    });
    const sessionController = new SessionController(config, core);
    await sessionController.init();

    expect(sessionController.logger.isEnabled).toBeFalsy();
  });

  it('can init a new session', async () => {
    const config = defaultConfig({
      identity: 'noPii',
      log: false,
      trackers: [],
    });
    const core = setupCore({
      identity: 'noPii',
      log: false,
      trackers: [],
    });

    const sessionController = new SessionController(config, core);
    await sessionController.init();

    expect(sessionController.sessionId).not.toBeNull();
  });

  it('can extend a session that occured within the stadnard session duration', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (...args: string[]) => mockGetItem(...args),
        setItem: (...args: string[]) => mockSetItem(...args),
      },
    });

    // Set first event as 60 seconds ago
    const firstEvent = getTimestamp() - 60000;

    // Set last event as 15 seconds ago
    const lastEvent = getTimestamp() - 15;

    const mockSetItem = jest.fn();
    const mockGetItem = jest
      .fn()
      .mockReturnValue(
        `{"sessionId":"424af990-1a21-49c8-8c67-9cd13ffc80c6","firstEvent":${firstEvent},"lastEvent":${lastEvent}}`
      );

    const config = defaultConfig({
      identity: 'noPii',
      log: false,
      trackers: [],
    });
    const core = setupCore({
      identity: 'noPii',
      log: false,
      trackers: [],
    });

    const sessionController = new SessionController(config, core);
    await sessionController.init();

    expect(mockGetItem).toHaveBeenCalled();
    expect(sessionController.sessionId).not.toBeNull();

    // Expect that we'll be save a new session by extending it
    expect(mockSetItem).toHaveBeenCalled();
  });

  it('can end an old session stored in localStorage and start a new one', async () => {
    // Set first event as 60 seconds ago
    const firstEvent = getTimestamp();

    // Set last event as 15 seconds ago
    const lastEvent = getTimestamp() + 9999999;

    const mockSetItem = jest.fn();
    const mockGetItem = jest
      .fn()
      .mockReturnValue(
        `{"sessionId":"424af990-1a21-49c8-8c67-9cd13ffc80c6","firstEvent":${firstEvent},"lastEvent":${lastEvent}}`
      );

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (...args: string[]) => mockGetItem(...args),
        setItem: (...args: string[]) => mockSetItem(...args),
      },
    });

    const config = defaultConfig({
      identity: 'noPii',
      log: false,
      trackers: [],
    });
    const core = setupCore({
      identity: 'noPii',
      log: false,
      trackers: [],
    });

    const sessionController = new SessionController(config, core);
    await sessionController.init();

    expect(sessionController.sessionId).not.toBeNull();

    await sessionController.trackSessionEnd(sessionController.session);
  });
});
