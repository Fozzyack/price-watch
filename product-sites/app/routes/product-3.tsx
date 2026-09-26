import { useState } from "react";
import type { Route } from "./+types/product-3";
import "./product-3.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Petty Printer | PETTY INDUSTRIES" },
    {
      name: "description",
      content:
        "The Petty Printer — a tiny thermal printer that issues physical receipts for minor interpersonal grievances.",
    },
  ];
}

const quickSpecs = [
  { label: "Printer", value: "58 mm thermal, 203 dpi" },
  { label: "Filings", value: "Up to 240 incidents/roll" },
  { label: "Connectivity", value: "Wi-Fi, BLE, NFC" },
  { label: "Paper", value: "BPA-free, 10 yr archival" },
];

const features = [
  {
    title: "One tap to file",
    body: "Tap the button, describe the grievance in plain language, and the Petty Printer issues a fully itemised incident receipt in under two seconds.",
  },
  {
    title: "It keeps score",
    body: "Every receipt builds a household ledger: repeat-offender flags, running totals, and estimated emotional damages you can absolutely present in mediation.",
  },
  {
    title: "Your home snitches",
    body: "The open API lets smart-home devices file incidents automatically. Your dishwasher already knows who opened it mid-cycle.",
  },
];

const fullSpecs = [
  { label: "Print method", value: "Direct thermal, 203 dpi" },
  { label: "Paper width", value: "58 mm roll, 240 incidents per roll" },
  { label: "Print speed", value: "80 mm/s" },
  { label: "Case", value: "Recycled ABS, matte bone" },
  { label: "Input", value: "Single tactile button, app, API" },
  { label: "Connectivity", value: "Wi-Fi 2.4 GHz, BLE 5.2, NFC reader" },
  { label: "Ledger", value: "Local 8 GB, optional cloud sync" },
  { label: "Power", value: "USB-C, 6h battery" },
  { label: "Warranty", value: "2 years, plus lifetime paper loyalty" },
];

const dimensions = [
  { label: "Width", value: "98 mm" },
  { label: "Depth", value: "104 mm" },
  { label: "Height", value: "62 mm" },
  { label: "Weight", value: "310 g" },
];

const editions = [
  { name: "Solo", detail: "Just the printer", price: 129 },
  { name: "Household", detail: "+ 4 NFC cards", price: 169 },
  { name: "Ledger", detail: "+ cloud stats", price: 229 },
  { name: "Overkill", detail: "+ smart-home API", price: 299 },
];

const priceFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const sampleReceipt = [
  ["INCIDENT RECEIPT #00482", "line"],
  ["Offense:", "Milk Fraud"],
  ["Severity:", "6.4 / 10"],
  ["Emotional damages:", "$3.70"],
  ["Repeat offender:", "YES"],
  ["Suggested sentence:", "Buy milk + public apology"],
];

const ledger = [
  { rank: 1, name: "Sam", offenses: 41, worst: "Dishwasher interference" },
  { rank: 2, name: "Priya", offenses: 27, worst: "Reused my mug" },
  { rank: 3, name: "Bex", offenses: 19, worst: "Left the light on" },
];

const reviews = [
  {
    author: "M. Okafor",
    household: "House of 4",
    rating: 5,
    title: "The ledger ended a two-year cold war",
    body: "We settled a dish-duty dispute with actual receipts. Turns out I was the repeat offender. I have never been more humbled or more organised.",
  },
  {
    author: "Dana L.",
    household: "Flat 3B",
    rating: 5,
    title: "My dishwasher files incidents",
    body: "Someone opened it mid-cycle and by the time I got home there was a receipt on the counter titled UNAUTHORIZED DISHWASHER INTERFERENCE. Worth every dollar.",
  },
  {
    author: "Théo B.",
    household: "Nerd household",
    rating: 4,
    title: "API is absurd and I love it",
    body: "Wired the door sensor to file an incident whenever my partner leaves the porch light on. It prints a monthly crime-statistics report. Genuinely no notes.",
  },
];

const similar = [
  { name: "NFC Roommate Card Pack", category: "Identity", price: "$24.00" },
  { name: "Grievance Ledger Cloud", category: "Subscription", price: "$4.99/mo" },
  { name: "Thermal Paper — 5 Pack", category: "Consumables", price: "$12.00" },
];

const footerLinks = [
  { title: "Shop", links: ["Printers", "NFC cards", "Paper", "API plan"] },
  { title: "Support", links: ["Setup guide", "Shipping", "Returns", "Contact"] },
  { title: "Company", links: ["About", "The ledger report", "Press", "Terms"] },
];

export default function Product3() {
  const [edition, setEdition] = useState("Household");
  const selected =
    editions.find((option) => option.name === edition) ?? editions[1];
  const price = priceFormat.format(selected.price);

  return (
    <main className="pp-page">
      <nav className="pp-nav" aria-label="Main navigation">
        <a className="pp-brand" href="/">
          petty<span>industries</span>
        </a>
        <div className="pp-nav-links">
          <a href="/product-1">Deckware</a>
          <a href="/product-2">Packs</a>
          <a href="/product-3" aria-current="page">Gadgets</a>
        </div>
        <button className="pp-cart" type="button">Cart · 0</button>
      </nav>

      <section className="pp-product">
        <div className="pp-media" aria-label="The Petty Printer">
          <span className="pp-badge">NOW FILING</span>
          <span className="pp-ring pp-ring-one" aria-hidden="true" />
          <span className="pp-ring pp-ring-two" aria-hidden="true" />
          <div className="pp-device" aria-hidden="true">
            <div className="pp-device-top">
              <span className="pp-device-slot" />
              <span className="pp-device-led" />
            </div>
            <div className="pp-device-label">PETTY</div>
            <div className="pp-device-button" />
          </div>
          <div className="pp-ticket" aria-hidden="true">
            <p className="pp-ticket-title">INCIDENT RECEIPT #00482</p>
            <div className="pp-ticket-row"><span>Offense</span><b>Milk Fraud</b></div>
            <div className="pp-ticket-row"><span>Severity</span><b>6.4 / 10</b></div>
            <div className="pp-ticket-row"><span>Emotional damages</span><b>$3.70</b></div>
            <div className="pp-ticket-row"><span>Repeat offender</span><b>YES</b></div>
            <p className="pp-ticket-sentence">Suggested sentence: Buy milk + public apology</p>
            <p className="pp-ticket-foot">THANK YOU FOR YOUR HONESTY</p>
          </div>
          <span className="pp-annotation pp-annotation-left">58 mm<br />thermal</span>
          <span className="pp-annotation pp-annotation-right">files in<br />1.8 s</span>
        </div>

        <div className="pp-details">
          <p className="pp-eyebrow">Petty Industries · Household division</p>
          <h1>The Petty<br />Printer</h1>
          <p className="pp-lead">
            A tiny thermal printer whose entire purpose is to issue physical
            receipts for minor interpersonal grievances. No cloud account
            required. No dignity preserved.
          </p>

          <div className="pp-price-block">
            <div>
              <span className="pp-price-label">Price</span>
              <strong
                className="pp-price"
                data-price={price}
                data-currency="USD"
                data-edition={edition}
              >
                {price}
              </strong>
            </div>
            <span className="pp-stock">In stock · ships Tuesday</span>
          </div>

          <p className="pp-note">
            Includes 1 starter roll · <a href="#api">Open API docs</a>
          </p>

          <div className="pp-options">
            <span className="pp-options-label">Edition · {edition}</span>
            <div className="pp-edition-list" role="group" aria-label="Edition">
              {editions.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  className="pp-edition"
                  aria-pressed={edition === option.name}
                  onClick={() => setEdition(option.name)}
                >
                  <strong>{option.name}</strong>
                  <small>{option.detail}</small>
                  <small className="pp-edition-price">
                    {priceFormat.format(option.price)}
                  </small>
                </button>
              ))}
            </div>
          </div>

          <div className="pp-actions">
            <button className="pp-buy" type="button">Add to cart</button>
            <button className="pp-wish" type="button">Save</button>
          </div>

          <dl className="pp-specs">
            {quickSpecs.map((spec) => (
              <div key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="pp-section" id="sample">
        <div className="pp-section-head">
          <span className="pp-section-index">01</span>
          <h2>Sample filing</h2>
        </div>
        <div className="pp-sample">
          <div className="pp-sample-copy">
            <p>
              Say the thing. The Petty Printer turns a muttered grievance into a
              formal, itemised, tearable document. Here is a real filing, printed
              at 203 dpi, from a household that will not be named.
            </p>
            <p className="pp-sample-meta">
              Filed by <b>UNIT-04</b> · logged by <b>The Ledger</b>
            </p>
          </div>
          <div className="pp-receipt">
            <p className="pp-receipt-title">INCIDENT RECEIPT</p>
            <p className="pp-receipt-number">#00482</p>
            <dl className="pp-receipt-lines">
              {sampleReceipt.slice(1).map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <p className="pp-receipt-barcode" aria-hidden="true" />
            <p className="pp-receipt-foot">OFFICIAL HOUSEHOLD RECORD</p>
          </div>
        </div>
      </section>

      <section className="pp-section" id="features">
        <div className="pp-section-head">
          <span className="pp-section-index">02</span>
          <h2>Key features</h2>
        </div>
        <div className="pp-overview">
          <p className="pp-overview-lead">
            It does not need to exist. It exists anyway, at the exact
            intersection of "useless" and "I cannot believe I check the
            leaderboard every morning."
          </p>
          <div className="pp-features">
            {features.map((feature) => (
              <article key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pp-section" id="ledger">
        <div className="pp-section-head">
          <span className="pp-section-index">03</span>
          <h2>Household leaderboard</h2>
        </div>
        <table className="pp-leaderboard">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Resident</th>
              <th scope="col">Offenses</th>
              <th scope="col">Signature crime</th>
            </tr>
          </thead>
          <tbody>
            {ledger.map((row) => (
              <tr key={row.name}>
                <td className="pp-rank">{row.rank}</td>
                <td>{row.name}</td>
                <td>{row.offenses}</td>
                <td>{row.worst}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="pp-ledger-foot">
          Monthly crime statistics are generated automatically. There is a
          printable version. Of course there is a printable version.
        </p>
      </section>

      <section className="pp-section" id="specifications">
        <div className="pp-section-head">
          <span className="pp-section-index">04</span>
          <h2>Specifications</h2>
        </div>
        <table className="pp-spec-table">
          <tbody>
            {fullSpecs.map((spec) => (
              <tr key={spec.label}>
                <th scope="row">{spec.label}</th>
                <td>{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="pp-subhead">Dimensions</h3>
        <dl className="pp-dimensions">
          {dimensions.map((dim) => (
            <div key={dim.label}>
              <dt>{dim.label}</dt>
              <dd>{dim.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="pp-section" id="reviews">
        <div className="pp-section-head">
          <span className="pp-section-index">05</span>
          <h2>Reviews</h2>
        </div>
        <div className="pp-review-summary">
          <strong>4.6</strong>
          <div>
            <Stars rating={5} />
            <p>Based on 1,904 verified grievance reviews</p>
          </div>
        </div>
        <div className="pp-review-grid">
          {reviews.map((review) => (
            <article className="pp-review" key={review.title}>
              <Stars rating={review.rating} />
              <h3>{review.title}</h3>
              <p>{review.body}</p>
              <footer>
                <span>{review.author}</span>
                <small>{review.household}</small>
              </footer>
            </article>
          ))}
        </div>
      </section>

      <section className="pp-section" id="similar">
        <div className="pp-section-head">
          <span className="pp-section-index">06</span>
          <h2>Also file with</h2>
        </div>
        <div className="pp-similar-grid">
          {similar.map((item) => (
            <a className="pp-similar" href="/product-3" key={item.name}>
              <div className="pp-similar-thumb" aria-hidden="true"><i /></div>
              <p className="pp-similar-category">{item.category}</p>
              <h3>{item.name}</h3>
              <strong className="pp-similar-price" data-price={item.price} data-currency="USD">
                {item.price}
              </strong>
            </a>
          ))}
        </div>
      </section>

      <footer className="pp-footer">
        <div className="pp-footer-top">
          <a className="pp-brand" href="/">
            petty<span>industries</span>
          </a>
          <nav className="pp-footer-links" aria-label="Footer">
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
        <div className="pp-footer-bottom">
          <p>PETTY INDUSTRIES // receipts for the small stuff</p>
          <p>Please resolve your disputes peacefully</p>
        </div>
      </footer>
    </main>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="pp-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} aria-hidden="true" data-filled={i < rating}>
          ★
        </span>
      ))}
    </div>
  );
}
