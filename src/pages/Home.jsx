import Hero from "../sections/Hero";
import SummitSection from "../sections/SummitSection";
import CurriculumSection from "../sections/CurriculumSection";
import Lesson from "../sections/Lesson";
import About from "../sections/About";
import Involved from "../sections/Involved";
import Contact from "../sections/Contact";

// The story in order: the summit, the course and its path into LAUSD, a
// lesson you can run, who we are, how to help.
export default function Home() {
    return (
        <div>
            <Hero />
            <SummitSection />
            <CurriculumSection />
            <Lesson />
            <About />
            <Involved />
            <Contact />
        </div>
    );
}
