const jwt = require('jsonwebtoken');

// Verify JWT token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Admin only middleware
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Officer only middleware
const officerOnly = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'officer') {
    return res.status(403).json({ error: 'Officer or Admin access required' });
  }
  next();
};

module.exports = { authMiddleware, adminOnly, officerOnly };