/**
 * @jest-environment jsdom
 */
'use strict';

import { Core } from '../core';
import { setupCore, setupMocks } from '../lib/jest';
import BaseTracker from '../trackers/base';
import ClickTracker from '../trackers/click';
import FormTracker from '../trackers/form';
import PageTracker from '../trackers/page';

const mockWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});

declare global {
  interface Window {
    beacon: any;
  }
}

describe('Core', () => {
  let core: Core;

  beforeAll(() => {
    // @TODO: need to mock window?
    setupMocks();
  });

  it('log - if log is enabled, logging will be called', async () => {
    const core = setupCore({ log: true });
    expect(core.logger?.isEnabled).toEqual(true);
  });

  it('enabled - is disabled before config is applied', async () => {
    core = new Core(global.window);
    expect(core.enabled).toEqual(false);
  });

  it('enabled - check if beacon is enabled', async () => {
    const core = setupCore({});
    expect(core.enabled).toEqual(true);
  });

  it('getConfig() - returns config', async () => {
    const core = setupCore({});
    expect(core.getConfig()).toEqual(core.config);
  });

  it('identity - if noPii, disable user and session', async () => {
    const core = setupCore({ identity: 'noPii' });
    // if noPii is set for the identity flag, check that:
    // - user tracking is disabled
    // - session tracking is disabled
    expect(core.config.settings.user.enabled).toEqual(false);
    expect(core.config.settings.session.enabled).toEqual(false);
  });

  it('identity - if userAndSession, enable user and session', async () => {
    const core = setupCore({ identity: 'userAndSession' });
    // if userAndSession is set for the identity flag, check that:
    // - user tracking is enabled
    // - session tracking is enabled
    expect(core.config.settings.user.enabled).toEqual(true);
    expect(core.config.settings.session.enabled).toEqual(true);
  });

  it('identity - if user, enable user', async () => {
    const core = setupCore({ identity: 'user' });
    // if user is set for the identity flag, check that:
    // - user tracking is enabled
    // - session tracking is disabled
    expect(core.config.settings.user.enabled).toEqual(true);
    expect(core.config.settings.session.enabled).toEqual(false);
    expect(window.navigator.sendBeacon).toHaveBeenCalled();
  });

  it('identity - if session, enable session', async () => {
    const core = setupCore({ identity: 'session' });
    // if session is set for the identity flag, check that:
    // - user tracking is disabled
    // - session tracking is enabled
    expect(core.config.settings.user.enabled).toEqual(false);
    expect(core.config.settings.session.enabled).toEqual(true);
    expect(window.navigator.sendBeacon).toHaveBeenCalled();
  });

  it('track - if type is track it will processActivity', async () => {
    const core = setupCore({
      identity: 'noPii',
      trackers: [],
    });

    const processActivitySpy = jest
      .spyOn(Core.prototype, 'processActivity')
      .mockImplementation();

    // A generic track event
    core.track('track', 'AddToCart', {});

    // It should tell each tracker to autoTrack
    expect(processActivitySpy).toHaveBeenCalled();
  });

  it('track - if type is event it will processActivity', async () => {
    const core = setupCore({
      identity: 'noPii',
      trackers: [],
    });

    const processActivitySpy = jest
      .spyOn(Core.prototype, 'processActivity')
      .mockImplementation();

    // A generic track event
    core.track('event', 'AddToCart', {});

    // It should tell each tracker to autoTrack
    expect(processActivitySpy).toHaveBeenCalled();
  });

  it('track - if type is page it will pass it on to the tracker to solve it', async () => {
    const core = setupCore({
      log: true,
      identity: 'noPii',
      trackers: ['page'],
    });

    const tracker = core.trackers.get('page');

    expect(tracker).toBeTruthy();
    expect(tracker?.enabled).toBeTruthy();

    const processTrackSpy = jest
      .spyOn(Core.prototype, 'processActivity')
      .mockImplementation();

    // A generic track event
    core.track('page', 'PageViewed', {});

    expect(processTrackSpy).toHaveBeenCalled();
  });

  it('track - if type is click it will pass it on to the tracker to solve it', async () => {
    const core = setupCore({
      log: true,
      identity: 'noPii',
      trackers: ['click'],
    });

    const tracker = core.trackers.get('click');

    expect(tracker).toBeTruthy();
    expect(tracker?.enabled).toBeTruthy();

    const processTrackSpy = jest
      .spyOn(Core.prototype, 'processActivity')
      .mockImplementation();

    // A generic track event
    core.track('click', 'LinkClicked', {});

    expect(processTrackSpy).toHaveBeenCalled();
  });

  it('track - if type is form it will pass it on to the tracker to solve it', async () => {
    const core = setupCore({
      log: true,
      identity: 'noPii',
      trackers: ['form'],
    });

    const tracker = core.trackers.get('form');

    expect(tracker).toBeTruthy();
    expect(tracker?.enabled).toBeTruthy();

    const processTrackSpy = jest
      .spyOn(Core.prototype, 'processActivity')
      .mockImplementation();

    // A generic track event
    core.track('form', 'FormSubmitted', {});

    expect(processTrackSpy).toHaveBeenCalled();
  });

  it('config.tracker - if page tracker included, it is set in config', async () => {
    const core = setupCore({ identity: 'noPii', trackers: ['page'] });
    expect(core.config.trackers).toEqual(['page']);
  });

  it('config.tracker - if page, click trackers included, it is set in config', async () => {
    const core = setupCore({ identity: 'noPii', trackers: ['page', 'click'] });
    expect(core.config.trackers).toEqual(['page', 'click']);
  });

  it('config.tracker - if page, click, form trackers included, it is set in config', async () => {
    const core = setupCore({
      identity: 'noPii',
      trackers: ['page', 'click', 'form'],
    });
    expect(core.config.trackers).toEqual(['page', 'click', 'form']);
  });

  it('trackers - if page included in config, tracker is created', async () => {
    const core = setupCore({ identity: 'noPii', trackers: ['page'] });

    // Get the tracker from the core.trackers [0] and get the value [1]
    const pageTracker = Array.from(core.trackers)[0][1];

    expect(pageTracker?.enabled).toBeTruthy();
  });

  it('trackers - if improperly named tracker is added to config, it logs an error', async () => {
    const core = setupCore({ identity: 'noPii', trackers: ['beep'] });

    // It should warn that the tracker doesnt exist
    expect(mockWarn).toHaveBeenCalled();
  });

  it('trackers - trackCurrentPage should tell the pageTracker to autotrack', async () => {
    const core = setupCore({
      identity: 'noPii',
      trackers: ['page'],
    });

    const pageAutoTrackSpy = jest
      .spyOn(PageTracker.prototype, 'track')
      .mockImplementation();

    core.trackCurrentPage();

    // It should tell each tracker to autoTrack
    expect(pageAutoTrackSpy).toHaveBeenCalled();
  });

  // it('trackers - trackCurrentPage will not call if the pageTracker isnt enabled', async () => {
  //   jest.resetAllMocks();

  //   const core = setupCore({
  //     identity: 'noPii',
  //     trackers: [],
  //   });

  //   const pageAutoTrackSpy = jest
  //     .spyOn(PageTracker.prototype, 'track')
  //     .mockImplementation();

  //   core.trackCurrentPage();

  //   // It should tell each tracker to autoTrack
  //   expect(pageAutoTrackSpy).not.toHaveBeenCalled();
  // });

  it('trackers - if autotrack is called, all trackers will track', async () => {
    const core = setupCore({
      identity: 'noPii',
      trackers: ['page', 'click', 'form'],
    });

    const pageAutoTrackSpy = jest
      .spyOn(PageTracker.prototype, 'track')
      .mockImplementation();

    const clickAutoTrackSpy = jest
      .spyOn(ClickTracker.prototype, 'track')
      .mockImplementation();

    const formAutoTrackSpy = jest
      .spyOn(FormTracker.prototype, 'track')
      .mockImplementation();

    core.autoTrack();

    // It should tell each tracker to autoTrack
    expect(pageAutoTrackSpy).toHaveBeenCalled();
    expect(clickAutoTrackSpy).toHaveBeenCalled();
    expect(formAutoTrackSpy).toHaveBeenCalled();
  });
});
