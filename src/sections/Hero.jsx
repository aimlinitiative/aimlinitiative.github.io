export default function Hero() {
    return (
        <section className="page grid12 pb-24 pt-24 lg:pb-40 lg:pt-44">
            <h1 className="col-span-12 text-balance text-hero lg:col-span-11">
                AI literacy for every public school student.
            </h1>
            <p className="col-span-12 mt-10 max-w-measure text-pretty text-body text-dim lg:col-span-5 lg:col-start-5 lg:mt-16">
                We write free, open-source AI courses and teach them in public schools, starting with LAUSD,
                the second-largest district in the country.
            </p>
            <div className="col-span-12 mt-10 flex items-center gap-8 lg:col-span-7 lg:col-start-5">
                <a href="#involved" className="btn-primary">Get involved</a>
                <a href="#curriculum" className="btn-secondary">Read the curriculum</a>
            </div>
            <p className="label col-span-12 mt-20 lg:col-span-7 lg:col-start-5 lg:mt-28">
                Advised by people from Google DeepMind and Y Combinator.
            </p>
        </section>
    );
}
