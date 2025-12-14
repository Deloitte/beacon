---
sidebar_position: 2
hide_table_of_contents: true
---

# Custom Tags

#### Custom Tags

This page is configured using **identity**: noPii and **zero configured trackers**, instead it uses tags directly in the HTML to mimic the same data and experience as [basic-trackers](./basic-trackers). It's worth noting that on these events the trackers will be initialized with the data tagged on the page so that it can provide additional `properties` into each event.

```html
<script type="text/javascript" 
  var config = {
    log: true,
    apiRoot: 'http://localhost'
  };

  (function () {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = '../beacon.js';
    script.onload = function () {
      window.beacon.init(config);
    };
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s);
  })();
</script>
```

## Interactive Example

import SandboxIframe from '@site/src/components/SandboxIframe';

<SandboxIframe
  src="/examples/snippet/custom-tags.html"
  title="Custom Tags Example"
  height="700px"
/>

