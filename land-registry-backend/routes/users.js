const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Mock users
let users = [
  { id: 1, name: 'Abebe Kebede', email: 'abebe@example.com', phone: '+251911111111', kebeleId: 'KB-001', role: 'citizen', status: 'active', joinedDate: '2024-01-15', properties: 2 },
  { id: 2, name: 'Tigist Haile', email: 'tigist@example.com', phone: '+251922222222', kebeleId: 'KB-002', role: 'officer', status: 'active', joinedDate: '2024-02-20', properties: 0 },
  { id: 3, name: 'Biruk Alemu', email: 'biruk@example.com', phone: '+251933333333', kebeleId: 'KB-003', role: 'citizen', status: 'pending', joinedDate: '2024-03-01', properties: 1 }
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

// Get all users
router.get('/', verifyAdmin, (req, res) => {
  const { search, role, status, page = 1, limit = 10 } = req.query;
  let filtered = [...users];
  if (search) filtered = filtered.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
  if (role && role !== 'all') filtered = filtered.filter(u => u.role === role);
  if (status && status !== 'all') filtered = filtered.filter(u => u.status === status);
  
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);
  
  res.json({
    users: paginated,
    stats: { total: users.length, active: users.filter(u => u.status === 'active').length, pending: users.filter(u => u.status === 'pending').length, totalProperties: users.reduce((s, u) => s + u.properties, 0) },
    pagination: { page: parseInt(page), limit: parseInt(limit), total: filtered.length, pages: Math.ceil(filtered.length / limit) }
  });
});

// Get single user
router.get('/:id', verifyAdmin, (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Create user
router.post('/', verifyAdmin, async (req, res) => {
  const { name, email, phone, kebeleId, role, status, password } = req.body;
  if (!name || !email || !phone || !kebeleId) return res.status(400).json({ error: 'Missing required fields' });
  if (users.find(u => u.email === email)) return res.status(400).json({ error: 'Email already exists' });
  
  const newUser = {
    id: users.length + 1,
    name, email, phone, kebeleId, role: role || 'citizen', status: status || 'active',
    joinedDate: new Date().toISOString().split('T')[0], properties: 0
  };
  users.push(newUser);
  res.status(201).json({ message: 'User created successfully', user: newUser });
});

// Update user
router.put('/:id', verifyAdmin, (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  users[index] = { ...users[index], ...req.body, id: users[index].id };
  res.json({ message: 'User updated successfully', user: users[index] });
});

// Delete user
router.delete('/:id', verifyAdmin, (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  users.splice(index, 1);
  res.json({ message: 'User deleted successfully' });
});

// Update user status
router.patch('/:id/status', verifyAdmin, (req, res) => {
  const { status } = req.body;
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  users[index].status = status;
  res.json({ message: `User status updated to ${status}` });
});

// Get user statistics
router.get('/stats/summary', verifyAdmin, (req, res) => {
  res.json({
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    pending: users.filter(u => u.status === 'pending').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    byRole: { admin: 0, officer: users.filter(u => u.role === 'officer').length, citizen: users.filter(u => u.role === 'citizen').length },
    totalProperties: users.reduce((s, u) => s + u.properties, 0)
  });
});

module.exports = router;