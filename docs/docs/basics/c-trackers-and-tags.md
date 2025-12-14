---
title: Trackers And Tags
sidebar_position: 4
---

## Overview

When tracking behavior across any property, you will want to use [**trackers**](#trackers) as a simple step to track interaction across a page. When there are gaps or critical elements you want to capture, you can then fill in your collection using [**tags**](#tags).

<a id="trackers"></a>

## Trackers

| **Tracker** | **Common Usage**                                                                                                                                                                                                           |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `page`      | The loading or navigation to any page throughout the experience. This tracker enables collection of page view and its associated metadata, which may be used to extend existing analytics data as needed.                  |
| `click`     | The click of an interactive element, such as an image, link, or button. This tracker enables collection of click or tap events and its associated metadata, which may be used to extend existing analytics data as needed. |
| `form`      | The submission of any form throughout the experience. This tracker enables explicit configuration on form submissions, to collect user-provided data and based on configuration process as a first-party profile trait.    |

### Applying the configuration

As shown in [installation](/docs/basics/a-installation), you can set the identity by using the `data-trackers` field.

```javascript
<script
  ...
  data-trackers="page,click,form"
></script>
```

<details>
  <summary>More Advanced Details</summary>

<a id="page"></a>

### Page Tracker

#### How it works

When the page finished loading, the page tracker runs, capturing metadata for the event of `PageViewed`

#### What it collects

> Need to write this!

#### How to get the best data

Pages are a common culprit of improper tagging and tracking, especially the important metadata that helps understand the context of the details of the page.

##### 1. Getting the best `page` property

By default the `page` field that is saved inside of `property` is set based on the `title` of the HTML page. Checking that this is properly set while you're developing can help rationalize which page is being viewed.

##### 2. Getting the `entity` (when needed)

In standard experiences, there is at a minimum, a list view and a detail view. While you can determine top pages by URL, there are often more complex URLs that make it challenging to know that as specific `entity` is driving more engagement than another.

For an ecommerce experience where you may be on a product listing page where you are looking at an entity type of `shoes` page and the product ID of `12345`. To do that, the easiest way is to have your website instrumented with the following meta tags:

```html
<meta name="entity" content="Category" />
<meta name="entity-id" content="12345" />
<meta name="entity-props-name" content="Shoes" />
```

<a id="click"></a>

### Click Tracker

#### How it works

After a page loads, a document listener is registered on the web page to automatically capture click events with their metadata on any element that is clicked.

#### What it collects

> Need to write this!

#### How to get the best data

Clicks are a common culprit of improper tagging and tracking, especially the important metadata that helps understand the context of the details of what was clicked.

##### 1. Check which `properties` are being collected

The tracker will also collect properties on a link, such as its `id`, `name`, `href`, `innerText`, `class`, etc. One of the easiest ways to track down specific elements is to see which properties are initially collected and adjust them as needed.

##### 2. Set specific `event` names

While a click tracker will track any clicks, the default `event` name will be `LinkClicked`, `ButtonClicked`, `ElementClicked`, etc. However, in most solutions you will also want to track specific actions such as `AddedToCart`, `SignUpClicked`, etc. To apply a specific event name to a button you can add a `data-event` to any HTML element that a user might click, such as this:

```html
<a href="/signup" data-event="ClickedSignUp">Sign Up Now!</a>
```

##### 3. Set `entity` information

Similar to the page tracker, if there is a click event with an end user interacting with an element that is relevent to a specific `entity`, you can set `data-entity` and `data-entity-id`, like in this example for a custom `ArticleSaved` event:

```html
<button data-event="ArticleSaved" data-entity="Article" data-entity-id="12345">
  Save Article
</button>
```

##### 4. Ignore clicks if needed

Just as important as tracking clicks, is identifying certain clicks that you might not care about. If you want to explicilty NOT track an element, by included `data-track="false"` to any element.

```html
<a id="dontTrackMe" data-track="false" href="https://supersecretlink.com"
  >link</a
>
```

This will accurately capture the event of `ArticleSaved`, but will also collecte an entity of `"entity": { "type": "Article", "id": "12345"}`

#### Settings

<a id="form"></a>

### Form Tracker

#### How it works

After a page loads, any forms are applied with a specicial listener to track when they are submitted.

#### What it collects

> Need to write this!

#### How to get the best data

##### 1. Get form `properties`

- To populate the `properties` element for the given form, the tracker will look at each form element (textbox, radio button, etc.), and capture its value. This value is saved into a `formValues` object that is saved into the `properties` object.

</details>

<a id="tags"></a>

## Tags

Tags can be used to track detailed actions that you can't get out of the box with trackers. This is especially helpful for you to tag specific conversion events, or if you are in a React application where some activities might be hard for trackers to collect data by default.

```javascript
beacon(func, event, [properties], [context]);
```

This translates to the following:

| Property   | Purpose                                                                                                                                                                                                                                                                      | Required | Example                   |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------- |
| type       | Defines the `type` of function to run and populates the `type` value in the collected payload. This value dictates both the function we call and the spec we follow from a formatting standpoint, which dictates the standardization of `event`, `properties`, and `context` | Yes      | `track`                   |
| event      | Provides the `event` name field which is the primary value in the collected payload                                                                                                                                                                                          | Yes      | `AddToCart`               |
| properties | Provides additional `properties` which are passed through in the `properties` value in the collected payload. This dictionary is flexible based on your needs.                                                                                                               | -        | `{product_id: 123}`       |
| context    | Provides additional `context` which is primarily auto collected, but allows additional context values to be passed.                                                                                                                                                          | -        | `{app.name: “My Website}` |

The outcome of each function call generates our foundational format that is used across our system. The values in each of these areas vary dramatically and `context` for instance is gradually expanded and enriched throughout the activity capture, collection, and processing steps.

```javascript
{
  "type": "event" // equals the function
  "event": "AddToCart"
  "properties": { "product_id": 123}
  "context": { "app": {"name": "My Website"} }
  "channel": "web"
}
```

### `page`

The `page` method collects a page view event, along with the event name, and optional properties and context to enrich the data.

```javascript
beacon("page", "PageViewed", [properties], [context]);
```

| Property     | Type       | Required | 
| ------------ | ---------- | -------- | 
| `event`      | String     | Yes      | 
| `properties` | Dictionary | No       | 
| `context`    | Dictionary | No       | 

An example `page` implementation looks like this:

```javascript
beacon("page", "PageViewed");
```

### `track`

The `track` method is used to collect an explicit action that a user performs. Using`track`, it is important that the `event` follows a standardized naming when you are able.

```javascript
beacon("track", event, [properties], [context]);
```

| Property     | Type       | Required | Description |
| ------------ | ---------- | -------- | ----------- |
| `event`      | String     | Yes      |             |
| `properties` | Dictionary | No       |             |
| `context`    | Dictionary | No       |             |


### Other Examples

#### Viewing content

This example introduces the concept of `entity`, where you can use `entity` to set the category of data that you are looking at (e.g. `blog`, `slide`, `chart`) and `entityId` which provides the specific id of that element. This helps you compare which content is engaged with the most across a variety of events.

```javascript
window.beacon("event", "ContentViewed", {
  entity: "slide",
  entityId: "123456789",
});
```

#### More complex viewing event

You can enhance the standard `entity` call, by using `entityProps` where you can include more detailed properties to be stored alongside your data. This can help you report a bit more information on the content, such as instead of having to determine and reference what the long entityId is of `123456789`, you can refer to `"Introduction post"` in your reporting.

```javascript
window.beacon("event", "ContentViewed", {
  entity: "slide",
  entityId: "123456789",
  entityProps: {
    name: "Introduction post",
    author: "Jon Doe",
  },
});
```
