(function () {
  var root = document.documentElement;
  var buttons = document.querySelectorAll(".theme-toggle");
  var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function theme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function stored() {
    try {
      return localStorage.getItem("theme");
    } catch (e) {
      return null;
    }
  }

  // The label stays constant ("Dark theme"); aria-pressed carries the state.
  function sync() {
    var dark = theme() === "dark";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("aria-pressed", dark ? "true" : "false");
      buttons[i].setAttribute("aria-label", "Dark theme");
    }
  }

  function apply(next) {
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    sync();
  }

  // Follow the OS setting live until the visitor picks a theme explicitly.
  if (media && media.addEventListener) {
    media.addEventListener("change", function (event) {
      if (stored() === "light" || stored() === "dark") return;
      root.setAttribute("data-theme", event.matches ? "dark" : "light");
      sync();
    });
  }

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      apply(theme() === "dark" ? "light" : "dark");
    });
  }

  sync();
})();
