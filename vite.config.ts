// import fs from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import preload from 'vite-plugin-preload'
import tailwindcss from '@tailwindcss/vite'
import { analyzer } from 'vite-bundle-analyzer'
// import viteTsConfigPaths from 'vite-tsconfig-paths'
import { compression } from 'vite-plugin-compression2'
// import { defineConfig } from '@tanstack/react-start/config'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

const ReactCompilerConfig = {
  target: '19' // '17' | '18' | '19'
};

const DEFAULT_OPTIONS = {
  test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
  exclude: undefined,
  include: undefined,
  includePublic: true,
  logStats: true,
  ansiColors: true,
  svg: {
    multipass: true,
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            cleanupNumericValues: false,
            removeViewBox: false // https://github.com/svg/svgo/issues/1128
          },
          cleanupIDs: {
            minify: false,
            remove: false
          },
          convertPathData: false
        }
      },
      'sortAttrs',
      {
        name: 'addAttributesToSVGElement',
        params: {
          attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }]
        }
      }
    ]
  },
  png: {
    // https://sharp.pixelplumbing.com/api-output#png
    quality: 100
  },
  jpeg: {
    // https://sharp.pixelplumbing.com/api-output#jpeg
    quality: 100
  },
  jpg: {
    // https://sharp.pixelplumbing.com/api-output#jpeg
    quality: 100
  },
  tiff: {
    // https://sharp.pixelplumbing.com/api-output#tiff
    quality: 100
  },
  // gif does not support lossless compression
  // https://sharp.pixelplumbing.com/api-output#gif
  gif: {},
  webp: {
    // https://sharp.pixelplumbing.com/api-output#webp
    lossless: true
  },
  avif: {
    // https://sharp.pixelplumbing.com/api-output#avif
    lossless: true
  },
  cache: false,
  cacheLocation: undefined
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  
  return {
    plugins: [
      TanStackRouterVite({ autoCodeSplitting: true, target: 'react' }),
      react(),
      tailwindcss(),
      isProduction && compression(),
      isProduction && analyzer(),
      isProduction && preload(),
      isProduction && ViteImageOptimizer(DEFAULT_OPTIONS),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      // headers: {
      //   "cache-control": "no-cache, no-store, must-revalidate",
      //   "content-type": "text/html; charset=utf-8",
      //   "x-xss-protection": "1; mode=block",
      //   "referrer-policy": "origin-when-cross-origin",
      // },
      proxy: {
        '/create-checkout-session': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/create-account': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/update-account': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/delete-account': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/get-information': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/refund-updating': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/refund-full-order': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/refund-partial-order': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/refund-checking': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/refund-canceling': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      }
    },
    // optimizeDeps: {
    //   include: [
    //     '@tanstack/react-query',
    //     '@tanstack/react-query-devtools',
    //     '@tanstack/react-query-persist-client',
    //     '@tanstack/react-router'
    //   ],
    //   esbuildOptions: {
    //     target: 'esnext'
    //   },
    //   force: true
    // },
    // build: {
    //   sourcemap: true,
    //   rollupOptions: {
    //     output: {
    //       manualChunks: {
    //         vendor: ['react', 'react-dom'],
    //         router: ['@tanstack/react-router'],
    //         query: ['@tanstack/react-query']
    //       }
    //     }
    //   }
    // },
    ssr: {
      noExternal: ['@supabase/supabase-js'],
    }
  };
});



// // export default defineConfig({
// //   tsr: {
// //     autoCodeSplitting: true,
// //   },
// //   vite: {
// //     forceOptimizeDeps: true,
// //     plugins: [
// //       TanStackRouterVite({ autoCodeSplitting: true, target: 'react' }),
// //       tailwindcss(),
// //       compression(),
// //       analyzer(),
// //       ViteImageOptimizer(DEFAULT_OPTIONS),
// //       preload(),
// //       viteTsConfigPaths({
// //         projects: ['./tsconfig.json'],
// //       }),
// //     ],
// //     optimizeDeps: {
// //       include: [
// //         '@tanstack/react-query',
// //         '@tanstack/react-router',
// //         '@tanstack/react-query-devtools',
// //         '@tanstack/react-query-persist-client',
// //       ],
// //       force: true,
// //     },
// //     ssr: {
// //       noExternal: ['@supabase/supabase-js']
// //     }
// //   },
// //   server: {
// //     devProxy: {
// //         '/create-checkout-session': {
// //           target: 'http://localhost:3001',
// //           changeOrigin: true
// //         },
// //         '/create-account': {
// //           target: 'http://localhost:3001',
// //           changeOrigin: true
// //         },
// //         '/update-account': {
// //           target: 'http://localhost:3001',
// //           changeOrigin: true
// //         },
// //         '/delete-account': {
// //           target: 'http://localhost:3001',
// //           changeOrigin: true
// //         },
// //         '/get-information': {
// //           target: 'http://localhost:3001',
// //           changeOrigin: true
// //         },
// //         '/refund-updating': {
// //           target: 'http://localhost:3001',
// //           changeOrigin: true
// //         },
// //         '/refund-full-order': {
// //           target: 'http://localhost:3001',
// //           changeOrigin: true
// //         },
// //         '/refund-partial-order': {
// //           target: 'http://localhost:3001',
// //           changeOrigin: true
// //         },
// //         '/refund-checking': {
// //           target: 'http://localhost:3001',
// //           changeOrigin: true
// //         },
// //         '/refund-canceling': {
// //           target: 'http://localhost:3001',
// //           changeOrigin: true
// //         },
// //         '/api': {
// //           target: 'http://localhost:3000',
// //           changeOrigin: true
// //         },
// //     }
// //   },
// //   react: {
// //     babel:
// //         {
// //           plugins: [
// //             ["babel-plugin-react-compiler", ReactCompilerConfig]
// //           ]
// //         }
// //     }
// // })