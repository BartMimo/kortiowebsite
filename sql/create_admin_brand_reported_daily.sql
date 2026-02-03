-- Create a view that aggregates reports per day.
-- This uses the `reports` table which exists in the schema.

-- aggregated (all brands)
DROP VIEW IF EXISTS public.admin_brand_reported_daily;
CREATE VIEW public.admin_brand_reported_daily AS
SELECT
  (DATE_TRUNC('day', created_at))::date AS date,
  COUNT(*) AS count
FROM public.reports
GROUP BY DATE_TRUNC('day', created_at)::date
ORDER BY DATE_TRUNC('day', created_at)::date;

-- per-brand
DROP VIEW IF EXISTS public.admin_brand_reported_daily_by_brand;
CREATE VIEW public.admin_brand_reported_daily_by_brand AS
SELECT
  (DATE_TRUNC('day', created_at))::date AS date,
  coupons.brand_id,
  COUNT(*) AS count
FROM public.reports
LEFT JOIN public.coupons ON public.reports.coupon_id = public.coupons.id
GROUP BY DATE_TRUNC('day', created_at)::date, coupons.brand_id
ORDER BY DATE_TRUNC('day', created_at)::date;
