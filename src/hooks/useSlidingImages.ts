
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SlidingImage {
  id: string;
  image_url: string;
  background_color: string | null;
  media_type: string;
  title: string | null;
  description: string | null;
  section: number;
  display_order: number | null;
}

export const useSlidingImages = () => {
  return useQuery({
    queryKey: ['sliding-images'],
    queryFn: async () => {
      console.log('Fetching sliding images from Supabase...');
      
      const { data, error } = await supabase
        .from('sliding_images')
        .select('*')
        .order('section', { ascending: true })
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching sliding images:', error);
        throw error;
      }

      console.log('Fetched sliding images:', data);
      return data as SlidingImage[];
    },
  });
};
