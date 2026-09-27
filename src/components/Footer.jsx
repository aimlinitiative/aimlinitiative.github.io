import { useLocation } from "react-router-dom";
import { EMAIL, NAV, ORG, SOCIALS } from "../content/site";

const linkCls = "inline-flex min-h-[44px] items-center text-sm text-ink2 transition-colors duration-base hover:text-ink md:min-h-0 md:py-1";
const labelCls = "text-caption font-medium text-ink3";

export default function Footer() {
    const { pathname } = useLocation();
    const base = pathname === "/" ? "" : "/";
    const github = SOCIALS.find((s) => s.label === "GitHub");

    return (
        <footer className="border-t border-line bg-bg">
            <div className="container-page py-16">
                <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr]">
                    <div>
                        <p className="text-base font-semibold text-ink">{ORG.short}</p>
                        <p className="mt-1 text-sm text-ink2">{ORG.name} · {ORG.city}</p>
                    </div>

                    <nav aria-labelledby="footer-sections">
                        <p id="footer-sections" className={labelCls}>Sections</p>
                        <ul className="mt-3 md:space-y-1">
                            {NAV.map((l) => (
                                <li key={l.id}><a href={`${base}#${l.id}`} className={linkCls}>{l.label}</a></li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <p className={labelCls}>Contact</p>
                        <ul className="mt-3 md:space-y-1">
                            <li><a href={`mailto:${EMAIL}`} className={`${linkCls} break-all`}>{EMAIL}</a></li>
                            {github && (
                                <li><a href={github.href} target="_blank" rel="noreferrer" className={linkCls}>GitHub</a></li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-line pt-6">
                    <p className="max-w-3xl text-caption text-ink3">
                        © {new Date().getFullYear()} {ORG.name}. Fiscally sponsored by {ORG.fiscalSponsor}, a 501(c)(3) nonprofit,
                        EIN <span className="tabular whitespace-nowrap">{ORG.ein}</span>. Founded by {ORG.founders.join(" and ")}.
                    </p>
                </div>
            </div>
        </footer>
    );
}
