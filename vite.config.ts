import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  // 构建优化配置
  build: {
    target: 'es2015',
    minify: 'esbuild', // 使用esbuild压缩
    cssMinify: true,
    
    // 代码分割配置
    rollupOptions: {
      output: {
        manualChunks: {
          // 将大型依赖分离到单独的chunk
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip'
          ],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'data-vendor': ['@tanstack/react-query', '@supabase/supabase-js'],
          'chart-vendor': ['recharts'],
          'auth-vendor': ['@clerk/clerk-react'],
          'router-vendor': ['react-router-dom'],
          'utils-vendor': ['class-variance-authority', 'clsx', 'tailwind-merge', 'lucide-react']
        },
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const extType = info[info.length - 1];
          if (/css/i.test(extType)) {
            return 'css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    
    // 压缩配置
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : []
    },
    
    // chunk大小警告限制
    chunkSizeWarningLimit: 600
  }
}));