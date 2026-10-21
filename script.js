/* ===========================================================
   HATECO – script.js
   -----------------------------------------------------------
   1. Helpers
   2. Site data        <-- edit car makes, brands, product lists here
   3. Build page parts from that data
   4. Language switcher (English / Arabic)  -> Arabic text is in translations.js
   5. Theme switcher (light / dark)
   6. Navigation & header
   7. Brand carousel
   8. Forms (tire finder, appointment, newsletter)
   9. Scroll effects (reveal on scroll + number counters)
   =========================================================== */


/* ===========================================================
   1. HELPERS
   =========================================================== */
const $  = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const root = document.documentElement;   // the <html> element


/* ===========================================================
   2. SITE DATA  (edit these lists to change what is shown)
   =========================================================== */
const SHOP_URL = "https://www.hateco.com.lb";

// Years shown in the tire finder (newest first)
const YEAR_FROM = 2026;
const YEAR_TO   = 1990;

// Makes shown in the tire finder
const CAR_MAKES = [
  "Aston Martin", "Audi", "Bentley", "BMW", "Buick", "Cadillac", "Chevrolet",
  "Chrysler", "Dodge", "Ferrari", "Ford", "GMC", "Honda", "Hummer", "Hyundai",
  "Infiniti", "Jaguar", "Jeep", "Kia", "Lamborghini", "Land Rover", "Lexus",
  "Maserati", "Maybach", "Mazda", "Mercedes", "Mini cooper", "Mitsubishi",
  "Nissan", "Pontiac Bonneville", "Porsche", "Rolls-Royce", "Saab", "Smart",
  "Subaru", "Suzuki", "Toyota", "Volkswagen", "Volvo"
];

// Brand carousel: [name shown, last part of the brand page link]
const BRANDS = [
  ["ToyoTires", "ToyoTires-logo.png"],
  ["Primewell", "primewell.png"],
  ["Deestone", "dsssss.jpg"],
  ["Altenzo", "altenzo.png"],
  ["Seha Tires", "seha.png"],
  ["Boliden", "boliden"],
  ["Runway", "runway"],
  ["HPA", "hpa"],
  ["Chicago Pneumatic", "chicago-pneumatic"],
  ["Yacco", "yacco"],
  ["Xtra Rev", "xtra-rev"],
  ["Ken-Tool", "kentool"],
  ["Exide", "exide"],
  ["Bendix", "bendix"],
  ["JP", "jp"],
  ["DHC", "dhc"],
  ["HK", "hk"],
  ["PDW", "pdw"],
  ["Trane", "trane"],
  ["Globe-x", "globe-x"]
];

// Product cards: name (must match a key in translations.js),
// last part of the category link, and the brand chips shown on the card
const PRODUCTS = [
  { name: "Tires",            slug: "tires",            brands: ["Toyo Tires", "GITI", "Primewell", "Deestone", "Runway", "Seha", "Altenzo", "Minerva", "Double Happiness"] },
  { name: "Wheels",           slug: "wheels",           brands: ["Globex", "PDW", "Maxxion", "Owrun"] },
  { name: "Batteries",        slug: "batteries",        brands: ["Boliden", "Exide", "Trane", "Globex", "JP", "Freedom", "Craft", "DF", "Hagen"] },
  { name: "Lubricants",       slug: "lubricants",       brands: ["Yacco", "Globex", "Bendix", "XREV", "Magnum"] },
  { name: "Garage Equipment", slug: "garage-equipment", brands: ["HPA", "DHC", "Ken-tools", "COMEC", "Chicago Pneumatic"] },
  { name: "Accessories",      slug: "accessories",      brands: [] }
];


/* ===========================================================
   3. BUILD PAGE PARTS FROM THE DATA ABOVE
   =========================================================== */

// Tire finder dropdowns
CAR_MAKES.forEach(make => $("#make").add(new Option(make, make)));
for (let year = YEAR_FROM; year >= YEAR_TO; year--) {
  $("#year").add(new Option(year, year));
}


 // Brand tiles — logos + automatic infinite carousel
const brandTiles = BRANDS.map(([name, slug, logo]) => {
  const content = logo
    ? `<img src="${logo}" alt="${name}" loading="lazy">`
    : `<span class="brand-name">${name}</span>`;

  return `<a class="brand"
    href="${SHOP_URL}/category/brands/${slug}"
    target="_blank"
    rel="noopener">
    ${content}
  </a>`;
}).join("");

const brandTrack = $("#tr");

if (brandTrack) {
  // Duplicate the tiles for a seamless scrolling loop
  brandTrack.innerHTML = `
    <div class="track-inner">
      ${brandTiles}
      ${brandTiles}
    </div>
  `;
}


// Product cards
$("#pg").innerHTML = PRODUCTS.map(product =>
  `<a class="card rv" href="${SHOP_URL}/category/products/${product.slug}">` +
    `<h3 data-i18n="${product.name}">${product.name}</h3>` +
    `<div class="chips">${product.brands.map(brand => `<i>${brand}</i>`).join("")}</div>` +
    `<p style="margin:14px 0 0"><span class="more" data-i18n="Read more">Read more →</span></p>` +
  `</a>`
).join("");

// Footer year
$("#yr").textContent = new Date().getFullYear();


/* ===========================================================
   4. LANGUAGE SWITCHER  (English <-> Arabic)
   English text lives in index.html; Arabic text is in translations.js
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

  // Swap input placeholders (data-i18n-ph="key")
  $$("[data-i18n-ph]").forEach(el => {
    if (!el.dataset.en) el.dataset.en = el.placeholder;
    el.placeholder = newLang === "ar" ? AR[el.dataset.i18nPh] : el.dataset.en;
  });

  // Clear old form messages so they don't stay in the wrong language
  $("#msg").textContent = "";
  $("#nm").textContent  = "";
  $("#apm").textContent = "";

  try { localStorage.setItem("hl", newLang); } catch (e) {}   // remember the choice
}

$("#lang").onclick = () => setLang(lang === "en" ? "ar" : "en");


/* ===========================================================
   5. THEME SWITCHER  (light <-> dark)
   Colors are defined in style.css (:root and the dark blocks)
   =========================================================== */
const darkQuery = matchMedia("(prefers-color-scheme:dark)");

function setTheme(theme) {
  root.dataset.theme = theme;
  if (theme === "light") root.setAttribute("data-lt", "");   // moves the switch knob
  else root.removeAttribute("data-lt");
  try { localStorage.setItem("ht", theme); } catch (e) {}    // remember the choice
}

$("#theme").onclick = () => setTheme(root.dataset.theme === "dark" ? "light" : "dark");

// On load: use the saved choice, otherwise follow the device setting
let savedTheme = null, savedLang = null;
try {
  savedTheme = localStorage.getItem("ht");
  savedLang  = localStorage.getItem("hl");
} catch (e) {}

setTheme(savedTheme || (darkQuery.matches ? "dark" : "light"));
if (savedLang === "ar") setLang("ar");


/* ===========================================================
   6. NAVIGATION & HEADER
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

// Close the mobile menu after choosing an on-page link
$$("nav a[href^='#']").forEach(link =>
  link.addEventListener("click", () => $("#nv").classList.remove("o"))
);

// Header shadow + back-to-top button appear after scrolling
addEventListener("scroll", () => {
  $("#hd").classList.toggle("s", scrollY > 20);
  $("#up").classList.toggle("v", scrollY > 600);
});
$("#up").onclick = () => scrollTo({ top: 0 });


/* ===========================================================
   7. BRAND CAROUSEL
   =========================================================== */
const CAROUSEL_STEP = 360;                 // pixels moved per arrow click
const track = $("#tr");
const dir = () => (lang === "ar" ? -1 : 1);   // arrows flip in Arabic (right-to-left)

$("#nx").onclick = () => track.scrollBy({ left:  CAROUSEL_STEP * dir() });
$("#pv").onclick = () => track.scrollBy({ left: -CAROUSEL_STEP * dir() });


/* ===========================================================
   8. FORMS
   =========================================================== */
const EMAIL_RE = /^\S+@\S+\.\S+$/;
const PHONE_RE = /^[+\d][\d\s()-]{6,}$/;

// Tire finder: checks a make was chosen, copies the details into the
// appointment message, then scrolls to the appointment form
$("#finder").onsubmit = event => {
  event.preventDefault();
  const make = $("#make").value;
  $("#msg").textContent = make ? MSG[lang].ok : MSG[lang].pick;
  if (!make) return;

  const details = [make, $("#model").value, $("#year").value, $("#type").value]
    .filter(Boolean).join(" ");
  if (!$("#am").value) $("#am").value = MSG[lang].prefill + details;
  $("#appointment").scrollIntoView({ behavior: "smooth" });
};

// Appointment form: checks the fields and shows a confirmation.
// NOTE: it does not send anything yet. Connect it to a form service
// (e.g. Formspree) or your own backend to receive the requests.
$("#ap").onsubmit = event => {
  event.preventDefault();
  const valid = $("#an").value.trim()
    && PHONE_RE.test($("#aph").value.trim())
    && EMAIL_RE.test($("#ae").value)
    && $("#am").value.trim();
  $("#apm").textContent = valid ? MSG[lang].ap : MSG[lang].apx;
  if (valid) event.target.reset();
};

// Newsletter form: checks the email and shows a message (nothing is sent yet)
$("#nl").onsubmit = event => {
  event.preventDefault();
  $("#nm").textContent = EMAIL_RE.test($("#em").value) ? MSG[lang].sub : MSG[lang].em;
};


/* ===========================================================
   9. SCROLL EFFECTS
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
