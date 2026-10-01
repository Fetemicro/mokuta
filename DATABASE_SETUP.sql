-- MOKUTA Database Setup
-- Run these SQL commands in Supabase SQL Editor (fetemicro.github.io/supabase/)

-- ============================================================================
-- 1. CREATE PROFILES TABLE (User accounts)
-- ============================================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  role TEXT DEFAULT 'user', -- 'user' or 'admin'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- 2. CREATE LISTINGS TABLE (Marketplace items)
-- ============================================================================
CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- e.g. "Electronics & Appliances"
  subcategory TEXT NOT NULL, -- e.g. "TVs"
  region TEXT NOT NULL, -- e.g. "Littoral"
  department TEXT NOT NULL, -- e.g. "Wouri"
  subdivision TEXT NOT NULL, -- e.g. "Douala"
  location TEXT NOT NULL, -- e.g. "Bonamoussadi"
  price BIGINT, -- in FCFA, NULL = "Price on request"
  photo_url TEXT, -- URL to image in Supabase Storage
  status TEXT DEFAULT 'pending', -- 'pending' | 'approved' | 'rejected'
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 4. CREATE POLICIES (Access control)
-- ============================================================================

-- Listings: Everyone can READ approved listings only
CREATE POLICY "View approved listings"
  ON listings FOR SELECT
  USING (status = 'approved');

-- Listings: Authenticated users can INSERT their own listings
CREATE POLICY "Sellers can create listings"
  ON listings FOR INSERT
  WITH CHECK (auth.uid() = seller_id);

-- Listings: Sellers can UPDATE/DELETE their own listings (pending status only)
CREATE POLICY "Sellers can manage own listings"
  ON listings FOR UPDATE
  USING (auth.uid() = seller_id AND status = 'pending')
  WITH CHECK (auth.uid() = seller_id);

-- Listings: ADMIN CAN VIEW ALL & MODIFY ALL
CREATE POLICY "Admins can view all listings"
  ON listings FOR SELECT
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE POLICY "Admins can manage all listings"
  ON listings FOR UPDATE
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Profiles: Users can READ all profiles (public)
CREATE POLICY "View profiles"
  ON profiles FOR SELECT
  USING (TRUE);

-- Profiles: Users INSERT own profile at signup
CREATE POLICY "Create own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Profiles: Users UPDATE their own profile
CREATE POLICY "Update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ============================================================================
-- 5. CREATE INDEXES (Performance)
-- ============================================================================
CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_listings_seller_id ON listings(seller_id);
CREATE INDEX idx_listings_region ON listings(region);
CREATE INDEX idx_listings_category ON listings(category);
CREATE INDEX idx_listings_created_at ON listings(created_at DESC);
CREATE INDEX idx_listings_is_featured ON listings(is_featured);

-- ============================================================================
-- 6. MAKE FIRST ADMIN
-- ============================================================================
-- After creating your first user account, run this (replace with your user ID):
-- UPDATE profiles SET role = 'admin' WHERE id = 'YOUR_USER_ID_HERE';
--
-- To find your user ID, go to:
-- Supabase Dashboard → Authentication → Users → Click your email → Copy "UID"

-- ============================================================================
-- 7. STORAGE SETUP
-- ============================================================================
-- In Supabase Dashboard, go to Storage:
-- 1. Click "New bucket"
-- 2. Name it: listing-images
-- 3. Set PUBLIC access
-- 4. Done! Photos will upload here automatically

-- ============================================================================
-- Done! Your MOKUTA database is ready 🚀
-- ============================================================================
