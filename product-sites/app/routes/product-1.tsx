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

const specs = [
  { label: "Processor", value: "Quantum Spine Q-9" },
  { label: "Neural link", value: "Mk.IV wetware port" },
  { label: "Memory", value: "512 TB crystal core" },
  { label: "Power cell", value: "Plasma-8, 72h duty" },
];

export default function Product1() {
  return (
    <main className="cp-page">
      <div className="cp-glow cp-glow-cyan" aria-hidden="true" />
      <div className="cp-glow cp-glow-magenta" aria-hidden="true" />
      <div className="cp-scanlines" aria-hidden="true" />

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

          <div className="cp-actions">
            <button className="cp-buy" type="button">Add to cart</button>
            <button className="cp-wish" type="button">Save</button>
          </div>

          <dl className="cp-specs">
            {specs.map((spec) => (
              <div key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <footer className="cp-footer">
        <p>NIGHTMARKET // gray-market electronics</p>
        <p>Free delivery in the lower sectors</p>
      </footer>
    </main>
  );
}
