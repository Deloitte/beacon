import { Core } from '../core';
import { mapToKeyValue } from './utils';
import {
  PAGE_META_PREFERENCE_ENTITY,
  PAGE_META_PREFERENCE_ENTITY_ID,
  PAGE_META_PREFERENCE_ENTITY_PROPERTIES,
  PAGE_META_PREFERENCE_EVENTNAME,
  PAGE_META_PREFERENCE_PROPERTIES,
} from './constants';

// if matched return it's value
export function getPreferredMeta(preferences: string[], document: any) {
  for (const preference of preferences) {
    const found = document.querySelector(`meta[name=${preference}]`);
    if (found) {
      // There is content in the meta property, use it
      return found.getAttribute('content');
    }
  }
  // Not found
  return undefined;
}

export function getPreferredMetaList(preferences: string[], document: any) {
  const values = new Map();
  for (const preference of preferences) {
    const found = document.querySelector(`meta[name^=${preference}]`);
    if (found) {
      // We found this element
      // Key: We'll remove the prefix that we used to search for, so entity-props-title will just be title
      // Value: We'll get the content within the "content" value
      values.set(
        found.name.replace(`${preference}-`, ''),
        found.getAttribute('content')
      );
    }
  }
  return values;
}

export function getPageName(core: Core, document: any) {
  if (document.title) {
    // 2. Backup plan, grab the title of the page
    return document.title;
  } else {
    // 3. Last chance, use the URL (this is ugly)
    return 'PageViewed';
  }
}

export function getPageProperties(core: Core, window: Window) {
  const { document } = window;

  // 1. Get general page properties
  const properties = getPreferredMetaList(
    core.config.settings.page.properties,
    document
  );

  return mapToKeyValue(properties);
}

export function getPageEntityProperties(core: Core, document: any) {
  let entity;
  let entityId;
  let entityProperties;

  // 1. Get the entity type (e.g. episode)
  entity = getPreferredMeta(core.config.settings.page?.entity, document);

  // Only try to get the entityId and entityProps if we get an entity
  if (entity) {
    // 2. Get the entity ID (e.g. 12345)
    entityId = getPreferredMeta(core.config.settings.page.entityId, document);

    // 3. Get any preffered entity properties (e.g. title = "this is the title")
    entityProperties = getPreferredMetaList(
      core.config.settings.page.entityProps,
      document
    );
  } else {
    return undefined;
  }

  return {
    type: entity,
    id: entityId,
    props: entityProperties ? mapToKeyValue(entityProperties) : {},
  };
}
