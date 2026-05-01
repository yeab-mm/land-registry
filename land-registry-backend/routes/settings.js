const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

let systemSettings = {
  siteName: 'Digital Land Portal',
  siteUrl: 'https://land.gov.et',
  supportEmail: 'support@land.gov.et',
  supportPhone: '+251 911 234 567',
  itemsPerPage: 20,
  enableRegistration: true,
  enableMarketplace: true,
  maintenanceMode: false,
  emailNotifications: true,
  smsNotifications: false,
  twoFactorAuth: true,
  language: 'en',
  dateFormat: 'MM/DD/YYYY',
  timezone: 'UTC+3',
  currency: 'ETB',
  transactionFee: 2.5,
  paymentGateways: { telebirr: true, cbeBirr: true, bankTransfer: false, cash: true },
  theme: 'dark',
  primaryColor: '#166534'
};

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

// Get all settings
router.get('/', verifyAdmin, (req, res) => {
  res.json({ settings: systemSettings });
});

// Update general settings
router.put('/general', verifyAdmin, (req, res) => {
  const { siteName, siteUrl, supportEmail, supportPhone, itemsPerPage, enableRegistration, enableMarketplace, maintenanceMode } = req.body;
  if (siteName !== undefined) systemSettings.siteName = siteName;
  if (siteUrl !== undefined) systemSettings.siteUrl = siteUrl;
  if (supportEmail !== undefined) systemSettings.supportEmail = supportEmail;
  if (supportPhone !== undefined) systemSettings.supportPhone = supportPhone;
  if (itemsPerPage !== undefined) systemSettings.itemsPerPage = itemsPerPage;
  if (enableRegistration !== undefined) systemSettings.enableRegistration = enableRegistration;
  if (enableMarketplace !== undefined) systemSettings.enableMarketplace = enableMarketplace;
  if (maintenanceMode !== undefined) systemSettings.maintenanceMode = maintenanceMode;
  res.json({ message: 'General settings updated', settings: systemSettings });
});

// Update notification settings
router.put('/notifications', verifyAdmin, (req, res) => {
  const { emailNotifications, smsNotifications } = req.body;
  if (emailNotifications !== undefined) systemSettings.emailNotifications = emailNotifications;
  if (smsNotifications !== undefined) systemSettings.smsNotifications = smsNotifications;
  res.json({ message: 'Notification settings updated' });
});

// Update security settings
router.put('/security', verifyAdmin, (req, res) => {
  const { twoFactorAuth } = req.body;
  if (twoFactorAuth !== undefined) systemSettings.twoFactorAuth = twoFactorAuth;
  res.json({ message: 'Security settings updated' });
});

// Update localization settings
router.put('/localization', verifyAdmin, (req, res) => {
  const { language, dateFormat, timezone, currency } = req.body;
  if (language !== undefined) systemSettings.language = language;
  if (dateFormat !== undefined) systemSettings.dateFormat = dateFormat;
  if (timezone !== undefined) systemSettings.timezone = timezone;
  if (currency !== undefined) systemSettings.currency = currency;
  res.json({ message: 'Localization settings updated' });
});

// Update payment settings
router.put('/payments', verifyAdmin, (req, res) => {
  const { currency, transactionFee, paymentGateways } = req.body;
  if (currency !== undefined) systemSettings.currency = currency;
  if (transactionFee !== undefined) systemSettings.transactionFee = transactionFee;
  if (paymentGateways !== undefined) systemSettings.paymentGateways = { ...systemSettings.paymentGateways, ...paymentGateways };
  res.json({ message: 'Payment settings updated' });
});

// Update appearance settings
router.put('/appearance', verifyAdmin, (req, res) => {
  const { theme, primaryColor } = req.body;
  if (theme !== undefined) systemSettings.theme = theme;
  if (primaryColor !== undefined) systemSettings.primaryColor = primaryColor;
  res.json({ message: 'Appearance settings updated' });
});

// Get system status
router.get('/status', verifyAdmin, (req, res) => {
  res.json({ systemStatus: 'operational', version: '1.0.0', uptime: process.uptime() });
});

// Reset settings to default
router.post('/reset', verifyAdmin, (req, res) => {
  systemSettings = {
    siteName: 'Digital Land Portal', siteUrl: 'https://land.gov.et', supportEmail: 'support@land.gov.et',
    supportPhone: '+251 911 234 567', itemsPerPage: 20, enableRegistration: true, enableMarketplace: true,
    maintenanceMode: false, emailNotifications: true, smsNotifications: false, twoFactorAuth: true,
    language: 'en', dateFormat: 'MM/DD/YYYY', timezone: 'UTC+3', currency: 'ETB', transactionFee: 2.5,
    paymentGateways: { telebirr: true, cbeBirr: true, bankTransfer: false, cash: true },
    theme: 'dark', primaryColor: '#166534'
  };
  res.json({ message: 'Settings reset to default', defaultSettings: systemSettings });
});

module.exports = router;