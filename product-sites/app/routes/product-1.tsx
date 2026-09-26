import { useState } from "react";
import type { Route } from "./+types/product-1";
import "./product-1.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VOLTAGE 9 Neural Deck | NIGHTMARKET" },
    {
      name: "description",
      content: "VOLTAGE 9 neural deck — street-grade cyberware for night city runners.",
    },
  ];
}

const quickSpecs = [
  { label: "Processor", value: "Quantum Spine Q-9" },
  { label: "Neural link", value: "Mk.IV wetware port" },
  { label: "Memory", value: "512 TB crystal core" },
  { label: "Power cell", value: "Plasma-8, 72h duty" },
];

const features = [
  {
    title: "Cold boot in 0.4s",
    body: "Spine-level handshake bypasses corporate firmware checks before any trace can land.",
  },
  {
    title: "Onboard icebreaker suite",
    body: "Ships with 40 pre-loaded intrusion daemons and a self-rewriting countermeasure grid.",
  },
  {
    title: "Ghost protocol",
    body: "One-touch identity scrub wipes routing history, biometrics, and local crystal cache.",
  },
];

const fullSpecs = [
  { label: "Processor", value: "Quantum Spine Q-9, 8-core liquid logic" },
  { label: "Neural link", value: "Mk.IV wetware port, 12 Gb/s" },
  { label: "Memory", value: "512 TB crystal core" },
  { label: "Storage", value: "2 PB cold vault" },
  { label: "Display", value: "Folded OLED, 4K per eye" },
  { label: "Power cell", value: "Plasma-8, 72h duty cycle" },
  { label: "Cooling", value: "Cryo-loop micro exchanger" },
  { label: "Ports", value: "3x datajack, 2x USB-C" },
  { label: "Warranty", value: "2 cycles, parts and labor" },
];

const dimensions = [
  { label: "Width", value: "280 mm" },
  { label: "Depth", value: "190 mm" },
  { label: "Height", value: "22 mm" },
  { label: "Weight", value: "1.8 kg" },
];

const sizes = [
  { name: "Compact", detail: "13-inch chassis" },
  { name: "Standard", detail: "15-inch chassis" },
  { name: "Extended", detail: "17-inch chassis" },
  { name: "Rig", detail: "Rack-mount frame" },
];

const reviews = [
  {
    author: "R. Vex",
    handle: "runner//sector-4",
    rating: 5,
    title: "Jacked in, never looked back",
    body: "Cold boot time is real. Cleared a corpo firewall in the time my old deck finished POST.",
  },
  {
    author: "Mira K.",
    handle: "fixer//lower-grid",
    rating: 4,
    title: "Runs hot but runs clean",
    body: "The cryo-loop is loud under load, but the ghost protocol is worth every cred. Support answered in minutes.",
  },
  {
    author: "Dex-7",
    handle: "merc//dockside",
    rating: 5,
    title: "Best deck for the money",
    body: "Swapped out a deck twice the price. Icebreaker suite alone pays for itself on one gig.",
  },
];

const similar = [
  { name: "VOLTAGE 9 Lite", category: "Neural deck", price: "$2,149.00" },
  { name: "SPECTRA Optic Set", category: "Ocular chrome", price: "$1,389.00" },
  { name: "GHOSTLINE Datajack", category: "Wetware port", price: "$899.00" },
];

const footerLinks = [
  { title: "Shop", links: ["Deckware", "Optics", "Chrome", "Deals"] },
  { title: "Support", links: ["Order status", "Shipping", "Returns", "Contact"] },
  { title: "Company", links: ["About", "Careers", "Press", "Terms"] },
];

export default function Product1() {
  const [size, setSize] = useState("Standard");

  return (
    <main className="cp-page">
      <nav className="cp-nav" aria-label="Main navigation">
        <a className="cp-brand" href="/">
          night<span>market</span>
        </a>
        <div className="cp-nav-links">
          <a href="/product-1" aria-current="page">Deckware</a>
          <a href="/product-2">Optics</a>
          <a href="/product-3">Chrome</a>
        </div>
        <button className="cp-cart" type="button">Cart · 0</button>
      </nav>

      <section className="cp-product">
        <div className="cp-media" aria-label="VOLTAGE 9 neural deck">
          <span className="cp-badge">// SERIES 09</span>
          <span className="cp-ring cp-ring-one" aria-hidden="true" />
          <span className="cp-ring cp-ring-two" aria-hidden="true" />
          <div className="cp-deck" aria-hidden="true">
            <div className="cp-deck-screen">
              <span /><span /><span />
              <b>V9</b>
            </div>
            <div className="cp-deck-keys"><i /><i /><i /><i /><i /><i /></div>
            <div className="cp-deck-port" />
          </div>
          <span className="cp-annotation cp-annotation-left">neural
            <br />ready</span>
          <span className="cp-annotation cp-annotation-right">plasma
            <br />core</span>
        </div>

        <div className="cp-details">
          <p className="cp-eyebrow">Sector 7 · Hardware</p>
          <h1>VOLTAGE 9<br />Neural Deck</h1>
          <p className="cp-lead">
            A black-market cyberdeck built for runners who need to jack in fast and
            vanish faster. Cold-boot in 0.4 seconds.
          </p>

          <div className="cp-price-block">
            <div>
              <span className="cp-price-label">Street price</span>
              <strong className="cp-price" data-price="$4,299.00" data-currency="USD">
                $4,299.00
              </strong>
            </div>
            <span className="cp-stock">In stock · 12 units</span>
          </div>

          <p className="cp-coupon">
            <a href="#login">Log in</a> to see if you have coupons
          </p>

          <div className="cp-options">
            <span className="cp-options-label">Chassis size · {size}</span>
            <div className="cp-size-list" role="group" aria-label="Chassis size">
              {sizes.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  className="cp-size"
                  aria-pressed={size === option.name}
                  onClick={() => setSize(option.name)}
                >
                  <strong>{option.name}</strong>
                  <small>{option.detail}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="cp-actions">
            <button className="cp-buy" type="button">Add to cart</button>
            <button className="cp-wish" type="button">Save</button>
          </div>

          <dl className="cp-specs">
            {quickSpecs.map((spec) => (
              <div key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="cp-section" id="overview">
        <div className="cp-section-head">
          <span className="cp-section-index">01</span>
          <h2>Key features</h2>
        </div>
        <div className="cp-overview">
          <p className="cp-overview-lead">
            The VOLTAGE 9 is a street-tuned neural deck assembled from salvaged
            corporate silicon and overclocked to the edge of legality. Every
            component is chosen for one thing: getting you in, getting the data, and
            getting you out clean.
          </p>
          <div className="cp-features">
            {features.map((feature) => (
              <article key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cp-section" id="specifications">
        <div className="cp-section-head">
          <span className="cp-section-index">02</span>
          <h2>Specifications</h2>
        </div>
        <table className="cp-spec-table">
          <tbody>
            {fullSpecs.map((spec) => (
              <tr key={spec.label}>
                <th scope="row">{spec.label}</th>
                <td>{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="cp-subhead">Dimensions</h3>
        <dl className="cp-dimensions">
          {dimensions.map((dim) => (
            <div key={dim.label}>
              <dt>{dim.label}</dt>
              <dd>{dim.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="cp-section" id="reviews">
        <div className="cp-section-head">
          <span className="cp-section-index">03</span>
          <h2>Reviews</h2>
        </div>
        <div className="cp-review-summary">
          <strong>4.7</strong>
          <div>
            <Stars rating={5} />
            <p>Based on 128 verified runner reviews</p>
          </div>
        </div>
        <div className="cp-review-grid">
          {reviews.map((review) => (
            <article className="cp-review" key={review.title}>
              <Stars rating={review.rating} />
              <h3>{review.title}</h3>
              <p>{review.body}</p>
              <footer>
                <span>{review.author}</span>
                <small>{review.handle}</small>
              </footer>
            </article>
          ))}
        </div>
      </section>

      <section className="cp-section" id="similar">
        <div className="cp-section-head">
          <span className="cp-section-index">04</span>
          <h2>Similar items</h2>
        </div>
        <div className="cp-similar-grid">
          {similar.map((item) => (
            <a className="cp-similar" href="/product-1" key={item.name}>
              <div className="cp-similar-thumb" aria-hidden="true"><i /></div>
              <p className="cp-similar-category">{item.category}</p>
              <h3>{item.name}</h3>
              <strong className="cp-similar-price" data-price={item.price} data-currency="USD">
                {item.price}
              </strong>
            </a>
          ))}
        </div>
      </section>

      <footer className="cp-footer">
        <div className="cp-footer-top">
          <a className="cp-brand" href="/">
            night<span>market</span>
          </a>
          <nav className="cp-footer-links" aria-label="Footer">
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
        <div className="cp-footer-bottom">
          <p>NIGHTMARKET // gray-market electronics</p>
          <p>Free delivery in the lower sectors</p>
        </div>
      </footer>
    </main>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="cp-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} aria-hidden="true" data-filled={i < rating}>
          ★
        </span>
      ))}
    </div>
  );
}
