# Design system

The site is a developer portfolio for recruiters and engineering leads. Its
signature is a live five-node Raft cluster in the hero: visitors can crash
nodes and watch the rest elect a new leader, which demonstrates the kind of
software the projects below are about. Everything else stays quiet so the
work leads.

## Colour

Cool graphite neutrals and a single vermilion signal colour. The signal is the
only accent on the page: the leader node, heartbeats, availability dots, list
markers, the active nav underline and the closing contact field.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | `#f5f6f8` | `#111317` | Page |
| `--bg-raised` | `#ffffff` | `#171a1f` | Panels, screenshots, tags |
| `--bg-sunken` | `#eceef2` | `#0c0e11` | Recessed areas |
| `--line` | `#dde1e7` | `#262a31` | Hairlines, borders |
| `--line-strong` | `#c3c9d2` | `#373d47` | Emphasised borders, link underlines |
| `--ink` | `#121418` | `#eef0f3` | Headings, primary text |
| `--ink-2` | `#454b55` | `#aab0ba` | Body copy |
| `--ink-3` | `#626975` | `#7f8793` | Meta, captions |
| `--accent` | `#c2411c` | `#f47a52` | Signal colour when used as text |
| `--signal` | `#f26a3d` | `#f26a3d` | Fields and fills |
| `--on-signal` | `#121418` | `#121418` | Text on the signal colour |

All text pairs pass WCAG AA (body 4.5:1, large 3:1). Dark is the default
theme; the visitor's choice is stored in `localStorage` and applied before
first paint by the inline script in `index.html`.

## Type

- **Schibsted Grotesk Variable** for everything readable: display, headings,
  body, controls.
- **JetBrains Mono Variable** only for data: node labels and terms in the
  cluster, the event log, dates, and tech-stack tags.
- Display tops out at `6rem` with `-0.04em` tracking; section titles use
  `clamp(2.25rem, …, 3.75rem)`. Body is `1.0625rem` / `1.6`, measured at
  roughly 60 to 65 characters.
- Headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`.

Both fonts are self-hosted through `@fontsource-variable` packages.

## Shape and depth

- Radius scale: `6px` tags, `10px` controls, `14px` images and panels,
  `16px` for the cluster panel.
- One soft, offset shadow token (`--shadow`) for raised surfaces. No glows,
  no glass.

## Motion

- Easing tokens: `--ease-out` `cubic-bezier(0.23, 1, 0.32, 1)` for UI,
  `--ease-expo` `cubic-bezier(0.16, 1, 0.3, 1)` for entrances and reveals.
- The cluster is the one authored motion moment. The hero text rises once on
  load (80 ms stagger) and project screenshots reveal with a clip-path wipe
  the first time they scroll into view.
- Presses scale to `0.97`; hover effects only apply under
  `(hover: hover) and (pointer: fine)`.
- `prefers-reduced-motion` removes entrance animation, travelling messages and
  election timer rings; state changes still show through colour.
- The cluster pauses when off screen or when the tab is hidden, and has a
  visible pause control.

## Content rules

- No labels or kickers above section headings; the heading carries the section.
- No gradient text, no emoji as icons, no em or en dashes in copy.
- Status dots only for real state (availability, cluster health, a project in
  production).
- Icons come from Phosphor only.

## Files

- `src/index.css`: tokens, base styles, shared controls.
- `src/components/*.css`: one stylesheet per section, imported by its
  component.
- `src/lib/raft-sim.js`: the election and heartbeat model behind the hero.
- `src/components/RaftCluster.jsx`: rendering and interaction for the cluster.
