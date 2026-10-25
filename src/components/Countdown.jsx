import { useEffect, useState } from 'react';

const endOfDay = () => { const d = new Date(); d.setHours(23, 59, 59, 999); return d.getTime(); };
const two = (n) => String(n).padStart(2, '0');

export default function Countdown() {
  const [left, setLeft] = useState(() => endOfDay() - Date.now());
  useEffect(() => {
    const t = setInterval(() => setLeft(Math.max(0, endOfDay() - Date.now())), 1000);
    return () => clearInterval(t);
  }, []);
  const s = Math.floor(left / 1000);
  const parts = [['HRS', two(Math.floor(s / 3600))], ['MIN', two(Math.floor((s % 3600) / 60))], ['SEC', two(s % 60)]];
  return (
    <div className="countdown" aria-label="Time left in today's deals">
      {parts.map(([label, v]) => (
        <div key={label}><b key={v} className="tick-num">{v}</b><small>{label}</small></div>
      ))}
    </div>
  );
}
