# Sakshi Sethi — portfolio

A single-page portfolio. Hand-written HTML, CSS, and JavaScript — no build step,
no framework, no dependencies to install. Open an HTML file and it runs.

## Six styles — pick one

| File | Style |
|---|---|
| [`index.html`](index.html) | **Technical & minimal.** Cool near-black ground, IBM Plex Mono + IBM Plex Sans, teal accent, hairline rules, a metrics strip, `auto/light/dark` toggle. Reads as a precise engineering document. |
| [`index-warm.html`](index-warm.html) | **Warm & personal.** Warm brown-black paper, Fraunces + Newsreader (two serifs), an oxblood accent, a hand-drawn underline, first-person voice. Reads as meeting a person. |
| [`index-grid.html`](index-grid.html) | **Swiss editorial grid.** International-typographic-style layout — one grotesque (Archivo) in many weights, flush-left setting, a numbered section index in the left margin, hairline + one thick rule, a single signal-red accent, black on warm poster stock. Reads as precise and design-literate. |
| [`index-bold.html`](index-bold.html) | **Editorial & bold.** Magazine feature — oversized Bricolage Grotesque headlines (the name reveals line by line on load), Instrument Sans body, a deep-blue accent with one full-bleed statement band, wide asymmetric rhythm. Reads as confident and designed. |
| [`index-clean.html`](index-clean.html) | **Light & corporate-modern.** White ground, one neutral sans (Hanken Grotesk), a calm blue accent used sparingly, generous spacing, light project cards, restrained motion. The safe, universally-legible, recruiter-friendly choice. |
| [`index-product.html`](index-product.html) | **Refined dark product UI.** Deep-slate SaaS/API-docs surface — Sora + JetBrains Mono, an electric-iris accent, a dashboard-style KPI strip, layered cards with depth and hover lift, mono for numbers and code, copy-to-clipboard on the email. Says "I build polished software." |

All six pull from the same résumé content. **To ship one:** rename it to
`index.html` (back up or delete the others), keep only the assets it uses, then
deploy.

- `index.html` uses `assets/style.css`, `assets/main.js`, `assets/favicon.svg`
- `index-warm.html` uses `assets/warm.css`, `assets/warm.js`, `assets/favicon-warm.svg`
- `index-grid.html` uses `assets/grid.css`, `assets/grid.js`, `assets/favicon-grid.svg`
- `index-bold.html` uses `assets/bold.css`, `assets/bold.js`, `assets/favicon-bold.svg`
- `index-clean.html` uses `assets/clean.css`, `assets/clean.js`, `assets/favicon-clean.svg`
- `index-product.html` uses `assets/product.css`, `assets/product.js`, `assets/favicon-product.svg`
- all six use `assets/Sakshi-Sethi-Resume.pdf`

## Structure

```
portfolio/
├── index.html            technical & minimal
├── index-warm.html       warm & personal
├── index-grid.html       Swiss editorial grid
├── index-bold.html       editorial & bold
├── index-clean.html      light & corporate-modern
├── index-product.html    refined dark product UI
├── assets/
│   ├── style.css   / main.js    / favicon.svg           → index.html
│   ├── warm.css    / warm.js    / favicon-warm.svg      → index-warm.html
│   ├── grid.css    / grid.js    / favicon-grid.svg      → index-grid.html
│   ├── bold.css    / bold.js    / favicon-bold.svg      → index-bold.html
│   ├── clean.css   / clean.js   / favicon-clean.svg     → index-clean.html
│   ├── product.css / product.js / favicon-product.svg   → index-product.html
│   └── Sakshi-Sethi-Resume.pdf                          → all, linked from the header
└── README.md
```

## Editing content

Everything you'd want to change is plain text in `index.html`:

- **Hero** — name, one-line role, availability status, and the four links.
- **Sections** — `about`, `experience`, `projects`, `skills`, `education`,
  `contact`. Each is a `<section class="section" id="…">`.
- **Metrics strip** (under the Enlyft entry) — the `<dl class="metrics">` block.
  Keep it to three; they're meant to be the numbers you'd say out loud.
- **Numbers inside bullets** — wrap a figure in `<b>…</b>` to give it the
  monospace highlight treatment (e.g. `<b>53%</b>`).

### Things to fill in later

| Where | What |
|---|---|
| `projects` section | Replace both `code →` links (`https://github.com/sakshis9`) with the actual repo URLs once the repos are public. |
| `<head>` | Add `<meta property="og:image" …>` and `<link rel="canonical" …>` once the site has a domain, plus a real `assets/og.png` (1200×630) for link previews. |
| `assets/Sakshi-Sethi-Resume.pdf` | Swap in the newest resume whenever it changes — the filename is what the hero links to, so keep the name. |

## Theme

The page follows the visitor's OS light/dark setting by default. The toggle in
the top-right cycles `auto → light → dark` and remembers the choice in
`localStorage`. All colors are CSS custom properties defined at the top of
`style.css` in three blocks: `:root` (light), the `prefers-color-scheme: dark`
media query, and `:root[data-theme="dark"]`. Change a color once per block.

## Motion & effects

Both versions carry a light motion layer, in the **"Motion & effects"** block at
the bottom of the stylesheet plus matching code in the script file. Everything is
gated on JavaScript being available **and** on `prefers-reduced-motion` — without
JS, or for visitors who ask for less motion, the page renders fully visible and
still. An inline `<head>` failsafe also reveals everything if the script fails to
load.

**`index.html` (technical & minimal):**

- a 2px reading-progress bar at the top of the viewport;
- a staggered fade-up of the hero lines on load, and a blinking terminal caret
  after the name (delete the `.hero__name::after` rule to remove just the caret);
- scroll-reveal — each section's contents fade up as they enter view;
- the three Enlyft metrics count up from zero the first time they're seen;
- a faint accent glow that follows the cursor on desktop.

To strip it: delete the "Motion & effects" block in `style.css`, the two `<div>`s
(`.scroll-progress`, `.mouse-glow`) and the inline `<script>` in `index.html`,
and everything after the "Active section" block in `main.js`.

**`index-warm.html` (warm & personal)** — a lighter set that suits the calmer
feel:

- the same 2px reading-progress bar (in the oxblood accent);
- scroll-reveal on sections and skill groups;
- plus the hero load sequence and self-drawing underline it already had.

To strip it: delete the "Motion & effects" block in `warm.css`, the
`.reading-bar` `<div>` and inline `<script>` in `index-warm.html`, and the
reading-bar + scroll-reveal blocks in `warm.js`.

## Running locally

Just open the file, or serve it (needed only if you add `fetch`-based features):

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying

It's a static site, so any static host works. Pick one:

### GitHub Pages
```sh
git init && git add . && git commit -m "portfolio"
git branch -M main
git remote add origin git@github.com:sakshis9/portfolio.git
git push -u origin main
```
Then in the repo: **Settings → Pages → Build and deployment → Source: Deploy from
a branch → `main` / `root`**. Live at `https://sakshis9.github.io/portfolio/`
within a minute. For a bare `https://sakshis9.github.io`, name the repo
`sakshis9.github.io` instead.

### Vercel
```sh
npm i -g vercel
vercel            # from this folder; accept the defaults, framework = "Other"
vercel --prod
```

### Netlify
Drag this folder onto <https://app.netlify.com/drop>, or:
```sh
npm i -g netlify-cli
netlify deploy --dir . --prod
```

### Custom domain
All three hosts let you add a domain in their dashboard. For GitHub Pages, also
add a `CNAME` file to this folder containing just the domain (e.g.
`sakshisethi.dev`).
