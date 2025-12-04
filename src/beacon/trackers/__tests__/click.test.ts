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
import PageTracker from '../page';

const trackerName = 'click';

describe('ClickTracker', () => {
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

  it('wont enabled logger if log is disabled', async () => {
    const core = setupCore({ log: false, trackers: [trackerName] });

    const trackInstance = core.trackers.get(trackerName) as PageTracker;
    expect(trackInstance.logger.isEnabled).toEqual(false);
  });

  it('simpleButton: will autoTrack a simple button when clicked', async () => {
    const testcase: ITrackerTestCase = setupTrackerTestCase(
      trackerName,
      'simpleButton'
    );

    // Initializes the tracker so we're looking for the events
    await testcase.tracker?.init();

    // Click on a button to get the test to run
    const button = document.getElementById('simpleButton');
    button?.click();

    // Test the everything is called as expected
    expect(testcase.sendMock).toHaveBeenCalled();

    // Get the value that was tracked and prepared to send
    let recievedValue = testcase.sendMock.mock.calls[0][0];

    // Adjust the payload settings, given the various ways this could be run
    recievedValue = fixPayload(recievedValue, testcase.case.payload);

    expect(recievedValue).toEqual(testcase.case.payload);
  });

  it('simpleLink: will autoTrack a simple link when clicked', async () => {
    const testcase: ITrackerTestCase = setupTrackerTestCase(
      trackerName,
      'simpleLink'
    );

    // Initializes the tracker so we're looking for the events
    await testcase.tracker?.init();

    // Click on a button to get the test to run
    const link = document.getElementById('simpleLink');
    link?.click();

    // Test the everything is called as expected
    expect(testcase.sendMock).toHaveBeenCalled();

    // Get the value that was tracked and prepared to send
    let recievedValue = testcase.sendMock.mock.calls[0][0];

    // Adjust the payload settings, given the various ways this could be run
    recievedValue = fixPayload(recievedValue, testcase.case.payload);

    expect(recievedValue).toEqual(testcase.case.payload);
  });

  it('attributeLink: will autoTrack a link with attributes', async () => {
    const testcase: ITrackerTestCase = setupTrackerTestCase(
      trackerName,
      'attributeLink'
    );

    // Initializes the tracker so we're looking for the events
    await testcase.tracker?.init();

    const link = document.getElementById('attributeLink');
    link?.click();

    // Test the everything is called as expected
    expect(testcase.sendMock).toHaveBeenCalled();

    // Get the value that was tracked and prepared to send
    let recievedValue = testcase.sendMock.mock.calls[0][0];

    // Adjust the payload settings, given the various ways this could be run
    recievedValue = fixPayload(recievedValue, testcase.case.payload);

    expect(recievedValue).toEqual(testcase.case.payload);
  });

  it('inputClick: will track an input being clicked', async () => {
    const testcase: ITrackerTestCase = setupTrackerTestCase(
      trackerName,
      'inputClick'
    );

    // Initializes the tracker so we're looking for the events
    await testcase.tracker?.init();

    const link = document.getElementById('inputClickElement');
    link?.click();

    // Test the everything is called as expected
    expect(testcase.sendMock).toHaveBeenCalled();

    // Get the value that was tracked and prepared to send
    let recievedValue = testcase.sendMock.mock.calls[0][0];

    // Adjust the payload settings, given the various ways this could be run
    recievedValue = fixPayload(recievedValue, testcase.case.payload);

    expect(recievedValue).toEqual(testcase.case.payload);
  });

  it('divClick: will track a div being clicked', async () => {
    const testcase: ITrackerTestCase = setupTrackerTestCase(
      trackerName,
      'divClick'
    );

    // Initializes the tracker so we're looking for the events
    await testcase.tracker?.init();

    const link = document.getElementById('divClickElement');
    link?.click();

    // Test the everything is called as expected
    expect(testcase.sendMock).toHaveBeenCalled();

    // Get the value that was tracked and prepared to send
    let recievedValue = testcase.sendMock.mock.calls[0][0];

    // Adjust the payload settings, given the various ways this could be run
    recievedValue = fixPayload(recievedValue, testcase.case.payload);

    expect(recievedValue).toEqual(testcase.case.payload);
  });

  it('formClick: will track a form being clicked', async () => {
    const testcase: ITrackerTestCase = setupTrackerTestCase(
      trackerName,
      'formClick'
    );

    // Initializes the tracker so we're looking for the events
    await testcase.tracker?.init();

    const link = document.getElementById('formClickElement');
    link?.click();

    // Test the everything is called as expected
    expect(testcase.sendMock).toHaveBeenCalled();

    // Get the value that was tracked and prepared to send
    let recievedValue = testcase.sendMock.mock.calls[0][0];

    // Adjust the payload settings, given the various ways this could be run
    recievedValue = fixPayload(recievedValue, testcase.case.payload);

    expect(recievedValue).toEqual(testcase.case.payload);
  });

  it('elementClick: will track a fallback element being clicked', async () => {
    const testcase: ITrackerTestCase = setupTrackerTestCase(
      trackerName,
      'elementClick'
    );

    // Initializes the tracker so we're looking for the events
    await testcase.tracker?.init();

    const link = document.getElementById('elementClickElement');
    link?.click();

    // Test the everything is called as expected
    expect(testcase.sendMock).toHaveBeenCalled();

    // Get the value that was tracked and prepared to send
    let recievedValue = testcase.sendMock.mock.calls[0][0];

    // Adjust the payload settings, given the various ways this could be run
    recievedValue = fixPayload(recievedValue, testcase.case.payload);

    expect(recievedValue).toEqual(testcase.case.payload);
  });

  it('passwordElementClick: will show up as a standard element', async () => {
    const testcase: ITrackerTestCase = setupTrackerTestCase(
      trackerName,
      'passwordClick'
    );

    // Initializes the tracker so we're looking for the events
    await testcase.tracker?.init();

    const link = document.getElementById('passwordClickElement');
    link?.click();

    // Test the everything is called as expected
    expect(testcase.sendMock).toHaveBeenCalled();

    // Get the value that was tracked and prepared to send
    let recievedValue = testcase.sendMock.mock.calls[0][0];

    // Adjust the payload settings, given the various ways this could be run
    recievedValue = fixPayload(recievedValue, testcase.case.payload);

    expect(recievedValue).toEqual(testcase.case.payload);
  });

  it('ignoreClick: will ignore clicks if setup properly', async () => {
    const testcase: ITrackerTestCase = setupTrackerTestCase(
      trackerName,
      'ignoreClick'
    );

    // Initializes the tracker so we're looking for the events
    await testcase.tracker?.init();

    const link = document.getElementById('dontTrackMe');
    link?.click();

    // Test the everything is called as expected
    expect(testcase.sendMock).not.toHaveBeenCalled();
  });
});
