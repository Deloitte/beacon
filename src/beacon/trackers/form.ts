import { registerEvent } from '../lib/utils';
import BaseTracker from './base';
import {
  getPageEntityProperties,
  getPageName,
  getPageProperties,
} from '../lib/meta';
import { Core } from '../core';

export default class FormTracker extends BaseTracker {
  constructor(parent: (Window & typeof globalThis) | Document, core: Core) {
    super(parent, core, 'FormTracker');
  }

  // When the page loads all form tags on the page will be registered for a submit even
  public async init() {
    // For each link, register for click event

    if (document.querySelectorAll('form').length === 0) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    const forms: any = document.querySelectorAll('form');

    for (const form of forms) {
      registerEvent(form, 'submit', (event: any) => {
        this.track(event);
      });
    }
  }

  public track(event?: any) {
    if (event) {
      // Wait until we are done before submitting the form
      event.preventDefault();

      const formValues = [];

      // Try to match the form
      const element = event.target;

      if (element) {
        // Get general page metadaata
        const pageMeta = {
          pageName: getPageName(this.core, document),
          entity: getPageEntityProperties(this.core, document),
          properties: getPageProperties(this.core, window),
        };

        // Get form specific metadata
        const form = {
          ...(element.getAttribute('id') && { id: element.getAttribute('id') }),
          ...(element.getAttribute('class') && {
            class: element.getAttribute('class'),
          }),
        };

        // If we can get the values of the form
        if (element.elements) {
          for (const item of element.elements) {
            if (item.id && item.id !== '') {
              formValues.push({ key: item.id, value: item.value });
            }
          }
        }

        this.sendTrack('track', 'FormSubmitted', {
          ...pageMeta.properties,
          ...(form && { form: form }),
          ...(formValues && { formValues: formValues }),
          ...(pageMeta.pageName && { page: pageMeta.pageName }),
          ...(pageMeta.entity && { entity: pageMeta.entity }),
        });
      }
    }
    return false;
  }
}
