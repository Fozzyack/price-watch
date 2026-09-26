import { useState } from "react";
import type { Route } from "./+types/product-1";
import "./product-1.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VOLTAGE 9 Neural Deck | OBJECT 09" },
    {
      name: "description",
      content: "VOLTAGE 9 is a portable neural deck engineered for quiet, high-speed work.",
    },
  ];
}

const configurations = [
  { name: "Field", detail: "13 in / 512 TB", price: 3799 },
  { name: "Studio", detail: "15 in / 1 PB", price: 4299 },
  { name: "Archive", detail: "17 in / 2 PB", price: 4899 },
];

const specifications = [
  ["Core", "Quantum Spine Q-9"],
  ["Interface", "Mk.IV wetware port"],
  ["Memory", "512 TB crystal core"],
  ["Cycle", "72 h plasma cell"],
  ["Chassis", "Anodised magnesium"],
  ["Mass", "1.8 kg"],
];

const notes = [
  ["01", "Boot without the noise", "A dedicated cold-start lane brings the system online in 0.4 seconds."],
  ["02", "A calmer kind of fast", "Passive cryo channels move heat through the body, not the room."],
  ["03", "Leave nothing behind", "One physical switch clears the local cache and connection history."],
];

const priceFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Product1() {
  const [configuration, setConfiguration] = useState("Studio");
  const selected = configurations.find((option) => option.name === configuration) ?? configurations[1];
  const price = priceFormat.format(selected.price);

  return (
    <main className="od-page">
      <header className="od-header">
        <a className="od-mark" href="/">object<span>09</span></a>
        <nav aria-label="Catalog">
          <a href="/product-1" aria-current="page">Hardware</a>
          <a href="/product-2">Field</a>
          <a href="/product-3">Domestic</a>
          <a href="/product-4">Ritual</a>
        </nav>
        <button type="button" className="od-menu" aria-label="Open menu">Menu <i /></button>
      </header>

      <section className="od-hero">
        <div className="od-title">
          <p>Neural instruments / 2026</p>
          <h1>VOLTAGE<br /><em>9</em></h1>
          <p className="od-intro">A personal neural deck for work that asks for focus, speed, and a clean exit.</p>
        </div>

        <div className="od-object" aria-label="VOLTAGE 9 neural deck">
          <span className="od-grid" aria-hidden="true" />
          <span className="od-object-number" aria-hidden="true">09</span>
          <div className="od-deck" aria-hidden="true">
            <div className="od-deck-screen"><i /><i /><i /><b>V9</b></div>
            <div className="od-deck-base"><span /><span /><span /><span /><span /></div>
            <div className="od-deck-port" />
          </div>
          <p className="od-scale">280 mm<br />wide</p>
        </div>

        <div className="od-purchase">
          <div className="od-price">
            <p>Starting at</p>
            <strong data-price={price} data-currency="USD" data-configuration={configuration}>{price}</strong>
            <span>In stock / ships in 48 hours</span>
          </div>
          <fieldset className="od-options">
            <legend>Configuration <b>{configuration}</b></legend>
            {configurations.map((option) => (
              <button
                key={option.name}
                type="button"
                aria-pressed={configuration === option.name}
                onClick={() => setConfiguration(option.name)}
              >
                <span>{option.name}</span>
                <small>{option.detail}</small>
                <b>{priceFormat.format(option.price)}</b>
              </button>
            ))}
          </fieldset>
          <button type="button" className="od-add">Reserve your deck <span>→</span></button>
          <p className="od-delivery">Worldwide insured delivery. Configuration can be changed before dispatch.</p>
        </div>
      </section>

      <section className="od-manifesto">
        <p className="od-section-label">The instrument</p>
        <div>
          <h2>Less surface.<br />More signal.</h2>
          <p>VOLTAGE 9 strips the neural deck back to its essential objects: a stable core, a clear interface, and a chassis built to disappear into your working life.</p>
        </div>
      </section>

      <section className="od-specs">
        <p className="od-section-label">Technical register</p>
        <dl>
          {specifications.map(([label, value]) => (
            <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
      </section>

      <section className="od-notes">
        {notes.map(([number, title, body]) => (
          <article key={number}>
            <span>{number}</span>
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <footer className="od-footer">
        <a className="od-mark" href="/">object<span>09</span></a>
        <p>Designed for deep work</p>
        <p>Copyright 2026</p>
      </footer>
    </main>
  );
}
