-- Create a view that aggregates reports per day.
-- This uses the `reports` table which exists in the schema.

DROP VIEW IF EXISTS public.admin_brand_reported_daily;
CREATE VIEW public.admin_brand_reported_daily AS
SELECT
  (DATE_TRUNC('day', created_at))::date AS date,
  brand_id,
  COUNT(*) AS count
FROM public.reports
GROUP BY DATE_TRUNC('day', created_at)::date, brand_id
ORDER BY DATE_TRUNC('day', created_at)::date;
