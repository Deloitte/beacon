import { LocalStorage } from '../storage';

const mockGetItem = jest.fn().mockReturnValue(`[{ "key": "value" }]`);
const mockSetItem = jest.fn();
const mockRemoveItem = jest.fn();
const mockClear = jest.fn();

describe('Storage', () => {
  let storage: LocalStorage;

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (...args: string[]) => mockGetItem(...args),
        setItem: (...args: string[]) => mockSetItem(...args),
        removeItem: (...args: string[]) => mockRemoveItem(...args),
        clear: (...args: string[]) => mockClear(...args),
      },
    });
    storage = new LocalStorage();
  });

  it('constructor() - creates the wrapper', async () => {
    expect(storage.localStorageSupported).toEqual(true);
  });

  it('set()', async () => {
    storage.set('key', 'val');
    expect(mockSetItem).toHaveBeenCalledWith('key', 'val');
  });

  it('get()', async () => {
    storage.get('key');
    expect(mockGetItem).toHaveBeenCalledWith('key');
  });

  it('clear()', async () => {
    storage.clear();
    expect(mockClear).toHaveBeenCalled();
  });

  it('remove()', async () => {
    storage.remove('key');
    expect(mockRemoveItem).toHaveBeenCalled();
  });

  it('getJson() will fail if localStorage isnt supported', async () => {
    storage.localStorageSupported = false;

    const json = storage.getJson('key');
    expect(mockGetItem).toHaveBeenCalled();
  });

  it('getJson()', async () => {
    const json = storage.getJson('key');
    expect(mockGetItem).toHaveBeenCalled();
  });
});
