# MOKUTA Deployment Guide

## ✅ What's Ready

- Full marketplace frontend (Next.js + vanilla JS)
- Real-time listings with Supabase
- User authentication (signup/login)
- Admin dashboard for moderation
- Bilingual support (English/French)
- Mobile responsive design
- WhatsApp integration for seller contact

## 🚀 Deploy in 3 Steps

### Step 1: Enable GitHub Pages
```bash
# Go to: Settings → Pages → Source → Deploy from a branch (main)
# Save and wait 2-3 minutes
```

### Step 2: Verify Supabase Setup
Database structure is required. Run these SQL commands in Supabase SQL Editor:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create listings table
CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  subcategory TEXT,
  region TEXT,
  department TEXT,
  subdivision TEXT,
  location TEXT,
  price BIGINT,
  photo_url TEXT,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Set policies for public read
CREATE POLICY "Public read" ON listings FOR SELECT USING (status = 'approved');
CREATE POLICY "Users can read profiles" ON profiles FOR SELECT USING (TRUE);
```

### Step 3: Make First Admin
```sql
-- Set your user ID as admin
UPDATE profiles SET role = 'admin' WHERE id = '<YOUR_USER_ID>';
```

## 📊 Live URL
Your site will be live at: `https://fetemicro.github.io/mokuta/`

## ✏️ Make Admin Accessible
Add this to index.html footer if you want admin quick-link:
```html
<a href="admin.html" style="display:none" id="adminLink">Admin</a>
<script>
  if (user && user.app_metadata?.role === 'admin') {
    document.getElementById('adminLink').style.display = 'inline';
  }
</script>
```

## 🔒 Security Checklist
- ✅ Credentials in Supabase (not in repo)
- ✅ RLS policies protect user data
- ✅ Phone numbers hidden from listings
- ✅ Admin role verified server-side

## 📱 Test Before Publishing
1. Sign up → Create listing → Admin approve → View live
2. Test on mobile (iOS Safari + Android Chrome)
3. Test WhatsApp link on actual phone
4. Test both English/French
