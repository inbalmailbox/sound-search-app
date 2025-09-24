import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // Allow in the *top document* for any origin (dev only)
      // NOTE: Use comma between directives (not semicolon)
      'Permissions-Policy': 'encrypted-media=*, autoplay=*',
    },
  },
});
