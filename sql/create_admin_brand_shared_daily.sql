-- Create a view that aggregates shares per day.
-- Adjust the source table name/column if your events table differs.

-- aggregated (all brands)
DROP VIEW IF EXISTS public.admin_brand_shared_daily;
CREATE VIEW public.admin_brand_shared_daily AS
SELECT
  (DATE_TRUNC('day', created_at))::date AS date,
  COUNT(*) AS count
FROM public.brand_events
WHERE (COALESCE(event_type,'') ILIKE '%share%')
GROUP BY DATE_TRUNC('day', created_at)::date
ORDER BY DATE_TRUNC('day', created_at)::date;

-- per-brand
DROP VIEW IF EXISTS public.admin_brand_shared_daily_by_brand;
CREATE VIEW public.admin_brand_shared_daily_by_brand AS
SELECT
  (DATE_TRUNC('day', created_at))::date AS date,
  brand_id,
  COUNT(*) AS count
FROM public.brand_events
WHERE (COALESCE(event_type,'') ILIKE '%share%')
GROUP BY DATE_TRUNC('day', created_at)::date, brand_id
ORDER BY DATE_TRUNC('day', created_at)::date;
