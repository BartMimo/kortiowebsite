-- Create a view that aggregates shares per day.
-- Adjust the source table name/column if your events table differs.

CREATE OR REPLACE VIEW public.admin_brand_shared_daily AS
SELECT
  (DATE_TRUNC('day', created_at))::date AS date,
  COUNT(*) AS count
FROM public.events
WHERE (event = 'share' OR event = 'shared' OR type = 'share' OR action = 'share')
GROUP BY DATE_TRUNC('day', created_at)::date
ORDER BY DATE_TRUNC('day', created_at)::date;
