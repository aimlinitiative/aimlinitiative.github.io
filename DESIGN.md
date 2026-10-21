---
version: 3
name: AIML-LI — bright classroom
description: "A white, student-facing page: one display face, ink-bordered cards, one blue, and real course material instead of decoration. Chosen by Adrian on 15 Oct 2026 (option C of three, 'a little less AI')."

colors:
  bg: "#FFFFFF"     # page
  ink: "#101418"    # text, card borders, dark button, contact panel
  dim: "#525B66"    # secondary text (7.0:1 on white)
  line: "#E2E5EA"   # hairlines inside cards
  blue: "#1F5FBF"   # brand: tags, links, primary button, accuracy bar, venue banner
  sky: "#EAF1FC"    # blue tint (capstone card, nav hover)
  ora: "#E2592A"    # only for what the model gets wrong (winners found)
  warm: "#FFF6EB"   # the summit band

typography:
  display: "Bricolage Grotesque (variable, self-hosted), 700-800, tight tracking. Headings, names, buttons."
  body:    "Public Sans (variable, self-hosted). Its zero is plain; Atkinson Hyperlegible's slashed zero looked wrong in 200+, 501(c)(3) and the EIN."
  mono:    "JetBrains Mono (variable, self-hosted). Small uppercase tags, code, numbers in the lab."

layout:
  page: "max 78rem, 20px side padding on phones, 40px from md"
  section: "tag, h2, and an intro beside it on wide screens; then content. 80px / 112px vertical padding."

components:
  card: "white, 1.5px ink border, 14px radius, no shadow"
  buttons: "pills: blue (primary), ink, or 2px ink outline"
  tag: "mono, 12px, uppercase, 0.06em tracking"
---

## Rules

- **Show the work.** The hero is Unit 1's ethics lab, run for real
  (`src/lib/minilab.js`, pooled over 25 draws). Every number on the page is
  sourced; regenerate the lab data from the notebook rather than editing it.
- **Partner logos in full colour** (Adrian, 14 Sept 2026). Committed partners only.
- **Marker underline** (`.mark`, orange on white; `.mark-light`, amber on the
  blue summit band) under one phrase per heading, at most. Adrian asked for it
  back on 15 Oct.
- **The summit leads.** Mission, then the summit as a full-width blue band with
  every committed partner, then the course.
- **Not allowed:** tilted cards, offset "brutalist" shadows, graph-paper
  backgrounds, gradients, glass panels, 3D or particle
  heroes, custom cursors, marquees, typewriters, count-up numbers.
- **Copy:** full sentences that state facts. No slogan fragments ("Nine
  partners are in."), no hype words, no lines that only sound good.
- **Motion:** sections fade up 12px once; the lab's bars animate their width.
  Reduced motion shows everything at once.

## v4 (21 Oct 2026): Monte + Hivemind look

Adrian, before Citadel looks at the site: emulate the Monte site a little, then
Hivemind; easy to scan. Supersedes the v3 rules above where they conflict.

- Soft grey page (#F7F8FA), white cards with a hairline ring and a soft shadow
  (no ink borders), 20px radius. Floating frosted pill nav (mark · sections ·
  "Partner with us"), as on Hivemind.
- Inter Tight (600-650, tight tracking) for headings; Public Sans body;
  JetBrains Mono tags; Shantell Sans for hand-written notes with pencil arrows
  that draw in (`Note.jsx`, from Hivemind's notes.tsx). One or two notes per
  section at most; anything a note says is also in the real text.
- Centered hero, one hand-written word ("every") like Monte's "played right",
  headline words blur-rise in. Then the partner logo strip and three cards:
  course · summit · partners.
- Order: hero · summit (with partners) · course · try a lesson · goals ·
  who we are (with supporters) · four ways to help · contact.
- The marker underline is retired.
