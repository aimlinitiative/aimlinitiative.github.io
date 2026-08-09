const EMAIL = "aimlinitiative@gmail.com";

export const SOCIALS = [
    { label: "Instagram", href: "https://instagram.com/", icon: (
        <><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>
    ) },
    { label: "LinkedIn", href: "https://linkedin.com/", icon: (
        <><rect x="2" y="2" width="20" height="20" rx="3" /><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 17v-7" /></>
    ) },
    { label: "GitHub", href: "https://github.com/aimlinitiative", icon: (
        <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6 0C6.7 2.3 5.6 2.6 5.6 2.6a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    ) },
];

export default function Footer() {
    return (
        <footer className="border-t border-line bg-paper2">
            <div className="container-page py-12">
                <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                        <img src="/logo.jpg" alt="AIML-LI" className="h-9 w-9 rounded-lg object-cover" />
                        <div>
                            <div className="font-semibold text-ink">AIML-LI</div>
                            <div className="text-sm text-muted">AI/ML Literacy Initiative</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {SOCIALS.map((s) => (
                            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ink hover:text-ink">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                            </a>
                        ))}
                        <a href={`mailto:${EMAIL}`} aria-label="Email"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ink hover:text-ink">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                        </a>
                    </div>
                </div>

                <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center">
                    <p>© {new Date().getFullYear()} AI/ML Literacy Initiative. Open-source curriculum for educators.</p>
                    <p>Founded by Adrian Erlikhman & Michael Tarekegn · Los Angeles</p>
                </div>
            </div>
        </footer>
    );
}
