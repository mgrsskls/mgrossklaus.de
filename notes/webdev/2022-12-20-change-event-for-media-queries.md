---
title: "change" event for media queries
tags:
  - javascript
til: true
---

There is a `change` event that can be used to listen to media query changes:

```js
const mediaQuery = window.matchMedia("…");

mediaQuery.addEventListener("change", (e) => {
  …
});
```
