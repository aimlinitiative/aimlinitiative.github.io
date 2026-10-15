import Lab from "../components/Lab";
import { PARTNERS } from "../lib/partners";

export default function Hero() {
    return (
        <section>
            <div className="page grid items-center gap-12 pb-16 pt-12 lg:grid-cols-12 lg:gap-14 lg:pb-20 lg:pt-20">
                <div className="lg:col-span-7">
                    <p className="tag text-blue">AI/ML Literacy Initiative · Los Angeles</p>
                    <h1 className="mt-4 text-balance font-display text-hero">
                        Every LA public school student should learn how AI <span className="mark">actually works.</span>
                    </h1>
                    <p className="mt-6 max-w-[35rem] text-pretty text-lead text-[#2B323A]">
                        We're LA high schoolers making that happen. We wrote a free twelve-week AI course, taught a
                        four-week version at LACES and are piloting it with LAUSD. This fall we're bringing 500+ students together for the
                        LA Student AI Summit, with keynotes from Google DeepMind, Microsoft, Google and Snap.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <a href="#summit" className="btn-primary">The summit</a>
                        <a href="#course" className="btn-outline">See the course</a>
                    </div>
                    <p className="mt-8 max-w-[35rem] text-small text-dim">
                        The course was built with engineers at Google DeepMind and Microsoft, a UCLA professor and a
                        Y Combinator-backed founder.
                    </p>
                </div>
                <div className="lg:col-span-5">
                    <Lab />
                </div>
            </div>

            <div className="page">
                <a href="#partners" className="card block px-6 py-6 transition-colors hover:bg-sky lg:px-8">
                    <p className="tag">Nine partners behind the LA Student AI Summit</p>
                    <ul className="mt-5 flex flex-wrap items-center justify-between gap-x-7 gap-y-6">
                        {PARTNERS.map((p) => (
                            <li key={p.name}><img src={p.logo} alt={p.name} style={{ height: Math.round(p.h * 0.86) }} className="w-auto" loading="lazy" decoding="async" /></li>
                        ))}
                    </ul>
                </a>
            </div>
        </section>
    );
}
