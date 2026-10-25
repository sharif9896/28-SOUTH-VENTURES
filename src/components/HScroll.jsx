import { useRef } from 'react';

// Horizontally scrolling row with arrow buttons.
export default function HScroll({ children }) {
  const ref = useRef(null);
  const go = (dir) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: 'smooth' });
  return (
    <div className="hscroll-wrap">
      <button className="hs-arrow l" onClick={() => go(-1)} aria-label="Scroll left">‹</button>
      <div className="hscroll" ref={ref}>{children}</div>
      <button className="hs-arrow r" onClick={() => go(1)} aria-label="Scroll right">›</button>
    </div>
  );
}
