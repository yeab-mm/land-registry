const express = require('express');
const { supabaseAdmin } = require('../config/supabase');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get dashboard statistics based on user role
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    let stats = {};

    if (userRole === 'admin') {
      // Admin statistics
      const [
        { count: totalUsers },
        { count: pendingVerifications },
        { count: totalProperties },
        { count: activeListings },
        { data: payments }
      ] = await Promise.all([
        supabaseAdmin.from('users').select('*', { count: 'exact', head: true }),
        supabaseAdmin.from('verifications').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabaseAdmin.from('properties').select('*', { count: 'exact', head: true }),
        supabaseAdmin.from('listings').select('*', { count: 'exact', head: true }).eq('status', 'active'),
        supabaseAdmin.from('payments').select('amount').eq('status', 'completed')
      ]);

      const totalRevenue = payments?.reduce((sum, p) => sum + parseFloat(p.amount), 0) || 0;

      stats = {
        totalUsers,
        pendingVerifications,
        totalProperties,
        activeListings,
        totalRevenue,
      };
    } 
    else if (userRole === 'officer') {
      // Officer statistics
      const { data: officer } = await supabaseAdmin
        .from('users')
        .select('region')
        .eq('id', userId)
        .single();

      let query = supabaseAdmin.from('verifications').select('*', { count: 'exact' });
      if (officer?.region) {
        query = query.eq('region', officer.region);
      }

      const [{ count: pendingInRegion }, { count: approvedInRegion }, { count: rejectedInRegion }] = await Promise.all([
        query.clone().eq('status', 'pending'),
        query.clone().eq('status', 'approved'),
        query.clone().eq('status', 'rejected'),
      ]);

      stats = {
        pendingVerifications: pendingInRegion,
        approvedVerifications: approvedInRegion,
        rejectedVerifications: rejectedInRegion,
        region: officer?.region || 'All',
      };
    }
    else {
      // Citizen statistics
      const [
        { count: myProperties },
        { count: myVerifications },
        { count: myPayments }
      ] = await Promise.all([
        supabaseAdmin.from('properties').select('*', { count: 'exact', head: true }).eq('owner_id', userId),
        supabaseAdmin.from('verifications').select('*', { count: 'exact', head: true }).eq('user_id', userId),
        supabaseAdmin.from('payments').select('*', { count: 'exact', head: true }).eq('user_id', userId),
      ]);

      stats = {
        myProperties,
        myVerifications,
        myPayments,
      };
    }

    res.json(stats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get recent activity
router.get('/activity', authMiddleware, async (req, res) => {
  try {
    const userRole = req.user.role;
    const limit = parseInt(req.query.limit) || 10;

    let activities = [];

    if (userRole === 'admin') {
      // Get recent verifications
      const { data: verifications } = await supabaseAdmin
        .from('verifications')
        .select(`
          id,
          status,
          submitted_date,
          user:user_id (full_name)
        `)
        .order('submitted_date', { ascending: false })
        .limit(limit);

      // Get recent payments
      const { data: payments } = await supabaseAdmin
        .from('payments')
        .select(`
          id,
          amount,
          status,
          payment_date,
          user:user_id (full_name)
        `)
        .order('payment_date', { ascending: false })
        .limit(limit);

      // Get recent users
      const { data: users } = await supabaseAdmin
        .from('users')
        .select('id, full_name, role, created_at')
        .order('created_at', { ascending: false })
        .limit(limit);

      activities = [
        ...(verifications?.map(v => ({
          id: v.id,
          type: 'verification',
          action: `${v.user?.full_name} submitted a verification request`,
          status: v.status,
          timestamp: v.submitted_date,
        })) || []),
        ...(payments?.map(p => ({
          id: p.id,
          type: 'payment',
          action: `${p.user?.full_name} made a payment of ${p.amount} ETB`,
          status: p.status,
          timestamp: p.payment_date,
        })) || []),
        ...(users?.map(u => ({
          id: u.id,
          type: 'user',
          action: `${u.full_name} registered as ${u.role}`,
          timestamp: u.created_at,
        })) || []),
      ];

      // Sort by timestamp and take latest
      activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      activities = activities.slice(0, limit);
    }
    else if (userRole === 'officer') {
      // Get recent verifications in officer's region
      const { data: officer } = await supabaseAdmin
        .from('users')
        .select('region')
        .eq('id', req.user.id)
        .single();

      let query = supabaseAdmin
        .from('verifications')
        .select(`
          id,
          status,
          submitted_date,
          user:user_id (full_name),
          parcel_id
        `)
        .order('submitted_date', { ascending: false })
        .limit(limit);

      if (officer?.region) {
        query = query.eq('region', officer.region);
      }

      const { data: verifications } = await query;

      activities = verifications?.map(v => ({
        id: v.id,
        type: 'verification',
        action: `${v.user?.full_name} submitted verification for parcel ${v.parcel_id}`,
        status: v.status,
        timestamp: v.submitted_date,
      })) || [];
    }
    else {
      // Citizen recent activity
      const userId = req.user.id;

      const [{ data: verifications }, { data: payments }, { data: listings }] = await Promise.all([
        supabaseAdmin
          .from('verifications')
          .select('id, status, submitted_date, parcel_id')
          .eq('user_id', userId)
          .order('submitted_date', { ascending: false })
          .limit(limit),
        supabaseAdmin
          .from('payments')
          .select('id, amount, status, payment_date')
          .eq('user_id', userId)
          .order('payment_date', { ascending: false })
          .limit(limit),
        supabaseAdmin
          .from('listings')
          .select('id, title, status, created_at')
          .eq('seller_id', userId)
          .order('created_at', { ascending: false })
          .limit(limit),
      ]);

      activities = [
        ...(verifications?.map(v => ({
          id: v.id,
          type: 'verification',
          action: `Submitted verification for parcel ${v.parcel_id}`,
          status: v.status,
          timestamp: v.submitted_date,
        })) || []),
        ...(payments?.map(p => ({
          id: p.id,
          type: 'payment',
          action: `Made payment of ${p.amount} ETB`,
          status: p.status,
          timestamp: p.payment_date,
        })) || []),
        ...(listings?.map(l => ({
          id: l.id,
          type: 'listing',
          action: `Created listing: ${l.title}`,
          status: l.status,
          timestamp: l.created_at,
        })) || []),
      ];

      activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      activities = activities.slice(0, limit);
    }

    res.json(activities);
  } catch (error) {
    console.error('Dashboard activity error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get notifications
router.get('/notifications', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 20;

    // Get pending verifications for officer
    let notifications = [];

    if (req.user.role === 'officer') {
      const { data: officer } = await supabaseAdmin
        .from('users')
        .select('region')
        .eq('id', userId)
        .single();

      let query = supabaseAdmin
        .from('verifications')
        .select('id, parcel_id, user:user_id (full_name), submitted_date')
        .eq('status', 'pending');

      if (officer?.region) {
        query = query.eq('region', officer.region);
      }

      const { data: pendingVerifications } = await query.limit(limit);

      notifications = pendingVerifications?.map(v => ({
        id: v.id,
        title: 'New Verification Request',
        message: `${v.user?.full_name} submitted a verification request for parcel ${v.parcel_id}`,
        type: 'verification',
        read: false,
        createdAt: v.submitted_date,
      })) || [];
    }
    else if (req.user.role === 'citizen') {
      // Get updates on citizen's verifications
      const { data: verifications } = await supabaseAdmin
        .from('verifications')
        .select('id, status, parcel_id, reviewed_date')
        .eq('user_id', userId)
        .neq('status', 'pending')
        .order('reviewed_date', { ascending: false })
        .limit(limit);

      notifications = verifications?.map(v => ({
        id: v.id,
        title: `Verification ${v.status}`,
        message: `Your verification request for parcel ${v.parcel_id} has been ${v.status}`,
        type: 'verification',
        read: false,
        createdAt: v.reviewed_date,
      })) || [];
    }

    res.json(notifications);
  } catch (error) {
    console.error('Dashboard notifications error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;