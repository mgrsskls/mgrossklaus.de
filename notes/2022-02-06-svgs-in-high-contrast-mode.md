---
title: SVGs in high contrast mode
tags:
  - accessibility
  - svg
---

```css
@media (forced-colors: active) {
  svg {
    fill: CanvasText;
  }

  a svg {
    fill: LinkText;
  }
}
```
