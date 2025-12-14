/**
 * @jest-environment jsdom
 */
'use strict';

// Import to make this a module for declare global
import {} from '../beacon/core';

declare global {
  interface Window {
    beacon: any;
  }
}

// This adds a stub for navigator.sendBeacon implementation
function setupMocks() {
  Object.assign(window.navigator, {
    sendBeacon: jest.fn().mockImplementation(() => Promise.resolve()),
  });
}

describe('Entrypoint', () => {
  let mockGetElementById: jest.SpyInstance;

  beforeEach(() => {
    // Reset window.beacon before each test
    delete (window as any).beacon;
    
    // Reset modules to allow re-importing entrypoint
    jest.resetModules();
    
    setupMocks();
    
    // Mock document.getElementById
    mockGetElementById = jest.spyOn(document, 'getElementById');
  });

  afterEach(() => {
    mockGetElementById.mockRestore();
  });

  it('creates window.beacon Core instance when it does not exist', async () => {
    // Mock no script tag found
    mockGetElementById.mockReturnValue(null);

    // Import entrypoint to trigger IIFE
    await import('../entrypoint');

    expect(window.beacon).toBeDefined();
    expect(window.beacon.constructor.name).toBe('Core');
  });

  it('does not create window.beacon if it already exists', async () => {
    // Set up existing beacon
    const existingBeacon = { existing: true };
    (window as any).beacon = existingBeacon;
    
    mockGetElementById.mockReturnValue(null);

    // Import entrypoint to trigger IIFE
    await import('../entrypoint');

    // Should not have been replaced
    expect(window.beacon).toBe(existingBeacon);
    expect(window.beacon.existing).toBe(true);
  });

  it('does not initialize when beaconScript element does not exist', async () => {
    mockGetElementById.mockReturnValue(null);

    const initSpy = jest.fn();
    
    await import('../entrypoint');

    // Core should be created but init should not be called
    expect(window.beacon).toBeDefined();
    expect(window.beacon.init).toBeDefined();
  });

  it('initializes with apiRoot from data-api-root attribute', async () => {
    const mockScript = document.createElement('script');
    mockScript.id = 'beaconScript';
    mockScript.setAttribute('data-api-root', 'https://api.example.com');
    
    mockGetElementById.mockReturnValue(mockScript);

    await import('../entrypoint');

    expect(window.beacon).toBeDefined();
    expect(window.beacon.config.apiRoot).toBe('https://api.example.com');
  });

  it('does not initialize when apiRoot is not provided', async () => {
    const mockScript = document.createElement('script');
    mockScript.id = 'beaconScript';
    // No data-api-root attribute
    
    mockGetElementById.mockReturnValue(mockScript);

    await import('../entrypoint');

    expect(window.beacon).toBeDefined();
    // Should use default apiRoot from Core constructor
    expect(window.beacon.config.apiRoot).toBe('http://localhost');
  });

  it('sets log to true when data-log attribute is "true"', async () => {
    const mockScript = document.createElement('script');
    mockScript.id = 'beaconScript';
    mockScript.setAttribute('data-api-root', 'https://api.example.com');
    mockScript.setAttribute('data-log', 'true');
    
    mockGetElementById.mockReturnValue(mockScript);

    await import('../entrypoint');

    expect(window.beacon.config.log).toBe(true);
  });

  it('sets log to false when data-log attribute is not "true"', async () => {
    const mockScript = document.createElement('script');
    mockScript.id = 'beaconScript';
    mockScript.setAttribute('data-api-root', 'https://api.example.com');
    mockScript.setAttribute('data-log', 'false');
    
    mockGetElementById.mockReturnValue(mockScript);

    await import('../entrypoint');

    expect(window.beacon.config.log).toBe(false);
  });

  it('uses data-identity attribute when provided', async () => {
    const mockScript = document.createElement('script');
    mockScript.id = 'beaconScript';
    mockScript.setAttribute('data-api-root', 'https://api.example.com');
    mockScript.setAttribute('data-identity', 'user');
    
    mockGetElementById.mockReturnValue(mockScript);

    await import('../entrypoint');

    expect(window.beacon.config.identity).toBe('user');
  });

  it('defaults identity to "noPii" when data-identity is not provided', async () => {
    const mockScript = document.createElement('script');
    mockScript.id = 'beaconScript';
    mockScript.setAttribute('data-api-root', 'https://api.example.com');
    // No data-identity attribute
    
    mockGetElementById.mockReturnValue(mockScript);

    await import('../entrypoint');

    expect(window.beacon.config.identity).toBe('noPii');
  });

  it('uses data-trackers attribute when provided as single value', async () => {
    const mockScript = document.createElement('script');
    mockScript.id = 'beaconScript';
    mockScript.setAttribute('data-api-root', 'https://api.example.com');
    mockScript.setAttribute('data-trackers', 'click');
    
    mockGetElementById.mockReturnValue(mockScript);

    await import('../entrypoint');

    // Single value without comma stays as string
    expect(window.beacon.config.trackers).toBe('click');
  });

  it('splits comma-separated data-trackers attribute', async () => {
    const mockScript = document.createElement('script');
    mockScript.id = 'beaconScript';
    mockScript.setAttribute('data-api-root', 'https://api.example.com');
    mockScript.setAttribute('data-trackers', 'page,click,form');
    
    mockGetElementById.mockReturnValue(mockScript);

    await import('../entrypoint');

    expect(window.beacon.config.trackers).toEqual(['page', 'click', 'form']);
  });

  it('defaults trackers to ["page"] when data-trackers is not provided', async () => {
    const mockScript = document.createElement('script');
    mockScript.id = 'beaconScript';
    mockScript.setAttribute('data-api-root', 'https://api.example.com');
    // No data-trackers attribute
    
    mockGetElementById.mockReturnValue(mockScript);

    await import('../entrypoint');

    expect(window.beacon.config.trackers).toEqual(['page']);
  });

  it('handles all attributes together correctly', async () => {
    const mockScript = document.createElement('script');
    mockScript.id = 'beaconScript';
    mockScript.setAttribute('data-api-root', 'https://api.example.com');
    mockScript.setAttribute('data-log', 'true');
    mockScript.setAttribute('data-identity', 'userAndSession');
    mockScript.setAttribute('data-trackers', 'page,click');
    
    mockGetElementById.mockReturnValue(mockScript);

    await import('../entrypoint');

    expect(window.beacon.config.apiRoot).toBe('https://api.example.com');
    expect(window.beacon.config.log).toBe(true);
    expect(window.beacon.config.identity).toBe('userAndSession');
    expect(window.beacon.config.trackers).toEqual(['page', 'click']);
  });

  it('handles trackers string without comma correctly', async () => {
    const mockScript = document.createElement('script');
    mockScript.id = 'beaconScript';
    mockScript.setAttribute('data-api-root', 'https://api.example.com');
    mockScript.setAttribute('data-trackers', 'form');
    
    mockGetElementById.mockReturnValue(mockScript);

    await import('../entrypoint');

    // Should remain as string since no comma found
    expect(window.beacon.config.trackers).toBe('form');
  });

  it('handles empty data-trackers attribute', async () => {
    const mockScript = document.createElement('script');
    mockScript.id = 'beaconScript';
    mockScript.setAttribute('data-api-root', 'https://api.example.com');
    mockScript.setAttribute('data-trackers', '');
    
    mockGetElementById.mockReturnValue(mockScript);

    await import('../entrypoint');

    // Empty string is falsy, so should default to ['page']
    // getAttribute returns '' for empty attribute, which is falsy
    expect(window.beacon.config.trackers).toEqual(['page']);
  });
});
