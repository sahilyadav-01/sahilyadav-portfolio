# Sahil Yadav — Portfolio

A responsive static portfolio. No build step, package installation, API keys, or backend required.

## Preview

Open index.html directly, or serve this directory with `python -m http.server 4173` and visit http://localhost:4173.

## Deploy to Vercel

Quick upload: sign in at https://vercel.com/new, choose a folder, and select this sahil-portfolio folder. Complete the deployment prompts.

Option A — Git import:
1. Put the contents of this folder at the root of a GitHub repository.
2. In Vercel, choose Add New → Project and import that repository.
3. Choose framework preset Other. Leave Build Command empty and use the repository root as the output directory.
4. Click Deploy.

Option B — terminal, from this folder:
```
npx vercel login
npx vercel --prod
```
Follow the Vercel prompts to select your account and create a project. Deployment requires your own Vercel sign-in.

## Edit

- index.html: introduction, project descriptions, skills, contact links.
- styles.css: palette, typography, spacing, responsive layout.
- script.js: copy-email interaction and current copyright year.

## Copyright

© 2026 Sahil Yadav. All rights reserved.

Fonts load from Google Fonts with system fallbacks. The avatar loads from GitHub. The site remains usable if either service is unavailable.

## Content sources

https://github.com/sahilyadav-01
https://github.com/raosahil0

Project summaries and technical skills are based on those public profiles. No employment, education, client outcomes, or experience metrics were invented. LinkedIn required sign-in, so it is linked without importing unverified details. The profile avatar comes from sahilyadav-01. Email, phone, Medium, and Instagram were supplied directly by the owner. Source snapshot: 29 September 2026.



## Design update
Premium dark and clean light themes, with a persistent theme switch. Edit refined.css for the new visual system. Keyboard theme switching and saved preference were checked in the browser; mobile layouts were checked at 390px without horizontal overflow.
