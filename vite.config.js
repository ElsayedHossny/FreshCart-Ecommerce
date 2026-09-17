import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // رفع حد التحذير إلى 1000kB (1MB) بدلاً من 500kB
    chunkSizeWarningLimit: 1000,
  },
});
