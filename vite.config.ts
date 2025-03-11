import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  build: {
    rollupOptions: {
      output: {
        // Ensure worker file is bundled correctly
        manualChunks: {
          'pdf.worker': ['pdfjs-dist']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['pdfjs-dist']
  },
  server: {
    
    cors: {
      origin: 'http://localhost:5173', // Allow specific origin
      methods: ['GET', 'POST'], // Allow specific HTTP methods
      allowedHeaders: ['Content-Type'], // Allow specific headers
    },
  }
});
