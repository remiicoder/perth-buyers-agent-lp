Drop your brand assets in here.

LOGO
====

The site looks for these in order:

  1. assets/logo.png   ← preferred. Save the niche logo image you
                         uploaded into the chat as this file.
                         Recommended: transparent PNG, ~360×120px,
                         dark wordmark on transparent background
                         (the same artwork shown in the brief).

  2. assets/logo.svg   ← fallback that ships with the project.
                         A clean rebuild of the logo so the page
                         never looks broken before you supply art.

The footer automatically inverts the logo for the dark background
(filter: brightness(0) invert(1)) so a single asset works in both
the header and footer.

If you'd rather supply a separate dark/light pair, save the white
version as assets/logo-light.png and update the <img src> in the
footer block of index.html.

PHOTOGRAPHY
===========

  • anna-signing.jpg   → used in the PAIN section (right column).
                           Portrait orientation (4:5), ~1200×1500px.
                           E.g. Anna signing the contract with
                           a client at the kitchen counter.

  (Existing placeholders still pulled from Unsplash CDN for the
  hero and "Why me" sections — see styles.css / index.html if you
  want to replace those too.)

If a photo is missing, the page falls back to a matching Unsplash
placeholder via the <img onerror> attribute, so the layout never
breaks.

Suggested filenames for the rest of the brand photography:

  • hero-perth.jpg     → hero background (landscape)
  • anna-portrait.jpg   → "Why me" section (portrait 4:5)
