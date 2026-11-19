# Sakshi Sethi — portfolio

A single-page portfolio. Hand-written HTML, CSS, and JavaScript — no build step,
no framework, no dependencies to install. Open an HTML file and it runs.


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
