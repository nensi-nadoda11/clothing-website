import cors from 'cors';
import express from 'express';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  categories,
  collections,
  faqs,
  hero,
  lookbook,
  navigation,
  policies,
  products,
  site,
  stats,
  testimonials,
  trustBadges
} from './data/site-data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 4000;
const frontendDist = path.resolve(__dirname, '../../frontend/dist');
const authStorePath = path.resolve(__dirname, './data/auth-store.json');
const defaultAuthStore = { users: [], sessions: [] };

app.use(cors());
app.use(express.json({ limit: '1mb' }));

function formatOrderNumber() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `MA-${random}`;
}

function normalize(value) {
  return String(value ?? '').trim().toLowerCase();
}

function safeReadJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return JSON.parse(JSON.stringify(fallback));
  }
}

function safeWriteJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function readAuthStore() {
  const store = safeReadJson(authStorePath, defaultAuthStore);

  if (!Array.isArray(store.users) || !Array.isArray(store.sessions)) {
    return { users: [], sessions: [] };
  }

  return store;
}

function writeAuthStore(store) {
  safeWriteJson(authStorePath, store);
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt
  };
}

function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function createPasswordRecord(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  return {
    salt,
    hash: hashPassword(password, salt)
  };
}

function verifyPassword(password, record) {
  if (!record?.salt || !record?.hash) {
    return false;
  }

  const hash = hashPassword(password, record.salt);
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(record.hash, 'hex'));
}

function createSession(userId) {
  return {
    token: crypto.randomBytes(32).toString('hex'),
    userId,
    createdAt: new Date().toISOString()
  };
}

function getBearerToken(request) {
  const header = request.get('authorization') || '';

  if (header.toLowerCase().startsWith('bearer ')) {
    return header.slice(7).trim();
  }

  return '';
}

function getSessionUser(request) {
  const token = getBearerToken(request);

  if (!token) {
    return null;
  }

  const store = readAuthStore();
  const session = store.sessions.find((item) => item.token === token);

  if (!session) {
    return null;
  }

  const user = store.users.find((item) => item.id === session.userId);
  return user || null;
}

function getBaseTotals(items = []) {
  return items.reduce(
    (accumulator, item) => {
      const quantity = Number(item.quantity || 0);
      const price = Number(item.price || 0);
      accumulator.subtotal += price * quantity;
      accumulator.items += quantity;
      return accumulator;
    },
    { subtotal: 0, items: 0 }
  );
}

function calculateSummary(items = [], couponCode = '') {
  const totals = getBaseTotals(items);
  const discount = normalize(couponCode) === 'demo10' ? Math.round(totals.subtotal * 0.1) : 0;
  const discountedSubtotal = Math.max(totals.subtotal - discount, 0);
  const shipping = discountedSubtotal >= 4999 || discountedSubtotal === 0 ? 0 : 149;
  const tax = Math.round(discountedSubtotal * 0.05);
  const total = discountedSubtotal + shipping + tax;

  return {
    items: totals.items,
    subtotal: totals.subtotal,
    discount,
    shipping,
    tax,
    total
  };
}

function filterProducts(query = {}) {
  const search = normalize(query.q);
  const category = normalize(query.category);
  const size = normalize(query.size);
  const color = normalize(query.color);
  const tag = normalize(query.tag);
  const minPrice = Number(query.minPrice ?? 0);
  const maxPrice = Number(query.maxPrice ?? Number.POSITIVE_INFINITY);
  const inStock = normalize(query.inStock);
  const sort = normalize(query.sort);

  let result = [...products];

  if (search) {
    result = result.filter((product) => {
      const haystack = [
        product.name,
        product.category,
        product.description,
        ...(product.tags || []),
        ...(product.badges || []),
        ...(product.colors || []),
        ...(product.sizes || [])
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(search);
    });
  }

  if (category) {
    result = result.filter((product) => normalize(product.category) === category);
  }

  if (size) {
    result = result.filter((product) => product.sizes.map(normalize).includes(size));
  }

  if (color) {
    result = result.filter((product) => product.colors.map(normalize).includes(color));
  }

  if (tag) {
    result = result.filter((product) => product.tags.map(normalize).includes(tag));
  }

  if (inStock === 'true') {
    result = result.filter((product) => product.inStock);
  }

  result = result.filter((product) => product.price >= minPrice && product.price <= maxPrice);

  if (sort === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'newest') {
    result.sort((a, b) => b.id - a.id);
  } else {
    result.sort((a, b) => Number(b.featured) - Number(a.featured) || b.reviewsCount - a.reviewsCount);
  }

  return result;
}

app.get('/api/health', (_request, response) => {
  response.json({ ok: true, service: 'clothing-demo-backend' });
});

app.get('/api/site', (_request, response) => {
  response.json({
    site,
    navigation,
    categories,
    trustBadges,
    stats,
    testimonials,
    policies,
    faqs,
    lookbook
  });
});

app.get('/api/home', (_request, response) => {
  const featuredProducts = products.filter((product) => product.featured);

  response.json({
    hero,
    categories,
    trustBadges,
    stats,
    testimonials,
    lookbook,
    featuredProducts,
    collections: collections.map((collection) => ({
      ...collection,
      products: collection.productSlugs
        .map((slug) => products.find((product) => product.slug === slug))
        .filter(Boolean)
    }))
  });
});

app.get('/api/products', (request, response) => {
  const result = filterProducts(request.query);

  response.json({
    items: result,
    meta: {
      total: result.length,
      categories: [...new Set(result.map((product) => product.category))],
      colors: [...new Set(result.flatMap((product) => product.colors))],
      sizes: [...new Set(result.flatMap((product) => product.sizes))]
    }
  });
});

app.get('/api/products/:slug', (request, response) => {
  const product = products.find((item) => item.slug === request.params.slug);

  if (!product) {
    response.status(404).json({ message: 'Product not found' });
    return;
  }

  const related = products
    .filter((item) => item.slug !== product.slug && item.category === product.category)
    .slice(0, 4);

  response.json({ product, related });
});

app.get('/api/collections', (_request, response) => {
  response.json(
    collections.map((collection) => ({
      ...collection,
      products: collection.productSlugs
        .map((slug) => products.find((product) => product.slug === slug))
        .filter(Boolean)
    }))
  );
});

app.get('/api/policies', (_request, response) => {
  response.json({ policies, faqs });
});

app.post('/api/contact', (request, response) => {
  const { name, email, message } = request.body || {};

  if (!name || !email || !message) {
    response.status(400).json({ message: 'Name, email, and message are required.' });
    return;
  }

  response.json({
    message: `Thanks ${name}, we received your message and will reply soon.`,
    receivedAt: new Date().toISOString()
  });
});

app.post('/api/checkout/summary', (request, response) => {
  const items = Array.isArray(request.body?.items) ? request.body.items : [];
  const couponCode = request.body?.couponCode || '';

  response.json({
    summary: calculateSummary(items, couponCode)
  });
});

app.post('/api/orders', (request, response) => {
  const items = Array.isArray(request.body?.items) ? request.body.items : [];
  const customer = request.body?.customer || {};
  const summary = calculateSummary(items, request.body?.couponCode || '');

  if (!items.length) {
    response.status(400).json({ message: 'Cart is empty.' });
    return;
  }

  if (!customer.name || !customer.email || !customer.address) {
    response.status(400).json({ message: 'Customer name, email, and address are required.' });
    return;
  }

  response.json({
    orderId: formatOrderNumber(),
    status: 'confirmed',
    estimatedDelivery: '3-5 business days',
    summary,
    customer,
    note: 'This is a demo order response. Replace with real payment and database logic later.'
  });
});

app.post('/api/auth/register', (request, response) => {
  const name = String(request.body?.name || '').trim();
  const email = String(request.body?.email || '').trim().toLowerCase();
  const password = String(request.body?.password || '');

  if (!name || !email || !password) {
    response.status(400).json({ message: 'Name, email, and password are required.' });
    return;
  }

  if (password.length < 6) {
    response.status(400).json({ message: 'Password must be at least 6 characters long.' });
    return;
  }

  const store = readAuthStore();

  if (store.users.some((user) => user.email === email)) {
    response.status(409).json({ message: 'An account with this email already exists.' });
    return;
  }

  const passwordRecord = createPasswordRecord(password);
  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    ...passwordRecord,
    createdAt: new Date().toISOString()
  };
  const session = createSession(user.id);

  store.users.push(user);
  store.sessions.push(session);
  writeAuthStore(store);

  response.status(201).json({
    token: session.token,
    user: publicUser(user)
  });
});

app.post('/api/auth/login', (request, response) => {
  const email = String(request.body?.email || '').trim().toLowerCase();
  const password = String(request.body?.password || '');

  if (!email || !password) {
    response.status(400).json({ message: 'Email and password are required.' });
    return;
  }

  const store = readAuthStore();
  const user = store.users.find((item) => item.email === email);

  if (!user || !verifyPassword(password, user)) {
    response.status(401).json({ message: 'Invalid email or password.' });
    return;
  }

  const session = createSession(user.id);
  store.sessions.push(session);
  writeAuthStore(store);

  response.json({
    token: session.token,
    user: publicUser(user)
  });
});

app.get('/api/auth/me', (request, response) => {
  const user = getSessionUser(request);

  if (!user) {
    response.status(401).json({ message: 'Not authenticated.' });
    return;
  }

  response.json({ user: publicUser(user) });
});

app.post('/api/auth/logout', (request, response) => {
  const token = getBearerToken(request);

  if (token) {
    const store = readAuthStore();
    store.sessions = store.sessions.filter((session) => session.token !== token);
    writeAuthStore(store);
  }

  response.json({ message: 'Logged out successfully.' });
});

if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));

  app.get('*', (request, response, next) => {
    if (request.path.startsWith('/api/')) {
      next();
      return;
    }

    response.sendFile(path.join(frontendDist, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
