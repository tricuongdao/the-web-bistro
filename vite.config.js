import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Ship syntax older desktop browsers can actually parse. Vite's default
    // build target leaves ES2020 syntax (??, ??=, catch{}) untranspiled, which
    // throws a SyntaxError before a single line of the bundle runs on PCs with
    // older browsers — the whole app, animations included, never mounts.
    // es2017 parses everywhere from Chrome 58 / Firefox 52 / Safari 11 up.
    target: 'es2017',
  },
})
