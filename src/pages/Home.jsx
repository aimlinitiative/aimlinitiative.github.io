import Hero from "../sections/Hero";
import SummitSection from "../sections/SummitSection";
import CurriculumSection from "../sections/CurriculumSection";
import Lesson from "../sections/Lesson";
import Goals from "../sections/Goals";
import About from "../sections/About";
import Involved from "../sections/Involved";
import Contact from "../sections/Contact";

// The story in order: what we do, the summit, the course, a lesson you can
// run, where we're going, who we are, how to help.
export default function Home() {
    return (
        <div>
            <Hero />
            <SummitSection />
            <CurriculumSection />
            <Lesson />
            <Goals />
            <About />
            <Involved />
            <Contact />
        </div>
    );
}
