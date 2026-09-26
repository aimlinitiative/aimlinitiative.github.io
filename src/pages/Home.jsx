import Hero from "../sections/Hero";
import About from "../sections/About";
import Work from "../sections/Work";
import CurriculumSection from "../sections/CurriculumSection";
import SummitSection from "../sections/SummitSection";
import SupportersSection from "../sections/SupportersSection";
import Involved from "../sections/Involved";
import Contact from "../sections/Contact";

/* The landing page is one long scroll; each section lives in src/sections. */
export default function Home() {
    return (
        <div id="top">
            <Hero />
            <About />
            <Work />
            <CurriculumSection />
            <SummitSection />
            <SupportersSection />
            <Involved />
            <Contact />
        </div>
    );
}
