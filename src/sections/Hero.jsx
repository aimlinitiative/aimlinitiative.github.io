import Typewriter from "../components/Typewriter";

export default function Hero() {
    return (
        <>
            {/* ===================== HERO ===================== */}
            <section className="container-page pt-20 pb-20 sm:pt-28 sm:pb-28">
                <div className="mx-auto max-w-3xl text-center">
                    <a href="#summit" className="focusable group mb-8 inline-flex max-w-full items-center gap-2.5 rounded-full border border-line bg-white/70 py-1 pl-1 pr-3.5 text-[13px] font-medium text-muted opacity-0 animate-fade-up transition-colors hover:border-ink/15 hover:text-ink sm:text-sm" style={{ animationDelay: "0ms" }}>
                        <span className="shrink-0 rounded-full bg-accentsoft px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-accent">Late 2026</span>
                        <span className="min-w-0 truncate">
                            <span className="sm:hidden">LA Student AI Summit</span>
                            <span className="hidden sm:inline">LA Student AI Summit and Hackathon</span>
                        </span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </a>
                    <h1 className="display text-balance text-[2.6rem] font-bold leading-[1.02] tracking-tightest text-ink opacity-0 animate-fade-up sm:text-6xl" style={{ animationDelay: "60ms" }}>
                        AI literacy for <span className="text-accent">everyone</span>, everywhere.
                    </h1>
                    <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted opacity-0 animate-fade-up" style={{ animationDelay: "160ms" }}>
                        We build free, open-source AI courses and bring them into public schools.
                        We're starting with LAUSD, the second-largest district in the country.
                    </p>
                    <p className="mt-7 text-base text-muted opacity-0 animate-fade-up" style={{ animationDelay: "220ms" }}>
                        Students learn to{" "}
                        <Typewriter className="display font-semibold text-accent" words={["train their first model", "question the tools they use", "explain how an LLM works", "spot AI bias", "build a working classifier", "solve a real-world problem"]} />
                    </p>
                    <div className="mt-10 flex flex-col items-center justify-center gap-3 opacity-0 animate-fade-up sm:flex-row" style={{ animationDelay: "300ms" }}>
                        <a href="#involved" className="btn-accent w-full sm:w-auto">Get involved</a>
                        <a href="#about" className="btn-ghost w-full sm:w-auto">Learn more</a>
                    </div>
                    <p className="mt-9 text-[13px] uppercase tracking-[0.14em] text-faint opacity-0 animate-fade-up" style={{ animationDelay: "360ms" }}>
                        Advised by people from Google&nbsp;DeepMind &amp; Y&nbsp;Combinator
                    </p>
                </div>
            </section>
        </>
    );
}
