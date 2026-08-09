import { useState } from "react";
import Reveal from "../components/Reveal";

const EMAIL = "aimlinitiative@gmail.com";

const PATHS = [
    { icon: "🏫", t: "Schools & educators", d: "Bring the curriculum to your classroom — free, with teacher training.", subject: "Partnership inquiry — school" },
    { icon: "💛", t: "Funders & grants", d: "Fund open-source AI education that's already in classrooms.", subject: "Funding inquiry" },
    { icon: "🧑‍🏫", t: "Volunteers & mentors", d: "Help build curriculum, mentor students, or run a workshop.", subject: "Volunteer / mentor" },
];

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", org: "", role: "Funder / grantmaker", message: "" });

    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const mailtoHref = () => {
        const subject = `AIML-LI inquiry — ${form.role}${form.org ? ` (${form.org})` : ""}`;
        const body =
            `Name: ${form.name}\n` +
            `Email: ${form.email}\n` +
            `Organization: ${form.org}\n` +
            `I am a: ${form.role}\n\n` +
            `${form.message}`;
        return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        window.location.href = mailtoHref();
    };

    return (
        <div className="container-page py-16 sm:py-20">
            <Reveal className="mx-auto max-w-3xl text-center">
                <span className="eyebrow">Get involved</span>
                <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
                    Let's put AI within reach of <span className="text-gradient">every</span> student.
                </h1>
                <p className="mt-5 text-lg text-white/60">
                    Whether you fund education, run a school, or want to teach — we'd love to hear
                    from you. Tell us who you are and we'll reply within a few days.
                </p>
            </Reveal>

            {/* Paths */}
            <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
                {PATHS.map((p, i) => (
                    <Reveal key={p.t} delay={i * 90}>
                        <a
                            href={`mailto:${EMAIL}?subject=${encodeURIComponent(p.subject)}`}
                            className="glass glass-hover flex h-full flex-col p-7"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600/15 text-2xl ring-1 ring-brand-500/25">
                                {p.icon}
                            </div>
                            <h3 className="mt-5 font-display text-lg font-bold text-white">{p.t}</h3>
                            <p className="mt-2 flex-1 text-sm text-white/60">{p.d}</p>
                            <span className="mt-4 text-sm font-semibold text-brand-300">Email us →</span>
                        </a>
                    </Reveal>
                ))}
            </div>

            {/* Form */}
            <Reveal className="mx-auto mt-16 max-w-2xl glass p-7 sm:p-9">
                <h2 className="font-display text-2xl font-bold text-white">Send us a note</h2>
                <p className="mt-2 text-sm text-white/55">
                    This opens your email client with everything filled in — no account needed.
                </p>
                <form onSubmit={onSubmit} className="mt-7 grid gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Your name" value={form.name} onChange={set("name")} required />
                        <Field label="Email" type="email" value={form.email} onChange={set("email")} required />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Organization" value={form.org} onChange={set("org")} placeholder="School, foundation, company…" />
                        <div>
                            <label className="mb-2 block text-sm font-medium text-white/75">I am a…</label>
                            <select
                                value={form.role}
                                onChange={set("role")}
                                className="w-full rounded-xl border border-white/10 bg-ink-800/80 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-400"
                            >
                                {["Funder / grantmaker", "School / educator", "Volunteer / mentor", "Student", "Other"].map((r) => (
                                    <option key={r} className="bg-ink-800">{r}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-white/75">Message</label>
                        <textarea
                            value={form.message}
                            onChange={set("message")}
                            rows={5}
                            required
                            placeholder="Tell us how you'd like to get involved…"
                            className="w-full resize-y rounded-xl border border-white/10 bg-ink-800/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-brand-400"
                        />
                    </div>
                    <button type="submit" className="btn-primary justify-center sm:w-fit sm:justify-self-start">
                        Compose email →
                    </button>
                </form>

                <p className="mt-6 border-t border-white/10 pt-5 text-sm text-white/50">
                    Prefer to email directly?{" "}
                    <a href={`mailto:${EMAIL}`} className="text-brand-300 link-underline">{EMAIL}</a>
                </p>
            </Reveal>
        </div>
    );
}

function Field({ label, type = "text", value, onChange, required, placeholder }) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-white/75">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="w-full rounded-xl border border-white/10 bg-ink-800/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-brand-400"
            />
        </div>
    );
}
