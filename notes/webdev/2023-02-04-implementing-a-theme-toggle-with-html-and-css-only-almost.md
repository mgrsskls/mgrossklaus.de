---
title: Implementing a theme toggle with HTML and CSS only (almost)
blog: true
tags:
  - html
  - css
  - javascript
---

Implementing a light and dark theme based on the user's OS settings has become quite popular.
But often users just want their OS to be dark, while they prefer reading a website with a light background, for example.
It is therefore considered good practice to offer a theme toggle, that allows the user to change the theme of the website
regardless of their OS theme.

To implement that, we would usually have some HTML like the following:

```html
<form>
	<fieldset>
		<legend>Color scheme</legend>
		<input type="radio" name="theme" value="auto" id="theme-auto" checked />
		<label for="theme-auto">auto</label>
		<input type="radio" name="theme" value="light" id="theme-light" />
		<label for="theme-light">light</label>
		<input type="radio" name="theme" value="dark" id="theme-dark" />
		<label for="theme-dark">dark</label>
	</fieldset>
</form>
```

Using JavaScript we would then listen to the `change` event of those inputs and add a class to the `html` or `body` node.
Based on that class, we would style the page accordingly:

```css {
.theme-dark {
	…
}
```

Using the `:has()` pseudo-class, we can be implement this theme toggle without JavaScript. Instead of using a class, we can do this:

```css
html:has([name="theme"][value="dark"]:checked) {
	…
}
```

To make sure that the user does not have to change the theme on every page visit, we should of course still use some JavaScript:

We save the selection in the `localStorage`, but then — instead of adding a theme class — we simply set the `checked` attribute
of the correct input in the theme toggle.
Ideally we do this in an inline script (as opposed to some asynchronously fetched script) to avoid any possible layout flickering.

## Complete example

### HTML

```html
<form>
	<fieldset class="ThemeToggle">
		<legend class="ThemeToggle-title">Color scheme</legend>
		<input type="radio" name="theme" value="auto" id="theme-auto" checked />
		<label for="theme-auto">auto</label>
		<input type="radio" name="theme" value="light" id="theme-light" />
		<label for="theme-light">light</label>
		<input type="radio" name="theme" value="dark" id="theme-dark" />
		<label for="theme-dark">dark</label>
	</fieldset>
</form>

<script>
	function renderTheme(theme) {
		if (!["auto", "light", "dark"].includes(theme)) return;

		const checkedInput = document.getElementById(`theme-${theme}`);

		if (checkedInput) {
			checkedInput.checked = true;
		}
	}

	renderTheme(localStorage.theme);
</script>
```

### CSS

```css
html {
	… /* styling for light theme */
}

html:has([name="theme"][value="light"]:checked) {
	… /* styling for light theme */
}

@media (prefers-color-scheme: dark) {
	html {
		… /* styling for dark theme */
	}
}

html:has([name="theme"][value="dark"]:checked) {
	… /* styling for dark theme */
}
```

### JavaScript

```javascript
document.querySelectorAll(".ThemeToggle input").forEach((input) => {
	input.addEventListener("change", onThemeChange);
});

function onThemeChange({ target }) {
	const { value } = target;

	renderTheme(value);
	saveTheme(value);
}

function saveTheme(theme) {
	if (theme === "auto") {
		localStorage.removeItem("theme");
	} else {
		localStorage.setItem("theme", theme);
	}
}
```

## Browser support

At the time of writing this (04.02.2023), `:has()` is supported by all major browsers except for Firefox.

To make sure this also works in Firefox, you can simply combine this approach with the
class-based approach mentioned earlier — and throw it away as soon as Firefox turns green! :)
([:has() on caniuse.com](https://caniuse.com/css-has)).

### Important

Just be aware that you cannot combine both selectors as `:has()` is invalid in Firefox. This means that
the following snippet would not work at all in Firefox:

```css
.theme-dark,
html:has([name="theme"][value="dark"]:checked) {
	… /* styling for dark theme */
}
```

Instead you have to use the selectors separately:

```css
.theme-dark {
	… /* styling for dark theme */
}

html:has([name="theme"][value="dark"]:checked) {
	… /* styling for dark theme */
}
```

## Optimizing CSS for theme toggles

Since it can be a bit cumbersome to write CSS for theme toggles as you would have to duplicate some code in your CSS,
[Fynn](https://www.fynn.be) wrote down a nice approach using custom properties, which I highly recommend:
[CSS Custom Property toggles for themes](https://fynn.be/blog/css-custom-property-toggles-themes/).
