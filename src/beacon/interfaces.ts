// Copyright 2025-2026 Deloitte Development LLC
// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/

export interface ITrackEvent {
  type: string;
  event: any;
  properties: any;
  originalTimestamp?: any;
}

export type ITrackEventCallback = (type: string, data?: any) => void;

export interface IConfig {
  log: boolean;
  apiRoot: string;
  identity: 'noPii' | 'userAndSession' | 'user' | 'session';
  settings: IConfigSettings;
  trackers: Array<string>;
}

export interface IConfigSettings {
  transport: {
    apiRoute: string;
    method: 'queue' | 'sendBeacon' | 'localStorage';
  };
  user: {
    log: boolean;
    enabled: boolean;
    seedAnonymous: boolean;
    trackEvents: boolean;
    assumeIdentity?: {
      type: 'cookie' | 'window';
      key: string;
      value: string;
    };
    storeType: 'localStorage' | 'cookie';
    storeName: string;
  };
  context: {
    trackUserAgent: boolean;
  };
  queue: {
    store: 'localStorage' | 'cookie';
    storeName: string;
  };
  include?: {
    cookies: Array<string>;
    headers: Array<string>;
  };
  page: {
    eventName: string[];
    entity: string[];
    entityId: string[];
    entityProps: string[];
    properties: string[];
  };
  session: {
    log: boolean;
    enabled: boolean;
    trackEvents: boolean; // if true will create a session event each time a session starts and stops
    storeType: 'localStorage' | 'cookie';
    storeName: string;
    duration: number;
  };
}

export interface IPayload {
  type: string;
  event: string;
  properties: any;
  context: any;
  originalTimestamp: string;
}
