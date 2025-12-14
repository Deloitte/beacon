---
sidebar_position: 1
hide_table_of_contents: true
---

# Out Of The Box

#### Out Of The Box

This example is the most basic "out of the box" installation of `beacon.js` on a simple HTML page. By default this installation will use **identity**: noPii and **trackers**: page.

This example is configure by placing this code onto a page:

```html
<script type="text/javascript" 
id="beaconScript"
async 
src="beacon.js"
data-api-root="http://localhost"
></script>
```

## Interactive Example
> Below is an illustrative example of how beacon collects data. Instead of sending it to an API, the data that is display is shown inside of the page itself.

import SandboxIframe from '@site/src/components/SandboxIframe/SandboxIframe';

<SandboxIframe
  src="/examples/inline/out-of-the-box.html"
  title="Out Of The Box"
  height="700px"
/>

