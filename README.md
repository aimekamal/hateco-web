# HATECO S.A.R.L – Homepage

Modern redesign of the HATECO homepage (tires, batteries, wheels, lubricants – Tripoli, Lebanon).
Content source: https://www.hateco.com.lb

## Features
- Light / dark theme toggle (remembers choice, follows the device by default)
- English / Arabic (right-to-left) language button
- Responsive layout, dropdown + mobile menu, brand carousel, tire finder, appointment form
- Black / white / beige / orange palette

## Files
| File | What it contains |
|------|------------------|
| `index.html` | Page structure and English text (sections are labelled with comments) |
| `style.css` | All styling, grouped in labelled sections |
| `script.js` | All interactions; site data lists (car makes, brands, products) are at the top |
| `translations.js` | Arabic text and form messages |
| `logo.png` | Your logo (add this file next to `index.html`) |

Keep all files in the same folder. `translations.js` must load before `script.js` (already set in `index.html`).

## Where to change things
| I want to… | Edit |
|------------|------|
| Change the orange / beige / black colors | `style.css` → top, "THEME COLORS" (`--orange`, `--bg`, …). Dark colors are in the two dark blocks right below – keep them identical |
| Change the logo size | `style.css` → `.logo img { height: … }` (desktop) and the same rule inside the 980px media block (mobile); keep `header .wrap` height about 24px taller than the logo |
| Change English wording | `index.html` (find the text in its section) |
| Change Arabic wording | `translations.js` (text after the colon; keys match `data-i18n="…"` in `index.html`) |
| Add / remove a car make, brand or product card | `script.js` → "SITE DATA" |
| Change phone numbers, addresses, social links | `index.html` (top bar, contact section, footer) |
| Make the appointment form send emails | `script.js` → section 8, the `#ap` form (connect a service such as Formspree) |

## Run
Open `index.html` in a browser, or host free with GitHub Pages
(Settings → Pages → Deploy from branch → `main` / root).
