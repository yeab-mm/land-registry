const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

let savedReports = [
  { id: 1, name: 'Users Report', type: 'users', date: '2024-03-01', size: '2.4', format: 'pdf' },
  { id: 2, name: 'Verifications Report', type: 'verifications', date: '2024-03-01', size: '1.8', format: 'pdf' },
  { id: 3, name: 'Payments Report', type: 'payments', date: '2024-03-05', size: '3.2', format: 'excel' }
];

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

// Get saved reports
router.get('/', verifyAdmin, (req, res) => {
  res.json({
    reports: savedReports,
    summary: { total: savedReports.length, totalSize: (savedReports.reduce((s, r) => s + parseFloat(r.size), 0)).toFixed(1) }
  });
});

// Generate report by type
router.get('/:type', verifyAdmin, (req, res) => {
  const { type } = req.params;
  const reportData = {
    users: { title: 'Users Report', summary: { total: 15420, active: 14200, inactive: 1220 }, data: [] },
    verifications: { title: 'Verifications Report', summary: { total: 234, approved: 178, pending: 43, rejected: 13 }, data: [] },
    payments: { title: 'Payments Report', summary: { total: 345, totalAmount: 3450000, completed: 320 }, data: [] },
    listings: { title: 'Listings Report', summary: { total: 45, active: 32, sold: 13 }, data: [] }
  };
  res.json(reportData[type] || { error: 'Invalid report type' });
});

// Generate and save new report
router.post('/generate', verifyAdmin, (req, res) => {
  const { reportType, name, dateRange, startDate, endDate, format } = req.body;
  const newReport = {
    id: savedReports.length + 1,
    name: name || `${reportType} Report`,
    type: reportType,
    date: new Date().toISOString().split('T')[0],
    size: (Math.random() * 5 + 1).toFixed(1),
    format: format || 'pdf'
  };
  savedReports.unshift(newReport);
  res.status(201).json({ message: 'Report generated successfully', report: newReport });
});

// Delete saved report
router.delete('/saved/:id', verifyAdmin, (req, res) => {
  const index = savedReports.findIndex(r => r.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Report not found' });
  savedReports.splice(index, 1);
  res.json({ message: 'Report deleted successfully' });
});

module.exports = router;