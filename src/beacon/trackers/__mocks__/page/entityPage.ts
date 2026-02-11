// Copyright 2025-2026 Deloitte Development LLC
// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/

export const title = 'Entity Page';

export const head =
  '<meta name="entity" content="Category" /><meta name="entity-id" content="12345" /><meta name="entity-props-name" content="Shoes" />';

export const body =
  '<div><button id="button" /><a id="link" href="#">link</></div>';

export const payload = {
  context: {
    channel: "web",
    hostname: 'localhost',
    language: 'en-US',
    referrer: '',
    screen: '0x0',
    url: '/',
    userAgent:
      'Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/20.0.3',
  },
  type: 'page',
  event: 'PageViewed',
  originalTimestamp: '2021-05-18T11:40:21.782Z',
  properties: {
    entity: {
      id: '12345',
      props: {
        name: 'Shoes',
      },
      type: 'Category',
    },
    page: title,
  },
};
