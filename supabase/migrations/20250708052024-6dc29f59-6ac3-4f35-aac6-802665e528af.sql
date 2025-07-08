
-- Update the sliding_images table to support videos as well
ALTER TABLE public.sliding_images 
ADD COLUMN media_type VARCHAR(10) DEFAULT 'image' CHECK (media_type IN ('image', 'video')),
ADD COLUMN title VARCHAR(255),
ADD COLUMN description TEXT;

-- Update the existing records to have media_type as 'image'
UPDATE public.sliding_images SET media_type = 'image' WHERE media_type IS NULL;

-- Make media_type NOT NULL after setting default values
ALTER TABLE public.sliding_images ALTER COLUMN media_type SET NOT NULL;

-- Create a storage bucket for sliding media if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('sliding-media', 'sliding-media', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for the sliding-media bucket
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'sliding-media');
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'sliding-media' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update" ON storage.objects FOR UPDATE USING (bucket_id = 'sliding-media' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete" ON storage.objects FOR DELETE USING (bucket_id = 'sliding-media' AND auth.role() = 'authenticated');
