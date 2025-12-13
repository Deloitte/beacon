---
sidebar_position: 4
hide_table_of_contents: true
---

# With User and Session Identity

#### Inline installation and configured trackers and identity

This page is configured with the easiest installation method, while also letting trackers and identity options to be set **identity**: session and **trackers**: page, click, and form.  
You can install this example, just by adding this onto your web page

```html
<script type="text/javascript" 
id="beaconScript"
async 
src="beacon.js"
data-api-root="http://localhost"
data-trackers="page,click,form"
data-identity="userAndSession"
></script>
```

## Interactive Example

import SandboxIframe from '@site/src/components/SandboxIframe';

<SandboxIframe
  src="/examples/inline/with-user-session.html"
  title="With User and Session Identity Example"
  height="700px"
/>

