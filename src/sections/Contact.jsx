import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import { SOCIALS } from "../components/Footer";

const EMAIL = "aimlinitiative@gmail.com";

export default function Contact() {
    return (
        <>
            {/* ===================== CONTACT ===================== */}
            <section id="contact" className="container-page py-28 text-center sm:py-36">
                <Reveal>
                    <SectionLabel n="07" className="justify-center">Contact</SectionLabel>
                    <h2 className="display mx-auto mt-5 max-w-2xl text-balance text-4xl font-bold tracking-tightest text-ink sm:text-5xl">
                        Let's talk.
                    </h2>
                    <p className="mx-auto mt-5 max-w-lg text-lg text-muted">
                        Partner, fund, teach, or just say hi. We answer every message.
                    </p>
                    <div className="mt-10 flex justify-center">
                        <a href={`mailto:${EMAIL}`} className="btn-accent text-base">Contact us</a>
                    </div>
                    <div className="mt-10 flex items-center justify-center gap-3">
                        {SOCIALS.map((s) => (
                            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:bg-accentsoft hover:text-accent">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                            </a>
                        ))}
                    </div>
                </Reveal>
            </section>
        </>
    );
}
