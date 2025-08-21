import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react({
      // Enable React Fast Refresh
      fastRefresh: true,
      // Enable development tools
      devTarget: 'es2022'
    }),
    tailwindcss()
  ],
  
  // Path resolution
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './components'),
      '@/styles': resolve(__dirname, './styles'),
      '@/utils': resolve(__dirname, './utils'),
    },
  },

  // Development server configuration
  server: {
    port: 3000,
    host: true,
    open: true,
    cors: true,
    // Proxy for API calls
    proxy: {
      '/api/changenow': {
        target: 'https://api.changenow.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/changenow/, ''),
        secure: true,
      },
      '/api/coingecko': {
        target: 'https://api.coingecko.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/coingecko/, ''),
        secure: true,
      }
    }
  },

  // Preview configuration
  preview: {
    port: 3000,
    host: true,
    cors: true
  },

  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    target: 'es2020',
    
    // Optimize bundle
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['motion'],
          'ui-vendor': ['lucide-react', 'clsx', 'class-variance-authority', 'tailwind-merge'],
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const extType = info[info.length - 1];
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(assetInfo.name || '')) {
            return `assets/images/[name]-[hash].${extType}`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name || '')) {
            return `assets/fonts/[name]-[hash].${extType}`;
          }
          return `assets/${extType}/[name]-[hash].${extType}`;
        }
      }
    },

    // Terser options for better minification
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },

  // Define environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },

  // Optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'motion',
      'lucide-react',
      'clsx',
      'class-variance-authority',
      'tailwind-merge'
    ],
  },

  // CSS configuration
  css: {
    devSourcemap: true,
  },

  // Environment variables
  envDir: '.',
  envPrefix: 'VITE_',
})