const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

async function request(path, options = {}) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong.');
  }

  return data;
}

function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  getHome: () => request('/api/home'),
  getProducts: (query = '') => request(`/api/products${query}`),
  getProduct: (slug) => request(`/api/products/${slug}`),
  getSite: () => request('/api/site'),
  post: (path, payload) =>
    request(path, {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  submitContact: (payload) =>
    request('/api/contact', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  submitOrder: (payload) =>
    request('/api/orders', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  trackOrder: (orderId) => request(`/api/orders/${encodeURIComponent(orderId)}/track`),
  register: (payload) =>
    request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  login: (payload) =>
    request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  getMe: (token) =>
    request('/api/auth/me', {
      headers: authHeaders(token)
    }),
  logout: (token) =>
    request('/api/auth/logout', {
      method: 'POST',
      headers: authHeaders(token)
    })
};
