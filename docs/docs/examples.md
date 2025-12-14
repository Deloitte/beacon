# Examples

This section contains interactive examples demonstrating how Beacon can be installed or configured in various scenarios.

Each of these examples illustrate:

- Adding the beacon to a web page through [`installation`](/beacon/docs/basics/a-installation), which allows you to adjust configuration** into the `beacon.js` file.
- Once the beacon is installed, it will start based on your configuration and will collect users, sessions, page views, and events through use [`trackers`](/beacon/docs/basics/c-trackers-and-tags#trackers) and [`tags`](/beacon/docs/basics/c-trackers-and-tags#tags).
- As events are collected, they currently are logged to the browser, but you could extend to send it to the transporting API of choice.


## Inline Installation

These examples show you the simplest way to install the beacon. You just need to add a simple script tag on your page

| Example                        | Description                                                                              | Identity                                                                    | Trackers                                     |
|--------------------------------|------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|----------------------------------------------|
| [Out Of The Box](/beacon/docs/examples/inline/out-of-the-box)                 | Start here for the easiest and most privacy conscious option.                            | noPii (default), which means there is no `user` or `session` identification | page (uses page tracker by default if empty) |
| [With Trackers](/beacon/docs/examples/inline/with-trackers)                   | Using inline tracker, but with added options                                             | session                                                                     | page, click, form                            |
| [With User Identity](/beacon/docs/examples/inline/with-user-only)             | Using inline tracker, but with added options                                             | user                                                                        | page, click, form                            |
| [With User And Session Identity](/beacon/docs/examples/inline/with-user-session) | Using inline tracker, but with added options                                             | user & session                                                              | page, click, form                            |
| [With Custom Events](/beacon/docs/examples/inline/with-custom-events)            | Builds on the previous example by providing markup that enhances page and click trackers | user & session                                                              | page, click, form                            |

## Snippet Installation

These examples allow you to further configure the beacon with more detailed options, which uses a more complex but still easy to use configuration

| Example                    | Description                                                                                         | Identity                                                                    | Trackers          |
|----------------------------|-----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|-------------------|
| [With Trackers](/beacon/docs/examples/snippet/with-trackers)         | A simple installation with selected trackers.                                       | noPii (default), which means there is no `user` or `session` identification | page, click, form |
| [Custom Tags](/beacon/docs/examples/snippet/custom-tags) | An illustration of how to use tags to create a similar experience to trackers                       | noPii (default), which means there is no `user` or `session` identification | none              |