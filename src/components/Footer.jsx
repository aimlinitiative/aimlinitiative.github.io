import { Link } from "react-router-dom";

const CONTACT_EMAIL = "aimlinitiative@gmail.com";

export default function Footer() {
    return (
        <footer className="mt-24 border-t border-white/10 bg-ink-950/60">
            <div className="container-page py-14">
                <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <img src="/logo.jpg" alt="AIML-LI" className="h-9 w-9 rounded-lg object-cover ring-1 ring-white/15" />
                            <span className="font-display text-lg font-bold text-white">AIML-LI</span>
                        </div>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
                            The AI/ML Literacy Initiative is a nonprofit closing the AI opportunity
                            gap in public education — open-source curriculum, in real classrooms.
                        </p>
                        <a href={`mailto:${CONTACT_EMAIL}`} className="mt-4 inline-block text-sm text-brand-300 link-underline">
                            {CONTACT_EMAIL}
                        </a>
                    </div>

                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">Explore</h4>
                        <ul className="mt-4 space-y-2.5 text-sm text-white/65">
                            <li><Link to="/program" className="link-underline hover:text-white">The Program</Link></li>
                            <li><Link to="/demo" className="link-underline hover:text-white">Live Demo</Link></li>
                            <li><Link to="/about" className="link-underline hover:text-white">About & Team</Link></li>
                            <li><Link to="/contact" className="link-underline hover:text-white">Partner / Fund</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">Get Involved</h4>
                        <ul className="mt-4 space-y-2.5 text-sm text-white/65">
                            <li><a href={`mailto:${CONTACT_EMAIL}?subject=Partnership%20inquiry`} className="link-underline hover:text-white">Schools & educators</a></li>
                            <li><a href={`mailto:${CONTACT_EMAIL}?subject=Funding%20inquiry`} className="link-underline hover:text-white">Funders & grants</a></li>
                            <li><a href={`mailto:${CONTACT_EMAIL}?subject=Volunteer`} className="link-underline hover:text-white">Volunteer / mentor</a></li>
                            <li>
                                <a href="https://github.com/aimlinitiative" target="_blank" rel="noreferrer" className="link-underline hover:text-white">
                                    Open-source curriculum ↗
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center">
                    <p>© {new Date().getFullYear()} AI/ML Literacy Initiative. Curriculum released open-source for educators.</p>
                    <p>
                        Curriculum by Adrian Erlikhman & Michael Tarekegn · Site by{" "}
                        <a href="https://ibrahimpiri.com" target="_blank" rel="noreferrer" className="link-underline hover:text-white/80">
                            Ibrahim Piri
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
