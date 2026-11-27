(() => {
  const key = "dkpr-theme";
  const system = matchMedia("(prefers-color-scheme: dark)");
  const root = document.documentElement;
  let preference;
  function readPreference() {
    try {
      preference = localStorage.getItem(key);
    } catch {
      preference = null;
    }
  }
  function render() {
    const theme = ["light", "dark"].includes(preference)
      ? preference
      : system.matches
        ? "dark"
        : "light";
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content =
      theme === "dark" ? "#111210" : "#f7f9f4";
    const button = document.querySelector(".theme-switch");
    if (button) button.setAttribute("aria-pressed", String(theme === "dark"));
  }
  readPreference();
  render();
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".theme-switch");
    render();
    button.addEventListener("click", () => {
      preference = root.dataset.theme === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(key, preference);
      } catch {}
      render();
    });
  });
  system.addEventListener("change", render);
  window.addEventListener("storage", (event) => {
    if (event.key === key || event.key === null) {
      readPreference();
      render();
    }
  });
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      readPreference();
      render();
    }
  });
})();
