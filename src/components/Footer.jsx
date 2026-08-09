import { Link } from "react-router-dom";
import Magnetic from "./Magnetic";

const CONTACT_EMAIL = "aimlinitiative@gmail.com";

export default function Footer() {
    return (
        <footer className="mt-28 border-t border-ink/15 bg-paper2">
            <div className="container-wide py-16">
                {/* Big editorial email CTA */}
                <Link to="/contact" className="group block" data-cursor>
                    <span className="label">Get involved</span>
                    <div className="mt-3 serif text-4xl font-medium tracking-tight text-ink transition-colors group-hover:text-accent sm:text-6xl">
                        Let’s build it together →
                    </div>
                </Link>

                <div className="mt-16 grid gap-10 border-t border-ink/15 pt-10 md:grid-cols-[1.6fr_1fr_1fr]">
                    <div>
                        <div className="serif text-xl font-semibold text-ink">AIML·LI</div>
                        <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink2">
                            The AI/ML Literacy Initiative is a nonprofit closing the AI opportunity
                            gap in public education — open-source curriculum, in real classrooms.
                        </p>
                        <Magnetic strength={0.2}>
                            <a href={`mailto:${CONTACT_EMAIL}`} className="ulink mt-4 inline-block text-sm text-ink" data-cursor>
                                {CONTACT_EMAIL}
                            </a>
                        </Magnetic>
                    </div>

                    <div>
                        <span className="label">Explore</span>
                        <ul className="mt-4 space-y-2.5 text-sm text-ink2">
                            <li><Link to="/program" className="ulink hover:text-ink">Program</Link></li>
                            <li><Link to="/demo" className="ulink hover:text-ink">Live Demo</Link></li>
                            <li><Link to="/about" className="ulink hover:text-ink">About & Team</Link></li>
                            <li><Link to="/contact" className="ulink hover:text-ink">Partner / Fund</Link></li>
                        </ul>
                    </div>

                    <div>
                        <span className="label">Get involved</span>
                        <ul className="mt-4 space-y-2.5 text-sm text-ink2">
                            <li><a href={`mailto:${CONTACT_EMAIL}?subject=Partnership`} className="ulink hover:text-ink">Schools & educators</a></li>
                            <li><a href={`mailto:${CONTACT_EMAIL}?subject=Funding`} className="ulink hover:text-ink">Funders & grants</a></li>
                            <li><a href={`mailto:${CONTACT_EMAIL}?subject=Volunteer`} className="ulink hover:text-ink">Volunteer / mentor</a></li>
                            <li><a href="https://github.com/aimlinitiative" target="_blank" rel="noreferrer" className="ulink hover:text-ink">GitHub ↗</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-ink/15 pt-6 text-xs text-ink2 sm:flex-row sm:items-center">
                    <p>© {new Date().getFullYear()} AI/ML Literacy Initiative — open-source for educators.</p>
                    <p className="mono">Curriculum: Adrian Erlikhman & Michael Tarekegn · Site: Ibrahim Piri</p>
                </div>
            </div>
        </footer>
    );
}
