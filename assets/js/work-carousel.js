(function () {
  var track = document.getElementById("work-track");
  var nav = document.querySelector(".carousel-nav");
  var progress = document.querySelector(".work-progress");
  if (!track || !nav) return;

  var prev = nav.querySelector('[data-dir="-1"]');
  var next = nav.querySelector('[data-dir="1"]');
  var thumb = progress ? progress.querySelector("span") : null;
  var toggle = nav.querySelector(".carousel-toggle");
  var reduceMotion = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  var pending = false;

  // Autoplay. `playing` is the visitor's choice (off by default when they ask
  // the OS for less motion); the other flags hold it without changing that.
  var DELAY = 4000;
  var timer = 0;
  var playing = !(reduceMotion && reduceMotion.matches);
  var hovered = false;
  var focused = false;
  var touching = false;
  var onScreen = !("IntersectionObserver" in window);

  function visibleSlides() {
    var all = track.querySelectorAll(".work-slide");
    var shown = [];
    for (var i = 0; i < all.length; i++) {
      if (!all[i].hidden) shown.push(all[i]);
    }
    return shown;
  }

  // One step is one card plus the gap, measured live so it follows the
  // breakpoints instead of repeating the widths from site.css.
  function step() {
    var slides = visibleSlides();
    if (slides.length > 1) return slides[1].offsetLeft - slides[0].offsetLeft;
    return track.clientWidth;
  }

  function relabel() {
    var slides = visibleSlides();
    for (var i = 0; i < slides.length; i++) {
      slides[i].setAttribute("aria-label", (i + 1) + " of " + slides.length);
    }
  }

  // aria-disabled instead of disabled, so a focused arrow keeps focus when
  // it reaches the end of the track.
  function setDisabled(button, off) {
    button.setAttribute("aria-disabled", off ? "true" : "false");
  }

  function update() {
    pending = false;
    var max = track.scrollWidth - track.clientWidth;
    var x = track.scrollLeft;
    var overflows = max > 1;
    setDisabled(prev, !overflows || x <= 1);
    setDisabled(next, !overflows || x >= max - 1);
    if (thumb) {
      var share = overflows ? track.clientWidth / track.scrollWidth : 1;
      var at = overflows ? Math.min(Math.max(x / max, 0), 1) : 0;
      thumb.style.width = share * 100 + "%";
      thumb.style.left = at * (1 - share) * 100 + "%";
      progress.classList.toggle("is-idle", !overflows);
    }
  }

  function schedule() {
    if (pending) return;
    pending = true;
    window.requestAnimationFrame(update);
  }

  function behavior() {
    return reduceMotion && reduceMotion.matches ? "auto" : "smooth";
  }

  function go(dir) {
    track.scrollBy({ left: dir * step(), behavior: behavior() });
  }

  function canRun() {
    return playing && !hovered && !focused && !touching && onScreen && !document.hidden;
  }

  function stop() {
    window.clearTimeout(timer);
    timer = 0;
  }

  // Always a full fresh interval, so an arrow click or the end of a hover,
  // focus or touch gives the visitor another ~4 seconds before the next move.
  function restart() {
    stop();
    if (canRun()) timer = window.setTimeout(tick, DELAY);
  }

  // One card forward, or back to the first card once the end is in view.
  function tick() {
    var max = track.scrollWidth - track.clientWidth;
    if (max > 1) {
      if (track.scrollLeft >= max - 1) {
        track.scrollTo({ left: 0, behavior: behavior() });
      } else {
        go(1);
      }
    }
    restart();
  }

  // aria-pressed="true" means the visitor has paused autoplay.
  function syncToggle() {
    if (!toggle) return;
    toggle.setAttribute("aria-pressed", playing ? "false" : "true");
    toggle.setAttribute("aria-label", playing ? "Pause carousel" : "Play carousel");
  }

  // Only keyboard focus holds autoplay; a mouse click on the track does not.
  function isKeyboardFocus(el) {
    try {
      return el.matches(":focus-visible");
    } catch (err) {
      return true;
    }
  }

  function release() {
    if (!touching) return;
    touching = false;
    restart();
  }

  prev.addEventListener("click", function () {
    if (prev.getAttribute("aria-disabled") !== "true") go(-1);
    restart();
  });
  next.addEventListener("click", function () {
    if (next.getAttribute("aria-disabled") !== "true") go(1);
    restart();
  });
  if (toggle) {
    toggle.addEventListener("click", function () {
      playing = !playing;
      syncToggle();
      restart();
    });
  }

  // Hovering anywhere on the track, cards included, holds autoplay so the
  // hover-revealed card buttons stay put long enough to click.
  track.addEventListener("pointerenter", function (e) {
    if (e.pointerType === "touch") return;
    hovered = true;
    stop();
  });
  track.addEventListener("pointerleave", function (e) {
    if (e.pointerType === "touch") return;
    hovered = false;
    restart();
  });
  track.addEventListener("pointerdown", function () {
    touching = true;
    stop();
  });
  // pointercancel fires when the browser takes a touch over for panning.
  document.addEventListener("pointerup", release);
  document.addEventListener("pointercancel", release);

  track.addEventListener("focusin", function (e) {
    if (!isKeyboardFocus(e.target)) return;
    focused = true;
    stop();
  });
  // Arrow keys after a mouse click on the track count as keyboard use too.
  track.addEventListener("keydown", function () {
    focused = true;
    stop();
  });
  track.addEventListener("focusout", function (e) {
    if (e.relatedTarget && track.contains(e.relatedTarget)) return;
    focused = false;
    restart();
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop();
    else restart();
  });
  if (!onScreen) {
    new IntersectionObserver(function (entries) {
      onScreen = entries[entries.length - 1].intersectionRatio >= 0.3;
      restart();
    }, { threshold: 0.3 }).observe(track);
  }

  track.addEventListener("scroll", schedule, { passive: true });
  if ("ResizeObserver" in window) {
    new ResizeObserver(schedule).observe(track);
  } else {
    window.addEventListener("resize", schedule);
  }

  // Fired by assets/js/work-filter.js after the chips change the visible set.
  track.addEventListener("work:filter", function () {
    track.scrollLeft = 0;
    relabel();
    update();
    restart();
  });

  relabel();
  track.classList.add("is-enhanced");
  nav.hidden = false;
  if (progress) progress.hidden = false;
  syncToggle();
  update();
  restart();
})();
