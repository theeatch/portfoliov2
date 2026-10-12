/**
 * Hand-drawn vector sprites for the two worlds. Each is a few paths: no
 * images, no filters, so a whole reef or canopy costs a few KB and animates on
 * the compositor (CSS transforms only, see globals.css).
 */

type P = { className?: string; style?: React.CSSProperties };

export const Fish = ({ color = "#7dd3fc", fin = "#38bdf8", className, style }: P & { color?: string; fin?: string }) => (
  <svg viewBox="0 0 100 50" className={className} style={style} aria-hidden>
    <path d="M78 25 L100 8 L96 25 L100 42 Z" fill={fin} />
    <path d="M10 25 C22 4 60 2 80 25 C60 48 22 46 10 25 Z" fill={color} />
    <path d="M30 12 C40 3 52 4 56 10 C46 10 38 12 30 12 Z" fill={fin} opacity="0.85" />
    <path d="M28 25 C40 20 52 20 64 25" stroke="#fff" strokeOpacity="0.35" strokeWidth="2" fill="none" />
    <circle cx="23" cy="22" r="3.2" fill="#06202e" />
    <circle cx="22.2" cy="21.2" r="1" fill="#fff" />
  </svg>
);

export const Jelly = ({ color = "#a5f3fc", className, style }: P & { color?: string }) => (
  <svg viewBox="0 0 60 90" className={className} style={style} aria-hidden>
    <g className="a-pulse" style={{ transformOrigin: "30px 24px", ["--dur" as string]: "3.2s" }}>
      <path d="M6 30 C6 6 54 6 54 30 C54 36 46 34 42 38 C38 34 22 34 18 38 C14 34 6 36 6 30 Z" fill={color} fillOpacity="0.55" stroke={color} strokeOpacity="0.9" />
    </g>
    {[16, 26, 34, 44].map((x, i) => (
      <path key={x} d={`M${x} 38 C${x - 5} 52 ${x + 5} 62 ${x} 80`} stroke={color} strokeOpacity="0.7" strokeWidth="1.6" fill="none" className="a-sway" style={{ ["--dur" as string]: `${4 + i}s`, transformOrigin: `${x}px 38px` }} />
    ))}
  </svg>
);

export const Bird = ({ color = "#0b1d33", className, style }: P & { color?: string }) => (
  <svg viewBox="0 0 40 20" className={className} style={style} aria-hidden>
    <path className="a-flap" style={{ transformOrigin: "20px 12px" }} d="M2 8 C10 2 16 4 20 12 C24 4 30 2 38 8 C30 6 24 8 20 16 C16 8 10 6 2 8 Z" fill={color} />
  </svg>
);

export const Cloud = ({ fill = "#fff", opacity = 0.9, className, style }: P & { fill?: string; opacity?: number }) => (
  <svg viewBox="0 0 200 70" className={className} style={style} aria-hidden>
    <g fill={fill} opacity={opacity}>
      <ellipse cx="60" cy="48" rx="50" ry="18" />
      <ellipse cx="110" cy="40" rx="48" ry="24" />
      <ellipse cx="150" cy="50" rx="40" ry="16" />
      <ellipse cx="88" cy="32" rx="32" ry="20" />
    </g>
  </svg>
);

export const Boat = ({ className, style }: P) => (
  <svg viewBox="0 0 120 100" className={className} style={style} aria-hidden>
    <path d="M58 6 L58 66 L18 66 Z" fill="#f4f9ff" />
    <path d="M64 18 L64 66 L98 66 Z" fill="#cfe8f7" />
    <path d="M8 70 L112 70 L98 90 L22 90 Z" fill="#12315a" />
    <path d="M8 70 L112 70 L110 74 L10 74 Z" fill="#e5484d" />
    <rect x="57" y="2" width="2" height="68" fill="#12315a" />
  </svg>
);

export const Sun = ({ className, style }: P) => (
  <div
    className={className}
    style={{
      ...style,
      borderRadius: "50%",
      background: "radial-gradient(circle, #fff7d6 0%, #ffe9a0 30%, rgba(255,214,120,0.55) 48%, rgba(255,214,120,0) 72%)",
    }}
    aria-hidden
  />
);

export const Leaf = ({ color = "#4ea05f", vein = "#2f7a43", className, style }: P & { color?: string; vein?: string }) => (
  <svg viewBox="0 0 60 90" className={className} style={style} aria-hidden>
    <path d="M30 2 C58 22 58 64 30 88 C2 64 2 22 30 2 Z" fill={color} />
    <path d="M30 6 L30 86 M30 30 L16 20 M30 46 L12 34 M30 62 L16 52 M30 30 L44 20 M30 46 L48 34 M30 62 L44 52" stroke={vein} strokeWidth="1.8" fill="none" opacity="0.7" />
  </svg>
);

export const Butterfly = ({ className, style }: P) => (
  <svg viewBox="0 0 40 30" className={className} style={style} aria-hidden>
    <g className="a-flap" style={{ transformOrigin: "20px 15px", transformBox: "fill-box" }}>
      <ellipse cx="11" cy="11" rx="10" ry="8" fill="#f59e0b" />
      <ellipse cx="29" cy="11" rx="10" ry="8" fill="#f59e0b" />
      <ellipse cx="12" cy="21" rx="7" ry="6" fill="#fbbf24" />
      <ellipse cx="28" cy="21" rx="7" ry="6" fill="#fbbf24" />
    </g>
    <rect x="19" y="6" width="2" height="18" rx="1" fill="#3b2a14" />
  </svg>
);

export const Kelp = ({ color = "#1f8f6b", className, style }: P & { color?: string }) => (
  <svg viewBox="0 0 40 200" className={className} style={style} aria-hidden>
    <path d="M20 200 C8 170 32 150 20 120 C8 90 32 70 20 40 C14 24 22 10 20 0" stroke={color} strokeWidth="9" strokeLinecap="round" fill="none" />
    <path d="M20 160 C34 150 38 140 36 128 M20 110 C6 100 4 88 8 76 M20 70 C32 62 34 52 30 44" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.85" />
  </svg>
);

export const Sub = ({ className, style }: P) => (
  <svg viewBox="0 0 160 70" className={className} style={style} aria-hidden>
    <rect x="70" y="4" width="22" height="16" rx="4" fill="#f5b53d" />
    <rect x="78" y="0" width="3" height="8" fill="#f5b53d" />
    <path d="M8 38 C8 22 40 18 84 18 C128 18 152 26 152 40 C152 54 128 62 84 62 C40 62 8 54 8 38 Z" fill="#f5b53d" />
    <path d="M8 38 C8 22 40 18 84 18 C128 18 152 26 152 40 L8 40 Z" fill="#fcd277" opacity="0.5" />
    <circle cx="48" cy="38" r="7" fill="#06202e" stroke="#c98a1a" strokeWidth="3" />
    <circle cx="76" cy="38" r="7" fill="#06202e" stroke="#c98a1a" strokeWidth="3" />
    <circle cx="104" cy="38" r="7" fill="#06202e" stroke="#c98a1a" strokeWidth="3" />
    <circle cx="48" cy="38" r="3" fill="#7dd3fc" opacity="0.8" />
    <circle cx="76" cy="38" r="3" fill="#7dd3fc" opacity="0.8" />
    <circle cx="104" cy="38" r="3" fill="#7dd3fc" opacity="0.8" />
    <path d="M8 38 L-4 28 L-4 48 Z" fill="#c98a1a" />
    <g className="a-flap" style={{ transformOrigin: "-8px 38px", transformBox: "fill-box" }}>
      <ellipse cx="-8" cy="38" rx="3" ry="14" fill="#8a5a10" />
    </g>
  </svg>
);

/** a tiny green shoot for the forest loader */
export const Sprout = ({ className, style }: P) => (
  <svg viewBox="0 0 80 100" className={className} style={style} aria-hidden>
    <path d="M40 98 C40 70 40 56 40 40" stroke="#4d7c0f" strokeWidth="5" strokeLinecap="round" fill="none" />
    <path d="M40 54 C16 56 6 40 8 22 C28 20 40 32 40 54 Z" fill="#4ea05f" />
    <path d="M40 40 C64 42 74 26 72 8 C52 6 40 18 40 40 Z" fill="#6cc070" />
  </svg>
);
