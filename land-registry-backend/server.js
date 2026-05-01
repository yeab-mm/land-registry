const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import Routes (no Supabase needed)
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/users');
const verificationRoutes = require('./routes/verifications');
const reportsRoutes = require('./routes/reports');
const securityRoutes = require('./routes/security');
const settingsRoutes = require('./routes/settings');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/users', userRoutes);
app.use('/api/admin/verifications', verificationRoutes);
app.use('/api/admin/reports', reportsRoutes);
app.use('/api/admin/security', securityRoutes);
app.use('/api/admin/settings', settingsRoutes);

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running!', 
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

// Root Endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Land Registry API is running',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      admin: '/api/admin'
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   🚀 Land Registry API Server is running!               ║
║                                                          ║
║   📡 Port: ${PORT}                                            ║
║   🌐 URL: http://localhost:${PORT}                           ║
║                                                          ║
║   📊 Health Check: http://localhost:${PORT}/health          ║
║   🔐 Login: http://localhost:${PORT}/api/auth/login         ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
  `);
});