---
title: `storage` event for localStorage updates
tags:
  - javascript
til: true
source: https://brandur.org/fragments/dark-mode-notes#theme-other-tabs
---

There is a `storage` event that gets fired when the local storage for a site is updated:

```js
// Listen for local storage changes on our theme key. This lets
// one tab to be notified if the theme is changed in another,
// and update itself accordingly.
window.addEventListener("storage", (e) => {
    if (e.key == LOCAL_STORAGE_KEY_THEME) {
        setThemeFromLocalStorageOrMediaPreference()
    }
})
```
