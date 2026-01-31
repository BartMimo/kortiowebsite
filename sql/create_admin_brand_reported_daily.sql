-- Create a view that aggregates reports per day.
-- This uses the `reports` table which exists in the schema.

CREATE OR REPLACE VIEW public.admin_brand_reported_daily AS
SELECT
  (DATE_TRUNC('day', created_at))::date AS date,
  COUNT(*) AS count
FROM public.reports
GROUP BY DATE_TRUNC('day', created_at)::date
ORDER BY DATE_TRUNC('day', created_at)::date;
