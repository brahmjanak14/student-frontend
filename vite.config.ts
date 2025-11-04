// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";

// // Frontend-only Vite configuration
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "src"), // Shortcut to src/
//       "@assets": path.resolve(__dirname, "src/assets"), // Optional, if you use assets folder
//     },
//   },
//   root: path.resolve(__dirname), // Root at project root
//   build: {
//     outDir: path.resolve(__dirname, "dist"),
//     emptyOutDir: true,
//   },
//   server: {
//     port: 5173,
//     open: true,
//     fs: {
//       strict: true,
//     },
//   },
// });
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
        target: "https://welcome-python-api-closest.trycloudflare.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""), // optional
      },
    },
  },
});
