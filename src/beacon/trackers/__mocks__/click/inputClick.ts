// Copyright 2025-2026 Deloitte Development LLC
// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/

export const title = 'Input Click Test';

export const head = '';

export const body =
  '<div><input type="text" id="inputClickElement" name="inputClickElement"></div>';

export const payload = {
  context: {
    channel: 'web',
    hostname: 'localhost',
    language: 'en-US',
    referrer: '',
    screen: '0x0',
    url: '/',
    userAgent:
      'Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/20.0.3',
  },
  type: 'track',
  event: 'InputClicked',
  originalTimestamp: '2021-05-18T11:40:21.782Z',
  properties: {
    name: 'inputClickElement',
    type: 'text',
    element: 'input',
    entity: {},
    id: 'inputClickElement',
    location: {
      x: 0,
      y: 0,
    },
    xpath: 'id("inputClickElement")',
    page: title,
  },
};
