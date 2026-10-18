# FORMA

A free collection of six responsive, self-contained website templates and a gallery with category filters, live previews, and downloads.

## Run locally

No dependencies or build step are required. Serve `dist/` with any static web server, for example:

```sh
python -m http.server 4173 --directory dist
```

Each file in `dist/templates/` also opens independently in a browser. See `dist/guide.html` for editing instructions.

## Contents

- Studio — creative agency
- Folio — architecture and creative portfolio
- Signal — software product
- Sunday — design objects storefront
- Chapter — editorial journal
- Gather — creative event

Forms, shopping bags, billing controls, and attendance inquiries are front-end demonstrations. Connect real services before relying on them in production.

## Hosting

`.openai/hosting.json` identifies the private Sites project and declares `dist/` as the static asset directory. No server, database, or external assets are required.

## License

MIT. See `dist/LICENSE.txt`.
