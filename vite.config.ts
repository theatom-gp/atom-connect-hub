import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif/i.test(ext)) {
            return `assets/images/[name]-[hash].[ext]`;
          }
          return `assets/[name]-[hash].[ext]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        manualChunks: {
          // Vendor chunks - separate heavy third-party libraries
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-firebase': ['firebase/app', 'firebase/firestore', 'firebase/storage', 'firebase/functions'],
          'vendor-ui': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label',
            '@radix-ui/react-popover',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip'
          ],
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'vendor-animations': ['framer-motion'],
          'vendor-utils': ['clsx', 'tailwind-merge', 'class-variance-authority'],
          
          // Individual conference pages - each conference loads separately
          'conference-aisummit': ['./src/pages/conference/AISummit'],
          'conference-tech': ['./src/pages/conference/TechInnovationExpo'],
          'conference-healthcare': ['./src/pages/conference/GlobalHealthcareRevolution'],
          'conference-finance': ['./src/pages/conference/GlobalFinanceSummit'],
          'conference-forensic': ['./src/pages/conference/ForensicScience'],
          'conference-energy': ['./src/pages/conference/PowerandEnergy'],
          'conference-quantum': ['./src/pages/conference/QuantumComputing'],
          'conference-biomaterials': ['./src/pages/conference/Biomaterials'],
          'conference-surgery': ['./src/pages/conference/SurgeryandAnesthesia'],
          'conference-neurology': ['./src/pages/conference/Neurology'],
          
          // Individual form pages - each form loads separately
          'form-registration': ['./src/pages/Registration'],
          'form-abstract': ['./src/pages/AbstractSubmission'],
          
          // Policies chunk - group policy pages
          'policies': [
            './src/pages/CancellationPolicy',
            './src/pages/PrivacyPolicy',
            './src/pages/TermsAndConditions',
            './src/pages/FAQ',
            './src/pages/Contact',
            './src/pages/PresentationGuidelines',
            './src/pages/VisaInvitation'
          ]
        }
      },
    },
  },
  preview: {
    port: 5000,
    host: true
  }
}));
