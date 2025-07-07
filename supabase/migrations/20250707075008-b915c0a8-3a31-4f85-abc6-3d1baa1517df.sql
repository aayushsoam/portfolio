
-- Create a table for certificates
CREATE TABLE public.certificates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  issued_by TEXT,
  issued_date DATE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to make certificates publicly readable
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to view certificates (public access)
CREATE POLICY "Anyone can view certificates" 
  ON public.certificates 
  FOR SELECT 
  USING (true);

-- Create policy that allows anyone to insert certificates
CREATE POLICY "Anyone can create certificates" 
  ON public.certificates 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy that allows anyone to update certificates
CREATE POLICY "Anyone can update certificates" 
  ON public.certificates 
  FOR UPDATE 
  USING (true);

-- Create policy that allows anyone to delete certificates
CREATE POLICY "Anyone can delete certificates" 
  ON public.certificates 
  FOR DELETE 
  USING (true);
