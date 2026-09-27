import { fileURLToPath } from "node:url";

// Point Tailwind at its config explicitly so styles don't depend on the folder the dev server starts from.
export default {
  plugins: {
    tailwindcss: { config: fileURLToPath(new URL("./tailwind.config.js", import.meta.url)) },
    autoprefixer: {},
  },
}
