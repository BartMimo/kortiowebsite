-- Create a view that aggregates favorites per day.
-- Adjust the source table name if your events table is different.

-- aggregated (all brands) view
DROP VIEW IF EXISTS public.admin_brand_favorites_daily;
CREATE VIEW public.admin_brand_favorites_daily AS
SELECT
  (DATE_TRUNC('day', created_at))::date AS date,
  COUNT(*) AS count
FROM public.favorites
GROUP BY DATE_TRUNC('day', created_at)::date
ORDER BY DATE_TRUNC('day', created_at)::date;

-- per-brand view
DROP VIEW IF EXISTS public.admin_brand_favorites_daily_by_brand;
CREATE VIEW public.admin_brand_favorites_daily_by_brand AS
SELECT
  (DATE_TRUNC('day', created_at))::date AS date,
  brand_id,
  COUNT(*) AS count
FROM public.favorites
GROUP BY DATE_TRUNC('day', created_at)::date, brand_id
ORDER BY DATE_TRUNC('day', created_at)::date;

-- To inspect the view:
-- SELECT * FROM public.admin_brand_favorites_daily LIMIT 100;
