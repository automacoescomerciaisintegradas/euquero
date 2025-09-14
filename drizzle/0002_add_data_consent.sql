CREATE TABLE migrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add data_consent column to users table
ALTER TABLE users ADD COLUMN data_consent_given INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN data_consent_given_at TEXT;

-- Add data_consent indexes
CREATE INDEX idx_users_data_consent ON users (data_consent_given);