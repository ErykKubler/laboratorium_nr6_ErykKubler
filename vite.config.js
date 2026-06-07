import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/laboratorium_nr6_ErykKubler/',
  plugins: [
    tailwindcss(),
  ],
})