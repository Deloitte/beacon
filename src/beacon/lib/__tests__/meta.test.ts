/**
 * @jest-environment jsdom
 */
'use strict';

import {
  PAGE_META_PREFERENCE_ENTITY,
  PAGE_META_PREFERENCE_ENTITY_ID,
  PAGE_META_PREFERENCE_ENTITY_PROPERTIES,
  PAGE_META_PREFERENCE_EVENTNAME,
  PAGE_META_PREFERENCE_PROPERTIES,
} from '../constants';
import { defaultConfig, setupCore, setupMocks } from '../jest';
import { getPageName, getPageProperties } from '../meta';

// Mocks an older session

describe('Meta', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  beforeAll(() => {
    // @TODO: need to mock window?
    setupMocks();
  });

  it('getPageName() gets a fallback document title if not present', async () => {
    const config = defaultConfig({
      identity: 'noPii',
      log: false,
      trackers: [],
    });
    const core = setupCore({
      identity: 'noPii',
      log: false,
      trackers: [],
    });

    const pageName = getPageName(core, document);

    expect(pageName).toEqual('PageViewed');
  });

  it('getPageName() can get a document title', async () => {
    const config = defaultConfig({
      identity: 'noPii',
      log: false,
      trackers: [],
    });
    const core = setupCore({
      identity: 'noPii',
      log: false,
      trackers: [],
    });

    document.title = 'This is a page name';
    const pageName = getPageName(core, document);

    expect(pageName).toEqual('This is a page name');
  });

  // it('getPageProperties() returns properties based on preferredList', async () => {
  //   const config = defaultConfig({
  //     identity: 'noPii',
  //     log: false,
  //     trackers: [],
  //   });
  //   const core = setupCore({
  //     identity: 'noPii',
  //     log: false,
  //     trackers: [],
  //   });

  //   window.document.head.innerHTML = `<meta name="entity" content="Category" />
  //     <meta name="entity-id" content="12345" />
  //     <meta name="entity-props-name" content="Shoes" />`;

  //   const pageProperties = getPageProperties(core, window);

  //   expect(pageProperties['entity']).toEqual('Category');
  // });
});
