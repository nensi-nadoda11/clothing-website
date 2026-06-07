const DEFAULT_BACKEND_PORT = 4000;
const DEFAULT_HOST = '0.0.0.0';

function toPort(value, fallback) {
  const port = Number(value);
  return Number.isInteger(port) && port > 0 ? port : fallback;
}

export function getBackendPort(env = process.env) {
  return toPort(env.PORT || env.BACKEND_PORT, DEFAULT_BACKEND_PORT);
}

export function getHost(env = process.env) {
  return env.HOST || DEFAULT_HOST;
}
