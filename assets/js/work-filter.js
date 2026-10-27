(function () {
  var list = document.querySelector(".filters");
  var track = document.getElementById("work-track");
  var items = document.querySelectorAll(".work-track > [data-tags]");
  var status = document.getElementById("work-status");
  if (!list || !items.length) return;

  var chips = list.querySelectorAll(".chip");

  function tagsOf(item) {
    return item.getAttribute("data-tags").split("|");
  }

  function matches(item, filter) {
    return filter === "all" || tagsOf(item).indexOf(filter) !== -1;
  }

  function count(filter) {
    var n = 0;
    for (var i = 0; i < items.length; i++) {
      if (matches(items[i], filter)) n++;
    }
    return n;
  }

  function show(filter) {
    var shown = 0;
    for (var i = 0; i < items.length; i++) {
      var hit = matches(items[i], filter);
      items[i].hidden = !hit;
      if (hit) shown++;
    }
    for (var j = 0; j < chips.length; j++) {
      chips[j].setAttribute("aria-pressed", chips[j].getAttribute("data-filter") === filter ? "true" : "false");
    }
    if (status) {
      status.textContent = "Showing " + shown + " of " + items.length + " projects";
    }
    // Lets assets/js/work-carousel.js rewind and recount the visible slides.
    if (track) {
      track.dispatchEvent(new CustomEvent("work:filter"));
    }
  }

  // Counts come from the cards themselves, so they stay true when a card
  // is added or retagged. A chip that matches nothing is dropped.
  for (var i = 0; i < chips.length; i++) {
    var chip = chips[i];
    var filter = chip.getAttribute("data-filter");
    var n = count(filter);
    if (!n) {
      chip.parentNode.parentNode.removeChild(chip.parentNode);
      continue;
    }
    chip.textContent = chip.textContent + " (" + n + ")";
    chip.addEventListener("click", function () {
      show(this.getAttribute("data-filter"));
    });
  }
  chips = list.querySelectorAll(".chip");

  list.hidden = false;
})();
