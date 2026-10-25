import { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/products.js';
import { company, isSet } from '../data/company.js';
import { useStore } from '../context/StoreContext.jsx';
import Logo from './Logo.jsx';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { notify } = useStore();

  const subscribe = (e) => {
    e.preventDefault();
    if (/^\S+@\S+\.\S+$/.test(email)) { notify('Thanks for subscribing!'); setEmail(''); }
    else notify('Please enter a valid email');
  };

  return (
    <>
      <section className="newsletter">
        <div className="container">
          <div>
            <h3>Get 10% off your first order</h3>
            <p>Subscribe for beauty tips, new launches and exclusive offers.</p>
          </div>
          <form className="nl-form" onSubmit={subscribe}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" aria-label="Email" />
            <button type="submit" className="shine">Subscribe</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <Logo light />
              <p>Your destination for authentic makeup, skincare, hair care, fragrance and wellness, delivered to your door.</p>
              <div className="social">
                <a href={company.social.instagram} aria-label="Instagram">IG</a>
                <a href={company.social.facebook} aria-label="Facebook">FB</a>
                <a href={company.social.youtube} aria-label="YouTube">YT</a>
                <a href={company.social.x} aria-label="X">X</a>
              </div>
            </div>
            <div>
              <h5>Categories</h5>
              {categories.map((c) => <Link key={c.slug} to={`/category/${c.slug}`}>{c.name}</Link>)}
            </div>
            <div>
              <h5>Explore</h5>
              <Link to="/brands">All Brands</Link>
              <Link to="/new">New Arrivals</Link>
              <Link to="/offers">Offers &amp; Coupons</Link>
              <Link to="/blog">Beauty Book</Link>
              <Link to="/stores">Store Locator</Link>
            </div>
            <div>
              <h5>Help</h5>
              <Link to="/contact">Contact Us</Link>
              <Link to="/track-order">Track Order</Link>
              <Link to="/faq">FAQs</Link>
              <Link to="/shipping-policy">Shipping Policy</Link>
              <Link to="/return-policy">Returns &amp; Refunds</Link>
            </div>
            <div>
              <h5>Company</h5>
              <Link to="/about">About Us</Link>
              <Link to="/careers">Careers</Link>
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms">Terms &amp; Conditions</Link>
              <Link to="/account">My Account</Link>
            </div>
          </div>

          <div className="pay-row">
            <span>We accept</span>
            {['UPI', 'VISA', 'Mastercard', 'RuPay', 'Net Banking', 'COD'].map((p) => <i key={p}>{p}</i>)}
          </div>

          <div className="copyright">
            <div>© {new Date().getFullYear()} {company.legalName}. All rights reserved.</div>
            <div className="legal-line">
              {company.address}
              {isSet(company.llpin) && <> · LLPIN: {company.llpin}</>}
              {isSet(company.gstin) && <> · GSTIN: {company.gstin}</>}
              {' · '}{company.email}{' · '}{company.phone}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
