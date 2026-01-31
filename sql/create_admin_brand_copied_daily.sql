-- Create a view that aggregates copies per day.
-- Adjust the source table name/column if your events table differs.

CREATE OR REPLACE VIEW public.admin_brand_copied_daily AS
SELECT
  (DATE_TRUNC('day', created_at))::date AS date,
  COUNT(*) AS count
FROM public.events
WHERE (event = 'copy' OR event = 'copied' OR type = 'copy' OR action = 'copy')
GROUP BY DATE_TRUNC('day', created_at)::date
ORDER BY DATE_TRUNC('day', created_at)::date;

-- If you don't have an `events` table, adjust SOURCE_TABLE and filter accordingly.
