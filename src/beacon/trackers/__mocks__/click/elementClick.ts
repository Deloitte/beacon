export const title = 'Element Click Test';

export const head = '';

export const body =
  '<article id="elementClickElement">element to click</article>';

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
  event: 'ElementClicked',
  originalTimestamp: '2021-05-18T11:40:21.782Z',
  properties: {
    textContent: 'element to click',
    element: 'article',
    entity: {},
    id: 'elementClickElement',
    location: {
      x: 0,
      y: 0,
    },
    page: title,
    xpath: 'id("elementClickElement")',
  },
};
