import Section from "../components/Section";
import Lab from "../components/Lab";
import Note from "../components/Note";

// Unit 1's ethics lab, the one piece of the course a visitor can run here.
export default function Lesson() {
    return (
        <Section id="lesson" tag="Try a lesson" title="98% accurate. Misses a third of the winners."
            intro="A real cell from Unit 1. Try it.">
            <div className="relative mx-auto max-w-[34rem]">
                <Lab />
                <Note dir="left" className="absolute -right-56 top-[52%] hidden w-52 xl:flex" tone="text-blue">accuracy goes up…</Note>
                <Note dir="left" className="absolute -right-60 top-[64%] hidden w-56 xl:flex" tone="text-ora">…while real winners get missed</Note>
            </div>
        </Section>
    );
}
