import Curriculum from "../components/Curriculum";
import { Stagger, Item } from "../components/fx/Stagger";

export default function CurriculumSection() {
    return (
        <section id="curriculum" aria-labelledby="curriculum-title" className="bg-surface text-ink">
            <div className="container-page py-22 md:py-30">
                <Stagger className="grid gap-4 md:grid-cols-2 md:items-end md:gap-12">
                    <Item as="h2" id="curriculum-title" className="text-h2 text-balance">
                        Six units, twelve weeks.
                    </Item>
                    <Item as="p" className="max-w-prose text-lead text-ink2 text-pretty">
                        It starts from the basics and ends with a project students build themselves.
                        We taught a 4-week version at LACES. The full course is 12 weeks.
                    </Item>
                </Stagger>
                <Item self className="mt-12 md:mt-16">
                    <Curriculum />
                </Item>
            </div>
        </section>
    );
}
