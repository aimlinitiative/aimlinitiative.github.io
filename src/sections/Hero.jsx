import Lab from "../components/Lab";
import deepmind from "../assets/supporters/deepmind.png";
import microsoft from "../assets/supporters/microsoft.png";
import google from "../assets/supporters/google.png";
import snap from "../assets/supporters/snap.png";
import mongodb from "../assets/supporters/mongodb.png";
import janestreet from "../assets/supporters/janestreet.png";
import confluent from "../assets/supporters/confluent.png";
import discovery from "../assets/supporters/discovery.png";
import hackerfund from "../assets/supporters/hackerfund.png";

// Heights balance the marks' visual weight.
const LOGOS = [
    [deepmind, "Google DeepMind", 19], [microsoft, "Microsoft", 21], [google, "Google", 23],
    [snap, "Snap Inc.", 25], [mongodb, "MongoDB", 21], [janestreet, "Jane Street", 26],
    [confluent, "Confluent", 17], [discovery, "Discovery Education", 23], [hackerfund, "Hacker Fund", 15],
];

export default function Hero() {
    return (
        <section>
            <div className="page grid items-center gap-12 pb-16 pt-12 lg:grid-cols-12 lg:gap-14 lg:pb-20 lg:pt-20">
                <div className="lg:col-span-6">
                    <p className="tag text-blue">Free AI course · Los Angeles</p>
                    <h1 className="mt-4 text-balance font-display text-hero">
                        A free AI course for <span className="text-blue">LA public high schools.</span>
                    </h1>
                    <p className="mt-6 max-w-[34rem] text-pretty text-lead text-[#2B323A]">
                        Twelve weeks of Python notebooks, written by LA high school students. Classes go from how a
                        model learns to where it fails, with an ethics lab in every unit. We taught a four-week
                        version at LACES and are piloting the course with LAUSD.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <a href="#course" className="btn-primary">See the course</a>
                        <a href="#summit" className="btn-outline">LA Student AI Summit</a>
                    </div>
                    <p className="mt-8 max-w-[34rem] text-small text-dim">
                        Built with feedback from engineers at Google DeepMind and Microsoft, a UCLA professor and a
                        Y Combinator-backed founder.
                    </p>
                </div>
                <div className="lg:col-span-6">
                    <Lab />
                </div>
            </div>

            <div className="page">
                <div className="card px-6 py-6 lg:px-8">
                    <p className="tag">Partners for the LA Student AI Summit</p>
                    <ul className="mt-5 flex flex-wrap items-center justify-between gap-x-7 gap-y-6">
                        {LOGOS.map(([src, name, h]) => (
                            <li key={name}><img src={src} alt={name} style={{ height: h }} className="w-auto" loading="lazy" decoding="async" /></li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
