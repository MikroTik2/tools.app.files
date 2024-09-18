// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///Users/arturdocenko/Desktop/tools.app.rorate/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/arturdocenko/Desktop/tools.app.rorate/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import tailwind from "file:///Users/arturdocenko/Desktop/tools.app.rorate/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///Users/arturdocenko/Desktop/tools.app.rorate/node_modules/autoprefixer/lib/autoprefixer.js";
import svgLoader from "file:///Users/arturdocenko/Desktop/tools.app.rorate/node_modules/vite-svg-loader/index.js";
var __vite_injected_original_import_meta_url = "file:///Users/arturdocenko/Desktop/tools.app.rorate/vite.config.ts";
var vite_config_default = defineConfig({
  server: {
    open: true,
    host: true,
    port: 3e3,
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin"
    }
  },
  plugins: [
    vue(),
    svgLoader()
  ],
  optimizeDeps: {
    exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"]
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYXJ0dXJkb2NlbmtvL0Rlc2t0b3AvdG9vbHMuYXBwLnJvcmF0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FydHVyZG9jZW5rby9EZXNrdG9wL3Rvb2xzLmFwcC5yb3JhdGUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FydHVyZG9jZW5rby9EZXNrdG9wL3Rvb2xzLmFwcC5yb3JhdGUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCc7XG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xuXG5pbXBvcnQgdGFpbHdpbmQgZnJvbSAndGFpbHdpbmRjc3MnO1xuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tICdhdXRvcHJlZml4ZXInXG5cbmltcG9ydCBzdmdMb2FkZXIgZnJvbSAndml0ZS1zdmctbG9hZGVyJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgc2VydmVyOiB7XG4gICAgICAgIG9wZW46IHRydWUsXG4gICAgICAgIGhvc3Q6IHRydWUsXG4gICAgICAgIHBvcnQ6IDMwMDAsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIFwiQ3Jvc3MtT3JpZ2luLUVtYmVkZGVyLVBvbGljeVwiOiBcInJlcXVpcmUtY29ycFwiLFxuICAgICAgICAgICAgXCJDcm9zcy1PcmlnaW4tT3BlbmVyLVBvbGljeVwiOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcGx1Z2luczogW1xuICAgICAgICB2dWUoKSxcbiAgICAgICAgc3ZnTG9hZGVyKCksXG4gICAgXSxcbiAgICBcbiAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgICAgZXhjbHVkZTogW1wiQGZmbXBlZy9mZm1wZWdcIiwgXCJAZmZtcGVnL3V0aWxcIl0sXG4gICAgfSxcblxuICAgIGNzczoge1xuICAgICAgICBwb3N0Y3NzOiB7XG4gICAgICAgICAgICBwbHVnaW5zOiBbdGFpbHdpbmQoKSwgYXV0b3ByZWZpeGVyKCldLFxuICAgICAgICB9LFxuICAgIH0sXG5cbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICAgfSxcbiAgICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNULFNBQVMsZUFBZSxXQUFXO0FBRXpWLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUVoQixPQUFPLGNBQWM7QUFDckIsT0FBTyxrQkFBa0I7QUFFekIsT0FBTyxlQUFlO0FBUjBLLElBQU0sMkNBQTJDO0FBV2pQLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFFBQVE7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNMLGdDQUFnQztBQUFBLE1BQ2hDLDhCQUE4QjtBQUFBLElBQ2xDO0FBQUEsRUFDSjtBQUFBLEVBRUEsU0FBUztBQUFBLElBQ0wsSUFBSTtBQUFBLElBQ0osVUFBVTtBQUFBLEVBQ2Q7QUFBQSxFQUVBLGNBQWM7QUFBQSxJQUNWLFNBQVMsQ0FBQyxrQkFBa0IsY0FBYztBQUFBLEVBQzlDO0FBQUEsRUFFQSxLQUFLO0FBQUEsSUFDRCxTQUFTO0FBQUEsTUFDTCxTQUFTLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztBQUFBLElBQ3hDO0FBQUEsRUFDSjtBQUFBLEVBRUEsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN4RDtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
