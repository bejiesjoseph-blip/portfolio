# Bejies Joseph — Portfolio

Live site: https://bejiesjoseph-blip.github.io

One-page static portfolio — About, Skills, Journey, Certifications, Projects,
Résumé and Contact. Built from scratch with semantic HTML, modern CSS and
vanilla JavaScript. No frameworks, no build step.

## Sections

- **About** — intro, quick facts (education, experience, certifications)
- **Skills** — front-end, backend & tools, AI & data
- **Journey** — chronological timeline from Class X through the Numota internship
- **Certifications** — featured Numota Technology internship certificate plus a
  credentials grid: NPTEL, Infosys Springboard, MathWorks, Nasscom FutureSkills,
  Microsoft Learn, Udemy and a KCG Code Relay participation entry — each opens
  its certificate file
- **Projects** — Marginalia (RAG academic research assistant), Interview Prep
  Backend, and this portfolio
- **Résumé** — one-page A4 PDF download and preview (ATS-readable, real text layer)
- **Contact** — details and a contact form that opens the visitor's email app

## Structure

```
index.html      page markup
style.css       token-based design system and styles
script.js       navigation, scroll reveal, active-link, contact form
images/         portrait, project screenshot, certificate and résumé previews
certificates/   12 certificate files (PDF / JPEG)
resume/         résumé source and generated files
resume.pdf      downloadable résumé
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Updating the résumé

1. Edit `resume/resume.html` (keep content within one A4 page).
2. Print to PDF from Chrome — A4, no headers/footers, background graphics on.
3. Render a preview PNG and update `resume.pdf` and `images/resume.png`.

`resume/archive/` (the pre-2026 résumé and original assets) is local-only and
excluded from the repository via `.gitignore`.

## Contact

Bejies Joseph — [bejiesjoseph@gmail.com](mailto:bejiesjoseph@gmail.com)
