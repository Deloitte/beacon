---
sidebar_position: 3
hide_table_of_contents: true
---

# Custom Settings

#### Settings

This page is configured with the beacon using **identity**: noPii and **trackers**: page, click, form

```html
<script type="text/javascript" 
  var config = {
    log: true,
    apiRoot: 'http://localhost',
    trackers: ['page', 'form', 'click'],
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
  src="/examples/snippet/custom-settings.html"
  title="Custom Settings Example"
  height="700px"
/>

