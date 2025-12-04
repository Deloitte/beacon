export const title = 'Attribute Link Test';

export const head = '';

export const body =
  '<div><button id="simpleButton" /><a id="attributeLink" data-event="ProductClicked" data-entity="Product" data-entity-id="9952" href="#">link</a></div>';

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
  event: 'ProductClicked',
  originalTimestamp: '2021-05-18T11:40:21.782Z',
  properties: {
    textContent: 'link',
    element: 'a',
    entity: {
      id: '9952',
      type: 'Product',
    },
    page: title,
    href: '#',
    id: 'attributeLink',
    location: {
      x: 0,
      y: 0,
    },
    xpath: 'id("attributeLink")',
  },
};
