-- Create a view that aggregates favorites per day.
-- Adjust the source table name if your events table is different.

CREATE OR REPLACE VIEW public.admin_brand_favorites_daily AS
SELECT
  (DATE_TRUNC('day', created_at))::date AS date,
  COUNT(*) AS count
FROM public.favorites
GROUP BY DATE_TRUNC('day', created_at)::date
ORDER BY DATE_TRUNC('day', created_at)::date;

-- To inspect the view:
-- SELECT * FROM public.admin_brand_favorites_daily LIMIT 100;
