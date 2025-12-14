---
title: Install The Beacon
sidebar_position: 2
---

:::info
For examples on how to install the script, including more complex installation snippet, check out the [Examples](/beacon/docs/examples)
:::

## Inline Installation
This is the recommended approach for most use cases, unless you signficantly extend the Beacon. This can be placed anywhere in an HTML file (but often recommended to be placed right before the closing `</body>` html tag)

### Out Of The Box Installation
> You can see a demo of this installation [here](/beacon/docs/examples/inline/out-of-the-box)

This is the most basic and privacy friendly installation configuration, which will default the [`identity`](/beacon/docs/basics/b-identify-users#identity) to `noPii`, meaning no user or session information will be saved locally and [`trackers`](/beacon/docs/basics/c-trackers-and-tags#trackers) (will default to `page`, meaning that we'll track page views using the `page` tracker).

```html
<html>
  <head>
    // Place this script anywhere on your page (either in the head or before the
    end of the body)
    <script
      type="text/javascript"
      id="beaconScript"
      async
      src="https://yourdomain.com/beacon.js"
      data-api-root="https://collection.yourdomain.com"
    ></script>
   </head>
</html>
```

### User And Session With All Trackers

This is a more advanced example which will default the [`identity`](/beacon/docs/basics/b-identify-users#identity) to `userAndSession`, which will utilize localStorage for some basic attributes, as well as all of the available [`trackers`](/beacon/docs/basics/c-trackers-and-tags#trackers) such as `page`, `click`, and `form`.

```html
<script
  type="text/javascript"
  id="beaconScript"
  async
  src="https://yourdomain.com/beacon.js"
  data-api-root="https://collection.yourdomain.com"
  data-trackers="page,click,form"
  data-identity="userAndSession"
></script>
```


## Configuration Options

Using the above installation script as an example, the following table will explain the various options and default settings available to you.

| Property        | Available Options                                    | Description                                                                                         | Default Value |
| --------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------- |
| `data-log`      | `"true"`, `"false"`                                  | Determines if you would like to see console logs in the browser or not. Not recommended for production usage, but very helpful in development and testing.                             | `"false"`     |
| `data-api-root` | `string`                                             | Sets the root domain name for the API, where you'll want to send data collected by the Beacon. that | `"localhost"` |
| `data-identity` | `"noPii"`, `"user"`, `"session"`, `"userAndSession"` | Determines how [`identity`](/beacon/docs/basics/b-identify-users#identity) of the user should resolved.                                                | `noPii`        |
| `data-trackers` | `"page,click,form"`                                  | An array of [`trackers`](/beacon/docs/basics/c-trackers-and-tags#trackers) to use to observe from user interactions.                             | `page`        |
