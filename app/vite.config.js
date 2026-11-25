import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // On GitHub Pages the site lives at /stitch-user-interface-tests/.
  // Locally we keep the normal root address so the dev link still works.
  base: command === 'build' ? '/stitch-user-interface-tests/' : '/',
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: true,
  },
}))
