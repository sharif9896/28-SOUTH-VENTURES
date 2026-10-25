import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { brands, products } from '../data/products.js';
import Reveal from '../components/Reveal.jsx';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const clean = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');

export default function Brands() {
  const [q, setQ] = useState('');
  const counts = useMemo(() => Object.fromEntries(brands.map((b) => [b, products.filter((p) => p.brand === b).length])), []);
  const list = brands.filter((b) => clean(b).toLowerCase().includes(q.trim().toLowerCase()));
  const grouped = letters.map((l) => [l, list.filter((b) => clean(b)[0].toUpperCase() === l || (l === '#' && /\d/.test(b[0])))]);
  const numeric = list.filter((b) => /\d/.test(b[0]));
  const available = new Set([...grouped.filter(([, v]) => v.length).map(([l]) => l), ...(numeric.length ? ['#'] : [])]);

  return (
    <div className="container">
      <div className="crumbs"><Link to="/">Home</Link> / Brands</div>
      <div className="cat-banner">
        <div><h1>All Brands</h1><p>Discover {brands.length} brands across makeup, skin, hair, fragrance and more.</p></div>
        <span className="cat-emoji" aria-hidden="true">🏷️</span>
      </div>

      <div className="brand-tools">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search brands" aria-label="Search brands" />
        <div className="alpha">
          {['#', ...letters].map((l) => (
            available.has(l)
              ? <a key={l} href={`#brand-${l}`}>{l}</a>
              : <span key={l} className="off">{l}</span>
          ))}
        </div>
      </div>

      {!list.length && <div className="empty small"><p>No brands match your search.</p></div>}

      {numeric.length > 0 && (
        <Reveal className="brand-group" id="brand-#">
          <h3>#</h3>
          <div className="brand-cards">{numeric.map((b) => <BrandCard key={b} b={b} n={counts[b]} />)}</div>
        </Reveal>
      )}
      {grouped.filter(([, v]) => v.length).map(([l, v]) => (
        <Reveal className="brand-group" id={`brand-${l}`} key={l}>
          <h3>{l}</h3>
          <div className="brand-cards">{v.map((b) => <BrandCard key={b} b={b} n={counts[b]} />)}</div>
        </Reveal>
      ))}
    </div>
  );
}

function BrandCard({ b, n }) {
  return (
    <Link to={`/brand/${encodeURIComponent(b)}`} className="brand-card">
      <span className="bc-mono">{b[0]}</span>
      <b>{b}</b>
      <small>{n} products</small>
    </Link>
  );
}
