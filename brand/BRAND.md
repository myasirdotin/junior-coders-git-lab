# Junior Coders brand

The one place that says how Junior Coders looks and sounds, on the site and in posts about it.
Everything here is already in use on the site; this file only writes it down. If the site and this file
disagree, fix the one that is wrong in the same change.

`brand.json` in this folder is the same brand in the format of the SocialFlow posting app (category "Coding").

## Name and tagline

- **Name:** Junior Coders (two words, both capitals). Never "BEI Coders" or "LearnCode" (GEMINI §7.1).
- **Tagline:** *A place to begin.*
- **Who it is for:** school students in Grades 6–10, and their teachers.

## Logo

The `</>` mark: a white code bracket on a flat indigo rounded square.

| File | Use |
|---|---|
| `favicon.svg` (site root) | The master drawing. Browser tab, and anywhere a vector works. |
| `brand/logo-1024.png` | Posts, slides, documents (rounded corners, transparent outside). |
| `brand/logo-square-1024.png` | Places that add their own rounding or circle (profile pictures). |
| `favicon.ico`, `apple-touch-icon.png` | Browser and phone home-screen icons. |

All the bitmaps are drawn by `python scripts/build-favicons.py` from the same design: change the design in
`favicon.svg` and that script together, then run it.

Keep the mark flat: no gradient, glow, shadow, outline or 3D. Leave clear space around it of at least a quarter
of its width. Do not recolour the brackets or put the mark on a busy photo.

## Colours

The site's palette lives in `styles/bei-core.css` (`--brand-*`, `--bg-*`, `--text-*`). The core colours:

| Name | Hex | Role |
|---|---|---|
| Indigo | `#4F46E5` | The brand colour: logo, main buttons, links, one highlight per picture. |
| Deep indigo | `#4338CA` | Indigo pressed or hovered; indigo text on light backgrounds. |
| Soft indigo | `#818CF8` | Indigo text on dark backgrounds. |
| Green | `#059669` | The accent: progress, "done", a correct answer. Use sparingly. |
| Navy | `#0B1120` | Dark background. |
| Slate | `#131D32` | Cards and boxes on the dark background. |
| Paper | `#F8FAFC` | Light background. |
| White | `#FFFFFF` | Cards and boxes on the light background; the logo brackets. |
| Ink | `#0F172A` | Main text on light backgrounds. |
| Grey | `#475569` | Second-level text on light backgrounds. |

Rules (GEMINI §7c): surfaces are solid; no page gradients, no gradient text, no glass or blur. Each subject has its
own colour only as a thin stripe on its lesson title card, never as a full banner. Text must keep at least 4.5:1
contrast with its background. The textbooks are deliberately light, like paper.

Open decision (docs/BACKLOG.md): whether the site starts in light or dark. Until then both are brand.

## Fonts

All three are free Google Fonts and already loaded by the site.

| Font | Use |
|---|---|
| **Outfit** (600–800) | Headings, titles, the name in the logo row. |
| **Inter** (400–600) | Body text, buttons, captions. |
| **Fira Code** (400–500) | Code, with ligatures switched off so `>=` shows as typed. |

## Shapes

Rounded corners of 8 px (small controls), 12 px (cards) and 18 px (large panels). Thin borders, soft shadows only
where something floats (a menu). No pulsing, no entrance animations on lesson text (GEMINI §7h2).

## Pictures

Real screens from the site (a code editor, a lesson, a textbook chapter), cropped clean, on a plain navy or paper
background, with one indigo highlight and plenty of empty space. Code large enough to read on a phone, in Fira Code.
Diagrams with simple lines and boxes. If people appear: modest and respectful, hands at a keyboard rather than faces.
No stock-photo smiles, no clutter, no decorative emoji.

## Voice

We sound like a fellow learner: calm, kind and plain. Short sentences, one idea at a time, every new word explained.
We say only what a page really has, and we write values as aims we try to follow, not promises. We praise effort and
careful thinking, not speed. Respectful to everyone, never sarcastic.

## What we never use

- Points, XP, badges, streaks, leaderboards, countdowns, "hurry" language (GEMINI §7h2).
- Boastful or comparing words: official, verified, live, best, "become a developer", "unlike other sites".
- Promises we cannot keep (guaranteed, always, never as a blanket claim).
- Gradients, glass, glow, gradient text, emoji in headings or buttons.
- Examples or images with interest or loans, gambling, dice or raffles, alcohol, pork, films, music, celebrities,
  superheroes or game characters, social-media likes or followers (GEMINI §1.3).
