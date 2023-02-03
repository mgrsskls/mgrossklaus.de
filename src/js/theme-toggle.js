document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".ThemeToggle input").forEach((input) => {
    input.addEventListener("change", onThemeChange);
  });
});

/**
 * @param {Event} event
 * @param {HTMLInputElement} event.target
 */
function onThemeChange({ target }) {
  const { value } = target;

  renderTheme(value);
  saveTheme(value);
}

/**
 * @param {string} theme
 */
function saveTheme(theme) {
  if (theme === "auto") {
    localStorage.removeItem("theme");
  } else {
    localStorage.setItem("theme", theme);
  }
}
