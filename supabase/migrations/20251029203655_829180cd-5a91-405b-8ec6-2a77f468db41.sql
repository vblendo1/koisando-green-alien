-- Add new fields to products table for Netflix-style interface
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS category text,
ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS thumbnail text;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);