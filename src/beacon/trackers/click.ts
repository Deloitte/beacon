import { getClickXandY, registerEvent } from '../lib/utils';
import BaseTracker from './base';
import {
  getPageEntityProperties,
  getPageName,
  getPageProperties,
} from '../lib/meta';
import { Core } from '../core';

export default class ClickTracker extends BaseTracker {
  constructor(parent: (Window & typeof globalThis) | Document, core: Core) {
    super(parent, core, 'ClickTracker');
  }

  // This init event will register all clicks on buttons or links
  public async init() {
    // Apply link everywhere on the parent, regardless of the actual elements
    registerEvent(parent, 'click', (event: any) => {
      this.track(event);
    });
  }

  private getElementNameByTagName(tagName: string) {
    if (tagName === 'A') {
      return 'Link';
    } else if (tagName === 'BUTTON') {
      return 'Button';
    } else if (tagName === 'DIV') {
      return 'Div';
    } else if (tagName === 'FORM') {
      return 'Form';
    } else if (tagName === 'INPUT') {
      return 'Input';
    } else {
      return 'Element';
    }
  }

  public track(event?: any, properties: any = {}) {
    if (event) {
      // IE Hack to make sure we get the actual event and target
      if (event === undefined) event = window.event;
      const element = 'target' in event ? event.target : event.srcElement;

      if (element) {
        let data = { event, properties };
        let elementMeta;

        // Loop through attributes (e.g. dataset, attributes, innerText)
        elementMeta = this.getMetaFromTrackedElement(
          this.getElementNameByTagName(element.tagName),
          element,
          event
        );

        if (elementMeta.dontTrack) {
          // If we shouldn't track, lets exit out of here
          return false;
        } else {
          // Get general page metadaata
          const pageMeta: any = {
            pageName: getPageName(this.core, document),
            entity: getPageEntityProperties(this.core, document),
            properties: getPageProperties(this.core, window),
          };

          // Merge attributes we might have on the link and fallback to the entity of the page
          data = {
            event: elementMeta.event,
            properties: {
              ...pageMeta.properties,
              ...elementMeta.properties,
              ...(pageMeta.pageName && { page: pageMeta.pageName }),
              ...(pageMeta.entity ||
                (elementMeta.entity && {
                  entity: { ...pageMeta.entity, ...elementMeta.entity },
                })),
            },
          };

          this.sendTrack('track', data.event, data.properties);
        }
      }
    }
    return false;
  }

  // leveraging https://stackoverflow.com/questions/2631820/how-do-i-ensure-saved-click-coordinates-can-be-reload-to-the-same-place-even-if/2631931#2631931
  private getXPathForElement(element: any, event: any) {
    var root =
      document.compatMode === 'CSS1Compat'
        ? document.documentElement
        : document.body;
    var mxy = [event.clientX + root.scrollLeft, event.clientY + root.scrollTop];

    var xpath = this.getPathToElement(element);
    var txy = this.getPageXY(element);

    return { xpath, location: { x: mxy[0] - txy[0], y: mxy[1] - txy[1] } };
  }

  private getPageXY(element: any) {
    var x = 0,
      y = 0;
    while (element) {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent;
    }
    return [x, y];
  }

  private getPathToElement(element: any): string {
    if (element.id !== '') return 'id("' + element.id + '")';
    if (element === document.body) return element.tagName;

    var ix = 0;
    var siblings = element.parentNode.childNodes;
    for (var i = 0; i < siblings.length; i++) {
      var sibling = siblings[i];
      if (sibling === element)
        return (
          this.getPathToElement(element.parentNode) +
          '/' +
          element.tagName +
          '[' +
          (ix + 1) +
          ']'
        );
      if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++;
    }
    return '';
  }

  private limitClickText = (text: string) => {
    return text.length > 100 ? text.substring(0, 100) : text;
  };

  /**
   * This function gets attributes that show up in analytics
   *
   * @param type
   * @param preferences
   * @param element
   * @returns tracking attributes from element
   */
  public getMetaFromTrackedElement(
    type: string,
    element: any,
    event: any
  ): any {
    // Default event name, which could be overridden by data-event
    let eventName = `${type}Clicked`;

    // Create a property object we can then populate with attributes
    const properties: any = {};
    // For storage of entity information if we actually have it
    const entity: any = {};

    // Get the element type in as well (e.g. if its a DIV, this will be 'div')
    properties['element'] = element.tagName.toLowerCase();

    if (element.hasAttributes()) {
      // If there is a set data-track="false" field, then let's ignore this click completely
      if (
        element.getAttribute('data-track') &&
        element.getAttribute('data-track') === 'false'
      ) {
        return {
          dontTrack: true,
        };
      }

      for (const attr of element.attributes) {
        // If it starts with data, we'll set that very specifically
        if (attr.name.startsWith('data-')) {
          if (attr.name === 'data-event') {
            // Allows for specific overrides of the event name
            eventName = attr.value;
          }
          if (attr.name === 'data-entity') {
            entity['type'] = attr.value;
          }
          if (attr.name === 'data-entity-id') {
            entity['id'] = attr.value;
          }
        } else {
          // Get the attribute name and value
          // e.g. class="button outline other" => { class: 'button outline other' }
          properties[attr.name] = this.limitClickText(attr.value);
        }
      }
      // If we see a password field, let's make sure that we aren't capturing the value
      if (properties['type'] === 'password') {
        if (properties['value']) {
          // Delete the value attribute (so we dont see a password)
          delete properties['value'];
        }
      }
    }

    // If we have innerText, then map it in
    if (element.innerText) {
      properties['inner_text'] = this.limitClickText(element.innerText);
    }
    if (element.textContent) {
      properties['textContent'] = this.limitClickText(element.textContent);
    }

    // Get the XPath of the element
    try {
      // This is experimental, so we dont want to crash our tracking based on us not finding xpaths or positions
      const { xpath, location } = this.getXPathForElement(element, event);

      properties['xpath'] = xpath;
      properties['location'] = location;
    } catch (error) {
      this.logger.error('Error getting xpath and position', error);
    }

    return {
      event: eventName,
      entity: entity,
      properties: properties,
    };
  }
}
