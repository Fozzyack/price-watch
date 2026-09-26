# product-sites

Practice storefronts for the [price-watch](../README.md) scraper. This is a [React Router](https://reactrouter.com/)
app styled with Tailwind and per-page CSS. The pages are fake products with clearly marked prices, so the Zig scraper
has realistic HTML to parse.

## Routes

- `/` — Cove Audio storefront hero (`app/routes/home.tsx`, styles in `app/app.css`).
- `/product-1` — VOLTAGE 9 Neural Deck, a cyberpunk product page (`app/routes/product-1.tsx`, styles in
  `app/routes/product-1.css`). Includes size-dependent pricing, key features, specifications, dimensions, reviews,
  similar items, and a link footer.

## Price markup

The product pages deliberately use a few price-markup patterns so the scraper can practice different extraction
rules without relying on visual formatting:

```html
<strong class="cp-price" data-price="$3,799.00" data-currency="USD" data-size="Compact">$3,799.00</strong>
```

Product 1 and Product 2 use a formatted currency string in `data-price`. Product 3 stores a cents value in
`data-price` and includes `data-price-unit="cents"`. Product 4 uses `data-current-price` rather than
`data-price`:

```html
<strong data-current-price="$649.00" data-currency="USD" data-finish="Oat">$649.00</strong>
```

## Getting started

Install dependencies and start the dev server:

```bash
bun install
bun run dev
```

The app is available at `http://localhost:5173`.

## Verify changes

```bash
bun run typecheck
bun run build
```

## Project layout

- `app/routes.ts` — route definitions.
- `app/routes/*.tsx` — page components.
- `app/routes/*.css` — page-scoped styles (only `app/app.css` is global).
- `app/root.tsx` — document shell and font links.
