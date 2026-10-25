import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { heroSlides } from '../data/content.js';

export default function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = heroSlides.length;

  useEffect(() => {
    if (paused) return undefined;
    const t = setInterval(() => setI((x) => (x + 1) % n), 5500);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <section className="hero" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="hero-stage">
        {heroSlides.map((s, idx) => (
          <div key={s.id} className={`hero-slide ${idx === i ? 'active' : ''}`} style={{ '--c': s.color }} aria-hidden={idx !== i}>
            <img src={s.image} alt="" onError={(e) => (e.currentTarget.style.display = 'none')} />
            <div className="container">
              <div className="hero-copy">
                <span className="eyebrow">{s.eyebrow}</span>
                <h2>{s.title}</h2>
                <p>{s.sub}</p>
                <Link to={s.to} className="btn shine">{s.cta}</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="hero-arrow l" onClick={() => setI((i - 1 + n) % n)} aria-label="Previous slide">‹</button>
      <button className="hero-arrow r" onClick={() => setI((i + 1) % n)} aria-label="Next slide">›</button>
      <div className="hero-dots">
        {heroSlides.map((s, idx) => (
          <button key={s.id} className={idx === i ? 'on' : ''} onClick={() => setI(idx)} aria-label={`Go to slide ${idx + 1}`} />
        ))}
      </div>
    </section>
  );
}
