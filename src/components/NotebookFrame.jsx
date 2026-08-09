import Code from "./Code";

/* Raycast-style window "cutout" wrapping a real lesson code cell. */
export default function NotebookFrame({ filename = "lesson.ipynb", tag, code, output, className = "" }) {
    return (
        <div className={`panel overflow-hidden ${className}`}>
            {/* window chrome */}
            <div className="flex items-center gap-3 border-b border-white/[0.08] bg-white/[0.02] px-4 py-3">
                <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-white/15" />
                    <span className="h-3 w-3 rounded-full bg-white/15" />
                    <span className="h-3 w-3 rounded-full bg-white/15" />
                </div>
                <span className="mono text-xs text-white/50">{filename}</span>
                {tag && (
                    <span className="ml-auto rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 mono text-[10px] uppercase tracking-wider text-brand-300">
                        {tag}
                    </span>
                )}
            </div>

            {/* code */}
            <div className="px-4 py-4">
                <Code code={code} />
            </div>

            {/* output */}
            {output && (
                <div className="border-t border-white/[0.08] bg-black/30 px-4 py-3">
                    <div className="mono text-[11px] uppercase tracking-wider text-white/30">Output</div>
                    <pre className="mono mt-1.5 overflow-x-auto text-[12px] leading-relaxed text-white/70">{output}</pre>
                </div>
            )}
        </div>
    );
}
