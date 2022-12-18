---
title: Gradient border
tags:
  - css
source: https://twitter.com/argyleink/status/1589657198766231552
---

**Without rounded corners:**

```css
border: solid 0.25rem;
border-image: linear-gradient(to bottom right, darkmagenta, aquamarine);
```

**With rounded corners:**

```css
border: solid 0.25rem transparent;
background:
  linear-gradient(white, white) padding-box, 
  linear-gradient(to bottom right, darkmagenta, aquamarine) border-box;
```

Drawback: You need to set a solid color as background, so it cannot be transparent.
