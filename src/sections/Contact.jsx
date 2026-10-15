import { EMAIL } from "../lib/site";

export default function Contact() {
    return (
        <section id="contact" className="page pb-20 lg:pb-28">
            <div className="rounded-card bg-ink px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
                <p className="tag text-white/70">Contact</p>
                <a href={`mailto:${EMAIL}`} className="mt-4 block break-words font-display text-h2 underline decoration-white/30 decoration-2 underline-offset-8 hover:decoration-white">
                    {EMAIL}
                </a>
                <p className="mt-6 max-w-measure text-lead text-white/80">
                    Partners, teachers, students and parents can all reach us here.
                </p>
            </div>
        </section>
    );
}
