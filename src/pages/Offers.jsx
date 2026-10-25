import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import Countdown from '../components/Countdown.jsx';
import Reveal from '../components/Reveal.jsx';
import HScroll from '../components/HScroll.jsx';
import { coupons } from '../data/content.js';
import { products, categories, discount } from '../data/products.js';
import { useStore } from '../context/StoreContext.jsx';

export default function Offers() {
  const { notify } = useStore();
  const [copied, setCopied] = useState(null);
  const top = [...products].sort((a, b) => discount(b) - discount(a)).slice(0, 10);
  const under = products.filter((p) => p.price < 300).sort((a, b) => b.reviews - a.reviews).slice(0, 10);

  const copy = async (code) => {
    try { await navigator.clipboard.writeText(code); } catch { /* clipboard may be blocked */ }
    setCopied(code); notify(`Code ${code} copied`);
    setTimeout(() => setCopied(null), 1600);
  };

  return (
    <div className="container">
      <section className="offer-hero">
        <div>
          <span className="eyebrow">Limited time</span>
          <h1>Offers &amp; Coupons</h1>
          <p>Save more on every order. Deals refresh every day.</p>
        </div>
        <div className="offer-timer"><small>Today's deals end in</small><Countdown /></div>
      </section>

      <section className="section">
        <Reveal className="section-head"><h2>Coupon codes</h2></Reveal>
        <div className="coupon-grid">
          {coupons.map((c, i) => (
            <Reveal key={c.code} delay={i * 90} className="coupon-card">
              <div className="cc-left"><b>{c.type === 'pct' ? `${c.value}%` : `₹${c.value}`}</b><small>OFF</small></div>
              <div className="cc-mid"><h4>{c.title}</h4><p>{c.note}</p></div>
              <button className="cc-code" onClick={() => copy(c.code)}>{copied === c.code ? 'Copied ✓' : c.code}</button>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <Reveal className="section-head"><h2>Shop by discount</h2></Reveal>
        <div className="disc-tiles">
          {[['Up to 20% off', 20, 'a'], ['30% off & above', 30, 'b'], ['40% off & above', 40, 'c']].map(([label, d, tone]) => (
            <Reveal key={d}>
              <Link to="/sale" className={`disc-tile ${tone}`}><b>{label}</b><small>{products.filter((p) => (d === 20 ? discount(p) <= 20 : discount(p) >= d)).length} products</small><span>Shop →</span></Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <Reveal className="section-head"><h2>Biggest discounts</h2><Link to="/sale">View all →</Link></Reveal>
        <HScroll>{top.map((p) => <div className="hs-item" key={p.id}><ProductCard p={p} /></div>)}</HScroll>
      </section>

      <section className="section">
        <Reveal className="section-head"><h2>Under ₹300</h2></Reveal>
        <HScroll>{under.map((p) => <div className="hs-item" key={p.id}><ProductCard p={p} /></div>)}</HScroll>
      </section>

      <section className="section">
        <Reveal className="section-head"><h2>Offers by category</h2></Reveal>
        <div className="pills big">
          {categories.map((c) => <Link key={c.slug} to={`/category/${c.slug}`}>{c.emoji} {c.name}</Link>)}
        </div>
      </section>
    </div>
  );
}
