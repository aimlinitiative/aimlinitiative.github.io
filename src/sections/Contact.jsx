import Section from "../components/Section";
import { EMAIL } from "../lib/site";

export default function Contact() {
    return (
        <Section id="contact" label="Contact">
            <a href={`mailto:${EMAIL}`} className="block break-words text-h2 underline decoration-line decoration-2 underline-offset-[10px] transition-colors hover:decoration-fg">
                {EMAIL}
            </a>
            <p className="mt-8 text-body text-dim">Partner, fund, teach, or just say hi. We answer every message.</p>
        </Section>
    );
}
