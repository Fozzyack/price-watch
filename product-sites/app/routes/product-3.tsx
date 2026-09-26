import { useState } from "react";
import type { Route } from "./+types/product-3";
import "./product-3.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Petty Printer | House Rules" },
    {
      name: "description",
      content: "A delightfully unnecessary desktop printer for recording every minor domestic offense.",
    },
  ];
}

const editions = [
  { name: "Personal", price: 129, note: "For a party of one" },
  { name: "Household", price: 169, note: "Includes four NFC cards" },
  { name: "Committee", price: 229, note: "For repeat offenders" },
];

const evidence = [
  ["01", "Milk fraud", "The carton was returned to the fridge with one ceremonial sip remaining."],
  ["02", "Dishwasher tampering", "Opened mid-cycle. Steam released. A perfectly good wash interrupted."],
  ["03", "Mug appropriation", "My good mug. The one with the comfortable handle. Again."],
];

export default function Product3() {
  const [edition, setEdition] = useState("Household");
  const selected = editions.find((option) => option.name === edition) ?? editions[1];
  const formattedPrice = selected.price.toFixed(2);
  const priceInCents = String(selected.price * 100);

  return (
    <main className="hr-page">
      <header className="hr-nav">
        <a className="hr-brand" href="/">house <i>rules</i></a>
        <nav aria-label="Product navigation">
          <a href="/product-1">Deckware</a>
          <a href="/product-2">Packs</a>
          <a href="/product-3" aria-current="page">Printer</a>
          <a href="/product-4">Coffee</a>
        </nav>
        <button type="button">The ledger <span>3</span></button>
      </header>

      <section className="hr-hero">
        <div className="hr-hero-copy">
          <p className="hr-eyebrow">Domestic accountability tools</p>
          <h1>Print the<br /><em>record.</em></h1>
          <p className="hr-lead">The tiny thermal printer for big feelings about small things. File the grievance. Tear the receipt. Move on. Or do not.</p>
          <a className="hr-scroll" href="#evidence">See the evidence <span>↓</span></a>
        </div>

        <div className="hr-product-art" aria-label="The Petty Printer">
          <p>Est. 2026 / Home division</p>
          <div className="hr-sun" aria-hidden="true" />
          <div className="hr-printer" aria-hidden="true">
            <div className="hr-printer-top"><i /><span /></div>
            <div className="hr-printer-name">PETTY</div>
            <div className="hr-printer-button" />
            <div className="hr-paper"><b>INCIDENT #0482</b><span>MILK FRAUD</span><i /></div>
          </div>
          <p className="hr-art-note">Prints at 80 mm/s<br />Never forgets</p>
        </div>
      </section>

      <section className="hr-buy">
        <div className="hr-buy-intro"><p>Choose your level of petty</p><span>Free paper roll included</span></div>
        <div className="hr-editions" role="group" aria-label="Edition">
          {editions.map((option) => (
            <button
              key={option.name}
              type="button"
              aria-pressed={edition === option.name}
              onClick={() => setEdition(option.name)}
            >
              <span>{option.name}</span>
              <small>{option.note}</small>
            </button>
          ))}
        </div>
        <div className="hr-price-card">
          <p>Case total</p>
          <div className="hr-price" data-price={priceInCents} data-currency="USD" data-price-unit="cents">
            <span>USD</span><strong>{formattedPrice}</strong>
          </div>
          <small>data-price is stored in cents</small>
          <button type="button">Add to household <span>+</span></button>
        </div>
      </section>

      <section className="hr-evidence" id="evidence">
        <div className="hr-evidence-head"><p>Recent filings</p><h2>A pattern<br />is emerging.</h2></div>
        <div className="hr-case-grid">
          {evidence.map(([number, title, detail]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
              <i aria-hidden="true">Filed</i>
            </article>
          ))}
        </div>
      </section>

      <section className="hr-details">
        <p>58 mm thermal printer / Wi-Fi, BLE &amp; NFC / BPA-free archival paper / Six hours of battery</p>
        <p>Good for housemates, families, work kitchens, and people who need a small receipt to make a very large point.</p>
      </section>

      <footer className="hr-footer"><a className="hr-brand" href="/">house <i>rules</i></a><p>File fairly. Print freely.</p><p>Copyright 2026</p></footer>
    </main>
  );
}
