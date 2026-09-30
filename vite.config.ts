import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Windows' native fs.watch throws EBUSY when a file under public/ is still
    // being written (e.g. a batch image-processing script writing photos into
    // public/images while the dev server is running) — polling avoids that.
    watch: { usePolling: true, interval: 300 },
  },
})
