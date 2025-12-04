import { IConfig, IConfigSettings } from '../interfaces';
import {
  SESSION_DURATION,
  SESSION_STORE_NAME,
  PAGE_META_PREFERENCE_EVENTNAME,
  PAGE_META_PREFERENCE_ENTITY,
  PAGE_META_PREFERENCE_ENTITY_ID,
  PAGE_META_PREFERENCE_ENTITY_PROPERTIES,
  PAGE_META_PREFERENCE_PROPERTIES,
  USER_STORE_NAME,
  ACTIVITY_QUEUE_STORE_NAME,
} from './constants';

export function applyIdentityStrategy(
  configSettings: IConfigSettings,
  strategy: 'userAndSession' | 'user' | 'session' | 'noPii'
) {
  // Based on the strategy, we'll want to preset the tracker usage

  switch (strategy) {
    case 'userAndSession':
      // In this case, we want to have user ENABLED and session ENABLED
      configSettings.user.enabled = true;
      configSettings.session.enabled = true;
      break;
    case 'user':
      // In this case, we want to have user ENABLED and session DISABLED
      configSettings.user.enabled = true;
      configSettings.session.enabled = false;
      break;
    case 'session':
      // In this case, we want to have user DISABLED and session ENABLED
      configSettings.user.enabled = false;
      configSettings.session.enabled = true;
      break;
    case 'noPii':
      // In this case, we want to have user DISABLED and session DISABLED
      configSettings.user.enabled = false;
      configSettings.session.enabled = false;
      break;
    default:
      break;
  }

  return configSettings;
}

export function getDefaultSettings(
  log: boolean,
  identity: 'userAndSession' | 'user' | 'session' | 'noPii'
): IConfigSettings {
  // By default, we want to get all of the available options
  const config = {
    transport: {
      apiRoute: '/api/activity',
      method: 'sendBeacon' as 'queue' | 'sendBeacon' | 'localStorage',
    },
    queue: {
      store: 'localStorage' as 'localStorage' | 'cookie',
      storeName: ACTIVITY_QUEUE_STORE_NAME,
    },
    page: {
      eventName: PAGE_META_PREFERENCE_EVENTNAME,
      entity: PAGE_META_PREFERENCE_ENTITY,
      entityId: PAGE_META_PREFERENCE_ENTITY_ID,
      entityProps: PAGE_META_PREFERENCE_ENTITY_PROPERTIES,
      properties: PAGE_META_PREFERENCE_PROPERTIES,
    },
    user: {
      log: true,
      enabled: false,
      seedAnonymous: true,
      trackEvents: true,
      storeType: 'localStorage' as 'localStorage' | 'cookie',
      storeName: USER_STORE_NAME,
    },
    context: {
      trackUserAgent: false,
    },
    session: {
      log: true,
      enabled: false,
      trackEvents: true,
      storeType: 'localStorage' as 'localStorage' | 'cookie',
      storeName: SESSION_STORE_NAME,
      duration: SESSION_DURATION,
    },
  };

  return applyIdentityStrategy(config, identity);
}
