export const title = 'Doc Title Page';

export const head = '';

export const body =
  '<div><button id="button" /><a id="link" href="#">link</></div>';

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
  type: 'page',
  event: 'PageViewed',
  originalTimestamp: '2021-05-18T11:40:21.782Z',
  properties: {
    page: title,
  },
};
