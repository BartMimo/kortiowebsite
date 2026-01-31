-- Create a view that aggregates shares per day.
-- Adjust the source table name/column if your events table differs.

CREATE OR REPLACE VIEW public.admin_brand_shared_daily AS
SELECT
  (DATE_TRUNC('day', created_at))::date AS date,
  COUNT(*) AS count
FROM public.events
WHERE (COALESCE(event_type,'') ILIKE '%share%')
GROUP BY DATE_TRUNC('day', created_at)::date
ORDER BY DATE_TRUNC('day', created_at)::date;
