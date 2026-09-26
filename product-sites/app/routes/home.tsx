import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cove Audio | Made for the long way home" },
    {
      name: "description",
      content: "Cove Audio wireless headphones product landing page.",
    },
  ];
}

export default function Home() {
  return (
    <main className="site-shell">
      <nav className="site-nav" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Cove home">
          cove<span>.</span>
        </a>
        <div className="nav-links">
          <a href="/product-1">Product 1</a>
          <a href="/product-2">Product 2</a>
          <a href="/product-3">Product 3</a>
        </div>
        <a className="bag-link" href="#bag">
          Bag <span>0</span>
        </a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Sound, considered</p>
          <h1>Go where the<br />good sound is.</h1>
          <p className="hero-description">
            Immersive, all-day audio for every detour, daydream, and long way home.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#shop">
              Shop headphones <ArrowUpRight />
            </a>
            <a className="text-link" href="#story">Meet Cove <span>+</span></a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Cove Wave wireless headphones">
          <span className="orb orb-one" />
          <span className="orb orb-two" />
          <span className="grid-line grid-line-one" />
          <span className="grid-line grid-line-two" />
          <div className="headphones" aria-hidden="true">
            <div className="headband" />
            <div className="earcup earcup-left"><div /></div>
            <div className="earcup earcup-right"><div /></div>
          </div>
          <div className="product-note note-top">Spatial audio<br />with head tracking</div>
          <div className="product-note note-bottom">30 hour<br />battery life</div>
          <div className="price-card" id="shop">
            <p>Wave 01</p>
            <div><strong>$249</strong><button type="button" aria-label="Add Wave 01 to bag">+</button></div>
          </div>
        </div>
      </section>

      <footer className="hero-footer">
        <p>Listen closer. Live wider.</p>
        <div className="sound-bars" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
        <p>Designed in Portland, OR</p>
      </footer>
    </main>
  );
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 13 13 3M6 3h7v7" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
