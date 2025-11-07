export default function Logo({ size = 22 }) {
  return (
    <div className="logo" aria-label="Vibe Commerce">
      <svg width={size*1.4} height={size} viewBox="0 0 140 100" role="img">
        <defs>
          <linearGradient id="vibe" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="currentColor" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <path d="M8 70 L30 20 L52 70 L74 20 L96 70" fill="none" stroke="url(#vibe)" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span>Vibe <b>Commerce</b></span>
      <style>{`
        .logo {
          display:flex; align-items:center; gap:10px; font-weight:700; letter-spacing:.2px;
        }
        .logo span { font-size: clamp(16px, 2.2vw, 20px); }
      `}</style>
    </div>
  );
}
