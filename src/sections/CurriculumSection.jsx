import Section from "../components/Section";

const UNITS = [
    { from: 1, t: "Foundations", d: "How machines learn from data." },
    { from: 3, t: "Building models", d: "A first model that actually works." },
    { from: 5, t: "Prediction and error", d: "Getting predictions right, and honest." },
    { from: 7, t: "Neural networks", d: "Built from scratch, not magic." },
    { from: 9, t: "Language and bias", d: "Where models work, and where they break." },
    { from: 11, t: "Capstone", d: "Students ship a project of their own." },
];

// Twelve cells, one per week; the unit's two weeks are filled.
function Weeks({ from }) {
    return (
        <div className="flex gap-1" aria-hidden="true">
            {Array.from({ length: 12 }, (_, w) => (
                <span key={w} className={`h-1.5 flex-1 rounded-sm ${w + 1 === from || w + 1 === from + 1 ? "bg-fg" : "bg-line"}`} />
            ))}
        </div>
    );
}

export default function CurriculumSection() {
    return (
        <Section id="curriculum" label="Curriculum">
            <p className="text-h2">Twelve weeks. Six units.</p>
            <p className="mt-6 max-w-measure text-body text-dim">It starts at zero and ends with a project students ship.</p>
            <ol className="mt-16 border-t border-line">
                {UNITS.map((u) => (
                    <li key={u.t} className="grid grid-cols-8 items-center gap-x-6 gap-y-3 border-b border-line py-6">
                        <span className="col-span-8 text-small tabular-nums text-dim sm:col-span-2">Weeks {u.from}–{u.from + 1}</span>
                        <div className="col-span-8 sm:col-span-4">
                            <h3 className="text-h3">{u.t}</h3>
                            <p className="mt-1 text-small text-dim">{u.d}</p>
                        </div>
                        <div className="col-span-8 sm:col-span-2"><Weeks from={u.from} /></div>
                    </li>
                ))}
            </ol>
        </Section>
    );
}
