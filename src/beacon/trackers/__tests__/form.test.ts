// Copyright 2025-2026 Deloitte Development LLC
// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/

/**
 * @jest-environment jsdom
 */
import {
  window,
  ITrackerTestCase,
  setupCore,
  setupTrackerTestCase,
  setupMocks,
  fixPayload,
} from '../../lib/jest';

const trackerName = 'form';

describe('FormTracker', () => {
  beforeAll(() => {
    setupMocks();
  });
  it('will load if enabled in config', async () => {
    const core = setupCore({ trackers: [trackerName] });
    expect(core.trackers.has(trackerName)).toEqual(true);
  });

  it('will load if enabled in config', async () => {
    const core = setupCore({ trackers: [] });
    expect(core.trackers.has(trackerName)).toEqual(false);
  });

  it('simpleForm: will autoTrack form submission', async () => {
    const testcase: ITrackerTestCase = setupTrackerTestCase(
      trackerName,
      'simpleForm'
    );

    await testcase.tracker?.init();

    const textField = document.getElementById('textField');
    textField?.setAttribute('value', 'testingValue');

    const submitButton = document.getElementById('submit');
    submitButton?.click();

    // Test the everything is called as expected
    expect(testcase.sendMock).toHaveBeenCalled();

    // Get the value that was tracked and prepared to send
    let recievedValue = testcase.sendMock.mock.calls[0][0];

    // Adjust the payload settings, given the various ways this could be run
    recievedValue = fixPayload(recievedValue, testcase.case.payload);

    expect(recievedValue).toEqual(testcase.case.payload);
  });

  it('attributeForm: will autoTrack form submission', async () => {
    const testcase: ITrackerTestCase = setupTrackerTestCase(
      trackerName,
      'attributeForm'
    );

    await testcase.tracker?.init();

    const textField = document.getElementById('textField');
    textField?.setAttribute('value', 'testingValue');

    const submitButton = document.getElementById('submit');
    submitButton?.click();

    // Test the everything is called as expected
    expect(testcase.sendMock).toHaveBeenCalled();

    // Get the value that was tracked and prepared to send
    let recievedValue = testcase.sendMock.mock.calls[0][0];

    // Adjust the payload settings, given the various ways this could be run
    recievedValue = fixPayload(recievedValue, testcase.case.payload);

    expect(recievedValue).toEqual(testcase.case.payload);
  });
});
