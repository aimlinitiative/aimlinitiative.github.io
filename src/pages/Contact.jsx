import { useState } from "react";
import Reveal from "../components/Reveal";

const EMAIL = "aimlinitiative@gmail.com";

const PATHS = [
    { icon: "◆", t: "Schools & educators", d: "Bring the curriculum to your classroom — free, with teacher training.", subject: "Partnership inquiry — school" },
    { icon: "▲", t: "Funders & grants", d: "Fund open-source AI education that's already in classrooms.", subject: "Funding inquiry" },
    { icon: "●", t: "Volunteers & mentors", d: "Help build curriculum, mentor students, or run a workshop.", subject: "Volunteer / mentor" },
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

    const inputCls = "mt-2 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-brand-500";

    return (
        <div className="container-wide py-16 sm:py-24">
            <Reveal className="max-w-4xl">
                <span className="label">Get involved</span>
                <h1 className="display mt-5 text-4xl text-white sm:text-7xl">
                    Let's put AI within reach of <span className="text-gradient">every</span> student.
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-white/60">
                    Whether you fund education, run a school, or want to teach — we'd love to hear from
                    you. Tell us who you are and we'll reply within a few days.
                </p>
            </Reveal>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
                {PATHS.map((p, i) => (
                    <Reveal key={p.t} delay={i * 90}>
                        <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(p.subject)}`} className="panel ring-grad panel-hover flex h-full flex-col p-7">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl text-lg text-white" style={{ backgroundImage: "linear-gradient(135deg,#2563eb,#22d3ee)" }}>{p.icon}</div>
                            <h3 className="mt-5 font-display text-lg font-bold text-white">{p.t}</h3>
                            <p className="mt-2 flex-1 text-sm text-white/60">{p.d}</p>
                            <span className="mono mt-4 text-sm text-brand-400">Email us →</span>
                        </a>
                    </Reveal>
                ))}
            </div>

            <Reveal className="mt-16 max-w-2xl panel p-7 sm:p-9">
                <h2 className="display text-2xl text-white sm:text-3xl">Send us a note</h2>
                <p className="mt-2 text-sm text-white/50">This opens your email client with everything filled in — no account needed.</p>
                <form onSubmit={onSubmit} className="mt-7 grid gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                        <div><label className="label">Your name</label><input className={inputCls} value={form.name} onChange={set("name")} required /></div>
                        <div><label className="label">Email</label><input type="email" className={inputCls} value={form.email} onChange={set("email")} required /></div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <div><label className="label">Organization</label><input className={inputCls} value={form.org} onChange={set("org")} placeholder="School, foundation, company…" /></div>
                        <div>
                            <label className="label">I am a…</label>
                            <select value={form.role} onChange={set("role")} className={inputCls}>
                                {["Funder / grantmaker", "School / educator", "Volunteer / mentor", "Student", "Other"].map((r) => <option key={r} className="bg-ink-800">{r}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="label">Message</label>
                        <textarea value={form.message} onChange={set("message")} rows={4} required placeholder="Tell us how you'd like to get involved…" className={`${inputCls} resize-y`} />
                    </div>
                    <button type="submit" className="btn-primary sm:w-fit sm:justify-self-start">Compose email →</button>
                </form>
                <p className="mt-6 border-t border-white/10 pt-5 text-sm text-white/50">
                    Prefer to email directly? <a href={`mailto:${EMAIL}`} className="ulink text-brand-400">{EMAIL}</a>
                </p>
            </Reveal>
        </div>
    );
}
