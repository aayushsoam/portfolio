
-- Create work_experience table
CREATE TABLE public.work_experience (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create work_experience_documents table for PDF storage
CREATE TABLE public.work_experience_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  work_experience_id UUID REFERENCES public.work_experience(id) ON DELETE CASCADE NOT NULL,
  document_name TEXT NOT NULL,
  document_url TEXT NOT NULL,
  file_size INTEGER,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.work_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_experience_documents ENABLE ROW LEVEL SECURITY;

-- Create policies for work_experience
CREATE POLICY "Anyone can view work experience" 
  ON public.work_experience 
  FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can create work experience" 
  ON public.work_experience 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can update work experience" 
  ON public.work_experience 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Anyone can delete work experience" 
  ON public.work_experience 
  FOR DELETE 
  USING (true);

-- Create policies for work_experience_documents
CREATE POLICY "Anyone can view work experience documents" 
  ON public.work_experience_documents 
  FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can create work experience documents" 
  ON public.work_experience_documents 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can update work experience documents" 
  ON public.work_experience_documents 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Anyone can delete work experience documents" 
  ON public.work_experience_documents 
  FOR DELETE 
  USING (true);

-- Create storage bucket for work experience documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('work-experience-docs', 'work-experience-docs', true);

-- Create storage policies for the bucket
CREATE POLICY "Anyone can view work experience documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'work-experience-docs');

CREATE POLICY "Anyone can upload work experience documents"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'work-experience-docs');

CREATE POLICY "Anyone can update work experience documents"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'work-experience-docs');

CREATE POLICY "Anyone can delete work experience documents"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'work-experience-docs');
