/* Signature hero mark: a training-loss curve that draws itself once and settles.
 * Monochrome with a single blue-tint accent. No gradients, no particles. */
export default function HeroMark() {
    return (
        <svg viewBox="0 0 440 128" className="h-auto w-full" role="img" aria-label="A training-loss curve settling toward its minimum">
            {/* axes */}
            <g stroke="rgba(21,21,26,0.16)" strokeWidth="1">
                <line x1="40" y1="14" x2="40" y2="110" />
                <line x1="40" y1="110" x2="420" y2="110" />
            </g>
            {/* faint gridline the curve settles onto */}
            <line x1="40" y1="104" x2="420" y2="104" stroke="rgba(21,21,26,0.08)" strokeWidth="1" strokeDasharray="2 5" />
            {/* the loss curve */}
            <path
                className="hero-curve"
                d="M44,22 C74,86 104,100 156,103 C232,106 320,104 414,104"
                fill="none"
                stroke="#2C63B0"
                strokeWidth="2.25"
                strokeLinecap="round"
            />
            {/* settled point */}
            <circle className="hero-dot" cx="414" cy="104" r="4" fill="#2C63B0" style={{ transformOrigin: "414px 104px" }} />
            {/* mono labels (dossier) */}
            <text x="18" y="66" fill="rgba(21,21,26,0.45)" fontFamily="'JetBrains Mono', monospace" fontSize="9" letterSpacing="1" transform="rotate(-90 18 66)">loss</text>
            <text x="384" y="124" fill="rgba(21,21,26,0.45)" fontFamily="'JetBrains Mono', monospace" fontSize="9" letterSpacing="1">epochs</text>
        </svg>
    );
}
