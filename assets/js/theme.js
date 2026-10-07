(function () {
  var root = document.documentElement;
  var buttons = document.querySelectorAll(".theme-toggle");
  if (!buttons.length) return;

  function theme() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function sync() {
    var dark = theme() === "dark";
    var label = dark ? "Switch to light theme" : "Switch to dark theme";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("aria-pressed", dark ? "true" : "false");
      buttons[i].setAttribute("aria-label", label);
    }
  }

  function apply(next) {
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    sync();
  }

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      apply(theme() === "dark" ? "light" : "dark");
    });
  }

  sync();
})();
