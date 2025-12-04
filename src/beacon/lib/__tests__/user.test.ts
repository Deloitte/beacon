/**
 * @jest-environment jsdom
 */
'use strict';

import { defaultConfig, setupCore, setupMocks } from '../jest';
import { getDefaultSettings } from '../settings';
import UserController from '../user';

const mockGetItem = jest.fn();
const mockSetItem = jest.fn();
const mockRemoveItem = jest.fn();

describe(UserController, () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (...args: string[]) => mockGetItem(...args),
        setItem: (...args: string[]) => mockSetItem(...args),
        removeItem: (...args: string[]) => mockRemoveItem(...args),
      },
    });
  });

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
    const userController = new UserController(config, core);
    await userController.init();

    expect(userController.logger.isEnabled).toBeTruthy();
  });

  it('can enable logging but disable sesssion specific logging', async () => {
    const config = {
      log: true,
      apiRoot: 'http://localhost:8080',
      identity: 'noPii' as 'noPii',
      settings: getDefaultSettings(false, 'noPii' as 'noPii'),
      trackers: [],
    };
    config.settings.user.log = false;
    const core = setupCore({
      identity: 'noPii',
      log: true,
      trackers: [],
    });
    const userController = new UserController(config, core);
    await userController.init();

    expect(userController.logger.isEnabled).toBeFalsy();
  });

  it('can load for noPii users', async () => {
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

    const userController = new UserController(config, core);
    await userController.init();

    expect(userController.userId).not.toBeNull();
    expect(mockSetItem).toHaveBeenCalled();
  });

  it('can load for seeded users', async () => {
    const config = defaultConfig({
      identity: 'user',
      log: false,
      trackers: [],
    });
    const core = setupCore({
      identity: 'user',
      log: false,
      trackers: [],
    });

    const userController = new UserController(config, core);
    await userController.init();

    expect(userController.userId).not.toBeNull();
    expect(mockSetItem).toHaveBeenCalled();
  });
});
