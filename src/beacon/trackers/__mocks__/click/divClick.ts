// Copyright 2025-2026 Deloitte Development LLC
// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/

export const title = 'Div Click Test';

export const head = '';

export const body = '<div id="divClickElement">div to click</div>';

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
  event: 'DivClicked',
  originalTimestamp: '2021-05-18T11:40:21.782Z',
  properties: {
    textContent: 'div to click',
    element: 'div',
    entity: {},
    id: 'divClickElement',
    location: {
      x: 0,
      y: 0,
    },
    page: title,
    xpath: 'id("divClickElement")',
  },
};
