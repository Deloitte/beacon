---
title: Data Collection Examples
sidebar_position: 2
---

## Overview

Every action that the Beacon may collect boils down to a standardized format. Based on the type of the event, the beacon will attempt to fill in the rest of the properties ans context within the data. Below is a high-level visualization of how the various fields inside of each collected event come together.

<!-- ![Collection Overview](/img/deep-dives/01-collection.png) -->

## Important Fields To Know

Every beacon event contains a number of consistent fields. While the details inside of each field may vary, this structure is consistent:

| Field               | Description                                                                                                                       | Examples                                      |     |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | --- |
| `type`              | The type of the event that is occuring                                                                                            | `page`, `identity`, `session`, `event`        |     |
| `event`             | The name of the event itself in ObjectAction format                                                                               | `SessionStarted`, `PageViewed`, `LinkClicked` |     |
| `originalTimestamp` | The timestamp of the event in UTC format                                                                                          | `2021-05-18T11:29:22.782Z`                    |     |
| `properties`        | Specific attributes specific to the `type` of event, that help provide more detail into **WHAT** the end user is interacting with | See examples below                            |     |
| `context`           | Consistent attributes that communicate **WHO** and **HOW** an end user is interacting with the web property                       | See examples below                            |     |

## Data Examples

It can be easier to see what data collection looks like, by looking at an example users interaction with a website. For this section, imagine that a singular users goes to a website (https://example.com).

### Identity: User

As soon as the visitor lands on the page, given that this example is set with `userAndSession`, the Beacon determines that there is no `beacon-user` value set in localstorage, so it will create one, which creates this event:

```js
{
  "type": "identity",
  "event": "anonymous",
  "originalTimestamp": "2021-05-18T11:29:21.782Z",
  "properties": {
    "id":"b6d1a732-52b3-49e9-8fc4-bfac3c5c721a",
    "type":"anonymous"
  },
  "context": {
    "userId": "b6d1a732-52b3-49e9-8fc4-bfac3c5c721a",
    "channel": "web",
    "hostname": "example.com",
    "language": "en-US",
    "referrer": "",
    "screen": "1920x1080",
    "url": "/",
  }
}
```

### Identity: Session

Again given that example is set with `userAndSession`, the Beacon will now see that a session isn't set in localstorage either by looking for `beacon-session`. Since this is our first time landing on the page, it will create a new session:

```js
{
  "type": "session",
  "event": "SessionStarted",
  "originalTimestamp": "2021-05-18T11:29:22.782Z",
  "properties": {
    "sessionId": "86beb41f-4be6-4af2-b5de-ed046a9739cf",
    "firstEvent": 1715646346,
    "lastEvent": 1715646346
  },
  "context": {
    "userId": "b6d1a732-52b3-49e9-8fc4-bfac3c5c721a",
    "sessionId": "86beb41f-4be6-4af2-b5de-ed046a9739cf",
    "channel": "web",
    "hostname": "example.com",
    "language": "en-US",
    "referrer": "",
    "screen": "1920x1080",
    "url": "/",
  }
}
```

### Tracker: Page

Because the `page` tracker is on, once the page resolves, this event with a `type` of `page` will be collected. Any metadata that the beacon can collect will be placed in the properties.

```js
{
  "type": "page",
  "event": "PageViewed",
  "originalTimestamp": "2021-05-18T11:30:21.782Z",
  "properties": {
    "page": "Home Page"
  },
  "context": {
    "userId": "b6d1a732-52b3-49e9-8fc4-bfac3c5c721a",
    "sessionId": "86beb41f-4be6-4af2-b5de-ed046a9739cf",
    "channel": "web",
    "hostname": "example.com",
    "language": "en-US",
    "referrer": "",
    "screen": "1920x1080",
    "url": "/",
  }
}
```

### Tracker: Click

Because the `click` tracker is on, once the visitor sees the page, they will click a link and this is captured as a generic event with `type` of `event`, and an event name of `LinkClicked`. Any metadata that the beacon can collect will be placed in the properties.

```js
{
  "type": "event",
  "event": "LinkClicked",
  "originalTimestamp": "2021-05-18T11:30:41.782Z",
  "properties": {
    "href":"/news",
    "inner_text":"Click this link",
    "location":{
      "x":148,
      "y":47}
    }
  },
  "context": {
    "userId": "b6d1a732-52b3-49e9-8fc4-bfac3c5c721a",
    "sessionId": "86beb41f-4be6-4af2-b5de-ed046a9739cf",
    "channel": "web",
    "hostname": "example.com",
    "language": "en-US",
    "referrer": "",
    "screen": "1920x1080",
    "url": "/",
  }
}
```
