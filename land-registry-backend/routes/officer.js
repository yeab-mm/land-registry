const express = require('express');
const { supabaseAdmin } = require('../config/supabase');
const { authMiddleware, officerOnly } = require('../middleware/auth');

const router = express.Router();

// Get pending verifications for officer
router.get('/pending-verifications', authMiddleware, officerOnly, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Get officer's region
    const { data: officer } = await supabaseAdmin
      .from('users')
      .select('region')
      .eq('id', req.user.id)
      .single();

    let query = supabaseAdmin
      .from('verifications')
      .select(`
        *,
        user:user_id (id, full_name, email, phone, kebele_id)
      `, { count: 'exact' })
      .eq('status', 'pending');

    if (officer?.region) {
      query = query.eq('region', officer.region);
    }

    const { data: verifications, error, count } = await query
      .order('submitted_date', { ascending: true })
      .range(from, to);

    if (error) throw error;

    res.json({
      verifications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Officer pending verifications error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Approve verification (officer)
router.put('/verifications/:id/approve', authMiddleware, officerOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    const { data: verification, error } = await supabaseAdmin
      .from('verifications')
      .update({
        status: 'approved',
        reviewed_by: req.user.id,
        reviewed_date: new Date(),
        notes: notes || null,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Create property record from verification
    await supabaseAdmin
      .from('properties')
      .insert([{
        owner_id: verification.user_id,
        parcel_id: verification.parcel_id,
        location: verification.location,
        verified: true,
        verified_by: req.user.id,
        verified_date: new Date(),
      }]);

    res.json({
      message: 'Verification approved',
      verification,
    });
  } catch (error) {
    console.error('Officer approve error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Reject verification (officer)
router.put('/verifications/:id/reject', authMiddleware, officerOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    const { data: verification, error } = await supabaseAdmin
      .from('verifications')
      .update({
        status: 'rejected',
        reviewed_by: req.user.id,
        reviewed_date: new Date(),
        notes: notes || 'Verification rejected',
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      message: 'Verification rejected',
      verification,
    });
  } catch (error) {
    console.error('Officer reject error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get officer stats
router.get('/stats', authMiddleware, officerOnly, async (req, res) => {
  try {
    const { data: officer } = await supabaseAdmin
      .from('users')
      .select('region')
      .eq('id', req.user.id)
      .single();

    let query = supabaseAdmin.from('verifications').select('status');
    if (officer?.region) {
      query = query.eq('region', officer.region);
    }

    const { data: verifications } = await query;

    const today = new Date().toISOString().split('T')[0];
    let todayQuery = supabaseAdmin
      .from('verifications')
      .select('status')
      .gte('reviewed_date', today);

    if (officer?.region) {
      todayQuery = todayQuery.eq('region', officer.region);
    }

    const { data: todayVerifications } = await todayQuery;

    res.json({
      region: officer?.region || 'All',
      total: {
        pending: verifications?.filter(v => v.status === 'pending').length || 0,
        approved: verifications?.filter(v => v.status === 'approved').length || 0,
        rejected: verifications?.filter(v => v.status === 'rejected').length || 0,
      },
      today: {
        approved: todayVerifications?.filter(v => v.status === 'approved').length || 0,
        rejected: todayVerifications?.filter(v => v.status === 'rejected').length || 0,
      },
    });
  } catch (error) {
    console.error('Officer stats error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;