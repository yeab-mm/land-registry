const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

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

// Security statistics
router.get('/stats', verifyAdmin, (req, res) => {
  res.json({
    securityScore: 85,
    activeSessions: 3,
    failedAttempts: 2,
    mfaUsers: 145,
    totalUsers: 234,
    mfaPercentage: 62,
    strongPasswords: 78,
    unusualIPs: 3,
    needsAttention: true
  });
});

// Active sessions
router.get('/sessions', verifyAdmin, (req, res) => {
  res.json({
    sessions: [
      { id: 1, userEmail: 'admin@land.gov.et', device: 'Windows PC', ip: '192.168.1.100', location: 'Addis Ababa', loginTime: new Date(), isCurrent: true },
      { id: 2, userEmail: 'officer@land.gov.et', device: 'MacBook Pro', ip: '10.0.0.45', location: 'Gondar', loginTime: new Date(), isCurrent: false }
    ],
    count: 2
  });
});

// Security logs
router.get('/logs', verifyAdmin, (req, res) => {
  res.json({
    logs: [
      { id: 1, user: 'admin@land.gov.et', action: 'Login', ip: '192.168.1.100', device: 'Windows PC', location: 'Addis Ababa', timestamp: new Date(), status: 'success' },
      { id: 2, user: 'unknown', action: 'Failed Login', ip: '45.123.45.67', device: 'iPhone', location: 'Foreign', timestamp: new Date(), status: 'failed' }
    ],
    summary: { total: 45, success: 42, failed: 2, warning: 1 }
  });
});

// Security settings
router.get('/settings', verifyAdmin, (req, res) => {
  res.json({
    twoFactorAuth: { enabled: true, requiredForRoles: ['admin', 'officer'] },
    passwordPolicy: { minLength: 8, requireUppercase: true, requireNumbers: true, expiryDays: 90 },
    sessionConfig: { timeoutMinutes: 30, maxConcurrentSessions: 3 },
    ipRestriction: { enabled: true, whitelist: ['192.168.1.0/24', '10.0.0.0/8'] }
  });
});

// Run security scan
router.post('/scan', verifyAdmin, (req, res) => {
  res.json({
    scanId: Date.now(),
    timestamp: new Date(),
    overallScore: 85,
    issues: [
      { severity: 'high', type: 'weak_passwords', message: '52 users have weak passwords' },
      { severity: 'medium', type: 'mfa_not_enabled', message: '89 users have not enabled MFA' }
    ],
    recommendations: ['Enable two-factor authentication', 'Review password policies']
  });
});

module.exports = router;