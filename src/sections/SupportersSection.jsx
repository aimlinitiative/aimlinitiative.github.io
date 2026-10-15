import Section from "../components/Section";
import { PARTNERS, SUPPORTERS } from "../lib/partners";

export default function SupportersSection() {
    return (
        <Section id="partners" tag="Partners and supporters" title="Nine companies have committed to the summit."
            intro="Keynotes, prizes, mentors, credits and in-kind support. A partner goes on this page once they've said yes.">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {PARTNERS.map((p) => (
                    <li key={p.name} className="card flex flex-col p-6">
                        <div className="flex h-10 items-center">
                            <img src={p.logo} alt={p.name} style={{ height: p.h }} className="w-auto" loading="lazy" decoding="async" />
                        </div>
                        <p className="tag mt-6 text-blue">{p.role}</p>
                        <p className="mt-1 text-pretty font-bold">{p.what}</p>
                    </li>
                ))}
            </ul>

            <h3 className="mt-16 font-display text-h3">Behind the course and the organization</h3>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {SUPPORTERS.map((s) => (
                    <li key={s.name} className="rounded-card bg-sky p-6">
                        <p className="font-display text-[1.25rem] font-extrabold">{s.name}</p>
                        <p className="tag mt-2 text-blue">{s.role}</p>
                        <p className="mt-2 text-pretty text-small text-dim">{s.what}</p>
                    </li>
                ))}
            </ul>
            <p className="mt-8 max-w-[44rem] text-pretty text-body text-dim">
                The curriculum was built with engineers at Google DeepMind and Microsoft, a UCLA professor and a
                Y Combinator-backed founder.
            </p>
        </Section>
    );
}
