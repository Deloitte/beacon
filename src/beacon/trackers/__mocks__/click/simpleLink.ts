export const title = 'Simple Link Test';

export const head = '';

export const body =
  '<div><a id="simpleLink" class="button outline other" href="#">link text</a></div>';

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
  event: 'LinkClicked',
  originalTimestamp: '2021-05-18T11:40:21.782Z',
  properties: {
    textContent: 'link text',
    class: 'button outline other',
    element: 'a',
    entity: {},
    id: 'simpleLink',
    href: '#',
    location: {
      x: 0,
      y: 0,
    },
    xpath: 'id("simpleLink")',
    page: title,
  },
};
