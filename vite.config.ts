
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
  port: 5173,
  open: true,
  proxy: {
    "/api": {
      target: "https://student-backend-a1rs.onrender.com",
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path.replace(/^\/api/, ""),
      configure: (proxy, options) => {
        console.log("Proxy is configured", proxy, options);
      },
    },
  },
}
});
