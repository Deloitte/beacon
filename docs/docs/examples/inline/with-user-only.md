---
sidebar_position: 3
hide_table_of_contents: true
---

# With User Identity

#### Inline installation and configured trackers and identity

This page is configured with the easiest installation method, while also letting trackers and identity options to be set **identity**: user and **trackers**: page, click, and form.  
You can install this example, just by adding this onto your web page

```html
<script type="text/javascript" 
id="beaconScript"
async 
src="beacon.js"
data-api-root="http://localhost"
data-trackers="page,click,form"
data-identity="user"
></script>
```

## Interactive Example

import SandboxIframe from '@site/src/components/SandboxIframe';

<SandboxIframe
  src="/examples/inline/with-user-only.html"
  title="With User Identity Example"
  height="700px"
/>

