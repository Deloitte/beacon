---
title: Identify Users
sidebar_position: 3
---

## Overview

Identifying users is an important topic to be clear and transparent to your end users on how you handle their data.

<a id="identity"></a>

## Identity

We look at identity based on the [strategy](#strategy) that you will want to use to **store** and **persist** a user in the borwser so that we can connect their usage as a **user** over a variety of **sessions**.

The beacon is setup to be flexible based on your needs by allowing you to set an identity strategy to make sure that its working based on your strategy. By default the beacon is setup in `noPii` mode, whic doesn't leverage any cookies or identifiable attributes and relies upon the proper bucketing at the API level. This repository currently only illustrates the front-end collection, but we'll provide a more detailed foundational API shortly. In the process of determinating an identity strategy, there are tradeoffs in the quality of the data which are important to understand:

### Identity Strategies

| Strategy          | Description                                                                                                    | Impacts                                                                                                                                          | Data Quality                                           |
| ----------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| `noPii` (default) | Will not saving a user or sessionId in localStorage and will rely upon a rotating salt on the server.          | `user` and `session` are treated equally. Meaning that after 30 minutes of non-usage a session will rotate as well as a user record.             | Less detailed data quality, but best privacy settings. |
| `userAndSession`  | Will seed a simple user identity and create a session saving both to localStorage.                             | `user` and `session` are stored seperately in localStorage records, allowing both to be evaluated.                                               | The best data quality.                                 |
| `user`            | Will ignore the session logic and rely only upon user logic, which can still be tuned further with settings.   | `user` only is stored, while sesion is determined based on rotating salt on the server. Sessions may have lower quality results.                 | Middle of the road.                                    |
| `session`         | Will ignore users and only use a simple session logic to determine start and stop of sessions in localStorage. | `session` only is stored, so every session equals a user. Session duration will be high quality but returning users will be harder to determine. | Middle of the road.                                    |

### Applying the configuration

As shown in [installation](/docs/web-tracker/basics/a-installation), you can set the identity by using the `data-identity` field.

```javascript
<script
  ...
  data-identity="userAndSession"
></script>
```

<details>
  <summary>More Advanced Details</summary>
  
  #### User

The configuration object will default to taking an anonymous seeding approach to identifying a user. This means that a generic UUID will be created in JavaScript and will save this into `localStorage`.

#### Sessions

A user's engagement with the experience starts a session. This session has an ID and a timestamp that marks the beginning and end of the session. Generally speaking, when a user engages with the experience and leaves for greater than 30 minutes of inactivity, then it will start a new session on their following visit.

Various analytics platforms either provide logic around sessions or have a set expectation within their systems. This feature is not critical to any of the outputs of analytics, so it can be disabled if you would like to consider sessions as a vendor-specific configuration.

#### How it works

- session is captured from localStorage by looking at `beacon-session`
- If `beacon-session`is not set
  - It will create a new session record
  - The new session will be saved into localStorage as `beacon-session`
- If `beacon-session `is set
  - It will check if the session’s `last `attribute is greater than the `sessionDuration `(default of 30 minutes)
    - If it is less than `sessionDuration `(meaning that this user has been active), it will extend the session by 30 minutes from the current time.
    - If it is greater than `sessionDuration `(meaning that the user has been inactive for > 30 minutes), then it will end the previous session creating a `SessionEnded` event, and then will start a new session.

</details>