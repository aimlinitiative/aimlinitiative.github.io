import { EMAIL, GITHUB } from "../lib/site";

export default function Footer() {
    return (
        <footer className="border-t border-line">
            <div className="page grid gap-6 py-10 text-small text-dim md:grid-cols-12">
                <div className="flex items-center gap-2.5 md:col-span-3">
                    <img src="/logo.jpg" alt="" className="h-8 w-8 mix-blend-multiply" />
                    <span className="font-display font-bold text-ink">AI/ML Literacy Initiative</span>
                </div>
                <div className="space-y-1 md:col-span-6">
                    <p>Fiscal sponsor: Hack Club, a 501(c)(3) · <span className="whitespace-nowrap">EIN 81-2908499</span></p>
                </div>
                <div className="flex gap-6 md:col-span-3 md:justify-end">
                    <a href={`mailto:${EMAIL}`} className="link">Email</a>
                    <a href={GITHUB} className="link" target="_blank" rel="noreferrer">GitHub</a>
                </div>
            </div>
        </footer>
    );
}
