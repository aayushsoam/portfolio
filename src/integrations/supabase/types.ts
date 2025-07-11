export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      certificates: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          image_url: string
          issued_by: string | null
          issued_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url: string
          issued_by?: string | null
          issued_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string
          issued_by?: string | null
          issued_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      project: {
        Row: {
          category: string
          color: string | null
          created_at: string
          demo_url: string | null
          description: string | null
          display_order: number | null
          github_url: string | null
          id: string
          image_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          color?: string | null
          created_at?: string
          demo_url?: string | null
          description?: string | null
          display_order?: number | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          color?: string | null
          created_at?: string
          demo_url?: string | null
          description?: string | null
          display_order?: number | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string
          color: string | null
          created_at: string
          demo_url: string | null
          description: string | null
          display_order: number | null
          github_url: string | null
          id: string
          image_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          color?: string | null
          created_at?: string
          demo_url?: string | null
          description?: string | null
          display_order?: number | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          color?: string | null
          created_at?: string
          demo_url?: string | null
          description?: string | null
          display_order?: number | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      skill_projects: {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          project_name: string
          skill_id: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          project_name: string
          skill_id: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          project_name?: string
          skill_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "skill_projects_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          color: string
          created_at: string
          display_order: number | null
          icon_name: string
          id: string
          name: string
          percentage: number
          updated_at: string
        }
        Insert: {
          color?: string
          created_at?: string
          display_order?: number | null
          icon_name: string
          id?: string
          name: string
          percentage?: number
          updated_at?: string
        }
        Update: {
          color?: string
          created_at?: string
          display_order?: number | null
          icon_name?: string
          id?: string
          name?: string
          percentage?: number
          updated_at?: string
        }
        Relationships: []
      }
      sliding_images: {
        Row: {
          background_color: string | null
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          image_url: string
          media_type: string
          section: number
          title: string | null
          updated_at: string
        }
        Insert: {
          background_color?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url: string
          media_type: string
          section: number
          title?: string | null
          updated_at?: string
        }
        Update: {
          background_color?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string
          media_type?: string
          section?: number
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      work_experience: {
        Row: {
          company: string
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          period: string
          position: string
          updated_at: string
        }
        Insert: {
          company: string
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          period: string
          position: string
          updated_at?: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          period?: string
          position?: string
          updated_at?: string
        }
        Relationships: []
      }
      work_experience_documents: {
        Row: {
          created_at: string
          display_order: number | null
          document_name: string
          document_url: string
          file_size: number | null
          id: string
          updated_at: string
          work_experience_id: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          document_name: string
          document_url: string
          file_size?: number | null
          id?: string
          updated_at?: string
          work_experience_id: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          document_name?: string
          document_url?: string
          file_size?: number | null
          id?: string
          updated_at?: string
          work_experience_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_experience_documents_work_experience_id_fkey"
            columns: ["work_experience_id"]
            isOneToOne: false
            referencedRelation: "work_experience"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
