-- Insert admin user (password: admin123)
INSERT INTO users (id, email, password, full_name, role, status, created_at)
VALUES (
  gen_random_uuid(),
  'admin@land.gov.et',
  '$2a$10$rVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVq', -- bcrypt hash of 'admin123'
  'System Administrator',
  'admin',
  'active',
  NOW()
);

-- Insert officer user (password: officer123)
INSERT INTO users (id, email, password, full_name, role, status, region, created_at)
VALUES (
  gen_random_uuid(),
  'officer@land.gov.et',
  '$2a$10$rVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVq',
  'Land Officer',
  'officer',
  'active',
  'Zone 1 - Bole',
  NOW()
);

-- Insert citizen users
INSERT INTO users (id, email, password, full_name, phone, kebele_id, role, status, created_at)
VALUES 
  (gen_random_uuid(), 'abebe@example.com', '$2a$10$rVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVq', 'Abebe Kebede', '0912345678', 'KB-001', 'citizen', 'active', NOW()),
  (gen_random_uuid(), 'tigist@example.com', '$2a$10$rVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVqVq', 'Tigist Haile', '0923456789', 'KB-002', 'citizen', 'active', NOW());

-- Insert sample verifications
INSERT INTO verifications (user_id, parcel_id, location, documents, purpose, region, status, submitted_date)
SELECT 
  id,
  'BA-2024-00' || floor(random() * 100 + 1)::int,
  CASE floor(random() * 4)::int
    WHEN 0 THEN 'Zone 1 - Bole'
    WHEN 1 THEN 'Zone 2 - Kirkos'
    WHEN 2 THEN 'Zone 3 - Lideta'
    ELSE 'Zone 4 - Addis Ketema'
  END,
  '["document1.pdf", "document2.pdf"]'::jsonb,
  CASE floor(random() * 3)::int
    WHEN 0 THEN 'land_verification'
    WHEN 1 THEN 'ownership_transfer'
    ELSE 'boundary_update'
  END,
  CASE floor(random() * 4)::int
    WHEN 0 THEN 'Zone 1 - Bole'
    WHEN 1 THEN 'Zone 2 - Kirkos'
    WHEN 2 THEN 'Zone 3 - Lideta'
    ELSE 'Zone 4 - Addis Ketema'
  END,
  CASE floor(random() * 3)::int
    WHEN 0 THEN 'pending'
    WHEN 1 THEN 'approved'
    ELSE 'rejected'
  END,
  NOW() - (random() * interval '30 days')
FROM users WHERE role = 'citizen'
LIMIT 10;

-- Insert sample properties
INSERT INTO properties (owner_id, parcel_id, location, area, land_use, verified)
SELECT 
  id,
  'PROP-' || floor(random() * 1000 + 1)::int,
  CASE floor(random() * 4)::int
    WHEN 0 THEN 'Zone 1 - Bole'
    WHEN 1 THEN 'Zone 2 - Kirkos'
    WHEN 2 THEN 'Zone 3 - Lideta'
    ELSE 'Zone 4 - Addis Ketema'
  END,
  floor(random() * 1000 + 100)::decimal(10,2),
  CASE floor(random() * 3)::int
    WHEN 0 THEN 'Residential'
    WHEN 1 THEN 'Commercial'
    ELSE 'Agricultural'
  END,
  random() > 0.5
FROM users WHERE role = 'citizen'
LIMIT 5;

-- Insert sample listings
INSERT INTO listings (seller_id, title, description, property_type, price, location, area, status)
SELECT 
  id,
  CASE floor(random() * 4)::int
    WHEN 0 THEN 'Beautiful Land for Sale'
    WHEN 1 THEN 'Prime Commercial Plot'
    WHEN 2 THEN 'Agricultural Farm Land'
    ELSE 'Residential Property'
  END,
  'Great location with easy access to main road. Perfect for development.',
  CASE floor(random() * 4)::int
    WHEN 0 THEN 'residential'
    WHEN 1 THEN 'commercial'
    WHEN 2 THEN 'agricultural'
    ELSE 'industrial'
  END,
  floor(random() * 5000000 + 500000)::decimal(12,2),
  CASE floor(random() * 4)::int
    WHEN 0 THEN 'Zone 1 - Bole'
    WHEN 1 THEN 'Zone 2 - Kirkos'
    WHEN 2 THEN 'Zone 3 - Lideta'
    ELSE 'Zone 4 - Addis Ketema'
  END,
  floor(random() * 1000 + 100)::decimal(10,2),
  'active'
FROM users WHERE role = 'citizen'
LIMIT 5;