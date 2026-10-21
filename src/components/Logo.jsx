// A partner's mark at its balanced height, or its name set as a wordmark when
// we have no logo file (aiEDU).
export default function Logo({ p, scale = 1 }) {
    if (!p.logo) return <span className="font-display text-[1.375rem] font-bold tracking-tight" style={{ fontSize: Math.round(p.h * scale) }}>{p.name}</span>;
    return <img src={p.logo} alt={p.name} style={{ height: Math.round(p.h * scale) }} className="w-auto max-w-full" loading="lazy" decoding="async" />;
}
