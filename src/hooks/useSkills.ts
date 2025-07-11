
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      console.log("Fetching skills data...");
      
      const { data, error } = await supabase
        .from("skills")
        .select(`
          *,
          skill_projects (*)
        `)
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching skills:", error);
        throw error;
      }

      console.log("Skills data fetched:", data);
      return data;
    },
  });
};
