---
title: Utility class for hiding elements visually
source: https://allyjs.io/tutorials/hiding-elements.html#2017-edition-of-visuallyhidden
tags:
  - accessibility
  - css
---

Hiding elements visually, but keeping them for screen readers:

```css
.u-hiddenVisually {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}
```

My by far most used utility class.
