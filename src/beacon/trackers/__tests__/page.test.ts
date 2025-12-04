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

const trackerName = 'page';

describe('PageTracker', () => {
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

  it('docTitlePage: will autoTrack elements if present', async () => {
    const testcase: ITrackerTestCase = setupTrackerTestCase(
      trackerName,
      'docTitlePage'
    );

    // Initializes the tracker so we're looking for the events,
    // for page loads it automatically tracks the page
    await testcase.tracker?.init();

    // Test the everything is called as expected
    expect(testcase.sendMock).toHaveBeenCalled();

    // Get the value that was tracked and prepared to send
    let recievedValue = testcase.sendMock.mock.calls[0][0];

    // Adjust the payload settings, given the various ways this could be run
    recievedValue = fixPayload(recievedValue, testcase.case.payload);

    // Check that the payload matches the mocked value
    expect(recievedValue).toEqual(testcase.case.payload);
  });

  it('entityPage: will autoTrack meta attributes if present', async () => {
    const testcase: ITrackerTestCase = setupTrackerTestCase(
      trackerName,
      'entityPage'
    );

    // Initializes the tracker so we're looking for the events,
    // for page loads it automatically tracks the page
    await testcase.tracker?.init();

    // Test the everything is called as expected
    expect(testcase.sendMock).toHaveBeenCalled();

    // Get the value that was tracked and prepared to send
    let recievedValue = testcase.sendMock.mock.calls[0][0];

    // Adjust the payload settings, given the various ways this could be run
    recievedValue = fixPayload(recievedValue, testcase.case.payload);

    // Check that the payload matches the mocked value
    expect(recievedValue).toEqual(testcase.case.payload);
  });
});
