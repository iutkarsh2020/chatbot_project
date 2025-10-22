import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { // <-- 2. Add the resolve block
    alias: {
      "@": path.resolve(__dirname, "./src"), // <-- 3. Define the alias
    },
  },
})
