# zystem

A small Zig project that fetches HTML from selected product sites to monitor item prices.

## Status

Early development. The project can fetch an HTTPS page and define products with one or more source URLs. Price extraction and monitoring are still to be built.

## Project Layout

- `src/html.zig`: fetches the root HTTPS page for a host and returns its response body.
- `src/extract.zig`: defines a `Product` and its `ProductUrl` sources. Each source has a URL and a pattern that will later identify the price in its HTML.
- `src/main.zig`: current executable entry point and HTTP-fetching experiment.

## Memory Ownership

`html.get_page_content` allocates the returned response body with the allocator passed to it. The caller owns that memory and must free it with the same allocator, unless an arena allocator is released with `deinit` at the end of its lifetime.

`Product.add_url` allocates or grows the product's `urls` slice. Call `Product.deinit` with the same allocator when the product is no longer needed. Product names, URLs, and patterns are borrowed slices; `Product` does not allocate or free their text.

## Current Limitations

- Requests always use HTTPS and fetch the `/` path of a host.
- Statuses below 200 or above 300 return `error.StatusNotOk`.
- Product URL patterns are stored but not yet used to extract a price.
- Products and price history are not persisted.

## Next Milestone

Add a pure price parser that accepts saved HTML and a pattern, then cover it with unit tests before connecting it to live product pages.
