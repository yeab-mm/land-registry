const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Mock users database
const users = [
  {
    id: '1',
    email: 'admin@land.gov.et',
    password: '$2a$10$rVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVq', // admin123
    full_name: 'System Administrator',
    role: 'admin',
    status: 'active',
    phone: '+251911111111'
  },
  {
    id: '2',
    email: 'officer@land.gov.et',
    password: '$2a$10$rVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVq', // officer123
    full_name: 'Land Officer',
    role: 'officer',
    status: 'active',
    phone: '+251922222222'
  },
  {
    id: '3',
    email: 'citizen@land.gov.et',
    password: '$2a$10$rVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVq', // citizen123
    full_name: 'Test Citizen',
    role: 'citizen',
    status: 'active',
    phone: '+251933333333'
  }
];

// Login route
router.post('/login', async (req, res) => {
  console.log('Login attempt for:', req.body.email);
  
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = users.find(u => u.email === email.toLowerCase());
    
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Simple password check for demo
    const validPasswords = {
      'admin@land.gov.et': 'admin123',
      'officer@land.gov.et': 'officer123',
      'citizen@land.gov.et': 'citizen123'
    };
    
    const isValidPassword = validPasswords[email] === password;
    
    if (!isValidPassword) {
      console.log('Invalid password for:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (user.status !== 'active') {
      return res.status(403).json({ error: 'Account is disabled' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'mysecretkey',
      { expiresIn: '7d' }
    );

    console.log('Login successful for:', email);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Register route
router.post('/register', async (req, res) => {
  try {
    const { email, password, fullName, phone, kebeleId, role } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = {
      id: String(users.length + 1),
      email,
      password: hashedPassword,
      full_name: fullName,
      role: role || 'citizen',
      status: 'active',
      phone: phone || null,
      kebele_id: kebeleId || null
    };
    
    users.push(newUser);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || 'mysecretkey',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.full_name,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Forgot password
router.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  res.json({ message: 'If email exists, reset link will be sent' });
});

// Reset password
router.post('/reset-password', (req, res) => {
  const { token, newPassword } = req.body;
  res.json({ message: 'Password reset successful' });
});

module.exports = router;