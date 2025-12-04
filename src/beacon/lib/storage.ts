// class for working with local storage in browser (common that can use other classes for store some data)
export class LocalStorage {
  public localStorageSupported: boolean;

  constructor() {
    this.localStorageSupported = typeof window !== 'undefined';
  }

  // add value to storage
  public set(key: string, item: string) {
    if (this.localStorageSupported) {
      localStorage.setItem(key, item);
    }
  }

  // get one item by key from storage
  public get(key: string): string | null {
    if (this.localStorageSupported) {
      const item = localStorage.getItem(key);
      if (item) {
        return item;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  // add value to storage
  public setJson(key: string, item: object) {
    if (this.localStorageSupported) {
      localStorage.setItem(key, JSON.stringify(item));
    }
  }

  // get one item by key from storage
  public getJson(key: string): any | undefined {
    if (this.localStorageSupported) {
      const item = localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }

  // remove value from storage
  public remove(key: string) {
    if (this.localStorageSupported) {
      localStorage.removeItem(key);
    }
  }

  // clear storage (remove all items from it)
  public clear() {
    if (this.localStorageSupported) {
      localStorage.clear();
    }
  }
}
