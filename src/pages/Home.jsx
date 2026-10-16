import Hero from "../sections/Hero";
import Goals from "../sections/Goals";
import CurriculumSection from "../sections/CurriculumSection";
import SummitSection from "../sections/SummitSection";
import SupportersSection from "../sections/SupportersSection";
import About from "../sections/About";
import Involved from "../sections/Involved";
import Contact from "../sections/Contact";

export default function Home() {
    return (
        <div id="top">
            <Hero />
            <Goals />
            <SummitSection />
            <CurriculumSection />
            <SupportersSection />
            <About />
            <Involved />
            <Contact />
        </div>
    );
}
