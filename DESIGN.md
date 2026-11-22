---
version: 5
name: AIML-LI — Startup School
description: "After YC's Startup School 2026 event page: a cream page set in mono, a blue sun rising off a horizon line, and one outlined card per topic. Chosen by Adrian on 21 Nov 2026 ('more like YC startupschool', then 'Yes, blue')."

colors:
  bg: "#F4F1DB"      # page (cream)
  ink: "#463325"     # text, card borders at 22%, tags, the dark button
  dim: "#6F5B4B"     # small print
  acc: "#1F5FBF"     # AIML-LI blue: the sun, the edge glow, focus rings
  acc2: "#3F7FE0"    # the sun's lighter rim

typography:
  body: "Geist Mono (variable, self-hosted via @fontsource), 14.5px / 1.7. Everything is mono."
  masthead: "Martian Mono, 23px, uppercase: the title top left, the date top right."

layout:
  bar: "sticky; the mark left, the sections as outlined pills in the middle, 'Sign up →' right. Pills hide under 760px."
  masthead: "330px (290 on phones), a horizon line at the bottom, the blurred, faintly striped half-sun centred on it."
  cards: "max 820px, 1px ink border at 22%, 34px radius, 58px / 64px padding; a /LABEL in small caps opens each one."
---

## Rules

- **The summit leads.** The first card is sign-up (Student, Teacher), then /About, /Schedule, /FAQ (with the
  sign-up buttons again), /The course, /Who we are.
- **Plain, first-person-plural copy** ("We're bringing 500+ LA public school students to LACES..."). Full sentences
  that state facts; no slogans, no hype words.
- **Blue, not YC orange.** The layout and type follow YC's page closely, so the colour must be AIML-LI's own; in
  orange it reads as a copy of YC's site. No YC name, logo or marks anywhere.
- **Committed partners only**, logos in full colour (`src/lib/partners.js`). aiEDU has no logo file and is set as text.
- **Sign-up links live in `src/lib/site.js` (`SIGNUP`).** They open a pre-filled email until the Google Form exists;
  swap in the form's link there.
- **Every number is sourced.** The Unit 1 table reads `src/lib/minilab.js` (pooled over 25 runs; regenerate it from
  the notebook rather than editing).
- **No motion** beyond smooth anchor scrolling: no reveals, typewriters, count-ups, tilt or hand-drawn notes.

## History

- v3 (15 Oct 2026): "bright classroom", white with ink-bordered cards and Bricolage Grotesque.
- v4 (21 Oct 2026): a Monte + Hivemind look, grey page, frosted pill nav, Inter Tight, pencil notes, a tearable
  summit ticket and an interactive Unit 1 lab.
- 20-21 Nov 2026: Adrian said the theme "needs a lot of work" and turned down four themed mocks (a Jupyter notebook,
  a Swiss event poster, a student binder with a permission slip, LA freeway signs) and a plain one-column page, then
  asked for this.
