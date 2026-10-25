import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider.jsx';
import ProductCard from '../components/ProductCard.jsx';
import Img from '../components/Img.jsx';
import Reveal from '../components/Reveal.jsx';
import Countdown from '../components/Countdown.jsx';
import HScroll from '../components/HScroll.jsx';
import { categories, products, brands, discount } from '../data/products.js';
import { blogPosts, services } from '../data/content.js';
import { u } from '../data/img.js';
import { useStore } from '../context/StoreContext.jsx';

const banners = [
  { title: 'Skincare Essentials', sub: 'Starting ₹249', to: '/category/skin', img: u('photo-1570172619644-dfd03ed5d881', 900) },
  { title: 'Lip Love', sub: 'Up to 40% off', to: '/category/makeup?group=Lips', img: u('photo-1586495777744-4413f21062fa', 900) },
  { title: 'Hair Rescue', sub: 'Buy more, save more', to: '/category/hair', img: u('photo-1522337360788-8b13dee7a37e', 900) },
];

const marquee = ['100% Authentic Products', 'Free Shipping above ₹499', 'Easy 15-day Returns', 'Use code SOUTH10 for 10% off', 'Secure Payments', 'Delivered Across India'];

export default function Home() {
  const { recent } = useStore();
  const [tab, setTab] = useState('makeup');

  const deals = useMemo(() => [...products].sort((a, b) => discount(b) - discount(a)).slice(0, 12), []);
  const trending = useMemo(
    () => products.filter((p) => p.category === tab).sort((a, b) => b.reviews - a.reviews).slice(0, 8),
    [tab]
  );
  const fresh = useMemo(() => products.filter((p) => p.isNew).slice(0, 8), []);
  const recentItems = recent.map((id) => products.find((p) => p.id === id)).filter(Boolean).slice(0, 6);
  const spotlight = brands.filter((b) => b !== '28 South').slice(0, 10);

  return (
    <>
      <HeroSlider />

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((m, i) => <span key={i}>✦ {m}</span>)}
        </div>
      </div>

      <div className="container">
        <section className="section">
          <Reveal className="section-head"><h2>Shop by Category</h2></Reveal>
          <div className="cat-row">
            {categories.map((c, i) => (
              <Reveal key={c.slug} delay={i * 70}>
                <Link to={`/category/${c.slug}`} className="cat">
                  <div className="circle"><Img src={c.image} alt={c.name} emoji={c.emoji} /></div>
                  <p>{c.name}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section">
          <Reveal className="deal-head">
            <div>
              <span className="eyebrow dark">Today only</span>
              <h2>Deals of the Day</h2>
            </div>
            <Countdown />
            <Link to="/offers" className="link-btn">View all offers →</Link>
          </Reveal>
          <Reveal>
            <HScroll>{deals.map((p) => <div className="hs-item" key={p.id}><ProductCard p={p} /></div>)}</HScroll>
          </Reveal>
        </section>

        <section className="section">
          <div className="banner-grid">
            {banners.map((b, i) => (
              <Reveal key={b.title} delay={i * 100}>
                <Link to={b.to} className="banner">
                  <Img src={b.img} alt={b.title} emoji="✨" />
                  <div><h3>{b.title}</h3><p>{b.sub}</p><span className="banner-cta">Shop now →</span></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section">
          <Reveal className="section-head">
            <h2>Trending Now</h2>
            <div className="tabs">
              {categories.slice(0, 5).map((c) => (
                <button key={c.slug} className={tab === c.slug ? 'on' : ''} onClick={() => setTab(c.slug)}>{c.name}</button>
              ))}
            </div>
          </Reveal>
          <div className="grid" key={tab}>
            {trending.map((p, i) => <div key={p.id} className="stagger" style={{ animationDelay: `${i * 50}ms` }}><ProductCard p={p} /></div>)}
          </div>
          <div className="center"><Link to={`/category/${tab}`} className="btn outline">View all {categories.find((c) => c.slug === tab)?.name}</Link></div>
        </section>

        <section className="section">
          <Reveal className="promo">
            <div className="promo-img"><Img src={u('photo-1596462502278-27bfdc403348', 1000)} alt="28 South Originals" emoji="💄" /></div>
            <div className="promo-copy">
              <span className="eyebrow dark">Our own label</span>
              <h2>28 South Originals</h2>
              <p>Thoughtfully formulated makeup, skincare and body care at honest prices. Made by 28 SOUTH VENTURES LLP for everyday beauty.</p>
              <Link to={`/brand/${encodeURIComponent('28 South')}`} className="btn shine">Explore Originals</Link>
            </div>
          </Reveal>
        </section>

        <section className="section">
          <Reveal className="section-head"><h2>Featured Brands</h2><Link to="/brands">All brands →</Link></Reveal>
          <div className="brand-strip">
            {spotlight.map((b, i) => (
              <Reveal key={b} delay={i * 40}>
                <Link to={`/brand/${encodeURIComponent(b)}`} className="brand-chip">{b}</Link>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section">
          <Reveal className="section-head"><h2>New Arrivals</h2><Link to="/new">View all →</Link></Reveal>
          <div className="grid">
            {fresh.map((p, i) => <Reveal key={p.id} delay={(i % 4) * 70}><ProductCard p={p} /></Reveal>)}
          </div>
        </section>

        {recentItems.length > 0 && (
          <section className="section">
            <Reveal className="section-head"><h2>Recently Viewed</h2></Reveal>
            <div className="grid six">{recentItems.map((p) => <ProductCard key={p.id} p={p} />)}</div>
          </section>
        )}

        <section className="section">
          <Reveal className="section-head"><h2>Beauty Book</h2><Link to="/blog">Read more →</Link></Reveal>
          <div className="blog-grid">
            {blogPosts.slice(0, 3).map((b, i) => (
              <Reveal key={b.slug} delay={i * 90}>
                <Link to={`/blog/${b.slug}`} className="blog-card">
                  <div className="blog-img"><Img src={b.image} alt={b.title} emoji="📖" /></div>
                  <span className="blog-tag">{b.tag}</span>
                  <h3>{b.title}</h3>
                  <p>{b.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal className="features">
          {services.map((s) => (
            <div className="feature" key={s.title}><span className="ico">{s.ico}</span><div><b>{s.title}</b><small>{s.sub}</small></div></div>
          ))}
        </Reveal>
      </div>
    </>
  );
}
