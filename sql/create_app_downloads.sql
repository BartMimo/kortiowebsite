-- Create table for tracking app downloads
CREATE TABLE IF NOT EXISTS app_downloads (
  id SERIAL PRIMARY KEY,
  platform TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_app_downloads_platform ON app_downloads(platform);
CREATE INDEX IF NOT EXISTS idx_app_downloads_created_at ON app_downloads(created_at);