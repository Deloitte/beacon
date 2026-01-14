// Copyright 2025-2026 Deloitte Development LLC
// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/

/**
 * @jest-environment jsdom
 */
'use strict';

import { setupMocks } from '../jest';
import {
  UUID,
  getClickXandY,
  getNow,
  getTimestamp,
  registerEvent,
} from '../utils';

// Mocks an older session

describe('Utils', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  beforeAll(() => {
    // @TODO: need to mock window?
    setupMocks();
  });

  it('can get a UUID', async () => {
    const uuid = UUID();

    expect(uuid).toBeTruthy();
  });

  it('can get now', async () => {
    const now = getNow();

    expect(now).toBeTruthy();
  });

  it('can get a timestamp', async () => {
    const timestamp = getTimestamp();

    expect(timestamp).toBeTruthy();
  });

  it('can get XY of a click if available', async () => {
    const event = {
      pageY: 123,
      pageX: 299,
      clientX: 20,
      clientY: 20,
    };

    const clickEvent = getClickXandY(event);
    expect(clickEvent.x).toBeTruthy();
    expect(clickEvent.x).toBeTruthy();
  });

  it('can return null when XY of a click is not available', async () => {
    const event = {};

    const clickEvent = getClickXandY(event);
    expect(clickEvent.x).toBeFalsy();
    expect(clickEvent.x).toBeFalsy();
  });

  it('can register an event on a link', async () => {
    document.body.innerHTML = '<div><a id="simpleLink" href="#">link</a></div>';
    const links: any = document.querySelectorAll('a');

    let thisEvent;

    registerEvent(links[0], 'click', (event: any) => {
      thisEvent = event;
    });
  });
});
