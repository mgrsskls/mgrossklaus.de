---
title: Native browser spinner for asynchronous operations
tags:
  - javascript
til: true
source: https://notes.zander.wtf/notes/browser-loading-state/
---

```js
function showLoading(promise) {
	navigation.addEventListener("navigate", (event) => {
		event.intercept({
			scroll: 'manual',
			handler: () => promise,
		})
	}, { once: true });
	
	return navigation.navigate(location.href).finished
}

// show browser loading UI
showLoading(new Promise((r) => setTimeout(r, 1500)));
```