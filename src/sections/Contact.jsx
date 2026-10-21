import Note from "../components/Note";
import { EMAIL } from "../lib/site";

export default function Contact() {
    return (
        <section id="contact" className="page pb-20 lg:pb-28">
            <div className="relative overflow-hidden rounded-[28px] bg-ink px-6 py-16 text-center text-white sm:px-10 lg:py-24">
                <p className="tag text-white/60">Contact</p>
                <h2 className="mx-auto mt-3 max-w-[20ch] text-balance font-display text-h2">Help 500+ students meet the people who build AI.</h2>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <a href={`mailto:${EMAIL}`} className="btn bg-white text-ink hover:bg-blue hover:text-white">{EMAIL}</a>
                </div>
                <div className="mt-4 flex justify-center">
                    <Note dir="up" className="hidden sm:flex" tone="text-white/70">partners, teachers, students, parents</Note>
                </div>
            </div>
        </section>
    );
}
