export const title = 'Simple Button Test';

export const head = '';

export const body =
  '<div><button id="simpleButton" /><a id="simpleLink" href="#">link</a></div>';

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
  event: 'ButtonClicked',
  originalTimestamp: '2021-05-18T11:40:21.782Z',
  properties: {
    textContent: 'link',
    element: 'button',
    entity: {},
    id: 'simpleButton',
    location: {
      x: 0,
      y: 0,
    },
    xpath: 'id("simpleButton")',
    page: title,
  },
};
