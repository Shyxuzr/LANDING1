/**
 * Technical-drawing registry.
 * Every product family gets stylised SVG elevations drawn inline — no images,
 * nothing to break. All "card" drawings share a 240×160 drafting-sheet canvas
 * with a blueprint grid and a dimension callout.
 */
import { useId } from "react";

export type Family =
  | "chajja"
  | "jali"
  | "cornice"
  | "column"
  | "dome"
  | "balustrade"
  | "tank"
  | "facade"
  | "door"
  | "planter";

/* ---------- shared card frame ---------- */
function Frame({
  children,
  dim,
  uid,
}: {
  children: React.ReactNode;
  dim: string;
  uid: string;
}) {
  return (
    <svg
      viewBox="0 0 240 160"
      role="img"
      aria-label={`${dim} — technical drawing`}
      className="w-full fill-none text-navy-800 transition-colors duration-500 group-hover:text-accent-400"
    >
      <defs>
        <pattern id={`${uid}g`} width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" stroke="currentColor" strokeOpacity="0.13" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="240" height="160" fill={`url(#${uid}g)`} />
      {children}
      {/* dimension line */}
      <g className="text-steel-400 transition-colors duration-500 group-hover:text-accent-300">
        <line x1="34" y1="148" x2="206" y2="148" stroke="currentColor" strokeWidth="1" />
        <path d="M40 144.5 34 148l6 3.5" stroke="currentColor" strokeWidth="1" />
        <path d="M200 144.5 206 148l-6 3.5" stroke="currentColor" strokeWidth="1" />
        <text x="120" y="142" textAnchor="middle" fontSize="7" letterSpacing="1.6" fontFamily="IBM Plex Mono, monospace" fill="currentColor">
          {dim}
        </text>
      </g>
    </svg>
  );
}

/* ---------- FRP CHAJJAS ---------- */
function Chajja({ v }: { v: string }) {
  return (
    <g stroke="currentColor" strokeLinejoin="round">
      <defs />
      <g strokeWidth="1.5">
        <pattern id="wallh" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
        </pattern>
      </g>
      <rect x="16" y="16" width="18" height="112" fill="url(#wallh)" strokeWidth="1.5" />
      <line x1="34" y1="16" x2="34" y2="128" strokeWidth="2.5" />
      {v === "plain" && (
        <g strokeWidth="2">
          <rect x="34" y="58" width="172" height="10" />
          <path d="M54 68v26l26-26M150 68v26l26-26" />
        </g>
      )}
      {v === "sloped" && (
        <g strokeWidth="2">
          <path d="M34 52 206 80v10L34 62Z" />
          <line x1="34" y1="24" x2="190" y2="78" strokeWidth="1.5" />
          <circle cx="34" cy="24" r="3" strokeWidth="1.5" />
        </g>
      )}
      {v === "curved" && (
        <path d="M34 82C90 32 152 32 206 68v10C152 44 92 44 34 92Z" strokeWidth="2" />
      )}
      {v === "decorative" && (
        <g strokeLinecap="round">
          <rect x="34" y="54" width="172" height="9" strokeWidth="2" />
          <path
            d="M206 63a8.6 8.6 0 0 1-17.2 0 8.6 8.6 0 0 1-17.2 0 8.6 8.6 0 0 1-17.2 0 8.6 8.6 0 0 1-17.2 0 8.6 8.6 0 0 1-17.2 0 8.6 8.6 0 0 1-17.2 0 8.6 8.6 0 0 1-17.2 0 8.6 8.6 0 0 1-17.2 0 8.6 8.6 0 0 1-17.2 0 8.6 8.6 0 0 1-17.2 0"
            strokeWidth="1.5"
          />
          <path d="M62 63v26q0 6 6 6h6M178 63v26q0 6-6 6h-6" strokeWidth="1.8" />
          <circle cx="77" cy="95" r="3" strokeWidth="1.5" />
          <circle cx="163" cy="95" r="3" strokeWidth="1.5" />
        </g>
      )}
    </g>
  );
}

/* ---------- GRC JALI PANELS ---------- */
function Jali({ v, uid }: { v: string; uid: string }) {
  const pid = `${uid}p`;
  const tile = (() => {
    switch (v) {
      case "basket":
        return {
          w: 40,
          h: 40,
          node: (
            <g strokeWidth="2">
              <rect x="2" y="3" width="17" height="7" rx="3.5" />
              <rect x="21" y="21" width="7" height="17" rx="3.5" />
            </g>
          ),
        };
      case "star":
        return {
          w: 44,
          h: 44,
          node: (
            <g strokeWidth="1.8">
              <path d="M22 6 25.5 18.5 38 22 25.5 25.5 22 38 18.5 25.5 6 22 18.5 18.5Z" />
              <circle cx="22" cy="22" r="3" />
            </g>
          ),
        };
      case "maze":
        return {
          w: 30,
          h: 30,
          node: <path d="M4 26V4h22v16H12v-8h8" strokeWidth="2.4" />,
        };
      case "leaf":
        return {
          w: 34,
          h: 34,
          node: (
            <g strokeWidth="1.7">
              <circle cx="17" cy="9" r="6" />
              <circle cx="25" cy="17" r="6" />
              <circle cx="17" cy="25" r="6" />
              <circle cx="9" cy="17" r="6" />
            </g>
          ),
        };
      case "brick":
        return {
          w: 44,
          h: 24,
          node: (
            <g strokeWidth="1.6">
              <rect x="1" y="2" width="20" height="8" />
              <rect x="23" y="2" width="20" height="8" />
              <rect x="-10" y="14" width="20" height="8" />
              <rect x="12" y="14" width="20" height="8" />
              <rect x="34" y="14" width="20" height="8" />
              <circle cx="22" cy="12" r="2.2" />
            </g>
          ),
        };
      default:
        return { w: 10, h: 10, node: <path d="M0 10 10 0" strokeOpacity="0.15" strokeWidth="1" /> };
    }
  })();

  return (
    <g>
      <defs>
        <pattern id={pid} width={tile.w} height={tile.h} patternUnits="userSpaceOnUse">
          {tile.node}
        </pattern>
      </defs>
      <rect x="22" y="14" width="196" height="112" strokeWidth="2.2" stroke="currentColor" />
      <rect x="30" y="22" width="180" height="96" fill={`url(#${pid})`} stroke="currentColor" strokeWidth="1" />
      {v === "custom" && (
        <g stroke="currentColor" strokeWidth="1.6" strokeDasharray="5 5">
          <rect x="60" y="40" width="120" height="60" />
          <path d="M120 58v24M108 70h24" strokeDasharray="none" strokeWidth="2.2" />
        </g>
      )}
    </g>
  );
}

/* ---------- GRC CORNICES ---------- */
function Cornice({ v, uid }: { v: string; uid: string }) {
  return (
    <g stroke="currentColor" strokeLinejoin="round">
      <defs>
        <pattern id={`${uid}w`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="16" y="14" width="18" height="114" fill={`url(#${uid}w)`} strokeWidth="1.5" />
      <line x1="34" y1="14" x2="34" y2="128" strokeWidth="2.5" />
      {v === "classical" && (
        <g strokeWidth="2">
          <path d="M34 26H146v24H62" />
          <path d="M34 26c22 0 26 8 28 14 2 6 8 10 22 10" strokeWidth="1.8" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect key={i} x={68 + i * 10} y={56} width="6" height="8" strokeWidth="1.4" />
          ))}
          <line x1="62" y1="70" x2="146" y2="70" strokeWidth="1.4" />
        </g>
      )}
      {v === "decorative" && (
        <g strokeWidth="2">
          <path d="M34 24H142" />
          <path d="M142 24c-6 8-6 14 0 20v6" strokeWidth="1.8" />
          <path
            d="M142 50a8 8 0 0 1-16 0 8 8 0 0 1-16 0 8 8 0 0 1-16 0 8 8 0 0 1-16 0 8 8 0 0 1-16 0 8 8 0 0 1-16 0"
            strokeWidth="1.5"
          />
          <path d="M34 24c16 0 20 6 22 12 2 6 6 10 14 12" strokeWidth="1.6" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <circle key={i} cx={70 + i * 11} cy={46} r="1.6" strokeWidth="1.2" />
          ))}
        </g>
      )}
      {v === "layered" && (
        <g strokeWidth="2">
          <rect x="34" y="30" width="68" height="12" />
          <rect x="34" y="46" width="94" height="12" />
          <rect x="34" y="62" width="118" height="12" />
          <line x1="34" y1="78" x2="152" y2="78" strokeWidth="1.2" />
        </g>
      )}
      {v === "simple" && (
        <g strokeWidth="2">
          <path d="M34 38h102c10 0 14 4 14 10s-4 10-14 10H34" />
          <line x1="136" y1="62" x2="136" y2="70" strokeWidth="1.4" />
        </g>
      )}
    </g>
  );
}

/* ---------- GRC COLUMNS (compact landscape elevations) ---------- */
function Column({ v }: { v: string }) {
  const flutes = [110, 115, 120, 125, 130].map((x, i) => (
    <line key={x} x1={x} y1={64} x2={x - 2.5 + i * 0} y2={124} strokeWidth="1" />
  ));
  const base = (
    <g strokeWidth="1.8">
      <path d="M102 124c-6 5-6 8 0 12h36c6-4 6-7 0-12" />
      <rect x="94" y="136" width="52" height="8" strokeWidth="1.6" />
    </g>
  );
  return (
    <g stroke="currentColor" strokeLinejoin="round">
      <line x1="44" y1="144" x2="196" y2="144" strokeWidth="2.2" />
      {v === "doric" && (
        <g strokeWidth="2">
          <rect x="98" y="16" width="44" height="8" />
          <path d="M104 34c-3-4-5-7-6-10h44c-1 3-3 6-6 10Z" />
          <line x1="106" y1="38" x2="134" y2="38" strokeWidth="1.2" />
          <path d="M106 42c-2 30-3 55-3 82h34c0-27-1-52-3-82" />
          {flutes}
          <rect x="100" y="124" width="40" height="20" strokeWidth="1.6" />
        </g>
      )}
      {v === "tuscan" && (
        <g strokeWidth="2">
          <rect x="100" y="18" width="40" height="7" />
          <path d="M105 38c-2-5-3-8-5-13h40c-2 5-3 8-5 13Z" />
          <line x1="105" y1="42" x2="135" y2="42" strokeWidth="1.2" />
          <line x1="105" y1="46" x2="135" y2="46" strokeWidth="1.2" />
          <path d="M105 46c-2 28-3 52-3 78h36c0-26-1-50-3-78" />
          {base}
        </g>
      )}
      {v === "ionic" && (
        <g strokeWidth="1.8">
          <rect x="100" y="14" width="40" height="6" strokeWidth="2" />
          <path d="M96 30a7 7 0 1 1 14 0 4.3 4.3 0 1 1-8.9 0 1.9 1.9 0 1 1 3 0" />
          <path d="M130 30a7 7 0 1 1 14 0 4.3 4.3 0 1 1-8.9 0 1.9 1.9 0 1 1 3 0" />
          {[108, 114.7, 121.4, 128].map((x) => (
            <ellipse key={x} cx={x} cy={38} rx="2" ry="3" strokeWidth="1.2" />
          ))}
          <line x1="104" y1="44" x2="136" y2="44" strokeWidth="1.2" />
          <path d="M106 48c-2 26-3 50-3 76h34c0-26-1-50-3-76" strokeWidth="2" />
          {flutes}
          {base}
        </g>
      )}
      {v === "corinthian" && (
        <g strokeWidth="1.8">
          <path d="M98 14h44c-1 4-2 7-3 9h-38c-1-2-2-5-3-9Z" strokeWidth="2" />
          <circle cx="104" cy="30" r="4.5" />
          <circle cx="136" cy="30" r="4.5" />
          <path d="M104 44q4-8 8 0t8 0t8 0t8 0" strokeWidth="1.4" />
          <path d="M102 56q5-10 10 0t10 0t10 0t10 0" strokeWidth="1.4" />
          <line x1="104" y1="60" x2="136" y2="60" strokeWidth="1.2" />
          <path d="M106 62c-2 22-3 42-3 62h34c0-20-1-40-3-62" strokeWidth="2" />
          {flutes}
          {base}
        </g>
      )}
      {v === "roman" && (
        <g strokeWidth="1.8">
          <rect x="98" y="16" width="44" height="8" strokeWidth="2" />
          <path d="M103 40c-2-5-4-9-5-16h44c-1 7-3 11-5 16Z" strokeWidth="2" />
          {[108, 114, 120, 126, 132].map((x) => (
            <circle key={x} cx={x} cy={32} r="1.8" strokeWidth="1.2" />
          ))}
          <line x1="105" y1="44" x2="135" y2="44" strokeWidth="1.2" />
          <path d="M105 48c-2 26-3 50-3 76h36c0-26-1-50-3-76" strokeWidth="2" />
          {flutes}
          {base}
        </g>
      )}
      {v === "composite" && (
        <g strokeWidth="1.8">
          <path d="M98 12h44c-1 4-2 7-3 9h-38c-1-2-2-5-3-9Z" strokeWidth="2" />
          <path d="M93 28a8 8 0 1 1 16 0 5 5 0 1 1-10.3 0 2.2 2.2 0 1 1 3.4 0" />
          <path d="M131 28a8 8 0 1 1 16 0 5 5 0 1 1-10.3 0 2.2 2.2 0 1 1 3.4 0" />
          <path d="M104 44q4-8 8 0t8 0t8 0t8 0" strokeWidth="1.4" />
          <path d="M102 56q5-10 10 0t10 0t10 0t10 0" strokeWidth="1.4" />
          <line x1="104" y1="60" x2="136" y2="60" strokeWidth="1.2" />
          <path d="M106 62c-2 22-3 42-3 62h34c0-20-1-40-3-62" strokeWidth="2" />
          {flutes}
          {base}
        </g>
      )}
    </g>
  );
}

/* ---------- FRP DOMES ---------- */
function Dome({ v }: { v: string }) {
  return (
    <g stroke="currentColor" strokeLinejoin="round" strokeWidth="2">
      <line x1="44" y1="128" x2="196" y2="128" strokeWidth="2.2" />
      {v === "hemispherical" && (
        <g>
          <path d="M70 116a50 50 0 0 1 100 0" />
          <path d="M120 66v50M95 73c-4 14-6 28-6 43M145 73c4 14 6 28 6 43" strokeWidth="1.4" />
          <rect x="64" y="116" width="112" height="12" />
          <line x1="120" y1="66" x2="120" y2="56" strokeWidth="1.6" />
          <circle cx="120" cy="52" r="3" strokeWidth="1.4" />
        </g>
      )}
      {v === "onion" && (
        <g>
          <path d="M120 52c4 10 26 22 26 46 0 12-10 18-26 18s-26-6-26-18c0-24 22-36 26-46Z" />
          <path d="M120 56v60M104 84c-2 8-3 18-2 32M136 84c2 8 3 18 2 32" strokeWidth="1.4" />
          <rect x="88" y="116" width="64" height="12" />
          <line x1="120" y1="52" x2="120" y2="42" strokeWidth="1.6" />
          <circle cx="120" cy="38" r="3" strokeWidth="1.4" />
        </g>
      )}
      {v === "segmental" && (
        <g>
          <path d="M64 116a76 76 0 0 1 112 0" />
          {[84, 102, 120, 138, 156].map((x) => (
            <line key={x} x1={x} y1={116 - Math.sqrt(Math.max(0, 56 * 56 - (x - 120) * (x - 120))) + 20} x2={x} y2="116" strokeWidth="1.3" />
          ))}
          <rect x="58" y="116" width="124" height="12" />
        </g>
      )}
      {v === "lowprofile" && (
        <g>
          <path d="M60 116a120 120 0 0 1 120 0" />
          {[80, 100, 120, 140, 160].map((x) => (
            <line key={x} x1={x} y1={116 - Math.sqrt(Math.max(0, 14400 - (x - 120) * (x - 120))) * 0.28} x2={x} y2="116" strokeWidth="1.3" />
          ))}
          <rect x="54" y="116" width="132" height="12" />
          <line x1="70" y1="106" x2="170" y2="106" strokeWidth="1.2" />
        </g>
      )}
    </g>
  );
}

/* ---------- GRC BALUSTRADES ---------- */
function Balustrade({ v }: { v: string }) {
  const baluster = (x: number) => (
    <path
      key={x}
      d={`M${x} 50h12v8c-4 3-4 8 0 11v6c-5 3-5 10 0 13v8h-12v-8c5-3 5-10 0-13v-6c4-3 4-8 0-11Z`}
      strokeWidth="1.7"
    />
  );
  return (
    <g stroke="currentColor" strokeLinejoin="round" strokeWidth="2">
      <line x1="44" y1="128" x2="196" y2="128" strokeWidth="2.2" />
      {v === "classic" && (
        <g>
          <rect x="46" y="34" width="148" height="8" />
          <rect x="46" y="42" width="148" height="4" strokeWidth="1.2" />
          {[56, 82, 108, 134, 160].map(baluster)}
          <rect x="46" y="98" width="148" height="8" />
          <rect x="40" y="106" width="20" height="22" />
          <rect x="180" y="106" width="20" height="22" />
        </g>
      )}
      {v === "panel" && (
        <g>
          <rect x="46" y="36" width="148" height="9" />
          <rect x="40" y="30" width="18" height="98" />
          <rect x="182" y="30" width="18" height="98" />
          <rect x="64" y="54" width="52" height="60" strokeWidth="1.6" />
          <circle cx="90" cy="84" r="14" strokeWidth="1.4" />
          <rect x="124" y="54" width="52" height="60" strokeWidth="1.6" />
          <circle cx="150" cy="84" r="14" strokeWidth="1.4" />
          <rect x="46" y="118" width="148" height="10" />
        </g>
      )}
      {v === "modern" && (
        <g>
          <rect x="46" y="36" width="148" height="7" />
          {[56, 74, 92, 110, 128, 146, 164, 182].map((x) => (
            <rect key={x} x={x} y="43" width="6" height="75" strokeWidth="1.5" />
          ))}
          <rect x="46" y="118" width="148" height="10" />
        </g>
      )}
      {v === "plinth" && (
        <g>
          <rect x="40" y="40" width="160" height="12" />
          <line x1="40" y1="56" x2="200" y2="56" strokeWidth="1.2" />
          {[48, 92, 136, 180].map((x) => (
            <rect key={x} x={x} y="60" width="32" height="56" strokeWidth="1.6" />
          ))}
          {[54, 98, 142, 186].map((x) => (
            <rect key={x} x={x} y="68" width="20" height="40" strokeWidth="1.1" />
          ))}
        </g>
      )}
    </g>
  );
}

/* ---------- FRP WATER TANKS ---------- */
function Tank({ v }: { v: string }) {
  return (
    <g stroke="currentColor" strokeLinejoin="round" strokeWidth="2">
      <line x1="44" y1="132" x2="196" y2="132" strokeWidth="2.2" />
      {v === "vertical" && (
        <g>
          <ellipse cx="120" cy="34" rx="44" ry="12" />
          <path d="M76 34v76c0 7 20 12 44 12s44-5 44-12V34" />
          {[58, 82, 102].map((y) => (
            <path key={y} d={`M76 ${y}c0 6 20 11 44 11s44-5 44-11`} strokeWidth="1.2" />
          ))}
          <ellipse cx="120" cy="34" rx="14" ry="4" strokeWidth="1.4" />
          <line x1="164" y1="110" x2="178" y2="110" strokeWidth="1.6" />
          <line x1="178" y1="110" x2="178" y2="132" strokeWidth="1.6" />
        </g>
      )}
      {v === "horizontal" && (
        <g>
          <path d="M84 46h72c14 0 24 14 24 30s-10 30-24 30H84" />
          <ellipse cx="84" cy="76" rx="16" ry="30" />
          <ellipse cx="84" cy="76" rx="6" ry="12" strokeWidth="1.3" />
          <path d="M70 106h100" strokeWidth="1.4" />
          <path d="M78 106v26M162 106v26" strokeWidth="1.6" />
        </g>
      )}
      {v === "loft" && (
        <g>
          <rect x="70" y="40" width="100" height="80" rx="8" />
          <line x1="70" y1="54" x2="170" y2="54" strokeWidth="1.4" />
          {[62, 82, 102].map((y) => (
            <line key={y} x1="86" y1={y} x2="154" y2={y} strokeWidth="1.1" />
          ))}
          <circle cx="160" cy="47" r="3" strokeWidth="1.3" />
          <line x1="170" y1="106" x2="186" y2="106" strokeWidth="1.6" />
          <line x1="186" y1="106" x2="186" y2="132" strokeWidth="1.6" />
        </g>
      )}
      {v === "sectional" && (
        <g>
          <rect x="66" y="52" width="84" height="80" />
          <path d="M66 52 96 30h84l-30 22Z" />
          <path d="M150 52h30v80h-30" />
          <path d="M180 52 150 52M180 78h-30M180 104h-30" strokeWidth="1.2" />
          {[94, 122].map((x) => (
            <line key={x} x1={x} y1="52" x2={x} y2="132" strokeWidth="1.2" />
          ))}
          <line x1="66" y1="78" x2="150" y2="78" strokeWidth="1.2" />
          <line x1="66" y1="104" x2="150" y2="104" strokeWidth="1.2" />
        </g>
      )}
    </g>
  );
}

/* ---------- GRC FACADE PANELS ---------- */
function Facade({ v, uid }: { v: string; uid: string }) {
  return (
    <g stroke="currentColor" strokeLinejoin="round" strokeWidth="2">
      {v === "flat" && (
        <g>
          {[0, 1].map((r) =>
            [0, 1, 2].map((c) => (
              <rect key={`${r}${c}`} x={42 + c * 54} y={24 + r * 48} width="48" height="42" strokeWidth="1.7" />
            ))
          )}
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${50 + i * 54} ${i % 2 ? 70 : 20}l6 4-6 4`} strokeWidth="1.3" />
          ))}
        </g>
      )}
      {v === "ribbed" && (
        <g>
          <rect x="42" y="22" width="156" height="96" strokeWidth="1.7" />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
            <rect key={i} x={50 + i * 12.5} y={28} width="6" height="84" strokeWidth="1.4" />
          ))}
        </g>
      )}
      {v === "perforated" && (
        <g>
          <defs>
            <pattern id={`${uid}d`} width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="7" cy="7" r="2.6" strokeWidth="1.2" />
            </pattern>
          </defs>
          <rect x="42" y="22" width="156" height="96" strokeWidth="1.7" />
          <rect x="52" y="32" width="136" height="76" fill={`url(#${uid}d)`} strokeWidth="1.2" />
        </g>
      )}
      {v === "carved" && (
        <g>
          <rect x="42" y="22" width="156" height="96" strokeWidth="1.7" />
          <circle cx="120" cy="70" r="30" strokeWidth="1.5" />
          <circle cx="120" cy="70" r="6" strokeWidth="1.3" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse
              key={a}
              cx={120 + 17 * Math.cos((a * Math.PI) / 180)}
              cy={70 + 17 * Math.sin((a * Math.PI) / 180)}
              rx="9"
              ry="5"
              strokeWidth="1.2"
              transform={`rotate(${a} ${120 + 17 * Math.cos((a * Math.PI) / 180)} ${70 + 17 * Math.sin((a * Math.PI) / 180)})`}
            />
          ))}
        </g>
      )}
    </g>
  );
}

/* ---------- FRP DOOR FRAMES ---------- */
function Door({ v }: { v: string }) {
  return (
    <g stroke="currentColor" strokeLinejoin="round" strokeWidth="2">
      <line x1="44" y1="132" x2="196" y2="132" strokeWidth="2.2" />
      {v === "standard" && (
        <g>
          <rect x="84" y="16" width="72" height="116" />
          <rect x="92" y="24" width="56" height="108" strokeWidth="1.6" />
          <circle cx="140" cy="82" r="2.4" strokeWidth="1.4" />
          {[40, 60, 100].map((y) => (
            <line key={y} x1="92" y1={y} x2="87" y2={y} strokeWidth="1.4" />
          ))}
        </g>
      )}
      {v === "arched" && (
        <g>
          <path d="M84 132V52a36 36 0 0 1 72 0v80Z" />
          <path d="M92 132V56a28 28 0 0 1 56 0v76" strokeWidth="1.6" />
          <circle cx="138" cy="88" r="2.4" strokeWidth="1.4" />
          <path d="M92 60a28 28 0 0 1 56 0" strokeWidth="1.2" />
        </g>
      )}
      {v === "french" && (
        <g>
          <rect x="62" y="16" width="116" height="116" />
          <rect x="70" y="24" width="48" height="108" strokeWidth="1.6" />
          <rect x="122" y="24" width="48" height="108" strokeWidth="1.6" />
          <circle cx="112" cy="82" r="2.4" strokeWidth="1.4" />
          <circle cx="128" cy="82" r="2.4" strokeWidth="1.4" />
          {[0, 1, 2].map((i) => (
            <g key={i} strokeWidth="1.1">
              <line x1="70" y1={44 + i * 22} x2="118" y2={44 + i * 22} />
              <line x1="122" y1={44 + i * 22} x2="170" y2={44 + i * 22} />
            </g>
          ))}
        </g>
      )}
      {v === "sliding" && (
        <g>
          <rect x="52" y="22" width="136" height="104" />
          <line x1="52" y1="18" x2="188" y2="18" strokeWidth="2.4" />
          <rect x="60" y="30" width="60" height="96" strokeWidth="1.6" />
          <rect x="112" y="30" width="60" height="96" strokeWidth="1.6" />
          <line x1="118" y1="70" x2="118" y2="90" strokeWidth="2.4" />
          <circle cx="68" cy="26" r="2" strokeWidth="1.2" />
          <circle cx="164" cy="26" r="2" strokeWidth="1.2" />
        </g>
      )}
    </g>
  );
}

/* ---------- FRP RECTANGULAR PLANTERS (Selenge & Hudson) ---------- */
function Planter({ v }: { v: string }) {
  return (
    <g stroke="currentColor" strokeLinejoin="round" strokeWidth="2">
      <line x1="44" y1="128" x2="196" y2="128" strokeWidth="2.2" />
      {v === "selenge" && (
        <g>
          {/* ornamental grass blades */}
          <g strokeWidth="1.4" strokeLinecap="round" fill="none">
            <path d="M92 58 C 90 44 85 36 79 30" />
            <path d="M104 58 C 104 42 101 32 97 22" />
            <path d="M118 58 C 119 40 123 30 129 20" />
            <path d="M132 58 C 133 44 137 34 143 26" />
            <path d="M146 58 C 149 46 155 38 161 34" />
          </g>
          {/* rim band */}
          <rect x="76" y="58" width="88" height="9" />
          {/* tapered one-piece body */}
          <path d="M80 67 H160 L152 118 H88 Z" />
          {/* recessed shadow-gap base */}
          <path d="M92 118 H148 V124 H92 Z" strokeWidth="1.4" />
          {/* moulded liner line */}
          <line x1="85" y1="76" x2="155" y2="76" strokeWidth="1.2" />
        </g>
      )}
      {v === "hudson" && (
        <g>
          {/* shrub canopy */}
          <g strokeWidth="1.5" strokeLinecap="round" fill="none">
            <path d="M74 84 C 68 72 74 60 86 58 C 88 46 102 41 111 49 C 117 37 135 39 138 51 C 151 49 159 59 155 70 C 166 73 164 84 153 84" />
            <path d="M98 84 C 96 74 99 68 105 65 M126 84 C 126 72 130 66 136 61" strokeWidth="1.1" />
          </g>
          {/* rolled lip rim */}
          <rect x="50" y="84" width="140" height="10" />
          {/* wide body */}
          <path d="M56 94 H184 L178 118 H62 Z" />
          {/* recessed base */}
          <path d="M66 118 H174 V124 H66 Z" strokeWidth="1.4" />
          <line x1="60" y1="103" x2="180" y2="103" strokeWidth="1.2" />
        </g>
      )}
      {/* GRC-era raised/treegrate variants retired for the FRP planters sheet
        <g>
          {[78, 112, 146].map((x) => (
            <g key={x} strokeWidth="1.4" strokeLinecap="round">
              <line x1={x} y1={70} x2={x} y2={54} />
              <path d={`M${x} 58c-5-4-6-9-4-14 5 3 7 8 4 14Z`} />
              <path d={`M${x} 58c5-4 6-9 4-14-5 3-7 8-4 14Z`} />
            </g>
          ))}
          <rect x="56" y="70" width="128" height="12" />
          <path d="M60 82h120l-4 46H64Z" />
          <line x1="62" y1="94" x2="178" y2="94" strokeWidth="1.2" />
        </g>
      )}
      {v === "treegrate" && (
        <g>
          <path d="M120 44c-6-8-5-17 1-24 5 8 5 17-1 24Z" strokeWidth="1.5" />
          <line x1="120" y1="44" x2="120" y2="96" strokeWidth="1.8" />
          <rect x="70" y="96" width="100" height="8" />
          {[86, 102, 118, 134, 150].map((x) => (
            <line key={x} x1={x} y1="104" x2={x} y2="124" strokeWidth="1.3" />
          ))}
          <rect x="70" y="104" width="100" height="20" strokeWidth="1.6" />
        </g>
      )}
      */}
    </g>
  );
}

/* ---------- public card drawing ---------- */
export function Drawing({ family, variant, dim }: { family: Family; variant: string; dim: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <Frame dim={dim} uid={uid}>
      {family === "chajja" && <Chajja v={variant} />}
      {family === "jali" && <Jali v={variant} uid={uid} />}
      {family === "cornice" && <Cornice v={variant} uid={uid} />}
      {family === "column" && <Column v={variant} />}
      {family === "dome" && <Dome v={variant} />}
      {family === "balustrade" && <Balustrade v={variant} />}
      {family === "tank" && <Tank v={variant} />}
      {family === "facade" && <Facade v={variant} uid={uid} />}
      {family === "door" && <Door v={variant} />}
      {family === "planter" && <Planter v={variant} />}
    </Frame>
  );
}

/* ================================================================== */
/*  Anatomy drawings — interactive, driven by `active` legend index    */
/* ================================================================== */
const gCls = (active: number | null, i: number) =>
  `transition-all duration-300 ${active !== null && active !== i ? "opacity-25" : ""} ${active === i ? "text-accent-600" : ""}`;

/** GRC cornice moulding section with callout dots. */
export function CorniceSection({ active }: { active: number | null }) {
  return (
    <svg viewBox="0 0 460 360" className="w-full fill-none text-navy-800" role="img" aria-label="GRC cornice moulding section drawing">
      <defs>
        <pattern id="cw" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
        </pattern>
        <pattern id="cg" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" stroke="currentColor" strokeOpacity="0.12" strokeWidth="0.5" fill="none" />
        </pattern>
      </defs>
      <rect width="460" height="360" fill="url(#cg)" />

      {/* wall */}
      <g className={gCls(active, 5)}>
        <rect x="26" y="30" width="44" height="300" fill="url(#cw)" stroke="currentColor" strokeWidth="1.8" />
        <text x="48" y="352" fontSize="8" letterSpacing="1.4" textAnchor="middle" fill="currentColor" fontFamily="IBM Plex Mono, monospace" stroke="none">
          WALL / FRIEZE
        </text>
      </g>

      {/* 1 — cyma crown */}
      <g className={gCls(active, 0)} stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
        <path d="M70 60h230" />
        <path d="M70 60c44 0 52 16 56 28 4 12 16 20 44 20" />
      </g>

      {/* 2 — corona + drip */}
      <g className={gCls(active, 1)} stroke="currentColor" strokeWidth="2.2">
        <path d="M300 60v30H188" />
        <path d="M292 90v10" strokeWidth="1.6" />
      </g>

      {/* 3 — dentil course */}
      <g className={gCls(active, 2)} stroke="currentColor" strokeWidth="1.8">
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x={176 + i * 11} y={108} width="7" height="12" />
        ))}
        <line x1="170" y1="104" x2="304" y2="104" strokeWidth="1.4" />
        <line x1="170" y1="124" x2="304" y2="124" strokeWidth="1.4" />
      </g>

      {/* 4 — bed moulding */}
      <g className={gCls(active, 3)} stroke="currentColor" strokeWidth="2">
        <path d="M170 124c30 0 36 6 38 12 2 6 10 10 26 10h70" />
      </g>

      {/* 5 — soffit */}
      <g className={gCls(active, 4)} stroke="currentColor" strokeWidth="2.2">
        <line x1="70" y1="160" x2="304" y2="160" />
        <line x1="70" y1="168" x2="304" y2="168" strokeWidth="1.2" />
      </g>

      {/* callout dots */}
      {active === null &&
        [
          { x: 250, y: 52, n: 1 },
          { x: 316, y: 78, n: 2 },
          { x: 320, y: 116, n: 3 },
          { x: 250, y: 140, n: 4 },
          { x: 320, y: 164, n: 5 },
          { x: 12, y: 210, n: 6 },
        ].map((h) => (
          <g key={h.n} className="text-accent-600">
            <circle cx={h.x} cy={h.y} r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <text x={h.x} y={h.y + 3.2} fontSize="9" textAnchor="middle" fill="currentColor" fontFamily="IBM Plex Mono, monospace" fontWeight="600">
              {h.n}
            </text>
          </g>
        ))}

      <text x="380" y="340" fontSize="8" letterSpacing="1.6" textAnchor="end" fill="currentColor" fontFamily="IBM Plex Mono, monospace" stroke="none" opacity="0.5">
        SECTION A–A · SCALE 1:2
      </text>
    </svg>
  );
}

/** Split-shell column construction, exploded. */
export function ColumnExploded({ active }: { active: number | null }) {
  return (
    <svg viewBox="0 0 500 520" className="w-full fill-none text-navy-800" role="img" aria-label="Exploded drawing of a split-shell GRC column on a steel core">
      <defs>
        <pattern id="steelhatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
        </pattern>
        <pattern id="agrid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" stroke="currentColor" strokeOpacity="0.12" strokeWidth="0.5" fill="none" />
        </pattern>
      </defs>
      <rect width="500" height="520" fill="url(#agrid)" />
      <line x1="40" y1="468" x2="460" y2="468" stroke="currentColor" strokeWidth="2.2" />

      {/* as-built ghost */}
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeOpacity="0.45">
        <path d="M96 84 164 84 156 116 104 116Z" />
        <path d="M108 116C100 220 100 320 108 420h44c8-100 8-200 0-304Z" />
        <path d="M100 420h60l-6 32h-48Z" />
        <text x="130" y="492" fontSize="8" letterSpacing="1.6" textAnchor="middle" stroke="none" fill="currentColor" fontFamily="IBM Plex Mono, monospace">
          AS-BUILT
        </text>
      </g>

      <g strokeLinejoin="round">
        {/* steel core */}
        <g className={gCls(active, 1)} stroke="currentColor" strokeWidth="1.8">
          <rect x="330" y="70" width="20" height="392" fill="url(#steelhatch)" />
          <line x1="322" y1="70" x2="358" y2="70" />
          <circle cx="340" cy="86" r="2.5" strokeWidth="1.2" />
          <circle cx="340" cy="446" r="2.5" strokeWidth="1.2" />
        </g>
        {/* shell halves */}
        <g className={gCls(active, 0)} stroke="currentColor" strokeWidth="2">
          <path d="M286 120h40l-8-34h-22Z" />
          <path d="M394 120h-40l8-34h22Z" />
          <path d="M286 124c-10 90-10 190 0 280h36c-8-90-8-190 0-280Z" />
          <path d="M394 124c10 90 10 190 0 280h-36c8-90 8-190 0-280Z" />
        </g>
        {/* brackets */}
        <g className={gCls(active, 2)} stroke="currentColor" strokeWidth="1.8">
          <rect x="322" y="188" width="8" height="16" />
          <rect x="350" y="188" width="8" height="16" />
          <circle cx="326" cy="196" r="2" strokeWidth="1.2" />
          <circle cx="354" cy="196" r="2" strokeWidth="1.2" />
          <rect x="322" y="316" width="8" height="16" />
          <rect x="350" y="316" width="8" height="16" />
          <circle cx="326" cy="324" r="2" strokeWidth="1.2" />
          <circle cx="354" cy="324" r="2" strokeWidth="1.2" />
        </g>
        {/* base shoe */}
        <g className={gCls(active, 3)} stroke="currentColor" strokeWidth="2">
          <path d="M278 452h124l-12-40H290Z" />
          <line x1="290" y1="424" x2="390" y2="424" strokeWidth="1.2" />
        </g>
      </g>

      {active === null &&
        [
          { x: 268, y: 264, n: 1 },
          { x: 340, y: 56, n: 2 },
          { x: 372, y: 196, n: 3 },
          { x: 416, y: 432, n: 4 },
        ].map((h) => (
          <g key={h.n} className="text-accent-600">
            <circle cx={h.x} cy={h.y} r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <text x={h.x} y={h.y + 3.2} fontSize="9" textAnchor="middle" fill="currentColor" fontFamily="IBM Plex Mono, monospace" fontWeight="600">
              {h.n}
            </text>
          </g>
        ))}
    </svg>
  );
}
