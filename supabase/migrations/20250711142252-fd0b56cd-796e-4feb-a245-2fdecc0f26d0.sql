
-- Create a table for skills
CREATE TABLE public.skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT 'bg-blue-500',
  percentage INTEGER NOT NULL DEFAULT 0 CHECK (percentage >= 0 AND percentage <= 100),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  display_order INTEGER DEFAULT 0
);

-- Create a table for skill projects
CREATE TABLE public.skill_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  project_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  display_order INTEGER DEFAULT 0
);

-- Add Row Level Security (RLS)
ALTER TABLE public.skills ENABLE ROW LEVEL Security;
ALTER TABLE public.skill_projects ENABLE ROW LEVEL Security;

-- Create policies for public access (you can modify these later if you need authentication)
CREATE POLICY "Anyone can view skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Anyone can create skills" ON public.skills FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update skills" ON public.skills FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete skills" ON public.skills FOR DELETE USING (true);

CREATE POLICY "Anyone can view skill projects" ON public.skill_projects FOR SELECT USING (true);
CREATE POLICY "Anyone can create skill projects" ON public.skill_projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update skill projects" ON public.skill_projects FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete skill projects" ON public.skill_projects FOR DELETE USING (true);

-- Insert sample data to match your existing skills
INSERT INTO public.skills (name, icon_name, color, percentage, display_order) VALUES
('Figma', 'Figma', 'bg-purple-500', 95, 1),
('Python', 'FileCode', 'bg-blue-500', 85, 2),
('HTML 5', 'FileType', 'bg-orange-500', 98, 3),
('CSS', 'Wind', 'bg-blue-400', 92, 4),
('JavaScript', 'Braces', 'bg-yellow-400', 90, 5),
('Framer', 'Zap', 'bg-pink-500', 80, 6),
('React', 'Code', 'bg-blue-600', 95, 7),
('Next.js', 'LayoutTemplate', 'bg-black', 88, 8);

-- Insert sample projects for each skill
INSERT INTO public.skill_projects (skill_id, project_name, display_order) VALUES
((SELECT id FROM public.skills WHERE name = 'Figma'), 'Brand Redesign', 1),
((SELECT id FROM public.skills WHERE name = 'Figma'), 'E-commerce UI', 2),
((SELECT id FROM public.skills WHERE name = 'Figma'), 'Dashboard', 3),
((SELECT id FROM public.skills WHERE name = 'Python'), 'Data Analysis', 1),
((SELECT id FROM public.skills WHERE name = 'Python'), 'Web Scraper', 2),
((SELECT id FROM public.skills WHERE name = 'Python'), 'API', 3),
((SELECT id FROM public.skills WHERE name = 'HTML 5'), 'Portfolio Site', 1),
((SELECT id FROM public.skills WHERE name = 'HTML 5'), 'Landing Pages', 2),
((SELECT id FROM public.skills WHERE name = 'HTML 5'), 'Email Templates', 3),
((SELECT id FROM public.skills WHERE name = 'CSS'), 'Animations', 1),
((SELECT id FROM public.skills WHERE name = 'CSS'), 'Responsive Layouts', 2),
((SELECT id FROM public.skills WHERE name = 'CSS'), 'Design Systems', 3),
((SELECT id FROM public.skills WHERE name = 'JavaScript'), 'Interactive Forms', 1),
((SELECT id FROM public.skills WHERE name = 'JavaScript'), 'Dynamic Content', 2),
((SELECT id FROM public.skills WHERE name = 'JavaScript'), 'API Integration', 3),
((SELECT id FROM public.skills WHERE name = 'Framer'), 'Micro-interactions', 1),
((SELECT id FROM public.skills WHERE name = 'Framer'), 'Motion Design', 2),
((SELECT id FROM public.skills WHERE name = 'Framer'), 'Prototypes', 3),
((SELECT id FROM public.skills WHERE name = 'React'), 'SPA', 1),
((SELECT id FROM public.skills WHERE name = 'React'), 'Component Library', 2),
((SELECT id FROM public.skills WHERE name = 'React'), 'Dashboard', 3),
((SELECT id FROM public.skills WHERE name = 'Next.js'), 'E-commerce', 1),
((SELECT id FROM public.skills WHERE name = 'Next.js'), 'Blog', 2),
((SELECT id FROM public.skills WHERE name = 'Next.js'), 'Corporate Site', 3);
