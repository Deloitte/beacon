import Logger from '../logger';

const mockLog = jest.spyOn(console, 'log').mockImplementation(() => {});
const mockInfo = jest.spyOn(console, 'info').mockImplementation(() => {});
const mockWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
const mockError = jest.spyOn(console, 'error').mockImplementation(() => {});

describe('Logger', () => {
  beforeEach(() => {
    mockLog.mockClear();
    mockInfo.mockClear();
    mockWarn.mockClear();
    mockError.mockClear();
  });

  it('can be enabled', async () => {
    const logger = new Logger({ name: 'Test', isEnabled: true });
    expect(logger.isEnabled).toEqual(true);
  });

  it('can be disabled', async () => {
    const logger = new Logger({ name: 'Test', isEnabled: false });
    expect(logger.isEnabled).toEqual(false);
  });

  it('creates a color based on the name', async () => {
    const logger = new Logger({ name: 'Test', isEnabled: true });
    // Expect it to be a color starting with #
    expect(logger.color).toContain('#');
  });

  it('will log to debug() when enabled', async () => {
    const logger = new Logger({ name: 'Test', isEnabled: true });
    logger.debug('This is debug');

    expect(mockLog).toHaveBeenCalled();
  });

  it('wont log to debug() when disabled', async () => {
    const logger = new Logger({ name: 'Test', isEnabled: false });
    logger.debug('This is debug');

    expect(mockLog).not.toHaveBeenCalled();
  });

  it('will log to info() when enabled', async () => {
    const logger = new Logger({ name: 'Test', isEnabled: true });
    logger.info('This is info');

    expect(mockInfo).toHaveBeenCalled();
  });

  it('wont log to info() when disabled', async () => {
    const logger = new Logger({ name: 'Test', isEnabled: false });
    logger.info('This is info');

    expect(mockInfo).not.toHaveBeenCalled();
  });

  it('will log to error() when enabled', async () => {
    const logger = new Logger({ name: 'Test', isEnabled: true });
    logger.error('This is error');

    expect(mockError).toHaveBeenCalled();
  });

  it('wont log to error() when disabled', async () => {
    const logger = new Logger({ name: 'Test', isEnabled: false });
    logger.error('This is error');

    expect(mockError).not.toHaveBeenCalled();
  });

  it('will log to warn() when enabled', async () => {
    const logger = new Logger({ name: 'Test', isEnabled: true });
    logger.warn('This is warn');

    expect(mockWarn).toHaveBeenCalled();
  });

  it('wont log to warn() when disabled', async () => {
    const logger = new Logger({ name: 'Test', isEnabled: false });
    logger.warn('This is warn');

    expect(mockWarn).not.toHaveBeenCalled();
  });
});
