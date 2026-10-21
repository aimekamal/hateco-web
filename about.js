/* ===========================================================
   HATECO – about.js   (used only by about.html)
   -----------------------------------------------------------
   A smaller copy of the parts of script.js that this page needs.
   Arabic text comes from translations.js (same file as the homepage).

   1. Helpers
   2. Language switcher (English / Arabic)
   3. Theme switcher (light / dark)
   4. Navigation & header
   5. Notice for pages not built yet
   6. Scroll effects (reveal on scroll + number counters)
   =========================================================== */


/* ===========================================================
   1. HELPERS
   =========================================================== */
const $  = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const root = document.documentElement;   // the <html> element

// Footer year
$("#yr").textContent = new Date().getFullYear();


/* ===========================================================
   2. LANGUAGE SWITCHER  (English <-> Arabic)
   English text lives in about.html; Arabic text is in translations.js
   =========================================================== */
let lang = "en";

function setLang(newLang) {
  lang = newLang;
  root.lang = newLang;
  root.dir = newLang === "ar" ? "rtl" : "ltr";
  $("#lang").textContent = newLang === "ar" ? "English" : "العربية";

  // Swap the text of every element that has data-i18n="key"
  $$("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (el.dataset.en == null) el.dataset.en = el.innerHTML;   // remember the English text
    el.innerHTML = newLang === "ar" && AR[key] ? AR[key] : el.dataset.en;
  });

  try { localStorage.setItem("hl", newLang); } catch (e) {}   // remember the choice
}

$("#lang").onclick = () => setLang(lang === "en" ? "ar" : "en");


/* ===========================================================
   3. THEME SWITCHER  (light <-> dark)
   Colors are defined in style.css
   =========================================================== */
const darkQuery = matchMedia("(prefers-color-scheme:dark)");

function setTheme(theme) {
  root.dataset.theme = theme;
  if (theme === "light") root.setAttribute("data-lt", "");   // moves the switch knob
  else root.removeAttribute("data-lt");
  try { localStorage.setItem("ht", theme); } catch (e) {}    // remember the choice
}

$("#theme").onclick = () => setTheme(root.dataset.theme === "dark" ? "light" : "dark");

// On load: use the choice saved on the homepage, otherwise follow the device setting
let savedTheme = null, savedLang = null;
try {
  savedTheme = localStorage.getItem("ht");
  savedLang  = localStorage.getItem("hl");
} catch (e) {}

setTheme(savedTheme || (darkQuery.matches ? "dark" : "light"));
if (savedLang === "ar") setLang("ar");


/* ===========================================================
   4. NAVIGATION & HEADER
   =========================================================== */
const MOBILE_NAV_WIDTH = 980;   // keep equal to the 980px breakpoint in style.css

// Menu button (mobile)
$("#bg").onclick = () => $("#nv").classList.toggle("o");

// Mobile: first tap on an item with a dropdown opens it, second tap follows the link
$$("nav .has>a").forEach(link => link.addEventListener("click", event => {
  if (innerWidth > MOBILE_NAV_WIDTH) return;
  const item = link.parentElement;
  if (!item.classList.contains("open")) {
    event.preventDefault();
    $$("nav li.open").forEach(other => other.classList.remove("open"));
    item.classList.add("open");
  }
}));

// Close the mobile menu after choosing a link (unless the tap only opened a dropdown)
$$("nav a").forEach(link => link.addEventListener("click", event => {
  if (!event.defaultPrevented) $("#nv").classList.remove("o");
}));

// Header shadow + back-to-top button appear after scrolling
addEventListener("scroll", () => {
  $("#hd").classList.toggle("s", scrollY > 20);
  $("#up").classList.toggle("v", scrollY > 600);
});
$("#up").onclick = () => scrollTo({ top: 0 });


/* ===========================================================
   5. NOTICE FOR PAGES NOT BUILT YET
   Menu items with the data-soon attribute show a short message
   =========================================================== */
const toast = $("#toast");
let toastTimer;
$$("[data-soon]").forEach(link => link.addEventListener("click", event => {
  event.preventDefault();
  toast.textContent = MSG[lang].soon;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}));


/* ===========================================================
   6. SCROLL EFFECTS
   =========================================================== */

// Fade-in: elements with class "rv" appear when scrolled into view
const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add("in");
    revealObserver.unobserve(entry.target);
  }
}), { threshold: 0.15 });
$$(".rv").forEach(el => revealObserver.observe(el));

// Number counters: elements with data-c="target" count up when visible
// (optional data-s="+" adds a suffix at the end)
const COUNTER_MS = 1400;   // animation length
const counterObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  const el     = entry.target;
  const target = +el.dataset.c;
  const suffix = el.dataset.s || "";
  const from   = target > 100 ? target - 60 : 0;   // years count up from 60 below
  const start  = performance.now();

  (function tick(now) {
    const progress = Math.min((now - start) / COUNTER_MS, 1);
    el.textContent = Math.round(from + (target - from) * progress) + (progress === 1 ? suffix : "");
    if (progress < 1) requestAnimationFrame(tick);
  })(start);

  counterObserver.unobserve(el);
}), { threshold: 0.6 });
$$("[data-c]").forEach(el => counterObserver.observe(el));