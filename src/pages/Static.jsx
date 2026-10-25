import { useState } from 'react';
import { Link } from 'react-router-dom';
import { company, isSet } from '../data/company.js';
import { faqs, services } from '../data/content.js';
import { policies } from '../data/policies.js';
import { useStore } from '../context/StoreContext.jsx';
import Reveal from '../components/Reveal.jsx';
import Img from '../components/Img.jsx';
import { u } from '../data/img.js';

const Crumb = ({ label }) => <div className="crumbs"><Link to="/">Home</Link> / {label}</div>;
const Banner = ({ title, text, emoji }) => (
  <div className="cat-banner"><div><h1>{title}</h1><p>{text}</p></div><span className="cat-emoji" aria-hidden="true">{emoji}</span></div>
);

export function About() {
  const values = [
    ['✨', 'Authenticity first', 'We source only from brands and authorised distributors so every product is genuine.'],
    ['🌿', 'Care for skin', 'We favour gentle, well-tested formulas and clear ingredient information.'],
    ['💛', 'Honest pricing', 'Fair prices and transparent offers, with no confusing fine print.'],
    ['🚚', 'Reliable delivery', 'Careful packing and dependable shipping across India.'],
  ];
  return (
    <div className="container">
      <Crumb label="About Us" />
      <Banner title="About 28 South" text={`${company.brand} is the beauty and personal care destination operated by ${company.legalName}.`} emoji="💗" />
      <section className="about-grid">
        <Reveal>
          <h2>Our story</h2>
          <p>{company.brand} was created with a simple idea: shopping for beauty should be easy, trustworthy and a little bit joyful. We bring together makeup, skincare, hair care, fragrance, bath and body, men's grooming and wellness in one place.</p>
          <p>Behind the store is {company.legalName}, a limited liability partnership focused on building modern consumer brands and retail experiences. We combine well-loved third-party brands with our own label, 28 South Originals.</p>
          <div className="about-cta"><Link to="/category/makeup" className="btn shine">Start shopping</Link><Link to="/contact" className="btn outline">Get in touch</Link></div>
        </Reveal>
        <Reveal delay={120} className="about-img"><Img src={u('photo-1596462502278-27bfdc403348', 1000)} alt="Beauty products" emoji="💄" /></Reveal>
      </section>
      <section className="section">
        <Reveal className="section-head"><h2>What we stand for</h2></Reveal>
        <div className="values">
          {values.map(([ico, t, d], i) => <Reveal key={t} delay={i * 80} className="value"><span>{ico}</span><h4>{t}</h4><p>{d}</p></Reveal>)}
        </div>
      </section>
      <Reveal className="features">
        {services.map((s) => <div className="feature" key={s.title}><span className="ico">{s.ico}</span><div><b>{s.title}</b><small>{s.sub}</small></div></div>)}
      </Reveal>
      <p className="legal-note">{company.legalName}{isSet(company.llpin) && <> · LLPIN {company.llpin}</>}{isSet(company.gstin) && <> · GSTIN {company.gstin}</>} · {company.address}</p>
    </div>
  );
}

export function Contact() {
  const { notify } = useStore();
  const [f, setF] = useState({ name: '', email: '', phone: '', topic: 'Order help', message: '' });
  const [err, setErr] = useState({});
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const x = {};
    if (f.name.trim().length < 2) x.name = 'Enter your name';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = 'Enter a valid email';
    if (f.message.trim().length < 10) x.message = 'Please write at least 10 characters';
    setErr(x);
    if (Object.keys(x).length) return;
    notify('Thanks! We will get back to you soon.');
    setF({ name: '', email: '', phone: '', topic: 'Order help', message: '' });
  };

  const cards = [['✉️', 'Email', company.email], ['📞', 'Phone', company.phone], ['🕘', 'Hours', company.hours], ['📍', 'Registered office', company.address]];
  return (
    <div className="container">
      <Crumb label="Contact Us" />
      <Banner title="Contact Us" text="Questions about an order, a product or anything else? We are happy to help." emoji="💬" />
      <div className="contact-grid">
        <div className="contact-cards">
          {cards.map(([ico, t, v], i) => <Reveal key={t} delay={i * 70} className="c-card"><span>{ico}</span><div><b>{t}</b><p>{v}</p></div></Reveal>)}
        </div>
        <form className="box box-pad" onSubmit={submit} noValidate>
          <h3 className="box-title">Send us a message</h3>
          <div className="form-grid">
            <div className="field"><label>Name</label><input value={f.name} onChange={set('name')} />{err.name && <div className="err">{err.name}</div>}</div>
            <div className="field"><label>Email</label><input type="email" value={f.email} onChange={set('email')} />{err.email && <div className="err">{err.email}</div>}</div>
            <div className="field"><label>Phone (optional)</label><input value={f.phone} onChange={set('phone')} inputMode="numeric" maxLength={10} /></div>
            <div className="field"><label>Topic</label>
              <select className="sort block" value={f.topic} onChange={set('topic')}>
                {['Order help', 'Returns & refunds', 'Product question', 'Partnerships', 'Other'].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="field full"><label>Message</label><textarea rows={5} value={f.message} onChange={set('message')} />{err.message && <div className="err">{err.message}</div>}</div>
            <div className="full"><button className="btn shine" type="submit">Send message</button></div>
          </div>
        </form>
      </div>
    </div>
  );
}

export function Careers() {
  const perks = ['Learning budget', 'Flexible work', 'Product discounts', 'Health cover', 'Friendly team'];
  return (
    <div className="container">
      <Crumb label="Careers" />
      <Banner title="Build beauty with us" text={`Join the team at ${company.legalName} and help shape how India shops for beauty.`} emoji="🚀" />
      <section className="section">
        <Reveal className="section-head"><h2>Why work with us</h2></Reveal>
        <div className="pills big static">{perks.map((p) => <span key={p}>{p}</span>)}</div>
      </section>
      <section className="section">
        <Reveal className="section-head"><h2>Open positions</h2></Reveal>
        {company.roles.length ? (
          <div className="roles">
            {company.roles.map((r, i) => (
              <Reveal key={r.title} delay={i * 80} className="role">
                <div><h4>{r.title}</h4><p>{r.blurb}</p><small>{r.type} · {r.place}</small></div>
                <a className="btn outline" href={`mailto:${company.email}?subject=${encodeURIComponent('Application: ' + r.title)}`}>Apply</a>
              </Reveal>
            ))}
          </div>
        ) : <div className="empty small"><p>No openings right now. Send your resume to {company.email}.</p></div>}
      </section>
    </div>
  );
}

export function Faq() {
  const groups = [...new Set(faqs.map((f) => f.group))];
  const [g, setG] = useState('All');
  const [open, setOpen] = useState(0);
  const list = faqs.filter((f) => g === 'All' || f.group === g);
  return (
    <div className="container narrow">
      <Crumb label="FAQs" />
      <Banner title="Help & FAQs" text="Quick answers to the questions we hear most." emoji="❓" />
      <div className="pills">
        {['All', ...groups].map((x) => <button key={x} className={g === x ? 'on' : ''} onClick={() => { setG(x); setOpen(0); }}>{x}</button>)}
      </div>
      <div className="faq">
        {list.map((f, i) => (
          <div key={f.q} className={`faq-item ${open === i ? 'open' : ''}`}>
            <button onClick={() => setOpen(open === i ? -1 : i)}>{f.q}<span>＋</span></button>
            <div className="faq-a"><div><p>{f.a}</p></div></div>
          </div>
        ))}
      </div>
      <p className="center muted" style={{ margin: '28px 0' }}>Still need help? <Link to="/contact" className="link-btn">Contact us</Link></p>
    </div>
  );
}

export function Policy({ kind }) {
  const pol = policies[kind];
  const links = [['shipping', '/shipping-policy', 'Shipping'], ['returns', '/return-policy', 'Returns'], ['privacy', '/privacy-policy', 'Privacy'], ['terms', '/terms', 'Terms']];
  return (
    <div className="container">
      <Crumb label={pol.title} />
      <div className="policy">
        <aside className="policy-nav">
          {links.map(([k, to, l]) => <Link key={k} to={to} className={k === kind ? 'on' : ''}>{l}</Link>)}
        </aside>
        <article>
          <h1>{pol.title}</h1>
          <small>Last updated: {pol.updated}</small>
          {pol.sections.map((s) => (
            <Reveal key={s.h} className="pol-sec">
              <h3>{s.h}</h3>
              {s.p.map((t, i) => <p key={i}>{t}</p>)}
            </Reveal>
          ))}
          <p className="muted">{company.legalName}{isSet(company.llpin) && <> · LLPIN {company.llpin}</>} · {company.address}</p>
        </article>
      </div>
    </div>
  );
}

export function Stores() {
  const [q, setQ] = useState('');
  const list = company.stores.filter((s) => `${s.city} ${s.name} ${s.address}`.toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <div className="container">
      <Crumb label="Store Locator" />
      <Banner title="Store Locator" text="Visit us in person. Find your nearest 28 South store." emoji="📍" />
      <div className="brand-tools"><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by city" aria-label="Search stores" /></div>
      {list.length ? (
        <div className="store-grid">
          {list.map((s, i) => (
            <Reveal key={s.city} delay={i * 80} className="store">
              <span className="pin">📍</span>
              <h4>{s.city}</h4><b>{s.name}</b>
              <p>{s.address}</p>
              <small>{s.phone} · {s.hours}</small>
            </Reveal>
          ))}
        </div>
      ) : <div className="empty small"><p>No stores found. We also deliver across India. <Link to="/" className="link-btn">Shop online</Link></p></div>}
    </div>
  );
}
