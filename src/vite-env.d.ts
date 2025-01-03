/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OLA_ACCESS_TOKEN: string
  readonly VITE_OLA_APP_ID: string
  readonly VITE_OLA_APP_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}