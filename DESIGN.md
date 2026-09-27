# AIML-LI design system

The site should look like it was made by careful people, not generated. Apple's structure, Airbnb and Notion's warmth, a school's colors. One family, one ink, one accent, flat surfaces, motion that responds to the reader.

Tokens live in `tailwind.config.js`, `src/index.css` and `src/lib/motion.js`. Shared facts (email, EIN, nav) live in `src/content/site.js`.

## Color ("Pine")

| Token | Hex | Use |
|---|---|---|
| `bg` | #FBFBF9 | page canvas |
| `surface` | #F2F2EE | alternate band, cards, input fills |
| `card` | #FFFFFF | a card sitting on `surface` |
| `ink` | #1A1C1A | all headings and body (16.6:1) |
| `ink2` | #484B47 | secondary text (8.5:1) |
| `ink3` | #5E615C | captions and meta only, never paragraphs |
| `line` / `linestrong` | #E3E4DF / #C9CBC5 | hairlines / input borders |
| `accent` | #1F5C45 | links, primary button, focus, one data highlight. Means "clickable". |
| `accent-hover` / `accent-soft` | #17483A / #E6F0EA | hover / tint |
| `dark` | #13201B | the ONE dark band on the page (Summit) |
| `dark-ink` / `dark-ink2` / `dark-line` | #F3F4F1 / #AEB8B2 / 12% white | text on the dark band |
| `accent-ondark` | #8FD1B0 | accent on the dark band |

About 90% of the page is `bg` and `surface`, 8% ink, 2% accent. Sections are separated by background changes, not borders or glows.

## Type

One family: SF on Apple devices, Inter Variable (optical sizing) everywhere else. It's already wired up; use Tailwind's `font-sans` (the default) and never set another family. No mono, except `font-mono` for literal code.

Weights: 400 body, 500 UI (buttons, nav, labels), 600 all headings. Nothing else: no 300, 700 or 800.

Scale (Tailwind classes): `text-caption` 13, `text-sm` 15, `text-base` 17 body, `text-lead` 20, `text-h4` 24, `text-h3` 32, `text-h2` 36→48, `text-h1` 44→80. Headings already carry weight 600 and tight tracking. Don't add `tracking-*` or `font-bold`.

Rules: sentence case everywhere, including buttons and nav. Paragraph measure `max-w-prose` or narrower. Numbers use `tabular`. Hierarchy comes from size and space, never color: no colored or gradient words in headlines.

## Layout

- `container-page` (max 76rem, 20px/32px gutters). Section rhythm is `py-22 md:py-30`.
- Radii: `rounded-lg` (14px) for cards, `rounded-xl` (20px) for big panels, `rounded-2xl` (28px) only for the dark band's outer shape, `rounded-pill` for buttons and chips.
- Shadows: flat by default. `shadow-float` only on hover-lifted cards or menus.
- Buttons: `.btn-primary`, `.btn-secondary`, `.btn-ondark`, `.btn-ondark-secondary`. Links: `.link`.
- Vary the layout per section. Don't repeat the same grid of identical cards. Use lists, tables, split layouts and timelines where they fit the content.
- Tap targets ≥ 44px. Visible focus rings (global). Real heading order: one `h1` (hero), `h2` per section.

## Motion (Framer Motion, `motion/react`)

Motion is the craft of this site and should be noticeable, but every movement has to explain something: an arrival, a change of state, progress, or feedback. Nothing loops for decoration.

- Tokens only: `EASE`, `DUR`, `SPRING`, `DIST`, `STAGGER`, `group()`, `fadeUp`, `lineUp`, `VIEWPORT` from `src/lib/motion.js`, and `Stagger`/`Item` plus presets from `src/components/fx/`.
- Entrances: 12px rise + fade, 0.6s ease-out, once. Stagger 40–100ms, at most about six children per group. Reveal section-level groups, not every paragraph. Content must be visible if JS fails (motion's `initial` is fine; don't hide things with CSS).
- Hero: masked line slide-up (`lineUp`) with `EASE.outExpo`, the only long animation on the page.
- Scroll-linked (`useScroll` + `useTransform`, no `useSpring` on progress so it stays on the compositor): use it in a few places with purpose, such as a progress line, a sticky storytelling step, or a gentle scale of 0.94→1 on a panel as it enters. Keep ranges subtle.
- Interaction: `whileTap={{ scale: 0.98 }}` with `SPRING.press`, `layoutId` indicators with `SPRING.ui`, `AnimatePresence` for menus and accordions (`height: "auto"` with `SPRING.layout`). CSS transitions for color changes.
- Animate only transform, opacity and clip-path. No animated blur, no animated box-shadow, no backdrop-filter except the small sticky nav.
- Reduced motion: `MotionConfig reducedMotion="user"` is global. Scroll-linked transforms must check `useReducedMotion()` and render static.

## Never (the AI-slop list)

Gradients of any kind, especially blue→violet and gradient text. Dark space or particle backgrounds, glow shadows, glassmorphism, grid or dot patterns. Emoji, sparkles, "AI-powered" badges. Mono or ALL-CAPS tracked eyebrows, numbered section labels ("01 / Who we are"), numbered cards whose order means nothing. Typewriter, decode or scramble text, custom cursors, magnetic buttons, 3D tilt, spotlight-follow cards, velocity marquees, count-up numbers, pulsing dots. Bento grids of identical tiles, icon-in-a-rounded-square cards, fake UI chrome. Gray text under 7:1 for paragraphs.

## Copy

Write like a teacher emailing a parent. Short declarative sentences, concrete nouns (LAUSD, 12 weeks, grade 9–12, Saturday, 200 students), no hype words (unlock, empower, elevate, seamless, cutting-edge, journey, revolutionize). No "Not X, it's Y" constructions, no em-dash chains, no rule-of-three slogans, no rhetorical questions as headings. Say each fact once, in the section where it belongs. Keep every real fact: names, partners, dates, safety rules, EIN, fiscal sponsor.
