import { useState } from "react";
import type { Route } from "./+types/product-2";
import "./product-2.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "RIDGELINE 45 Expedition Pack | NORTHBOUND" },
    {
      name: "description",
      content: "RIDGELINE 45 — a weatherproof expedition pack for long trails and longer winters.",
    },
  ];
}

const quickSpecs = [
  { label: "Volume", value: "45 litres" },
  { label: "Shell", value: "420D ripstop nylon" },
  { label: "Harness", value: "Load-transfer frame" },
  { label: "Weight", value: "1.42 kg" },
];

const features = [
  {
    title: "Carry it fully loaded",
    body: "A spring-steel stays frame moves weight onto the hips so heavy days stop living in your shoulders.",
  },
  {
    title: "Weather, handled",
    body: "Welded seams and a roll-top closure keep three days of rain on the outside where it belongs.",
  },
  {
    title: "Opens how you need",
    body: "The full front horseshoe zip drops the whole front panel for gear-first packing at camp.",
  },
];

const fullSpecs = [
  { label: "Volume", value: "45 L (expandable to 52 L)" },
  { label: "Weight", value: "1.42 kg / 3 lb 2 oz" },
  { label: "Shell", value: "420D ripstop nylon, PU coated" },
  { label: "Base", value: "1000D Cordura, reinforced" },
  { label: "Harness", value: "Spring-steel stays, load-transfer frame" },
  { label: "Back panel", value: "Ventilated EVA mesh channels" },
  { label: "Closure", value: "Roll-top with side compression" },
  { label: "Pockets", value: "6 (2 hip-belt, 2 lid, 2 side)" },
  { label: "Warranty", value: "Lifetime, repair-first" },
];

const dimensions = [
  { label: "Height", value: "66 cm" },
  { label: "Width", value: "32 cm" },
  { label: "Depth", value: "26 cm" },
  { label: "Torso", value: "44 – 52 cm" },
];

const capacities = [
  { name: "Day", detail: "22 L · town & trail", price: 189 },
  { name: "Trek", detail: "35 L · overnight", price: 239 },
  { name: "Expedition", detail: "45 L · 3-season", price: 289 },
  { name: "Alpine", detail: "65 L · winter haul", price: 349 },
];

const colors = [
  { name: "Moss", swatch: "#5b6b4a" },
  { name: "Clay", swatch: "#b46a4f" },
  { name: "Slate", swatch: "#4a5560" },
];

const priceFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const reviews = [
  {
    author: "Priya N.",
    location: "Cascade Range",
    rating: 5,
    title: "Three days, one bag, zero rubs",
    body: "Carried 16 kg over 42 km and never touched the shoulder straps. The hip belt does the work it promises.",
  },
  {
    author: "Tomás R.",
    location: "Patagonia",
    rating: 4,
    title: "Bombproof, and it knows it",
    body: "Sat through two days of sideways rain, everything inside stayed bone dry. The roll-top takes getting used to but I trust it.",
  },
  {
    author: "June H.",
    location: "Lake District",
    rating: 5,
    title: "Packs like a suitcase, carries like a frame",
    body: "The front panel opens flat, which sold me. Loaded it for a hut trip and the compression straps killed all the rattle.",
  },
];

const similar = [
  { name: "RIDGELINE 22 Daypack", category: "Day packs", price: "$139.00" },
  { name: "BASECAMP Duffel 70", category: "Travel", price: "$199.00" },
  { name: "TRAILHEAD Rain Shell", category: "Layers", price: "$219.00" },
];

const footerLinks = [
  { title: "Shop", links: ["Packs", "Shelters", "Layers", "Sale"] },
  { title: "Support", links: ["Repairs", "Shipping", "Returns", "Contact"] },
  { title: "Company", links: ["About", "Field notes", "Sustainability", "Careers"] },
];

export default function Product2() {
  const [capacity, setCapacity] = useState("Expedition");
  const [color, setColor] = useState("Moss");
  const selected =
    capacities.find((option) => option.name === capacity) ?? capacities[2];
  const price = priceFormat.format(selected.price);

  return (
    <main className="nb-page">
      <nav className="nb-nav" aria-label="Main navigation">
        <a className="nb-brand" href="/">
          north<span>bound</span>
        </a>
        <div className="nb-nav-links">
          <a href="/product-1">Deckware</a>
          <a href="/product-2" aria-current="page">Packs</a>
          <a href="/product-3">Layers</a>
        </div>
        <button className="nb-cart" type="button">Cart · 0</button>
      </nav>

      <section className="nb-product">
        <div className="nb-media" aria-label="RIDGELINE 45 expedition pack">
          <span className="nb-badge">FIELD SERIES</span>
          <span className="nb-sun" aria-hidden="true" />
          <span className="nb-ridge nb-ridge-back" aria-hidden="true" />
          <span className="nb-ridge nb-ridge-front" aria-hidden="true" />
          <div className="nb-pack" aria-hidden="true">
            <div className="nb-pack-lid">
              <span className="nb-pack-strap" />
            </div>
            <div className="nb-pack-body">
              <span className="nb-pack-zip" />
              <span className="nb-pack-pocket" />
            </div>
            <div className="nb-pack-belt" />
          </div>
          <span className="nb-annotation nb-annotation-left">45 L<br />expandable</span>
          <span className="nb-annotation nb-annotation-right">weather<br />proof</span>
        </div>

        <div className="nb-details">
          <p className="nb-eyebrow">Northbound · Field series</p>
          <h1>RIDGELINE 45<br />Expedition Pack</h1>
          <p className="nb-lead">
            A pack built around one idea: the weight should sit on your hips, not
            your shoulders. Fully seam-welded, front-loading, and made to be
            repaired instead of replaced.
          </p>

          <div className="nb-price-block">
            <div>
              <span className="nb-price-label">Price</span>
              <strong
                className="nb-price"
                data-price={price}
                data-currency="USD"
                data-capacity={capacity}
                data-color={color}
              >
                {price}
              </strong>
            </div>
            <span className="nb-stock">In stock</span>
          </div>

          <p className="nb-shipping">
            Free carbon-neutral shipping · <a href="#repairs">Lifetime repairs</a>
          </p>

          <div className="nb-options">
            <span className="nb-options-label">Capacity · {capacity}</span>
            <div className="nb-capacity-list" role="group" aria-label="Capacity">
              {capacities.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  className="nb-capacity"
                  aria-pressed={capacity === option.name}
                  onClick={() => setCapacity(option.name)}
                >
                  <strong>{option.name}</strong>
                  <small>{option.detail}</small>
                  <small className="nb-capacity-price">
                    {priceFormat.format(option.price)}
                  </small>
                </button>
              ))}
            </div>

            <span className="nb-options-label nb-color-label">Colour · {color}</span>
            <div className="nb-colors" role="group" aria-label="Colour">
              {colors.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  className="nb-color"
                  aria-pressed={color === option.name}
                  onClick={() => setColor(option.name)}
                >
                  <i style={{ background: option.swatch }} aria-hidden="true" />
                  {option.name}
                </button>
              ))}
            </div>
          </div>

          <div className="nb-actions">
            <button className="nb-buy" type="button">Add to cart</button>
            <button className="nb-wish" type="button">Save</button>
          </div>

          <dl className="nb-specs">
            {quickSpecs.map((spec) => (
              <div key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="nb-section" id="overview">
        <div className="nb-section-head">
          <span className="nb-section-index">01</span>
          <h2>Why it carries well</h2>
        </div>
        <div className="nb-overview">
          <p className="nb-overview-lead">
            Most packs fail at the same place: the transfer from harness to hips.
            The RIDGELINE solves it with two spring-steel stays and a belt that
            actually wraps, so a heavy load stops pulling your shoulders back.
          </p>
          <div className="nb-features">
            {features.map((feature) => (
              <article key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="nb-section" id="specifications">
        <div className="nb-section-head">
          <span className="nb-section-index">02</span>
          <h2>Specifications</h2>
        </div>
        <table className="nb-spec-table">
          <tbody>
            {fullSpecs.map((spec) => (
              <tr key={spec.label}>
                <th scope="row">{spec.label}</th>
                <td>{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="nb-subhead">Dimensions</h3>
        <dl className="nb-dimensions">
          {dimensions.map((dim) => (
            <div key={dim.label}>
              <dt>{dim.label}</dt>
              <dd>{dim.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="nb-section" id="reviews">
        <div className="nb-section-head">
          <span className="nb-section-index">03</span>
          <h2>Field reports</h2>
        </div>
        <div className="nb-review-summary">
          <strong>4.8</strong>
          <div>
            <Stars rating={5} />
            <p>Based on 342 verified trail reviews</p>
          </div>
        </div>
        <div className="nb-review-grid">
          {reviews.map((review) => (
            <article className="nb-review" key={review.title}>
              <Stars rating={review.rating} />
              <h3>{review.title}</h3>
              <p>{review.body}</p>
              <footer>
                <span>{review.author}</span>
                <small>{review.location}</small>
              </footer>
            </article>
          ))}
        </div>
      </section>

      <section className="nb-section" id="similar">
        <div className="nb-section-head">
          <span className="nb-section-index">04</span>
          <h2>Pairs well with</h2>
        </div>
        <div className="nb-similar-grid">
          {similar.map((item) => (
            <a className="nb-similar" href="/product-2" key={item.name}>
              <div className="nb-similar-thumb" aria-hidden="true"><i /></div>
              <p className="nb-similar-category">{item.category}</p>
              <h3>{item.name}</h3>
              <strong className="nb-similar-price" data-price={item.price} data-currency="USD">
                {item.price}
              </strong>
            </a>
          ))}
        </div>
      </section>

      <footer className="nb-footer">
        <div className="nb-footer-top">
          <a className="nb-brand" href="/">
            north<span>bound</span>
          </a>
          <nav className="nb-footer-links" aria-label="Footer">
            {footerLinks.map((column) => (
              <div key={column.title}>
                <h4>{column.title}</h4>
                <ul>
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="/">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="nb-footer-bottom">
          <p>NORTHBOUND // packs for the long way around</p>
          <p>Repaired, not replaced</p>
        </div>
      </footer>
    </main>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="nb-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} aria-hidden="true" data-filled={i < rating}>
          ★
        </span>
      ))}
    </div>
  );
}
