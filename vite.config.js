import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: { preprocessorOptions: { scss: { additionalData: "@import \"./src/scss/variables.scss\"; @import \"./src/scss/mixins.scss\";" } } },
  resolve: {
    alias: {
      components: "/src/components",
      modules: "/src/modules",
      store: "/src/store",
      assets: "/src/assets",
      utils: "/src/utils",
      api: "/src/services/api",
      services: "/src/services",
      hooks: "/src/hooks",
    },

  }
});
