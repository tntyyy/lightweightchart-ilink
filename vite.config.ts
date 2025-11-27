import { defineConfig } from 'vite'
import svgr from "vite-plugin-svgr";
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      tailwindcss(),       // Tailwind должен быть ВПЕРЕДИ
      tsconfigPaths(),
      svgr({
          svgrOptions: { icon: true },
      }),
      react(),
  ],
})
