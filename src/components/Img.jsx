import { useEffect, useRef, useState } from 'react';

// Image with fade-in and a graceful fallback if the remote photo fails to load.
export default function Img({ src, alt, emoji = '✨', eager = false, className = '', ...rest }) {
  const ref = useRef(null);
  const [state, setState] = useState('loading'); // loading | ok | fail

  useEffect(() => {
    setState('loading');
    const el = ref.current;
    if (el && el.complete) setState(el.naturalWidth > 0 ? 'ok' : 'fail');
  }, [src]);

  if (state === 'fail') {
    return <div className={`img-fallback ${className}`} role="img" aria-label={alt}><span>{emoji}</span></div>;
  }
  return (
    <img
      ref={ref}
      className={`fade-img ${state === 'ok' ? 'loaded' : ''} ${className}`}
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      onLoad={() => setState('ok')}
      onError={() => setState('fail')}
      {...rest}
    />
  );
}
