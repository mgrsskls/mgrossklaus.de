---
title: CSS Grid tiles
---

I can never remember this snippet:

```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
```

This will create equally sized columns, where `20rem` is the minimum width of the columns.
When they would become smaller than this, the last entry in a row moves to the next row.

We use `min(100%, 20rem)` to avoid overflow when the container is smaller than `20rem`.
