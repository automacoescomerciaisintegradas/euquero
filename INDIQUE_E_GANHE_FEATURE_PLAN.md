# Feature Plan: Indique e Ganhe (Refer and Earn)

## 1. Feature Overview
The "Indique e Ganhe" feature will allow users to invite friends to join the platform and earn rewards when their referrals sign up and become active users.

## 2. Key Requirements

### Backend (Database & API)
- Add a new table for referral codes and tracking
- Create API endpoints for:
  - Generating referral codes
  - Tracking referrals
  - Awarding credits to referrers
  - Retrieving referral statistics

### Frontend (UI Components)
- Add a new section in the dashboard for referral management
- Create a referral code display component
- Implement sharing options (social media, email, copy link)
- Show referral statistics and earnings history

## 3. Database Schema Changes

### Referral Codes Table
```sql
CREATE TABLE referral_codes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  uuid TEXT NOT NULL UNIQUE,
  userId TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  code TEXT NOT NULL UNIQUE,
  isActive BOOLEAN DEFAULT true,
  createdAt TEXT DEFAULT (datetime('now')),
  updatedAt TEXT DEFAULT (datetime('now'))
);
```

### Referrals Table
```sql
CREATE TABLE referrals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  uuid TEXT NOT NULL UNIQUE,
  referrerId TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  referredId TEXT REFERENCES users(id) ON DELETE SET NULL,
  referralCode TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'completed', 'expired')),
  rewardAmount NUMERIC(12, 2) DEFAULT 0,
  credited BOOLEAN DEFAULT false,
  createdAt TEXT DEFAULT (datetime('now')),
  completedAt TEXT
);
```

### Indexes for performance
```sql
CREATE INDEX idx_referral_codes_user_id ON referral_codes (userId);
CREATE INDEX idx_referral_codes_code ON referral_codes (code);
CREATE INDEX idx_referrals_referrer_id ON referrals (referrerId);
CREATE INDEX idx_referrals_referred_id ON referrals (referredId);
CREATE INDEX idx_referrals_status ON referrals (status);
```

## 4. API Endpoints
- `POST /api/referrals/generate` - Generate a referral code for a user
- `GET /api/referrals/my-code` - Get the current user's referral code
- `GET /api/referrals/stats` - Get referral statistics for the current user
- `POST /api/referrals/track` - Track a referral signup (used during registration)
- `POST /api/referrals/award-credits` - Award credits to referrer (called when referral completes registration)

## 5. Frontend Components
- `ReferralDashboard` - Main component for the referral section
- `ReferralCodeDisplay` - Shows the user's referral code with copy functionality
- `ReferralStats` - Displays referral statistics and earnings
- `SocialShareButtons` - Provides sharing options for the referral link

## 6. Business Logic
- Each user gets one unique referral code
- When someone signs up using a referral code, the referral is tracked
- When the referred user completes registration, both users get rewards
- Rewards are in the form of platform credits (R$10 for referrer, R$10 for referred)

## 7. Integration Points
- User authentication system
- Credit system for awarding rewards
- Registration flow to capture referral codes
- Dashboard for displaying referral information