const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

let verifications = [
  { id: 1, applicant: 'Abebe Kebede', parcelId: 'BA-2024-001', location: 'Zone 1, Bahir Dar', submittedDate: '2024-03-01', status: 'rejected', documentsCount: 3 },
  { id: 2, applicant: 'Tigist Haile', parcelId: 'BA-2024-089', location: 'Zone 3, Bahir Dar', submittedDate: '2024-03-02', status: 'approved', documentsCount: 5 },
  { id: 3, applicant: 'Biruk Alemu', parcelId: 'BA-2024-045', location: 'Zone 2, Bahir Dar', submittedDate: '2024-03-03', status: 'approved', documentsCount: 2 },
  { id: 4, applicant: 'Meron Tadesse', parcelId: 'BA-2024-123', location: 'Zone 4, Bahir Dar', submittedDate: '2024-03-03', status: 'rejected', documentsCount: 4 }
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

// Get all verifications
router.get('/', verifyAdmin, (req, res) => {
  const { search, status, page = 1, limit = 10 } = req.query;
  let filtered = [...verifications];
  if (search) filtered = filtered.filter(v => v.applicant.toLowerCase().includes(search.toLowerCase()) || v.parcelId.includes(search));
  if (status && status !== 'all') filtered = filtered.filter(v => v.status === status);
  
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);
  
  res.json({
    verifications: paginated,
    stats: { total: verifications.length, approved: verifications.filter(v => v.status === 'approved').length, pending: verifications.filter(v => v.status === 'pending').length, rejected: verifications.filter(v => v.status === 'rejected').length },
    pagination: { page: parseInt(page), limit: parseInt(limit), total: filtered.length, pages: Math.ceil(filtered.length / limit) }
  });
});

// Update verification status
router.put('/:id/status', verifyAdmin, (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  const index = verifications.findIndex(v => v.id === parseInt(id));
  if (index === -1) return res.status(404).json({ error: 'Verification not found' });
  verifications[index].status = status;
  res.json({ message: `Verification ${status === 'approved' ? 'approved' : 'rejected'}` });
});

// Get verification statistics
router.get('/stats/summary', verifyAdmin, (req, res) => {
  res.json({
    total: verifications.length,
    approved: verifications.filter(v => v.status === 'approved').length,
    pending: verifications.filter(v => v.status === 'pending').length,
    rejected: verifications.filter(v => v.status === 'rejected').length,
    totalDocuments: verifications.reduce((sum, v) => sum + v.documentsCount, 0)
  });
});

module.exports = router;