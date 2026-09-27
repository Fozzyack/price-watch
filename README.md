# price-watch

This project is for learning Zig through a small, practical price-checking application.

A small Zig project that fetches HTML from selected product sites to monitor item prices.

## Status

The project can fetch live product pages, extract prices between configured markers, remove a leading `$` and commas, and convert prices to minor units. It has been tested against live Oura Ring 4 listings from JB Hi-Fi, Amazon Australia, and PriceHound. Price monitoring and persistence are still to be built.

## Project Layout

- `src/html.zig`: fetches a URL and returns its response body.
- `src/extract.zig`: defines products, extracts prices between configured markers, and formats price text.
- `src/main.zig`: current executable entry point.

## Memory Ownership

`html.get_page_content` allocates the returned response body with the allocator passed to it. It returns a slice descriptor (a pointer and length) that refers to those allocated bytes; returning the slice does not copy the body. The caller owns that memory and must free it with the same allocator, unless an arena allocator is released with `deinit` at the end of its lifetime.

`Product.add_url` allocates or grows the product's `urls` slice. Call `Product.deinit` with the same allocator when the product is no longer needed. When using the arena in `main.zig`, `arena.deinit()` frees both the fetched bodies and product URLs, so individual cleanup is optional. Product names, URLs, and patterns are borrowed slices; `Product` does not allocate or free their text.

## Current Limitations

- Statuses below 200 or above 300 return `error.StatusNotOk`.
- Products and price history are not persisted.
- Price extraction depends on retailer-specific HTML markers, which can change when a site is redesigned.

## Running Against Live Pages

`src/main.zig` currently contains an Oura Ring 4 example configured with live retailer URLs. Run it with:

```
zig build run
```

The program prints the product name, the extracted price and currency for each page, and the normalized price in minor units. Live pages and their markup can change, so update each URL's `pattern_start` and `pattern_end` values when extraction no longer matches.

## Test Sites

`./product-sites/` is a React Router app with practice pages used to exercise the scraper. Start it from that folder with:

```
bun run dev -- --host 127.0.0.1
```

The `--host 127.0.0.1` flag is required: Vite otherwise binds only to the IPv6 loopback (`[::1]`), and Zig's HTTP client cannot connect to a bracketed IPv6 literal. Binding IPv4 lets the scraper reach it at `http://127.0.0.1:5173/...`.

- `/` — Cove Audio storefront hero.
- `/product-1` — VOLTAGE 9 Neural Deck, a cyberpunk product page with size-dependent pricing, specifications, dimensions, reviews, and similar items.

Prices are marked with `data-price` and `data-currency` attributes to make extraction straightforward.

## Next Milestone

Store product prices over time and report changes.
