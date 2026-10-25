import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { products, categories, discount } from '../data/products.js';

const PAGE = 12;
const priceBands = [
  { id: 'all', label: 'All prices', test: () => true },
  { id: 'u300', label: 'Under ₹300', test: (p) => p.price < 300 },
  { id: '300-600', label: '₹300 - ₹600', test: (p) => p.price >= 300 && p.price <= 600 },
  { id: '600-1000', label: '₹600 - ₹1000', test: (p) => p.price > 600 && p.price <= 1000 },
  { id: 'o1000', label: 'Above ₹1000', test: (p) => p.price > 1000 },
];
const discBands = [0, 10, 20, 30, 40];

// mode: category | brand | search | sale | new
export default function Products({ mode = 'category' }) {
  const { slug, name } = useParams();
  const [params] = useSearchParams();
  const q = (params.get('q') || '').toLowerCase().trim();
  const sub = params.get('sub');
  const group = params.get('group');
  const cat = mode === 'category' ? categories.find((c) => c.slug === slug) : null;

  const [sort, setSort] = useState('popular');
  const [brandSel, setBrandSel] = useState([]);
  const [band, setBand] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [minDisc, setMinDisc] = useState(0);
  const [visible, setVisible] = useState(PAGE);
  const [busy, setBusy] = useState(false);
  const [fOpen, setFOpen] = useState(false);

  const routeKey = `${mode}|${slug}|${name}|${q}|${sub}|${group}`;
  useEffect(() => {
    setBrandSel([]); setBand('all'); setMinRating(0); setMinDisc(0); setVisible(PAGE); setSort('popular');
  }, [routeKey]);

  // Short shimmer whenever the result set changes, for a smooth feel.
  const filterKey = `${routeKey}|${sort}|${brandSel.join(',')}|${band}|${minRating}|${minDisc}`;
  useEffect(() => {
    setBusy(true);
    const t = setTimeout(() => setBusy(false), 260);
    return () => clearTimeout(t);
  }, [filterKey]);

  const base = useMemo(() => {
    let list = products;
    if (mode === 'category' && cat) list = list.filter((p) => p.category === cat.slug);
    if (mode === 'brand') list = list.filter((p) => p.brand === name);
    if (mode === 'sale') list = list.filter((p) => discount(p) >= 30);
    if (mode === 'new') list = list.filter((p) => p.isNew);
    if (sub) list = list.filter((p) => p.sub === sub);
    if (group) list = list.filter((p) => p.group === group);
    if (q) list = list.filter((p) => `${p.name} ${p.brand} ${p.sub} ${p.group} ${p.category}`.toLowerCase().includes(q));
    return list;
  }, [mode, cat, name, sub, group, q]);

  const brandOptions = useMemo(() => [...new Set(base.map((p) => p.brand))].sort(), [base]);

  const shown = useMemo(() => {
    const test = priceBands.find((b) => b.id === band).test;
    const list = base.filter((p) => test(p) && p.rating >= minRating && discount(p) >= minDisc && (!brandSel.length || brandSel.includes(p.brand)));
    const sorters = {
      popular: (a, b) => b.reviews - a.reviews,
      low: (a, b) => a.price - b.price,
      high: (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
      discount: (a, b) => discount(b) - discount(a),
      newest: (a, b) => b.id - a.id,
    };
    return [...list].sort(sorters[sort]);
  }, [base, band, minRating, minDisc, brandSel, sort]);

  const toggleBrand = (b) => setBrandSel((s) => (s.includes(b) ? s.filter((x) => x !== b) : [...s, b]));
  const reset = () => { setBrandSel([]); setBand('all'); setMinRating(0); setMinDisc(0); };
  const chips = [
    ...brandSel.map((b) => ({ k: `b-${b}`, label: b, off: () => toggleBrand(b) })),
    ...(band !== 'all' ? [{ k: 'band', label: priceBands.find((x) => x.id === band).label, off: () => setBand('all') }] : []),
    ...(minRating ? [{ k: 'rt', label: `${minRating}★ & above`, off: () => setMinRating(0) }] : []),
    ...(minDisc ? [{ k: 'dc', label: `${minDisc}% off or more`, off: () => setMinDisc(0) }] : []),
  ];

  if (mode === 'category' && !cat) {
    return <div className="container empty"><div className="big">🔍</div><h3>Category not found</h3><Link className="btn" to="/">Back to home</Link></div>;
  }

  const title = mode === 'sale' ? 'Sale' : mode === 'new' ? 'New Arrivals' : mode === 'brand' ? name
    : cat ? (sub || group ? `${cat.name} › ${sub || group}` : cat.name)
      : q ? `Results for “${params.get('q')}”` : 'All Products';

  const subLink = (extra) => `/category/${cat.slug}${extra}`;

  return (
    <div className="container">
      <div className="crumbs">
        <Link to="/">Home</Link> / {cat ? <><Link to={`/category/${cat.slug}`}>{cat.name}</Link>{(sub || group) && ` / ${sub || group}`}</> : title}
      </div>

      {(cat || mode === 'brand' || mode === 'sale' || mode === 'new') && (
        <div className="cat-banner">
          <div>
            <h1>{cat ? cat.name : title}</h1>
            <p>{cat ? cat.blurb : mode === 'brand' ? `Shop all products from ${name}.` : mode === 'sale' ? 'Biggest discounts across every category. 30% off and more.' : 'The latest launches, fresh on our shelves.'}</p>
          </div>
          {cat && (
            <div className="pills">
              <Link to={subLink('')} className={!sub && !group ? 'on' : ''}>All</Link>
              {cat.subs.map((s) => <Link key={s} to={subLink(`?sub=${encodeURIComponent(s)}`)} className={sub === s ? 'on' : ''}>{s}</Link>)}
            </div>
          )}
          <span className="cat-emoji" aria-hidden="true">{cat?.emoji || '✨'}</span>
        </div>
      )}

      <div className="listing">
        <aside className={`filters ${fOpen ? 'open' : ''}`}>
          <div className="filters-head"><b>Filters</b><button onClick={() => setFOpen(false)} aria-label="Close filters">✕</button></div>
          {brandOptions.length > 1 && (
            <>
              <h4>Brand</h4>
              {brandOptions.map((b) => (
                <label key={b}><input type="checkbox" checked={brandSel.includes(b)} onChange={() => toggleBrand(b)} />{b}</label>
              ))}
            </>
          )}
          <h4>Price</h4>
          {priceBands.map((b) => (
            <label key={b.id}><input type="radio" name="price" checked={band === b.id} onChange={() => setBand(b.id)} />{b.label}</label>
          ))}
          <h4>Rating</h4>
          {[0, 4, 4.5].map((r) => (
            <label key={r}><input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)} />{r === 0 ? 'All' : `${r}★ & above`}</label>
          ))}
          <h4>Discount</h4>
          {discBands.map((d) => (
            <label key={d}><input type="radio" name="disc" checked={minDisc === d} onChange={() => setMinDisc(d)} />{d === 0 ? 'All' : `${d}% & above`}</label>
          ))}
          <button className="clear" onClick={reset}>Clear all filters</button>
        </aside>

        <section>
          <div className="list-top">
            <div>
              <h2>{title} <small>({shown.length} products)</small></h2>
            </div>
            <div className="list-ctrl">
              <button className="filter-btn" onClick={() => setFOpen(true)}>⚙ Filters</button>
              <select className="sort" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
                <option value="popular">Sort: Popularity</option>
                <option value="newest">Newest first</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="discount">Better Discount</option>
              </select>
            </div>
          </div>

          {chips.length > 0 && (
            <div className="chips">
              {chips.map((c) => <button key={c.k} onClick={c.off}>{c.label} ✕</button>)}
              <button className="clear-chip" onClick={reset}>Clear all</button>
            </div>
          )}

          {busy ? (
            <div className="grid three">{Array.from({ length: 6 }, (_, i) => <div key={i} className="skeleton" />)}</div>
          ) : shown.length ? (
            <>
              <div className="grid three">
                {shown.slice(0, visible).map((p, i) => (
                  <div key={p.id} className="stagger" style={{ animationDelay: `${(i % PAGE) * 40}ms` }}><ProductCard p={p} /></div>
                ))}
              </div>
              <div className="load-more">
                <small>Showing {Math.min(visible, shown.length)} of {shown.length}</small>
                {visible < shown.length && <button className="btn outline" onClick={() => setVisible(visible + PAGE)}>Load more</button>}
              </div>
            </>
          ) : (
            <div className="empty">
              <div className="big">🧴</div><h3>No products found</h3>
              <p>Try changing your filters or search term.</p>
              <button className="btn" onClick={reset}>Reset filters</button>
            </div>
          )}
        </section>
      </div>
      <div className={`filters-bg ${fOpen ? 'open' : ''}`} onClick={() => setFOpen(false)} />
    </div>
  );
}
