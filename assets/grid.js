/* Swiss grid variant: year, theme toggle, left-edge progress,
   section-index active state, rule-draw + content reveal, figure count-up.
   Degrades to fully visible / no motion without JS or with reduced motion. */

(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  var reduce = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;
  var hasIO = "IntersectionObserver" in window;

  /* ---- Year ---------------------------------------- */
  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  /* ---- Theme toggle: auto -> light -> dark --------- */
  var KEY = "theme-pref";
  var ORDER = ["auto", "light", "dark"];
  var toggle = document.getElementById("themeToggle");
  var label = toggle && toggle.querySelector("[data-theme-label]");

  function read() {
    try { var v = localStorage.getItem(KEY); return ORDER.indexOf(v) > -1 ? v : "auto"; }
    catch (e) { return "auto"; }
  }
  function apply(p) {
    if (p === "auto") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", p);
    if (label) label.textContent = p;
    if (toggle) toggle.setAttribute("aria-label", "Color theme: " + p + ". Click to change.");
  }
  var cur = read();
  apply(cur);
  if (toggle) {
    toggle.addEventListener("click", function () {
      cur = ORDER[(ORDER.indexOf(cur) + 1) % ORDER.length];
      try { localStorage.setItem(KEY, cur); } catch (e) {}
      apply(cur);
    });
  }

  /* ---- Left-edge reading progress ----------------- */
  var fill = document.querySelector(".progress__fill");
  if (fill) {
    var ticking = false;
    function draw() {
      var st = window.scrollY || root.scrollTop;
      var max = root.scrollHeight - window.innerHeight;
      fill.style.setProperty("--p", max > 0 ? (st / max).toFixed(4) : 0);
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(draw); ticking = true; }
    }, { passive: true });
    draw();
  }

  /* ---- Section-index active state ----------------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));
  if (navLinks.length && hasIO) {
    var byId = {};
    navLinks.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var seen = new Set();
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) seen.add(e.target.id);
        else seen.delete(e.target.id);
      });
      var active = Object.keys(byId).filter(function (id) { return seen.has(id); })[0];
      navLinks.forEach(function (a) { a.classList.remove("is-active"); });
      if (active && byId[active]) byId[active].classList.add("is-active");
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
    Object.keys(byId).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) navIO.observe(s);
    });
  }

  /* ---- Figure count-up --------------------------- */
  function countUp(el) {
    var to = parseFloat(el.getAttribute("data-to"));
    if (isNaN(to)) return;
    var pre = el.getAttribute("data-pre") || "";
    var suf = el.getAttribute("data-suf") || "";
    if (reduce) { el.textContent = pre + to + suf; return; }
    var dur = 850, t0 = performance.now();
    (function tick(now) {
      var p = Math.min((now - t0) / dur, 1);
      el.textContent = pre + Math.round(to * (1 - Math.pow(1 - p, 3))) + suf;
      if (p < 1) window.requestAnimationFrame(tick);
    })(t0);
  }

  /* ---- Reveal (rules + content) ------------------ */
  var sections = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  window.__revealReady = true;

  function fireCounts(scope) {
    scope.querySelectorAll("[data-to]").forEach(countUp);
  }

  if (reduce || !hasIO) {
    sections.forEach(function (el) { el.classList.add("is-in"); fireCounts(el); });
  } else {
    var revIO = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        fireCounts(e.target);
        obs.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.06 });
    sections.forEach(function (el) { revIO.observe(el); });

    setTimeout(function () {
      sections.forEach(function (el) {
        if (el.classList.contains("is-in")) return;
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) { el.classList.add("is-in"); fireCounts(el); }
      });
    }, 1200);
  }
})();
