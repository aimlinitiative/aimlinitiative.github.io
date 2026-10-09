import { EMAIL, GITHUB } from "../lib/site";

export default function Footer() {
    return (
        <footer className="border-t border-line">
            <div className="page grid12 gap-y-6 py-12 text-small text-dim">
                <p className="col-span-12 lg:col-span-3 font-medium text-fg">AI/ML Literacy Initiative</p>
                <div className="col-span-12 space-y-1 lg:col-span-5 lg:col-start-5">
                    <p>Fiscally sponsored by The Hack Foundation (Hack Club), a 501(c)(3). <span className="whitespace-nowrap">EIN 81-2908499</span>.</p>
                    <p>Founded by Adrian Erlikhman and Michael Tarekegn in Los Angeles.</p>
                </div>
                <div className="col-span-12 flex gap-6 lg:col-span-3 lg:col-start-10 lg:justify-end">
                    <a href={`mailto:${EMAIL}`} className="link">Email</a>
                    <a href={GITHUB} className="link" target="_blank" rel="noreferrer">GitHub</a>
                </div>
            </div>
        </footer>
    );
}
