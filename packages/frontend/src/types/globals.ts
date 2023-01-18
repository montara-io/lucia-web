export {}

declare global {
  interface Window {
    __RUNTIME_CONFIG__: {
      NODE_ENV: string
      REACT_APP_BACKEND_URL: string
      REACT_APP_AUTH_SERVICE_URL: string
    }
  }
}
