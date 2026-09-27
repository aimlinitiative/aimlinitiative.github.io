import Hero from "../sections/Hero";
import About from "../sections/About";
import Work from "../sections/Work";
import CurriculumSection from "../sections/CurriculumSection";
import SummitSection from "../sections/SummitSection";
import SupportersSection from "../sections/SupportersSection";
import Involved from "../sections/Involved";
import Contact from "../sections/Contact";
import SectionTransition from "../components/chrome/SectionTransition";

/* The landing page is one long scroll; each section lives in src/sections.
 * The dark stages open from an inset rounded card as they scroll in. Hero, Work
 * and Summit pin with position: sticky, so they must not be wrapped. */
export default function Home() {
    return (
        <div id="top">
            <Hero />
            <About />
            <Work />
            {/* parchment behind the opening card, so the reveal matches How it works above */}
            <div className="bg-parchment">
                <SectionTransition><CurriculumSection /></SectionTransition>
            </div>
            <SummitSection />
            <SupportersSection />
            <Involved />
            <SectionTransition><Contact /></SectionTransition>
        </div>
    );
}
