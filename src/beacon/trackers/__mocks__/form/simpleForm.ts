export const title = 'Simple Form Page';

export const head = '';

export const body =
  '<div><form id="test-form" class="styles"><input type="text" id="textField" name="textField"><input id="submit" type="submit" value="Submit"></form></div>';

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
  event: 'FormSubmitted',
  originalTimestamp: '2021-05-18T11:40:21.782Z',
  properties: {
    page: title,
    form: { id: 'test-form', class: 'styles' },
    formValues: [
      {
        key: 'textField',
        value: 'testingValue',
      },
      {
        key: 'submit',
        value: 'Submit',
      },
    ],
  },
};
