import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { menu, brandMenu, labelOf } from '../data/menu.js';
import { products, inr, categories } from '../data/products.js';
import { useStore } from '../context/StoreContext.jsx';
import Img from './Img.jsx';
import Logo from './Logo.jsx';

const navItems = [
  ...menu.map((m) => ({ key: m.key, label: m.label, to: m.to, panel: m })),
  { key: 'brands', label: 'Brands', to: '/brands', panel: brandMenu },
  { key: 'new', label: 'New In', to: '/new' },
  { key: 'offers', label: 'Offers', to: '/offers', hot: true },
  { key: 'blog', label: 'Beauty Book', to: '/blog' },
];

const itemLink = (panel, raw) =>
  panel.kind === 'brands' ? `/brand/${encodeURIComponent(raw)}` : `/category/${panel.key}?sub=${encodeURIComponent(labelOf(raw))}`;
const groupLink = (panel, g) =>
  panel.kind === 'brands' ? '/brands' : `/category/${panel.key}?group=${encodeURIComponent(g.title)}`;

export default function Header() {
  const { count, wishlist, user, openAuth, logout } = useStore();
  const [q, setQ] = useState('');
  const [focus, setFocus] = useState(false);
  const [active, setActive] = useState(null);
  const [grp, setGrp] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [mOpen, setMOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [bump, setBump] = useState(false);
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const timer = useRef(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => { setActive(null); setMobile(false); setFocus(false); }, [pathname, search]);
  useEffect(() => { document.body.style.overflow = mobile ? 'hidden' : ''; }, [mobile]);

  // Bag badge bump animation whenever the count changes.
  useEffect(() => {
    if (!count) return undefined;
    setBump(true);
    const t = setTimeout(() => setBump(false), 450);
    return () => clearTimeout(t);
  }, [count]);

  const suggestions = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (s.length < 2) return [];
    return products.filter((p) => `${p.name} ${p.brand} ${p.sub}`.toLowerCase().includes(s)).slice(0, 5);
  }, [q]);

  const submit = (e) => {
    e.preventDefault();
    if (q.trim()) { navigate(`/search?q=${encodeURIComponent(q.trim())}`); setFocus(false); setMobile(false); }
  };

  const openNav = (item) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { setActive(item.panel ? item.key : null); setGrp(0); }, 70);
  };
  const closeNav = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(null), 140);
  };

  const cur = navItems.find((i) => i.key === active)?.panel;

  return (
    <>
      <div className="topstrip">
        <div className="container topstrip-in">
          <span>Free shipping on orders above ₹499 · Use code <b>SOUTH10</b> for 10% off</span>
          <span className="top-links">
            <Link to="/stores">Store Locator</Link>
            <Link to="/track-order">Track Order</Link>
            <Link to="/faq">Help</Link>
          </span>
        </div>
      </div>

      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-main">
          <button className="menu-toggle" onClick={() => setMobile(true)} aria-label="Open menu">☰</button>
          <Logo />

          <form className="search" onSubmit={submit}>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onFocus={() => setFocus(true)}
              onBlur={() => setTimeout(() => setFocus(false), 160)}
              placeholder="Search for makeup, skincare, brands & more"
              aria-label="Search products"
            />
            <button type="submit" aria-label="Search">⌕</button>
            {focus && suggestions.length > 0 && (
              <div className="suggest">
                {suggestions.map((p) => (
                  <Link key={p.id} to={`/product/${p.id}`} className="sg-item">
                    <Img src={p.image} alt="" emoji={categories.find((c) => c.slug === p.category)?.emoji} />
                    <span><b>{p.name}</b><small>{p.brand} · {inr(p.price)}</small></span>
                  </Link>
                ))}
                <button type="submit" className="sg-all">See all results for “{q}” →</button>
              </div>
            )}
          </form>

          <div className="header-actions">
            {user ? (
              <div className="acct">
                <Link to="/account" className="icon-btn"><span className="ico">☺</span><small>Hi, {user.name.split(' ')[0]}</small></Link>
                <div className="acct-menu">
                  <Link to="/account">My Account</Link>
                  <Link to="/account?tab=orders">My Orders</Link>
                  <Link to="/wishlist">Wishlist</Link>
                  <Link to="/track-order">Track Order</Link>
                  <button onClick={logout}>Sign out</button>
                </div>
              </div>
            ) : (
              <button className="icon-btn" onClick={() => openAuth()}><span className="ico">☺</span><small>Sign in</small></button>
            )}
            <Link to="/wishlist" className="icon-btn">
              <span className="ico">♡</span><small>Wishlist</small>
              {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
            </Link>
            <Link to="/cart" className="icon-btn">
              <span className="ico">🛍</span><small>Bag</small>
              {count > 0 && <span className={`badge ${bump ? 'bump' : ''}`}>{count}</span>}
            </Link>
          </div>
        </div>

        <nav className="nav" onMouseLeave={closeNav}>
          <div className="container">
            <ul className="nav-list">
              {navItems.map((item) => (
                <li
                  key={item.key}
                  className={`nav-item ${active === item.key ? 'open' : ''} ${item.hot ? 'hot' : ''}`}
                  onMouseEnter={() => openNav(item)}
                >
                  <NavLink to={item.to}>{item.label}{item.panel && <i className="caret" />}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          {cur && (
            <div className="mega" key={active} onMouseEnter={() => clearTimeout(timer.current)}>
              <div className="container mega-inner">
                <ul className="mega-groups">
                  {cur.groups.map((g, i) => (
                    <li key={g.title} className={i === grp ? 'on' : ''} onMouseEnter={() => setGrp(i)}>
                      <Link to={groupLink(cur, g)}>{g.title}</Link><span className="chev">›</span>
                    </li>
                  ))}
                </ul>
                <div className="mega-items" key={`${active}-${grp}`}>
                  <h5>{cur.groups[grp].title}</h5>
                  <ul>
                    {cur.groups[grp].items.map((it, idx) => (
                      <li key={it} style={{ animationDelay: `${idx * 35}ms` }}>
                        <Link to={itemLink(cur, it)}>{labelOf(it)}</Link>
                      </li>
                    ))}
                  </ul>
                  <Link to={cur.to} className="mega-all">{cur.kind === 'brands' ? 'View all brands' : `Shop all ${cur.label}`} →</Link>
                </div>
                <Link to={cur.feature.to} className="mega-feature">
                  <Img src={cur.feature.image} alt={cur.feature.title} emoji="✨" />
                  <span><b>{cur.feature.title}</b><small>{cur.feature.sub}</small></span>
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Mobile drawer */}
      <div className={`drawer-bg ${mobile ? 'open' : ''}`} onClick={() => setMobile(false)} />
      <aside className={`drawer ${mobile ? 'open' : ''}`} aria-hidden={!mobile}>
        <div className="drawer-head">
          <Logo />
          <button onClick={() => setMobile(false)} aria-label="Close menu">✕</button>
        </div>
        <div className="drawer-body">
          {user ? (
            <Link to="/account" className="drawer-link strong">☺ Hi, {user.name}</Link>
          ) : (
            <button className="drawer-link strong" onClick={() => { setMobile(false); openAuth(); }}>☺ Sign in / Sign up</button>
          )}
          {[...menu, brandMenu].map((m) => (
            <div key={m.key} className={`acc ${mOpen === m.key ? 'open' : ''}`}>
              <button className="acc-head" onClick={() => setMOpen(mOpen === m.key ? null : m.key)}>
                {m.label}<span>＋</span>
              </button>
              <div className="acc-body">
                {m.groups.map((g) => (
                  <div key={g.title} className="acc-group">
                    <Link to={groupLink(m, g)} className="acc-title">{g.title}</Link>
                    {g.items.map((it) => <Link key={it} to={itemLink(m, it)}>{labelOf(it)}</Link>)}
                  </div>
                ))}
                <Link to={m.to} className="acc-all">View all →</Link>
              </div>
            </div>
          ))}
          <Link to="/new" className="drawer-link">New In</Link>
          <Link to="/offers" className="drawer-link hot">Offers</Link>
          <Link to="/blog" className="drawer-link">Beauty Book</Link>
          <hr />
          <Link to="/track-order" className="drawer-link small">Track Order</Link>
          <Link to="/stores" className="drawer-link small">Store Locator</Link>
          <Link to="/contact" className="drawer-link small">Contact Us</Link>
          <Link to="/faq" className="drawer-link small">Help &amp; FAQs</Link>
          {user && <button className="drawer-link small" onClick={() => { logout(); setMobile(false); }}>Sign out</button>}
        </div>
      </aside>
    </>
  );
}
