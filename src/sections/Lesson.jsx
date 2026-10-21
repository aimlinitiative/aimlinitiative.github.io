import Section from "../components/Section";
import Lab from "../components/Lab";
import Note from "../components/Note";

// Unit 1's ethics lab, the one piece of the course a visitor can run here.
export default function Lesson() {
    return (
        <Section id="lesson" tag="Try a lesson" title="A model can score 98% and still miss a third of the winners."
            intro="This is a real cell from Unit 1's ethics lab. Make the scholarship rarer and watch what happens.">
            <div className="relative mx-auto max-w-[34rem]">
                <Lab />
                <Note dir="left" className="absolute -right-56 top-[52%] hidden w-52 xl:flex" tone="text-blue">accuracy goes up…</Note>
                <Note dir="left" className="absolute -right-60 top-[64%] hidden w-56 xl:flex" tone="text-ora">…while real winners get missed</Note>
                <Note dir="left" flip className="absolute -left-56 top-[30%] hidden w-52 justify-end xl:flex">click a button</Note>
            </div>
        </Section>
    );
}
