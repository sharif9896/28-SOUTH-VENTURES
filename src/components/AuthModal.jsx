import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import Logo from './Logo.jsx';

const DEMO_OTP = '123456';

// Mobile + OTP sign in. Demo only: no SMS is sent and accounts live in this browser's localStorage.
export default function AuthModal() {
  const { authOpen, authRedirect, closeAuth, login, notify } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState('phone'); // phone | otp | name
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    if (!authOpen) { setStep('phone'); setPhone(''); setOtp(''); setName(''); setErr(''); }
  }, [authOpen]);

  useEffect(() => {
    if (!authOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && closeAuth();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [authOpen, closeAuth]);

  if (!authOpen) return null;

  const finish = (result) => {
    if (result === 'need-name') { setStep('name'); return; }
    notify('Signed in successfully');
    closeAuth();
    if (authRedirect) navigate(authRedirect);
  };

  const sendOtp = (e) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(phone)) { setErr('Enter a valid 10-digit mobile number'); return; }
    setErr(''); setStep('otp');
  };
  const verify = (e) => {
    e.preventDefault();
    if (otp !== DEMO_OTP) { setErr('Incorrect OTP. Use the demo OTP shown below.'); return; }
    setErr(''); finish(login(phone));
  };
  const saveName = (e) => {
    e.preventDefault();
    if (name.trim().length < 2) { setErr('Please enter your name'); return; }
    setErr(''); finish(login(phone, name.trim()));
  };

  return (
    <div className="modal-bg" onClick={closeAuth}>
      <div className="modal auth" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Sign in">
        <button className="modal-x" onClick={closeAuth} aria-label="Close">✕</button>
        <div className="auth-art">
          <Logo light />
          <h3>Welcome to 28 South</h3>
          <p>Sign in for faster checkout, order tracking and your saved wishlist.</p>
        </div>
        <div className="auth-form">
          {step === 'phone' && (
            <form onSubmit={sendOtp}>
              <h4>Sign in or Sign up</h4>
              <label>Mobile number</label>
              <div className="phone-in"><span>+91</span><input autoFocus inputMode="numeric" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} placeholder="10-digit number" /></div>
              {err && <div className="err">{err}</div>}
              <button className="btn block shine" type="submit">Send OTP</button>
              <small className="muted">By continuing you agree to our Terms &amp; Privacy Policy.</small>
            </form>
          )}
          {step === 'otp' && (
            <form onSubmit={verify}>
              <h4>Verify OTP</h4>
              <p className="muted">Enter the OTP for +91 {phone} <button type="button" className="link-btn" onClick={() => { setStep('phone'); setOtp(''); setErr(''); }}>Change</button></p>
              <input autoFocus inputMode="numeric" maxLength={6} className="otp-in" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} placeholder="••••••" />
              {err && <div className="err">{err}</div>}
              <button className="btn block shine" type="submit">Verify &amp; Continue</button>
              <small className="demo-note">Demo mode: use OTP <b>{DEMO_OTP}</b>. No SMS is sent.</small>
            </form>
          )}
          {step === 'name' && (
            <form onSubmit={saveName}>
              <h4>Almost there</h4>
              <p className="muted">Tell us your name to finish creating your account.</p>
              <input autoFocus className="text-in" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
              {err && <div className="err">{err}</div>}
              <button className="btn block shine" type="submit">Create account</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
