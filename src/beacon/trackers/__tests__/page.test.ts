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

const trackerName = 'page';

describe('PageTracker', () => {
  beforeAll(() => {
    setupMocks();
  });

  beforeEach(() => {
    jest.useFakeTimers({ legacyFakeTimers: false });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
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
    const initPromise = testcase.tracker?.init();

    // Fast-forward timers to resolve waitForIt delay
    await jest.runAllTimersAsync();

    await initPromise;

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
    const initPromise = testcase.tracker?.init();

    // Fast-forward timers to resolve waitForIt delay
    await jest.runAllTimersAsync();

    await initPromise;

    // Test the everything is called as expected
    expect(testcase.sendMock).toHaveBeenCalled();

    // Get the value that was tracked and prepared to send
    let recievedValue = testcase.sendMock.mock.calls[0][0];

    // Adjust the payload settings, given the various ways this could be run
    recievedValue = fixPayload(recievedValue, testcase.case.payload);

    // Check that the payload matches the mocked value
    expect(recievedValue).toEqual(testcase.case.payload);
  });

  it('waitForIt: delays execution by PAGE_AUTOTRACK_DELAY', async () => {
    const core = setupCore({ trackers: [trackerName] });
    const tracker = core.trackers.get(trackerName) as PageTracker;

    const waitPromise = tracker.waitForIt();
    
    // Should not resolve immediately
    let resolved = false;
    waitPromise.then(() => {
      resolved = true;
    });

    // Fast-forward less than delay
    jest.advanceTimersByTime(599);
    await Promise.resolve(); // Allow promise to check
    expect(resolved).toBe(false);

    // Fast-forward to complete delay
    jest.advanceTimersByTime(1);
    await jest.runAllTimersAsync();
    await waitPromise;
    expect(resolved).toBe(true);
  });

  it('handleStates: overrides history.pushState and dispatches events', async () => {
    const core = setupCore({ trackers: [trackerName] });
    const tracker = core.trackers.get(trackerName) as PageTracker;

    const sendMock = jest.fn();
    core.sendActivity = sendMock;

    const pushStateSpy = jest.spyOn(history, 'pushState');
    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent');

    // Initialize tracker to set up state handlers
    const initPromise = tracker.init();
    await jest.runAllTimersAsync();
    await initPromise;

    // Clear initial track call
    sendMock.mockClear();

    // Call pushState
    const state = { page: 'test' };
    const title = 'Test Page';
    const url = '/test';
    history.pushState(state, title, url);

    // Verify pushState was called
    expect(pushStateSpy).toHaveBeenCalledWith(state, title, url);

    // Verify events were dispatched
    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'pushstate' })
    );
    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'locationchange' })
    );

    // Fast-forward delay for locationchange handler
    await jest.runAllTimersAsync();

    // Verify track was called after locationchange
    expect(sendMock).toHaveBeenCalled();

    pushStateSpy.mockRestore();
    dispatchEventSpy.mockRestore();
  });

  it('handleStates: overrides history.replaceState and dispatches events', async () => {
    const core = setupCore({ trackers: [trackerName] });
    const tracker = core.trackers.get(trackerName) as PageTracker;

    const sendMock = jest.fn();
    core.sendActivity = sendMock;

    const replaceStateSpy = jest.spyOn(history, 'replaceState');
    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent');

    // Initialize tracker to set up state handlers
    const initPromise = tracker.init();
    await jest.runAllTimersAsync();
    await initPromise;

    // Clear initial track call
    sendMock.mockClear();

    // Call replaceState
    const state = { page: 'replace' };
    const title = 'Replace Page';
    const url = '/replace';
    history.replaceState(state, title, url);

    // Verify replaceState was called
    expect(replaceStateSpy).toHaveBeenCalledWith(state, title, url);

    // Verify events were dispatched
    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'replacestate' })
    );
    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'locationchange' })
    );

    // Fast-forward delay for locationchange handler
    await jest.runAllTimersAsync();

    // Verify track was called after locationchange
    expect(sendMock).toHaveBeenCalled();

    replaceStateSpy.mockRestore();
    dispatchEventSpy.mockRestore();
  });

  it('handleStates: listens for popstate and dispatches locationchange', async () => {
    const core = setupCore({ trackers: [trackerName] });
    const tracker = core.trackers.get(trackerName) as PageTracker;

    const sendMock = jest.fn();
    core.sendActivity = sendMock;

    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent');

    // Initialize tracker to set up state handlers
    const initPromise = tracker.init();
    await jest.runAllTimersAsync();
    await initPromise;

    // Clear initial track call
    sendMock.mockClear();

    // Simulate popstate event
    window.dispatchEvent(new PopStateEvent('popstate', { state: null }));

    // Verify locationchange event was dispatched
    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'locationchange' })
    );

    // Fast-forward delay for locationchange handler
    await jest.runAllTimersAsync();

    // Verify track was called after locationchange
    expect(sendMock).toHaveBeenCalled();

    dispatchEventSpy.mockRestore();
  });

  it('handleStates: locationchange event triggers track after delay', async () => {
    const core = setupCore({ trackers: [trackerName] });
    const tracker = core.trackers.get(trackerName) as PageTracker;

    const sendMock = jest.fn();
    core.sendActivity = sendMock;

    // Initialize tracker to set up state handlers
    const initPromise = tracker.init();
    await jest.runAllTimersAsync();
    await initPromise;

    // Clear initial track call
    sendMock.mockClear();

    // Manually dispatch locationchange event
    window.dispatchEvent(new Event('locationchange'));

    // Should not track immediately
    expect(sendMock).not.toHaveBeenCalled();

    // Fast-forward delay
    await jest.runAllTimersAsync();

    // Now should track
    expect(sendMock).toHaveBeenCalled();
    expect(sendMock.mock.calls[0][0].event).toBe('PageViewed');
  });

  it('handleStates: multiple locationchange events trigger multiple tracks', async () => {
    const core = setupCore({ trackers: [trackerName] });
    const tracker = core.trackers.get(trackerName) as PageTracker;

    const sendMock = jest.fn();
    core.sendActivity = sendMock;

    // Initialize tracker to set up state handlers
    const initPromise = tracker.init();
    await jest.runAllTimersAsync();
    await initPromise;

    // Clear initial track call
    const initialCallCount = sendMock.mock.calls.length;
    sendMock.mockClear();

    // Dispatch multiple locationchange events
    window.dispatchEvent(new Event('locationchange'));
    window.dispatchEvent(new Event('locationchange'));
    window.dispatchEvent(new Event('locationchange'));

    // Fast-forward delay for all events
    await jest.runAllTimersAsync();

    // Should have tracked 3 times (one for each locationchange event)
    // Note: Each event triggers waitForIt() delay, so all should fire after timers advance
    expect(sendMock.mock.calls.length).toBeGreaterThanOrEqual(3);
    expect(sendMock).toHaveBeenCalled();
  });
});
