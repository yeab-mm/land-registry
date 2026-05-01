const { validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Sanitize input
const sanitizeInput = (req, res, next) => {
  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase().trim();
  }
  if (req.body.phone) {
    req.body.phone = req.body.phone.trim();
  }
  next();
};

module.exports = { handleValidationErrors, sanitizeInput };