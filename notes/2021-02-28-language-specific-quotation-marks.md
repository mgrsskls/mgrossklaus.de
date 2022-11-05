---
title: Language-specific quotation marks
source: https://www.stefanjudis.com/today-i-learned/how-to-use-language-dependent-quotes-in-css/
---

```css
blockquote::before {
  content: open-quote;
}

blockquote::after {
  content: close-quote;
}
```
