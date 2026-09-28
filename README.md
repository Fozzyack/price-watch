# price-watch

A small Zig project for learning through a practical price checker. It reads products from `pages.config`, fetches each page, extracts a price between configured HTML markers, and prints the result in minor units.

> [!NOTE]
> As this project is for learning the language / syntax. I decided to do a lot of string manipulations manually instead
> of using `std.mem`

## Status

The project currently supports:

- Reading product names and URL extraction rules from `pages.config`.
- Fetching HTTP pages and extracting text between start and end markers.
- Removing a leading `$` and commas before converting a price to minor units.
- Configuring the currency and whether a value is already in minor units.

Price monitoring, persistence, and reporting price changes are still to be built.

## Project Layout

- `src/main.zig`: executable entry point. Reads the config and extracts every product URL.
- `src/file_reader.zig`: parses `pages.config` into `Product` and `ProductUrl` values.
- `src/html.zig`: fetches a URL and returns its response body.
- `src/extract.zig`: defines products and extracts, formats, and converts prices.
- `pages.config`: product and extraction-rule configuration.
- `product-sites/`: React Router practice storefronts for local scraper testing.

## Configuration

Each product starts with a bracketed name. Add one or more URL rules below it:

```text
[Product name]
URL | start marker | end marker | currency | is_minor
```

`currency` and `is_minor` are optional:

```text
URL | start marker | end marker
URL | start marker | end marker | USD
URL | start marker | end marker | USD | true
```

The defaults are `AUD` and `false`. `is_minor` accepts only `true` or `false`. Whitespace around fields is ignored.

For example, this extracts the value of `data-price` from a local product page:

```text
[VOLTAGE 9 Neural Deck]
http://127.0.0.1:5173/product-1 | data-price=" | " | USD | false
```

When `is_minor` is `true`, the parsed value is already a minor-unit amount and is not multiplied by 100.

## Running

Build the executable:

```bash
zig build
```

Run it:

```bash
./zig-out/bin/price-watch
```

## Local Test Sites

Start the React Router practice sites from `product-sites/` in a separate terminal:

```bash
bun run dev -- --host 127.0.0.1
```

The explicit IPv4 host is required so the Zig HTTP client can reach the site at `http://127.0.0.1:5173`.

- `/product-1`: formatted `data-price` value.
- `/product-2`: `data-quote-price` value.
- `/product-3`: cents stored in `data-price`; configure it with `is_minor` set to `true`.
- `/product-4`: formatted `data-current-price` value.

Verify the React app from `product-sites/` with:

```bash
bun run typecheck
bun run build
```

## Testing

```bash
zig test src/file_reader.zig
zig test src/extract.zig
```

## Memory Ownership

`parse_file` copies product names, URLs, markers, and configured currencies with the allocator it receives. In `main.zig`, those copies are owned by the arena and remain valid until `arena.deinit()`.

`html.get_page_content` also allocates response bodies with the passed allocator. The current program uses the same arena for all work, releasing parser data, URL lists, and response bodies together at shutdown.

## Current Limitations

- Products and price history are not persisted.
- Price extraction depends on retailer-specific HTML markers, which can change when a page is redesigned.
- Each configuration line must fit in the parser's 1024-byte read buffer and end with a newline.
