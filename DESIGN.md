---
version: 2
name: AIML-LI — Linear-style editorial
description: "A near-black, monochrome page in the manner of Linear's 2024 site. One typeface, one text color, one secondary text color, one hairline. Each section has a single visual anchor; everything else is plain text in an asymmetric 12-column frame."

colors:
  bg: "#08090A"      # page background (Tailwind: bg)
  fg: "#F7F8F8"      # headings, primary text, primary button fill (fg)
  dim: "#A8ADB5"     # body copy, labels, secondary text, 8.7:1 on bg (dim)
  line: "#23252A"    # hairlines between rows and sections (line)
  # No accent hue. Links are fg with an underline.

typography:
  family: "Geist Variable, self-hosted (@fontsource-variable/geist). One family for everything."
  hero:      { size: "clamp(48px → 120px)", weight: 600, lineHeight: 0.96, letterSpacing: "-0.05em" }
  h2:        { size: "clamp(36px → 64px)", weight: 600, lineHeight: 1.02, letterSpacing: "-0.04em" }
  statement: { size: "clamp(24px → 40px)", weight: 500, lineHeight: 1.2, letterSpacing: "-0.025em" }
  h3:        { size: 22px, weight: 500, lineHeight: 1.25, letterSpacing: "-0.02em" }
  body:      { size: 17px, weight: 400, lineHeight: 1.55 }
  small:     { size: 14px, weight: 400/500, lineHeight: 1.5 }

layout:
  grid: "12 columns, 24px column gap"
  margins: "80px each side on desktop (lg:px-20), 48px tablet, 24px phone"
  section: "label in columns 1–3, content in columns 5–12; 160px vertical padding on desktop, 96px on phones; sections separated by one hairline"
  measure: "60ch max for paragraphs"

components:
  button-primary:   "fg fill, bg text, 6px radius, 40px tall, flat"
  button-secondary: "text with an underline; no box"
  rows:             "lists, tables and facts are rows separated by hairlines, never cards"
---

## Rules

- **One anchor per section.** Hero: the headline. About: the statement. How it works: the numerals. Curriculum: the 12-week timeline. Summit: the facts table. Partners: the logo table. Get involved: the list of needs. Contact: the email address.
- **Banned:** gradients of any kind, glassmorphism and backdrop blur, drop shadows, cards and card grids, pill badges and chips, decorative backgrounds, particles, custom cursors, Inter and Roboto, a second text color inside a heading, weight changes mid-sentence.
- **Partner logos** render as solid white (`brightness-0 invert`). Marks that don't survive that (Snap's filled square) are set as text.
- **Motion:** content fades up 12px once when it enters the viewport; nothing else moves. Reduced motion shows everything immediately.
- **Copy:** terse and concrete. Short sentences, real facts, no hype words ("transform", "seamless", "empower", "unlock", "revolutionize"), no filler eyebrows or scroll cues.
