import { EMAIL, GITHUB } from "../lib/site";

export default function Footer() {
    return (
        <footer className="foot">
            <span>AIML-LI · AI/ML Literacy Initiative · Los Angeles</span>
            <span>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a> · <a href={GITHUB}>GitHub</a>
            </span>
        </footer>
    );
}
