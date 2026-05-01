const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Mock data
let listings = [
  { id: 1, title: 'Coffee House', price: 850000, type: 'commercial', status: 'active', views: 245, likes: 12, image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800' },
  { id: 2, title: 'Modern Apartment', price: 1200000, type: 'residential', status: 'pending', views: 189, likes: 8, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },
  { id: 3, title: 'Farm Land', price: 2200000, type: 'agricultural', status: 'active', views: 312, likes: 15, image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800' },
  { id: 4, title: 'Office Space', price: 3200000, type: 'commercial', status: 'sold', views: 278, likes: 5, image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800' }
];

let payments = [
  { id: 1, transactionId: 'TXN-001', payerName: 'Abebe Kebede', amount: 1500, type: 'verification', status: 'completed', method: 'telebirr', date: '2024-03-01' },
  { id: 2, transactionId: 'TXN-002', payerName: 'Tigist Haile', amount: 5000, type: 'transfer', status: 'pending', method: 'cbebirr', date: '2024-03-02' },
  { id: 3, transactionId: 'TXN-003', payerName: 'Biruk Alemu', amount: 2000, type: 'listing', status: 'completed', method: 'cash', date: '2024-03-03' }
];

let notifications = [
  { id: 1, title: 'New User Registered', message: 'Abebe Kebede has registered', type: 'info', read: false, timestamp: new Date(), priority: 'low' },
  { id: 2, title: 'Land Verification Request', message: 'Tigist Haile requested verification', type: 'warning', read: false, timestamp: new Date(), priority: 'high' }
];

// Middleware to verify admin
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mysecretkey');
    if (decoded.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Dashboard Stats
router.get('/stats', verifyAdmin, (req, res) => {
  res.json({
    totalUsers: 15420,
    pendingVerifications: 43,
    activeListings: listings.filter(l => l.status === 'active').length,
    totalRevenue: 3450000
  });
});

// Recent Activities
router.get('/recent-activities', verifyAdmin, (req, res) => {
  res.json([
    { id: 1, user: 'Abebe Kebede', action: 'Registered new account', time: '5 minutes ago', status: 'success' },
    { id: 2, user: 'Tigist Haile', action: 'Submitted land verification', time: '15 minutes ago', status: 'pending' }
  ]);
});

// ============ PAYMENTS ============
router.get('/payments', verifyAdmin, (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const start = (page - 1) * limit;
  const paginated = payments.slice(start, start + limit);
  res.json({
    payments: paginated,
    summary: { total: payments.length, totalAmount: 8500, completedAmount: 3500, pendingAmount: 5000 },
    pagination: { page: parseInt(page), limit: parseInt(limit), total: payments.length, pages: 1 }
  });
});

router.put('/payments/:id/status', verifyAdmin, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  res.json({ message: `Payment ${id} ${status}` });
});

// ============ NOTIFICATIONS ============
router.get('/notifications', verifyAdmin, (req, res) => {
  res.json({ notifications, stats: { total: notifications.length, unread: notifications.filter(n => !n.read).length } });
});

router.put('/notifications/:id/read', verifyAdmin, (req, res) => {
  const { id } = req.params;
  res.json({ message: `Notification ${id} marked as read` });
});

router.put('/notifications/read-all', verifyAdmin, (req, res) => {
  res.json({ message: 'All notifications marked as read' });
});

router.delete('/notifications/:id', verifyAdmin, (req, res) => {
  const { id } = req.params;
  res.json({ message: `Notification ${id} deleted` });
});

router.get('/notifications/unread/count', verifyAdmin, (req, res) => {
  res.json({ count: notifications.filter(n => !n.read).length });
});

// ============ MARKETPLACE ============
router.get('/marketplace/listings', verifyAdmin, (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const start = (page - 1) * limit;
  const paginated = listings.slice(start, start + limit);
  res.json({
    listings: paginated,
    pagination: { page: parseInt(page), limit: parseInt(limit), total: listings.length, pages: 1 }
  });
});

router.get('/marketplace/stats', verifyAdmin, (req, res) => {
  res.json({
    totalListings: listings.length,
    activeListings: listings.filter(l => l.status === 'active').length,
    pendingListings: listings.filter(l => l.status === 'pending').length,
    totalValue: listings.reduce((sum, l) => sum + l.price, 0)
  });
});

router.put('/marketplace/listings/:id/status', verifyAdmin, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  res.json({ message: `Listing ${id} ${status === 'active' ? 'approved' : 'rejected'}` });
});

module.exports = router;