(function () {
  var root = document.documentElement;
  var buttons = document.querySelectorAll(".theme-toggle");
  if (!buttons.length) return;

  function theme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function sync() {
    var dark = theme() === "dark";
    var label = dark ? "Switch to light theme" : "Switch to dark theme";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("aria-pressed", dark ? "true" : "false");
      buttons[i].setAttribute("aria-label", label);
    }
  }

  var stored = null;
  try {
    stored = localStorage.getItem("theme");
  } catch (e) {}
  var followSystem = stored !== "light" && stored !== "dark";

  function apply(next, persist) {
    root.setAttribute("data-theme", next);
    if (persist) {
      followSystem = false;
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
    }
    sync();
  }

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      apply(theme() === "dark" ? "light" : "dark", true);
    });
  }

  if (followSystem && window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var onChange = function (event) {
      if (!followSystem) return;
      apply(event.matches ? "dark" : "light", false);
    };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  sync();
})();
