import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/ol-cad-piramide-error-reproduction/",
  plugins: [react()],
})
