// A heading whose words sharpen from a blur and rise, one after another, when
// its Reveal parent scrolls into view (after Hivemind's section heads).
export default function Words({ text }) {
    const w = text.split(" ");
    return w.map((x, i) => (
        <span key={i}><span className="rw" style={{ "--d": `${i * 55}ms` }}>{x}</span>{i < w.length - 1 ? " " : ""}</span>
    ));
}
