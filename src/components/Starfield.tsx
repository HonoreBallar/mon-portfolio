const COLORS = ["#ffffff", "#22d3ee", "#a78bfa", "#ffffff"];

/** Small deterministic generator (mulberry32): same stars on the server and in the browser */
function random(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const next = random(20261028);
const STARS = Array.from({ length: 70 }, () => ({
  x: next() * 100,
  y: next() * 100,
  s: next() < 0.85 ? 1.5 : 2.5,
  d: next() * 6,
  c: COLORS[Math.floor(next() * COLORS.length)],
}));

// Rendered on the server: the stars are in the HTML from the first paint, without JavaScript
export function Starfield() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {STARS.map((st, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${st.x.toFixed(3)}%`,
            top: `${st.y.toFixed(3)}%`,
            width: st.s,
            height: st.s,
            background: st.c,
            animation: `twinkle ${(3 + st.d).toFixed(3)}s ease-in-out ${st.d.toFixed(3)}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
