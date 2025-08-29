import { defineConfig, splitVendorChunkPlugin } from "vite";
import legacy from "@vitejs/plugin-legacy";
import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import image from "@rollup/plugin-image";

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [
    react(),
    visualizer(),
    image(),
    splitVendorChunkPlugin(),
    legacy({
      targets: ["defaults", "not IE 11"]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      lodash: "lodash-es"
    }
  },
  server: {
    port: 3000
  },
  build: {
    outDir: "dist",
    assetsDir: "static",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000, // Increased limit to avoid warnings for optimized chunks
    modulePreload: {
      polyfill: true
    },
    rollupOptions: {
      output: {
        chunkFileNames: "static/js/[name].[hash:12].chunk.js",
        entryFileNames: "static/js/[name].[hash:12].js",
        assetFileNames: (info) => {
          if (["css", "sass", "scss"].some((ext) => info.name?.endsWith("." + ext))) {
            return "static/css/[name].[hash:12].[ext]";
          }

          if (["png", "jpg", "jpeg", "gif", "svg"].some((ext) => info.name?.endsWith("." + ext))) {
            return "static/img/[name].[hash:12].[ext]";
          }

          return "static/media/[name].[hash:12].[ext]";
        },
        manualChunks: {
          // React ecosystem
          "react-vendor": ["react", "react-dom", "react-router", "react-router-dom"],
          
          // MUI ecosystem (largest contributor to bundle size)
          "mui-core": ["@mui/material", "@mui/system", "@mui/base"],
          "mui-icons": ["@mui/icons-material"],
          "mui-lab": ["@mui/lab"],
          "mui-x": ["@mui/x-data-grid", "@mui/x-date-pickers"],
          
          // Emotion (MUI's CSS-in-JS solution)
          "emotion": ["@emotion/react", "@emotion/styled", "@emotion/cache"],
          
          // State management
          "state-management": ["@reduxjs/toolkit", "redux", "react-redux"],
          
          // Charts and visualization
          "charts": ["apexcharts", "react-apexcharts"],
          
          // Forms and validation
          "forms": ["formik", "yup"],
          
          // Internationalization
          "i18n": ["i18next", "react-i18next", "i18next-browser-languagedetector"],
          
          // Animation
          "animation": ["framer-motion"],
          
          // Utilities
          "utils": ["lodash-es", "dayjs", "axios", "qs"],
          
          // Crypto and security
          "crypto": ["crypto-js", "crypto-browserify"],
          
          // UI components and styling
          "ui-misc": [
            "notistack",
            "react-material-ui-carousel", 
            "qrcode.react",
            "emoji-picker-react",
            "markdown-to-jsx",
            "mui-markdown",
            "prism-react-renderer"
          ],
          
          // Ant Design
          "antd": ["@ant-design/colors", "@ant-design/icons"],
          
          // Hooks and utilities
          "hooks": ["ahooks", "@ahooksjs/use-url-state", "react-timer-hook", "constate"],
          
          // Development and build tools (should be dev dependencies but included here for safety)
          "dev-tools": ["web-vitals", "react-ga4"]
        }
      }
    }
  }
});
