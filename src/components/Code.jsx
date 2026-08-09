/* Minimal, dependency-free Python syntax highlighter. */
const KW = new Set("import from as def return if elif else for in while try except finally with class and or not is None True False lambda print yield pass break continue".split(" "));
const BUILTIN = new Set("np pd plt LogisticRegression DecisionTreeClassifier train_test_split accuracy_score classification_report confusion_matrix make_classification range len fit predict array seed".split(" "));

const COLORS = {
    c: "text-white/35 italic",   // comment
    s: "text-cyan-300",          // string
    n: "text-amber-400",         // number
    k: "text-brand-400 font-medium", // keyword
    b: "text-brand-300",         // builtin
    i: "text-white/85",          // identifier
    p: "text-white/45",          // punctuation
    w: "",                       // whitespace
};

function tokenize(src) {
    const out = [];
    const re = /(#.*$)|("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\d+\.?\d*)|([A-Za-z_][A-Za-z0-9_]*)|(\s+)|(.)/gm;
    let m;
    while ((m = re.exec(src)) !== null) {
        if (m[1]) out.push(["c", m[1]]);
        else if (m[2]) out.push(["s", m[2]]);
        else if (m[3]) out.push(["n", m[3]]);
        else if (m[4]) out.push([KW.has(m[4]) ? "k" : BUILTIN.has(m[4]) ? "b" : "i", m[4]]);
        else if (m[5]) out.push(["w", m[5]]);
        else out.push(["p", m[6]]);
        if (m.index === re.lastIndex) re.lastIndex++;
    }
    return out;
}

export default function Code({ code, className = "" }) {
    const tokens = tokenize(code.replace(/\n+$/, ""));
    return (
        <pre className={`mono overflow-x-auto text-[12.5px] leading-relaxed ${className}`}>
            <code>
                {tokens.map((t, i) => (
                    <span key={i} className={COLORS[t[0]]}>{t[1]}</span>
                ))}
            </code>
        </pre>
    );
}
