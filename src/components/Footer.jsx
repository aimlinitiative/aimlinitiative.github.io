export default function Footer() {
    return (
        <footer className="border-t bg-white">
            <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600">
                <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                    <p>© {new Date().getFullYear()} AIML Initiative</p>
                    <div className="flex items-center gap-4">
                        <a
                            className="hover:text-gray-900"
                            href="https://github.com/aimlinitiative"
                            target="_blank"
                            rel="noreferrer"
                        >
                            GitHub
                        </a>
                        <a className="hover:text-gray-900" href="#contact">
                            Contact
                        </a>
                        <a className="hover:text-gray-900" href="#privacy">
                            Privacy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
