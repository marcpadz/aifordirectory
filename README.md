# AI Atlas

AI tool directory + daily AI news hub. Static site deployed on GitHub Pages.

## Structure
- `index.html` — Homepage: hero search + featured directory tools + latest news
- `directory.html` — Full AI tool directory with search & category filters
- `news.html` — Daily AI news articles
- `style.css` — Styles
- `app.js` — Seed data + search/filter logic

## CMS (Notion)
Two separate Notion databases under one parent page "AI Atlas CMS":
- **AI Directory** — tools (name, description, category, URL, pricing, logo, featured, date added)
- **AI News** — articles (title, slug, excerpt, content, author, published date, category, status)

The databases are independent so directory content never mixes with news content.

## Deploy
Push to the `main` branch of `marcpadz/aifordirectory` and enable GitHub Pages (source: `main` / root).
Site: https://marcpadz.github.io/aifordirectory/

## Local preview
Open `index.html` in a browser, or serve with:
`python3 -m http.server 8000`