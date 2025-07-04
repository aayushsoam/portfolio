
-- Create a table for projects
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  github_url TEXT,
  demo_url TEXT,
  color TEXT DEFAULT '#F9F5F0',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  display_order INTEGER DEFAULT 0
);

-- Add Row Level Security (RLS) - making it public for now since this is a portfolio
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to view projects (public portfolio)
CREATE POLICY "Anyone can view projects" 
  ON public.projects 
  FOR SELECT 
  USING (true);

-- Create policy that allows anyone to insert projects (you can restrict this later)
CREATE POLICY "Anyone can create projects" 
  ON public.projects 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy that allows anyone to update projects (you can restrict this later)
CREATE POLICY "Anyone can update projects" 
  ON public.projects 
  FOR UPDATE 
  USING (true);

-- Create policy that allows anyone to delete projects (you can restrict this later)
CREATE POLICY "Anyone can delete projects" 
  ON public.projects 
  FOR DELETE 
  USING (true);

-- Insert some sample data to get you started
INSERT INTO public.projects (title, category, description, image_url, color, display_order) VALUES
('Harmony', 'Interface Design', 'A beautiful interface design project focusing on user experience and modern aesthetics.', '/placeholder.svg', '#F9F5F0', 1),
('Serenity', 'Design & Development', 'Full-stack web application with modern design principles and responsive layouts.', '/placeholder.svg', '#F5F5F5', 2),
('Essence', 'Product Design', 'Product design project showcasing innovative solutions and user-centered design approach.', '/placeholder.svg', '#F0F0F0', 3),
('Balance', 'Visual Identity', 'Brand identity design with comprehensive visual guidelines and brand strategy.', '/placeholder.svg', '#EAEAEA', 4);
