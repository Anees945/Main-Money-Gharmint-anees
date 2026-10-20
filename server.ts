import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@moneygharmint.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

async function startServer() {
  const app = express();

  app.use(express.json());

  // Backend Admin Authentication endpoints
  app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    if (
      email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
      password.trim() === ADMIN_PASSWORD
    ) {
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
      return res.json({
        success: true,
        message: 'Authentication successful.',
        token,
        admin: {
          email: ADMIN_EMAIL,
          name: 'Store Administrator',
          role: 'Super Admin',
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid email or password. Please verify your credentials.',
    });
  });

  app.get('/api/admin/verify', (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return res.json({
        success: true,
        authenticated: true,
        admin: {
          email: ADMIN_EMAIL,
          name: 'Store Administrator',
          role: 'Super Admin',
        },
      });
    }
    return res.status(401).json({
      success: false,
      authenticated: false,
      message: 'Invalid or missing authentication token.',
    });
  });

  app.post('/api/admin/logout', (_req, res) => {
    return res.json({
      success: true,
      message: 'Logged out successfully.',
    });
  });

  // Store Data Persistence Endpoints
  const DATA_FILE = path.resolve(__dirname, '.store_data.json');

  const getStoreData = () => {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Could not read store data file:', e);
    }
    return { products: null, settings: null, orders: null };
  };

  const saveStoreData = (data: { products?: any; settings?: any; orders?: any }) => {
    try {
      const existing = getStoreData();
      const updated = { ...existing, ...data };
      fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2), 'utf-8');
      return true;
    } catch (e) {
      console.warn('Could not save store data file:', e);
      return false;
    }
  };

  app.get('/api/products', (_req, res) => {
    const data = getStoreData();
    res.json({ success: true, products: data.products });
  });

  app.post('/api/products', (req, res) => {
    const products = req.body;
    if (Array.isArray(products)) {
      saveStoreData({ products });
      return res.json({ success: true, count: products.length });
    }
    return res.status(400).json({ success: false, message: 'Products array required' });
  });

  app.get('/api/settings', (_req, res) => {
    const data = getStoreData();
    res.json({ success: true, settings: data.settings });
  });

  app.post('/api/settings', (req, res) => {
    const newSettings = req.body;
    if (newSettings && typeof newSettings === 'object') {
      const current = getStoreData();
      const merged = { ...(current.settings || {}), ...newSettings };
      saveStoreData({ settings: merged });
      return res.json({ success: true, settings: merged });
    }
    return res.status(400).json({ success: false, message: 'Settings object required' });
  });

  app.get('/api/orders', (_req, res) => {
    const data = getStoreData();
    res.json({ success: true, orders: data.orders || [] });
  });

  app.post('/api/orders', (req, res) => {
    const orders = req.body;
    if (Array.isArray(orders)) {
      saveStoreData({ orders });
      return res.json({ success: true, count: orders.length });
    }
    return res.status(400).json({ success: false, message: 'Orders array required' });
  });

  // Health endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // In development, hook up Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve dist folder
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Money Gharmint server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
