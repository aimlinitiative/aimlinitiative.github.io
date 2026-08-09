import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

// GitHub Pages serves 404.html for any unknown path. Because this is a
// client-routed SPA, we copy the built index.html to 404.html so deep links
// and page refreshes (e.g. /about, /demo) boot the app instead of 404-ing.
function spaFallback() {
    return {
        name: 'spa-404-fallback',
        closeBundle() {
            const dist = resolve(process.cwd(), 'dist')
            const index = resolve(dist, 'index.html')
            if (existsSync(index)) copyFileSync(index, resolve(dist, '404.html'))
        },
    }
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), spaFallback()],
    base: "/",
})
