/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CHANGENOW_API_KEY: string
  readonly VITE_CHANGENOW_API_URL: string
  readonly VITE_COINGECKO_API_URL: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_URL: string
  readonly VITE_GA_MEASUREMENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Global type definitions
declare global {
  const __APP_VERSION__: string
  const __BUILD_DATE__: string

  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

// Motion library type extensions
declare module 'motion/react' {
  export * from 'framer-motion'
}

export {}