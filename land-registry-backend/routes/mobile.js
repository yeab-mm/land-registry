const express = require('express');
const { supabaseAdmin } = require('../config/supabase');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// ============ MOBILE OPTIMIZED ENDPOINTS ============
// These return lighter JSON responses for mobile devices

// Get dashboard data for mobile
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    let dashboardData = {};

    if (userRole === 'citizen') {
      // Get user's properties
      const { data: properties } = await supabaseAdmin
        .from('properties')
        .select('id, parcel_id, location, verified')
        .eq('owner_id', userId)
        .limit(5);

      // Get user's verifications
      const { data: verifications } = await supabaseAdmin
        .from('verifications')
        .select('id, parcel_id, status, submitted_date')
        .eq('user_id', userId)
        .order('submitted_date', { ascending: false })
        .limit(5);

      // Get user's payments
      const { data: payments } = await supabaseAdmin
        .from('payments')
        .select('id, amount, status, payment_date')
        .eq('user_id', userId)
        .order('payment_date', { ascending: false })
        .limit(5);

      // Get counts
      const { count: propertiesCount } = await supabaseAdmin
        .from('properties')
        .select('*', { count: 'exact', head: true })
        .eq('owner_id', userId);

      const { count: verificationsCount } = await supabaseAdmin
        .from('verifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      dashboardData = {
        counts: {
          properties: propertiesCount || 0,
          verifications: verificationsCount || 0,
        },
        recentProperties: properties || [],
        recentVerifications: verifications || [],
        recentPayments: payments || [],
      };
    } 
    else if (userRole === 'officer') {
      // Get officer's pending verifications
      const { data: pending } = await supabaseAdmin
        .from('verifications')
        .select('id, parcel_id, location, user:user_id(full_name), submitted_date')
        .eq('status', 'pending')
        .limit(10);

      // Get today's stats
      const today = new Date().toISOString().split('T')[0];
      const { count: todayApproved } = await supabaseAdmin
        .from('verifications')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'approved')
        .gte('reviewed_date', today);

      const { count: todayRejected } = await supabaseAdmin
        .from('verifications')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'rejected')
        .gte('reviewed_date', today);

      dashboardData = {
        pendingVerifications: pending || [],
        todayStats: {
          approved: todayApproved || 0,
          rejected: todayRejected || 0,
        },
      };
    }
    else if (userRole === 'admin') {
      // Get quick stats for admin mobile view
      const { count: totalUsers } = await supabaseAdmin
        .from('users')
        .select('*', { count: 'exact', head: true });

      const { count: pendingVerifications } = await supabaseAdmin
        .from('verifications')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      const { data: recentUsers } = await supabaseAdmin
        .from('users')
        .select('id, full_name, email, role, created_at')
        .order('created_at', { ascending: false })
        .limit(10);

      dashboardData = {
        stats: {
          totalUsers,
          pendingVerifications,
        },
        recentUsers: recentUsers || [],
      };
    }

    res.json(dashboardData);
  } catch (error) {
    console.error('Mobile dashboard error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get properties for mobile (paginated, lighter)
router.get('/properties', authMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabaseAdmin
      .from('properties')
      .select(`
        id,
        parcel_id,
        location,
        area,
        land_use,
        verified,
        owner:owner_id (full_name)
      `, { count: 'exact' });

    if (req.user.role === 'citizen') {
      query = query.eq('owner_id', req.user.id);
    }

    const { data: properties, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    res.json({
      properties,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        hasMore: from + limit < count
      }
    });
  } catch (error) {
    console.error('Mobile properties error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get marketplace listings for mobile (optimized)
router.get('/marketplace', async (req, res) => {
  try {
    const { page = 1, limit = 10, type, minPrice, maxPrice } = req.query;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabaseAdmin
      .from('listings')
      .select(`
        id,
        title,
        price,
        location,
        property_type,
        images,
        views,
        seller:seller_id (full_name)
      `, { count: 'exact' })
      .eq('status', 'active');

    if (type && type !== 'all') {
      query = query.eq('property_type', type);
    }
    if (minPrice) {
      query = query.gte('price', minPrice);
    }
    if (maxPrice) {
      query = query.lte('price', maxPrice);
    }

    const { data: listings, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    // Format images for mobile
    const formattedListings = listings.map(listing => ({
      ...listing,
      images: listing.images?.[0] || null, // Send only first image for mobile
    }));

    res.json({
      listings: formattedListings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        hasMore: from + limit < count
      }
    });
  } catch (error) {
    console.error('Mobile marketplace error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Submit verification from mobile
router.post('/verifications', authMiddleware, async (req, res) => {
  try {
    const { parcelId, location, documents, purpose } = req.body;

    if (!parcelId || !location) {
      return res.status(400).json({ error: 'Parcel ID and location required' });
    }

    const { data: verification, error } = await supabaseAdmin
      .from('verifications')
      .insert([{
        user_id: req.user.id,
        parcel_id: parcelId,
        location,
        documents: documents || [],
        purpose: purpose || 'land_verification',
        status: 'pending',
        submitted_date: new Date(),
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      message: 'Verification request submitted',
      verification: {
        id: verification.id,
        parcelId: verification.parcel_id,
        status: verification.status,
        submittedDate: verification.submitted_date,
      }
    });
  } catch (error) {
    console.error('Mobile submit verification error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get user notifications for mobile
router.get('/notifications', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 20;

    let notifications = [];

    // Get verification status updates
    const { data: verifications } = await supabaseAdmin
      .from('verifications')
      .select('id, parcel_id, status, reviewed_date')
      .eq('user_id', userId)
      .neq('status', 'pending')
      .order('reviewed_date', { ascending: false })
      .limit(limit);

    const verificationNotifs = verifications?.map(v => ({
      id: `v-${v.id}`,
      title: v.status === 'approved' ? 'Verification Approved' : 'Verification Rejected',
      message: `Your verification for parcel ${v.parcel_id} has been ${v.status}`,
      type: 'verification',
      read: false,
      createdAt: v.reviewed_date,
    })) || [];

    notifications = [...verificationNotifs].slice(0, limit);

    res.json(notifications);
  } catch (error) {
    console.error('Mobile notifications error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update mobile app version check
router.get('/version', (req, res) => {
  res.json({
    version: '1.0.0',
    minVersion: '1.0.0',
    forceUpdate: false,
    updateUrl: 'https://play.google.com/store/apps/details?id=com.landregistry',
  });
});

module.exports = router;