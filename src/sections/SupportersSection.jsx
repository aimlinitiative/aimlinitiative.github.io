import Supporters from "../components/Supporters";
import { Item, Stagger } from "../components/fx/Stagger";

export default function SupportersSection() {
    return (
        <section id="supporters" aria-labelledby="supporters-title" className="bg-bg py-22 md:py-30">
            <div className="container-page">
                <Stagger className="max-w-prose">
                    <Item as="h2" id="supporters-title" className="text-h2 text-ink">
                        Who's already in
                    </Item>
                    <Item as="p" className="mt-4 text-lead text-ink2">
                        Nine partners have committed to the summit so far.
                    </Item>
                </Stagger>
                <Supporters />
            </div>
        </section>
    );
}
