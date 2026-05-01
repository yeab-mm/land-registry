const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  console.error('Please add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env');
  process.exit(1);
}

// Service role client (for admin operations)
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Public client (for regular operations)
const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('✅ Supabase client initialized');

module.exports = { supabase, supabaseAdmin };