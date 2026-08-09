import { useState } from "react";
import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";

const EMAIL = "aimlinitiative@gmail.com";

const PATHS = [
    { k: "01", t: "Schools & educators", d: "Bring the curriculum to your classroom — free, with teacher training.", subject: "Partnership inquiry — school" },
    { k: "02", t: "Funders & grants", d: "Fund open-source AI education that's already in classrooms.", subject: "Funding inquiry" },
    { k: "03", t: "Volunteers & mentors", d: "Help build curriculum, mentor students, or run a workshop.", subject: "Volunteer / mentor" },
];

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", org: "", role: "Funder / grantmaker", message: "" });
    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const onSubmit = (e) => {
        e.preventDefault();
        const subject = `AIML-LI inquiry — ${form.role}${form.org ? ` (${form.org})` : ""}`;
        const body = `Name: ${form.name}\nEmail: ${form.email}\nOrganization: ${form.org}\nI am a: ${form.role}\n\n${form.message}`;
        window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <div className="container-wide py-16 sm:py-24">
            <Reveal className="max-w-4xl">
                <div className="flex items-center gap-3">
                    <span className="index-num">(04)</span>
                    <span className="label">Get involved</span>
                </div>
                <h1 className="display mt-6 text-4xl text-ink sm:text-7xl">
                    Let's put AI within reach of <span className="italic text-accent">every</span> student.
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-ink2">
                    Whether you fund education, run a school, or want to teach — we'd love to hear from
                    you. Tell us who you are and we'll reply within a few days.
                </p>
            </Reveal>

            {/* Paths */}
            <div className="mt-16 divide-y divide-ink/15 border-y border-ink/15">
                {PATHS.map((p) => (
                    <Reveal key={p.k}>
                        <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(p.subject)}`} className="group grid grid-cols-[3rem_1fr_auto] items-center gap-6 py-7" data-cursor>
                            <span className="index-num">{p.k}</span>
                            <div>
                                <h3 className="serif text-2xl font-medium text-ink transition-transform duration-300 group-hover:translate-x-2">{p.t}</h3>
                                <p className="mt-1 text-sm text-ink2">{p.d}</p>
                            </div>
                            <span className="mono text-accent transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </a>
                    </Reveal>
                ))}
            </div>

            {/* Form */}
            <Reveal className="mt-20 max-w-3xl">
                <h2 className="display text-3xl text-ink sm:text-4xl">Send us a note</h2>
                <p className="mt-3 text-sm text-ink2">This opens your email client with everything filled in — no account needed.</p>
                <form onSubmit={onSubmit} className="mt-10 grid gap-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <Field label="Your name" value={form.name} onChange={set("name")} required />
                        <Field label="Email" type="email" value={form.email} onChange={set("email")} required />
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                        <Field label="Organization" value={form.org} onChange={set("org")} placeholder="School, foundation, company…" />
                        <div>
                            <label className="label">I am a…</label>
                            <select value={form.role} onChange={set("role")} className="mt-2 w-full border-0 border-b border-ink/25 bg-transparent py-2.5 text-ink outline-none transition focus:border-accent">
                                {["Funder / grantmaker", "School / educator", "Volunteer / mentor", "Student", "Other"].map((r) => <option key={r}>{r}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="label">Message</label>
                        <textarea value={form.message} onChange={set("message")} rows={4} required placeholder="Tell us how you'd like to get involved…"
                            className="mt-2 w-full resize-y border-0 border-b border-ink/25 bg-transparent py-2.5 text-ink outline-none transition placeholder:text-ink2/60 focus:border-accent" />
                    </div>
                    <Magnetic strength={0.3} className="sm:justify-self-start">
                        <button type="submit" className="btn-primary" data-cursor>Compose email →</button>
                    </Magnetic>
                </form>
                <p className="mt-10 border-t border-ink/15 pt-6 text-sm text-ink2">
                    Prefer to email directly? <a href={`mailto:${EMAIL}`} className="ulink text-ink">{EMAIL}</a>
                </p>
            </Reveal>
        </div>
    );
}

function Field({ label, type = "text", value, onChange, required, placeholder }) {
    return (
        <div>
            <label className="label">{label}</label>
            <input type={type} value={value} onChange={onChange} required={required} placeholder={placeholder}
                className="mt-2 w-full border-0 border-b border-ink/25 bg-transparent py-2.5 text-ink outline-none transition placeholder:text-ink2/60 focus:border-accent" />
        </div>
    );
}
