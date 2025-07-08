
-- Create a table for sliding images
CREATE TABLE public.sliding_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  background_color TEXT DEFAULT '#e3e5e7',
  display_order INTEGER DEFAULT 0,
  section INTEGER NOT NULL CHECK (section IN (1, 2)), -- 1 for first slider, 2 for second slider
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to make sliding images publicly readable
ALTER TABLE public.sliding_images ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to view sliding images (public access)
CREATE POLICY "Anyone can view sliding images" 
  ON public.sliding_images 
  FOR SELECT 
  USING (true);

-- Create policy that allows anyone to insert sliding images
CREATE POLICY "Anyone can create sliding images" 
  ON public.sliding_images 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy that allows anyone to update sliding images
CREATE POLICY "Anyone can update sliding images" 
  ON public.sliding_images 
  FOR UPDATE 
  USING (true);

-- Create policy that allows anyone to delete sliding images
CREATE POLICY "Anyone can delete sliding images" 
  ON public.sliding_images 
  FOR DELETE 
  USING (true);

-- Insert some sample data for the sliding images
INSERT INTO public.sliding_images (image_url, background_color, display_order, section) VALUES
('/placeholder.svg', '#e3e5e7', 1, 1),
('/placeholder.svg', '#d6d7dc', 2, 1),
('/placeholder.svg', '#e3e3e3', 3, 1),
('/placeholder.svg', '#21242b', 4, 1),
('/placeholder.svg', '#d4e3ec', 1, 2),
('/placeholder.svg', '#e5e0e1', 2, 2),
('/placeholder.svg', '#d7d4cf', 3, 2),
('/placeholder.svg', '#e1dad6', 4, 2);
