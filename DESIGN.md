---
version: 1
name: AIML-LI — Gallery & Poster
description: "An editorial, museum-quiet landing page for a nonprofit that teaches AI to public-school students. Full-bleed sections alternate white, parchment and near-black like gallery rooms; the color change is the only divider. Headlines are posters: Geist at weight 600, pulled tight (-0.045em to -0.05em). Body is Inter at a 17px reading pace. One blue carries every click. Color gradients appear only in the hero's 3D network and in a single spotlight card per page."
sources: "Original system synthesized from the Framer and Apple DESIGN.md studies in VoltAgent/awesome-design-md (via VoltAgent/awesome-claude-design): Apple's alternating tiles, reading pace, single action blue and flat chrome; Framer's poster typography, pill vocabulary, dark-surface lift and gradient spotlight cards."

colors:
  canvas: "#FFFFFF"          # default light section
  parchment: "#F5F5F7"       # alternate light section, footer, cards on white
  ink: "#1D1D1F"             # headlines and strong body on light
  muted: "#55555A"           # paragraphs and secondary text (7.4:1 on white)
  faint: "#6E6E73"           # captions, meta, labels (5.1:1 on white, 4.7:1 on parchment)
  line: "rgba(0,0,0,0.08)"   # hairlines, card borders
  line-strong: "rgba(0,0,0,0.14)"
  accent: "#0066CC"          # Action Blue: links, primary buttons, active states (5.6:1 on white)
  accent-hover: "#0071E3"    # hover fill and focus ring
  accent-soft: "#E8F0FB"     # tint behind accent text (chips, badges)
  accent-on-dark: "#2997FF"  # links and accents on dark sections
  stage: "#07080C"           # dark sections (hero, curriculum, contact)
  stage-1: "#121216"         # cards on stage (one lift)
  stage-2: "#1B1B20"         # featured / active card on stage (two lifts)
  stage-line: "rgba(255,255,255,0.08)"
  on-dark: "#F5F5F7"
  on-dark-muted: "#A1A1A6"   # 7.8:1 on stage
  spotlight: ["#2997FF", "#7C5CFF", "#22D3EE"]  # gradient family: hero network + spotlight card only

typography:
  families:
    display: "Geist Variable (self-hosted, @fontsource-variable/geist)"
    body: "Inter Variable (self-hosted, @fontsource-variable/inter)"
    mono: "Geist Mono Variable (self-hosted, @fontsource-variable/geist-mono)"
  display-2xl: { family: display, size: "clamp(3.25rem, 1.6rem + 6.4vw, 7rem)", weight: 600, lineHeight: 0.92, letterSpacing: "-0.05em", use: "hero headline only" }
  display-xl:  { family: display, size: "clamp(2.5rem, 1.3rem + 4.4vw, 5rem)", weight: 600, lineHeight: 0.98, letterSpacing: "-0.045em", use: "section openers" }
  display-lg:  { family: display, size: "clamp(2rem, 1.2rem + 3vw, 3.75rem)", weight: 600, lineHeight: 1.02, letterSpacing: "-0.04em", use: "sub-section openers, big numbers" }
  display-md:  { family: display, size: "clamp(1.5rem, 1.1rem + 1.4vw, 2.25rem)", weight: 600, lineHeight: 1.08, letterSpacing: "-0.03em", use: "card titles, row titles" }
  title:       { family: display, size: "1.375rem", weight: 600, lineHeight: 1.2, letterSpacing: "-0.02em", use: "small card titles, names" }
  lead:        { family: body, size: "clamp(1.1875rem, 1rem + 0.6vw, 1.5rem)", weight: 400, lineHeight: 1.4, letterSpacing: "-0.015em", use: "intro paragraph beside a headline" }
  body:        { family: body, size: "1.0625rem", weight: 400, lineHeight: 1.5, letterSpacing: "-0.01em", use: "default paragraph (17px)" }
  body-sm:     { family: body, size: "0.9375rem", weight: 400, lineHeight: 1.5, letterSpacing: "-0.006em", use: "card descriptions, dense lists" }
  caption:     { family: body, size: "0.8125rem", weight: 500, lineHeight: 1.35, letterSpacing: "0", use: "meta, chips" }
  eyebrow:     { family: mono, size: "0.75rem", weight: 500, lineHeight: 1, letterSpacing: "0.08em", transform: uppercase, use: "section labels, card kickers" }
  button:      { family: body, size: "0.9375rem", weight: 500, lineHeight: 1, letterSpacing: "-0.01em" }

rounded:
  chip: 8px
  card: 20px
  panel: 28px      # spotlight card, oversized panels
  pill: 9999px     # every button

spacing:
  base: 8px
  section: "clamp(5.5rem, 3.5rem + 7vw, 10rem)"   # vertical padding of every section (88 → 160px)
  container: 1200px                               # grids, rows, card sets
  reading: 980px                                  # text-led sections
  measure: 62ch                                   # max paragraph width
  gutter: "24px mobile, 32px tablet, 40px desktop"

components:
  button-primary:        { bg: accent, text: "#FFFFFF", rounded: pill, height: 44px, padding: "0 22px", hover: accent-hover, press: "scale(0.96)" }
  button-secondary:      { bg: transparent, border: "1px line-strong", text: ink, rounded: pill, hover: "bg rgba(0,0,0,0.04)" }
  button-primary-dark:   { bg: "#FFFFFF", text: "#000000", rounded: pill, hover: "#E8E8ED", use: "primary action on stage" }
  button-secondary-dark: { bg: "rgba(255,255,255,0.08)", border: "1px rgba(255,255,255,0.14)", text: on-dark, rounded: pill }
  button-icon:           { size: 44px, rounded: pill, bg: "parchment on light, stage-1 on dark" }
  card:                  { bg: "canvas on parchment sections, parchment on white sections", border: "1px line", rounded: card, padding: "24px mobile / 32px desktop", shadow: none }
  card-dark:             { bg: stage-1, border: "1px stage-line", rounded: card, shadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 30px rgba(0,0,0,0.25)" }
  spotlight-card:        { bg: "spotlight gradient + soft aurora inside the card", text: "#FFFFFF", rounded: panel, padding: "48px → 96px", limit: "one per page (the contact finale)" }
  chip:                  { bg: accent-soft, text: accent, font: caption, rounded: pill, use: "highlights only; neutral hairline chips for plain lists" }
  nav:                   { height: 56px, bg: "canvas 80% + blur(20px) saturate(180%) once scrolled; stage 60% over dark sections", links: "body-sm, muted → ink", cta: "small button-primary (button-primary-dark over stage)" }
  section-label:         { font: eyebrow, color: faint, number: "accent (accent-on-dark on stage)", rule: "24px hairline" }
  footer:                { bg: parchment, text: faint, font: body-sm, padding: "64px top", layout: "brand block + link columns + legal row" }
---

## 1. Visual theme & atmosphere

A gallery with posters on the walls. Each section is a room: full-bleed, one color, one statement. White and parchment rooms carry the reading; three near-black rooms (hero, curriculum, contact) carry the drama. Nothing competes with the words — no borders between sections, no decorative gradients on chrome, no shadows on light cards. Motion is the only ornament, and it always serves reading order.

## 2. Color roles

- **Canvas / parchment / stage are the only section grounds.** Alternate them so two neighbours never share a color. The change of color IS the divider — never add `border-y` between sections.
- **One blue for every click.** `accent` (#0066CC) on light, `accent-on-dark` (#2997FF) on stage. Links, primary buttons, focus, the active nav pill, active numbers. Never as a section background.
- **Text hierarchy is ink → muted → faint** on light and `on-dark → on-dark-muted` on stage. All three light tones pass WCAG AA at body size; do not invent lighter grays for text.
- **Emphasis inside a headline is two-tone, not gradient:** the lead clause in `ink`, the rest in `faint` (or `on-dark-muted` on stage). Gradient text is reserved for the single hero keyword.
- **The spotlight gradient** (blue → violet → cyan) appears in exactly two places: the hero's 3D network and the contact spotlight card. Data-viz may use the same three hues as categorical series on stage.
- **Tailwind names** (`tailwind.config.js`): `canvas`, `parchment`, `ink`, `muted`, `faint`, `line`, `linestrong`, `accent`, `accentdk` (= accent-hover, focus ring), `accentsoft`, `accentdark` (= accent-on-dark), `stage`, `stage1`, `stage2`, `stageline`, `ondark`, `ondarkmuted`, `brand.blue|violet|cyan` (spotlight). `bg` and `surface` remain as aliases of canvas and parchment for older code. For JS/SVG, import hex values from `src/lib/palette.js` instead of hard-coding them.

## 3. Typography

- **Geist 600 for every headline**, letter-spacing tightened with size (-0.02em at 22px up to -0.05em at the hero). Tight line-heights (0.92–1.08). Hierarchy comes from size and tracking, not from 700/800 weights.
- **Inter 400 at 17px / 1.5 for body.** Paragraphs never exceed `measure` (62ch). Secondary copy uses `muted`, never a smaller size to fake hierarchy.
- **Geist Mono for labels and numbers only:** section labels, card kickers ("Weeks 1–2", "Morning · 3 hours"), counters, chart ticks. Always uppercase with +0.08em tracking at 12px, or tabular numerals.
- Use the Tailwind tokens: `text-display-2xl`, `text-display-xl`, `text-display-lg`, `text-display-md`, `text-title`, `text-lead`, `text-body`, `text-body-sm`, `text-caption`, plus `.display` (Geist + tight tracking) and `.eyebrow`. Don't hand-roll `text-[2.5rem] tracking-[...]` values.
- `text-balance` on headlines, `text-pretty` on paragraphs.

## 4. Components

- **Buttons are pills, 44px tall.** `.btn-accent` (primary on light), `.btn-ghost` (secondary on light), `.btn-light` (primary on stage), `.btn-dark` (secondary on stage). Press = `scale(0.96)`. No lift on hover, no sheen, no glow.
- **Cards** (`.card`): 20px radius, 1px hairline, flat. White cards on parchment sections, parchment cards on white sections. On stage use `.card-dark` (stage-1 with a light top edge). Hover may tilt/brighten the border, never add a colored glow.
- **Spotlight card** (`contact` only): 28px radius, spotlight gradient with a slow aurora inside the card, white type, white pill CTA. The one moment of color saturation on the page.
- **Section header:** `SectionLabel` (eyebrow) → headline (`display-xl`) → optional `lead` paragraph. Left-aligned in light rooms; centered in stage rooms.
- **Chips:** caption text on `accent-soft`, pill radius, for highlights such as "Most needed". Plain lists (the summit's tool list) use neutral chips: white, 1px hairline, ink text, so nothing that isn't clickable turns blue.

## 5. Layout

- **Section padding** is `.section-y` (88px → 160px). No section invents its own `py-*`.
- **Containers:** `.container-page` (1200px max, 24/32/40px gutters) for grids and rows; `.container-narrow` (980px) for text-led sections.
- **Grids:** 12 columns on desktop. The standard header split is 5/7 (headline left, lead right) with a 64px+ gap. Card grids use 16–24px gaps.
- **Whitespace is generous and asymmetric:** at least 64px above every headline block, 48px+ between a header and its content. The footer is the only dense area.
- Section order and grounds: Hero **stage** → About **canvas** → How it works **parchment** → Curriculum **stage** → Summit **canvas** → Supporters **parchment** → Get involved **canvas** → Contact **stage** → Footer **parchment**.

## 6. Depth & elevation

Flat by default. Depth comes from (1) changing the section ground, (2) one-step surface lift on stage (`stage-1`, `stage-2`), (3) the frosted nav (`backdrop-filter: blur(20px) saturate(180%)`). The only shadow on light surfaces is none; on stage, cards may use the light-edge shadow. The hero's 3D scene is the page's only true depth illusion.

## 7. Do's and don'ts

**Do**
- Let one statement own each section; cut decoration before cutting whitespace.
- Keep motion on transform / opacity / filter, honor `prefers-reduced-motion`, and keep the existing motion tokens (`src/lib/motion.js`).
- Keep all copy, links, section ids and facts exactly as they are.

**Don't**
- Don't use gradient text or gradient backgrounds outside the hero keyword, the hero scene and the contact spotlight card.
- Don't put borders between sections or shadows on light cards.
- Don't use weights above 600 for headlines or below 400 for body.
- Don't use a second accent hue for UI (violet/cyan are data and spotlight colors, not button colors).
- Don't set body text below 15px or captions below 12px.

## 8. Responsive behavior

- Breakpoints follow Tailwind (`sm` 640, `md` 768, `lg` 1024, `xl` 1280). The 5/7 header split stacks below `lg`.
- Display sizes are fluid `clamp()` tokens; never override them per breakpoint.
- Touch targets ≥ 44px. Pinned/horizontal scroll sections fall back to vertical stacks below `lg` and under reduced motion.
- No horizontal scroll at 390px.

## 9. Agent prompt guide

- "Restyle `<section>` to DESIGN.md: set its ground per the section map, use `.section-y` + `.container-page`, header = SectionLabel → `text-display-xl` headline → `text-lead` paragraph, cards = `.card`, buttons = pill classes."
- "Two-tone this headline: first clause `text-ink`, remainder `text-faint`."
- "Replace any gradient/glow on this component with the flat equivalent from DESIGN.md."
