
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type SlidingImage = Database['public']['Tables']['sliding_images']['Row'];

export const useSlidingImages = () => {
  const [slider1Images, setSlider1Images] = useState<SlidingImage[]>([]);
  const [slider2Images, setSlider2Images] = useState<SlidingImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSlidingImages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('sliding_images')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;

      // Separate images by section
      const section1 = data?.filter(img => img.section === 1) || [];
      const section2 = data?.filter(img => img.section === 2) || [];

      setSlider1Images(section1);
      setSlider2Images(section2);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching sliding images:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlidingImages();
  }, []);

  return { 
    slider1Images, 
    slider2Images, 
    loading, 
    error, 
    refetch: fetchSlidingImages 
  };
};
