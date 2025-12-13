---
sidebar_position: 5
hide_table_of_contents: true
---

# With Custom Events

#### Inline installation and configured trackers and identity

This page shows an example of an **Article** page that has custom tagging on the HTML metadata to enhance page tracking as well as dataset attributes on elements to support click tracking.

**Page Tracking**

```html
<meta name="entity" content="Article" /> <!-- The name of the entity -->
<meta name="entity-id" content="12345" /> <!-- The ID of the entity -->
<meta name="entity-props-name" content="My Article" /> <!-- Any additional properties, in this case "name" to be used for reporting -->
```

**Click Tracking**

```html
// This will send a `ClickedGoogleLink` event
<a href="#" data-event="ClickedGoogleLink" data-entity="Article" data-entity-id="12345">Link To Google</a>
```

Or for passing more complex information, you can use the following: 

```html
// This will send a `ArticleLiked` event with the entity `Article` and the entity id `12345`
<button id="likeArticle" data-event="ArticleLiked" data-entity="Article" data-entity-id="12345">Test Button (to trigger Article Liked event)</button>
```

## Interactive Example

import SandboxIframe from '@site/src/components/SandboxIframe';

<SandboxIframe
  src="/examples/inline/with-custom-events.html"
  title="With Custom Events Example"
  height="700px"
/>

