-- Create a view that aggregates copies per day.
-- Adjust the source table name/column if your events table differs.

CREATE OR REPLACE VIEW public.admin_brand_copied_daily AS
SELECT
  (DATE_TRUNC('day', created_at))::date AS date,
  COUNT(*) AS count
FROM public.brand_events
WHERE (COALESCE(event_type,'') ILIKE '%copy%')
GROUP BY DATE_TRUNC('day', created_at)::date
ORDER BY DATE_TRUNC('day', created_at)::date;

-- If you don't have an `events` table, adjust SOURCE_TABLE and filter accordingly.
