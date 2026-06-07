import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const DEFAULT_FRONTEND_PORT = 5173;
const DEFAULT_BACKEND_PORT = 4000;

function toPort(value, fallback) {
  const port = Number(value);
  return Number.isInteger(port) && port > 0 ? port : fallback;
}

function getFrontendPort(env) {
  return toPort(env.VITE_DEV_PORT || env.FRONTEND_PORT, DEFAULT_FRONTEND_PORT);
}

function getApiProxyTarget(env) {
  const backendPort = toPort(env.PORT || env.BACKEND_PORT, DEFAULT_BACKEND_PORT);
  return env.VITE_API_PROXY_TARGET || `http://localhost:${backendPort}`;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      port: getFrontendPort(env),
      proxy: {
        '/api': {
          target: getApiProxyTarget(env),
          changeOrigin: true
        }
      }
    },
    build: {
      outDir: 'dist'
    }
  };
});
