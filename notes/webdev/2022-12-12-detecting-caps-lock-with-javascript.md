---
title: Detecting capslock with JavaScript
tags:
  - javascript
source: https://iamkate.com/code/caps-lock/
til: true
---

```javascript
window.addEventListener("keydown", detectCapsLock);
window.addEventListener("keyup", detectCapsLock);

function detectCapsLock(e) {
  if (e.getModifierState("CapsLock")) {
    // caps lock is on
  } else {
    // caps lock is off
  }
}
```
