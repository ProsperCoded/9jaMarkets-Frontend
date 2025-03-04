import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            "react",
            "react-dom",
            "react-router-dom",
            "antd",
            "lucide-react",
          ],
          // Split large components into separate chunks
          products: [
            "./src/components/Products/ProductPage.jsx",
            "./src/components/Products/AdPayment.jsx",
            "./src/components/Products/SelectPlan.jsx",
          ],
          markets: [
            "./src/components/Markets.jsx",
            "./src/components/Malls.jsx",
            "./src/components/Marketplace.jsx",
          ],
          ui: ["./src/components/ui/accordion.jsx"],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1000kb
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    hmr: {
      overlay: true,
    },
    force: true, // Force dependency pre-optimization
  },
  optimizeDeps: {
    force: true, // Force dependencies optimization
    include: ["react", "react-dom", "react-router-dom", "antd", "lucide-react"],
  },
  // Clear cache on startup
  // cacheDir: ".vite",
});
