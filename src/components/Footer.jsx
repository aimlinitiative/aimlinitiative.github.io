import { Link } from "react-router-dom";

const CONTACT_EMAIL = "aimlinitiative@gmail.com";

export default function Footer() {
    return (
        <footer className="mt-28 border-t border-white/10 bg-ink-950/70">
            <div className="container-wide py-16">
                <Link to="/contact" className="group block">
                    <span className="label">Get involved</span>
                    <div className="mt-3 display text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        Let's build it <span className="text-gradient">together</span> →
                    </div>
                </Link>

                <div className="mt-16 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-[1.6fr_1fr_1fr]">
                    <div>
                        <div className="font-display text-xl font-bold text-white">AIML·LI</div>
                        <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/50">
                            The AI/ML Literacy Initiative is a nonprofit closing the AI opportunity gap
                            in public education — open-source curriculum, in real classrooms.
                        </p>
                        <a href={`mailto:${CONTACT_EMAIL}`} className="ulink mt-4 inline-block text-sm text-white/80">{CONTACT_EMAIL}</a>
                    </div>
                    <div>
                        <span className="label">Explore</span>
                        <ul className="mt-4 space-y-2.5 text-sm text-white/55">
                            <li><Link to="/program" className="ulink hover:text-white">Program</Link></li>
                            <li><Link to="/demo" className="ulink hover:text-white">Live Demo</Link></li>
                            <li><Link to="/about" className="ulink hover:text-white">About & Team</Link></li>
                            <li><Link to="/contact" className="ulink hover:text-white">Partner / Fund</Link></li>
                        </ul>
                    </div>
                    <div>
                        <span className="label">Get involved</span>
                        <ul className="mt-4 space-y-2.5 text-sm text-white/55">
                            <li><a href={`mailto:${CONTACT_EMAIL}?subject=Partnership`} className="ulink hover:text-white">Schools & educators</a></li>
                            <li><a href={`mailto:${CONTACT_EMAIL}?subject=Funding`} className="ulink hover:text-white">Funders & grants</a></li>
                            <li><a href={`mailto:${CONTACT_EMAIL}?subject=Volunteer`} className="ulink hover:text-white">Volunteer / mentor</a></li>
                            <li><a href="https://github.com/aimlinitiative" target="_blank" rel="noreferrer" className="ulink hover:text-white">GitHub ↗</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center">
                    <p>© {new Date().getFullYear()} AI/ML Literacy Initiative — open-source for educators.</p>
                    <p className="mono">Curriculum: Adrian Erlikhman & Michael Tarekegn · Site: Ibrahim Piri</p>
                </div>
            </div>
        </footer>
    );
}
