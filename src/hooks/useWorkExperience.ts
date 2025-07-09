
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useWorkExperience = () => {
  return useQuery({
    queryKey: ["work-experience"],
    queryFn: async () => {
      console.log("Fetching work experience data...");
      
      const { data, error } = await supabase
        .from("work_experience")
        .select(`
          *,
          work_experience_documents (*)
        `)
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching work experience:", error);
        throw error;
      }

      console.log("Work experience data fetched:", data);
      return data;
    },
  });
};
