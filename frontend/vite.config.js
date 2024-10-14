import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  css: {
    postcss: './postcss.config.js',  // Correct the syntax here
  },

  server: {
    host:true,
    open: false,
    port: 3000,
  }
});
