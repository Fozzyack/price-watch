import { useState } from "react";
import type { Route } from "./+types/product-4";
import "./product-4.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Luna One Espresso Machine | Afterglow" },
    {
      name: "description",
      content: "Luna One is a compact, precision espresso machine for slow mornings and exacting shots.",
    },
  ];
}

const finishes = [
  { name: "Oat", detail: "Warm matte cream", price: 649, color: "#dfd1bc" },
  { name: "Ink", detail: "Soft charcoal", price: 649, color: "#29292a" },
  { name: "Moss", detail: "Deep green enamel", price: 699, color: "#425447" },
];

const features = [
  ["Quiet by design", "A low-vibration rotary pump keeps the ritual peaceful, even before the house is awake."],
  ["Temperature, held", "A brass brew group and PID controller hold water within one degree from first shot to last."],
  ["Made for the counter", "A narrow footprint, hidden water tank, and simple front controls leave room for the rest of your morning."],
];

const priceFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Product4() {
  const [finish, setFinish] = useState("Oat");
  const selected = finishes.find((option) => option.name === finish) ?? finishes[0];
  const price = priceFormat.format(selected.price);

  return (
    <main className="ag-page">
      <nav className="ag-nav" aria-label="Main navigation">
        <a className="ag-brand" href="/">afterglow</a>
        <div className="ag-nav-links">
          <a href="/product-1">Deckware</a>
          <a href="/product-2">Packs</a>
          <a href="/product-3">Gadgets</a>
          <a href="/product-4" aria-current="page">Coffee</a>
        </div>
        <button className="ag-bag" type="button">Bag <span>0</span></button>
      </nav>

      <section className="ag-product">
        <div className="ag-copy">
          <p className="ag-kicker">At-home espresso, considered</p>
          <h1>Luna<br /><em>One</em></h1>
          <p className="ag-description">
            A small espresso machine for people who notice the little things: the first
            pull, the quiet click, the cup warming in both hands.
          </p>

          <div className="ag-price-row">
            <div>
              <span>From</span>
              <strong data-price={price} data-currency="USD" data-finish={finish}>{price}</strong>
            </div>
            <p>Ships in 2-3 business days<br />30-day home trial</p>
          </div>

          <fieldset className="ag-finishes">
            <legend>Finish <b>{finish}</b></legend>
            <div>
              {finishes.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  aria-pressed={finish === option.name}
                  onClick={() => setFinish(option.name)}
                >
                  <i style={{ backgroundColor: option.color }} aria-hidden="true" />
                  <span>{option.name}</span>
                  <small>{option.detail}</small>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="ag-actions">
            <button className="ag-add" type="button">Add to bag <span>+</span></button>
            <button className="ag-details" type="button">View details</button>
          </div>
        </div>

        <div className="ag-visual" aria-label="Luna One espresso machine">
          <p className="ag-edition">No. 01 / Everyday ritual</p>
          <div className="ag-sun" aria-hidden="true" />
          <div className="ag-machine" aria-hidden="true">
            <div className="ag-machine-top"><i /><i /><i /></div>
            <div className="ag-machine-face"><span /><b>LUNA</b></div>
            <div className="ag-group"><i /><span /></div>
            <div className="ag-cup"><i /></div>
          </div>
          <p className="ag-caption">14.2 in tall<br />9.1 in wide</p>
        </div>
      </section>

      <section className="ag-features" aria-label="Luna One features">
        {features.map(([title, description], index) => (
          <article key={title}>
            <span>0{index + 1}</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </section>

      <footer className="ag-footer">
        <p>Afterglow Coffee Equipment</p>
        <p>Made for unhurried mornings</p>
      </footer>
    </main>
  );
}
