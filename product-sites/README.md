# product-sites

Practice storefronts for the [price-watch](../README.md) scraper. This is a [React Router](https://reactrouter.com/)
app styled with Tailwind and per-page CSS. The pages are fake products with clearly marked prices, so the Zig scraper
has realistic HTML to parse.

## Routes

- `/` — Cove Audio storefront hero (`app/routes/home.tsx`, styles in `app/app.css`).
- `/product-1` — VOLTAGE 9 Neural Deck, a cyberpunk product page (`app/routes/product-1.tsx`, styles in
  `app/routes/product-1.css`). Includes size-dependent pricing, key features, specifications, dimensions, reviews,
  similar items, and a link footer.
- `/product-2` — RIDGELINE 45 Expedition Pack, with a hidden quote price in `data-quote-price`.
- `/product-3` — The Petty Printer, with its price stored as cents in `data-price`.
- `/product-4` — Luna One espresso machine, with a formatted price in `data-current-price`.

## Price markup

The product pages deliberately use a few price-markup patterns so the scraper can practice different extraction
rules without relying on visual formatting:

```html
<strong class="cp-price" data-price="$3,799.00" data-currency="USD" data-size="Compact">$3,799.00</strong>
```

Product 1 uses a formatted currency string in `data-price`. Product 2 has no visible product price; it stores its
value in a textless `data-quote-price` element. Product 3 stores a cents value in `data-price` and includes
`data-price-unit="cents"`. Product 4 uses `data-current-price` rather than `data-price`:

```html
<span data-quote-price="$289.00" data-currency="USD" data-capacity="Expedition" data-color="Moss"></span>
```

```html
<strong data-current-price="$649.00" data-currency="USD" data-finish="Oat">$649.00</strong>
```

## Getting started

Install dependencies and start the dev server:

```bash
bun install
bun run dev -- --host 127.0.0.1
```

The app is available at `http://127.0.0.1:5173`. The explicit IPv4 host is required because the Zig scraper cannot
connect to Vite's default IPv6 loopback address.

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
