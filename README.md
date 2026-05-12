# Niche Buyers Agents — Landing Page

A modern, editorial, conversion-focused landing page for Anna — Perth's
southern suburbs buyer's agent.

> Trusted · Respected · Experienced

---

## What's in this folder

```
niche-landing/
├── index.html      # Page markup (all sections)
├── styles.css      # Design system + section styles
├── script.js       # Slider, mobile nav, FAQ, scroll reveal
└── README.md       # This file
```

No build step. No framework. Just open `index.html` in a browser.

## Run locally

The fastest way (Windows / macOS / Linux):

```bash
# from inside this folder
python -m http.server 5173
# then visit http://localhost:5173
```

Or simply double-click `index.html`.

## Sections (matches the brief)

1. **Hero** — Perth's Southern Suburbs Specialist  
2. **Trust banner** — 200+ homes · $47K avg saving · 38% off-market · 15+ years
3. **Pain** — "You're doing everything right. So why don't you have a house?"
4. **How it works** — Four steps. One outcome.
5. **Operating areas** — Inner South · Bayside · Western Suburbs · Olympic Legacy Zone
6. **Who I help** — 5 buyer avatars
7. **Why me** — Buyers only · Local specialist · Real off-market access
8. **Reviews slider** — Auto-advancing, swipe, prev/next + dots
9. **FAQ** — Accordion (one open at a time)
10. **Final CTA** — Let's find your home
11. **Footer** — Service areas · Site · Contact + licence

## Design system

- **Type**: Fraunces (display serif, italics) + Inter (UI sans)
- **Palette**: cream `#faf7f2`, ink `#1a1a1a`, terracotta `#cc7a4f`
- **Motion**: subtle reveal-on-scroll, smooth slider, sticky headers in two-col sections
- **Accessibility**: semantic landmarks, focus styles, `prefers-reduced-motion`
  honored, keyboard-friendly slider, aria-labels on all controls

## Swap in real photos

The page currently uses Unsplash placeholders. Replace these to use Anna's
actual photography (the images you sent in the brief):

| Where | Element in `index.html` | Suggested photo |
| --- | --- | --- |
| Hero background | `.hero__media img` (and `<source>`) | The Perth bayside / cafe / Story Bridge image |
| Why me — portrait | `.why__media img` | Headshot of Anna with the laptop / pearls |

Drop the files into an `assets/` folder next to `index.html` and update the
`src` (and `srcset`) paths, e.g.:

```html
<source media="(min-width: 900px)" srcset="assets/hero-perth@2x.jpg" />
<img src="assets/hero-perth.jpg" alt="Perth's southern suburbs" />
```

For the portrait:

```html
<img src="assets/anna-portrait.jpg" alt="Anna, Niche Buyers Agents" />
```

You can also swap in additional editorial photos (signing the contract, walking
through a home with a client) by adding them where it feels natural — e.g.
inside the `.who` or `.how` section as an aside.

## Wiring the CTA to your booking link

Every "Book a free call" button uses an in-page anchor (`#contact`) so the
user is taken to the final CTA section. The button **inside** that final
section already points at your existing booking funnel:

```html
<a href="https://lp.nichebuyersagents.com.au/consult" class="btn btn--primary btn--xl">
```

If you'd rather have every button go straight to that funnel, search-and-replace
`href="#contact"` with `href="https://lp.nichebuyersagents.com.au/consult"`.

## Editing copy

All copy lives in `index.html`. Common edits:

- **Stats** in the trust banner: search for `trust__num`
- **Step titles** in How It Works: search for `step__title`
- **Suburbs** in Where We Buy: search for `area-card__suburbs`
- **FAQ items**: search for `faq__item`
- **Reviews**: each review is a `<article class="review">` inside the slider track

## Browser support

Tested in modern Chrome, Edge, Firefox, and Safari. Uses CSS Grid, custom
properties, `backdrop-filter`, `IntersectionObserver`. Graceful degradation for
older browsers (no JS = static page; no IO = content shown immediately).

## License

Copy and visual concept © 2026 Niche Buyers Agents. Photography placeholders
used here are from Unsplash and must be replaced with licensed brand
photography before publishing.
