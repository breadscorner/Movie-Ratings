import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5181/",
        changeOrigin: true,
      },
      "/r": {
        target: "http://localhost:5181/",
        ws: true,
      },
    },
  },
  
  plugins: [react(), TanStackRouterVite()],
});
