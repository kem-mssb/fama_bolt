import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      equipment: {
        Row: {
          id: string
          name: string
          category: 'Electrical Verification' | 'Non-Destructive Inspection' | 'Fault Localisation' | 'Physical Analysis' | 'Material Analysis'
          description: string | null
          applications: string[] | null
          base_duration_hours: number
          base_cost: number
          sample_prep_requirements: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          category: 'Electrical Verification' | 'Non-Destructive Inspection' | 'Fault Localisation' | 'Physical Analysis' | 'Material Analysis'
          description?: string | null
          applications?: string[] | null
          base_duration_hours: number
          base_cost: number
          sample_prep_requirements?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: 'Electrical Verification' | 'Non-Destructive Inspection' | 'Fault Localisation' | 'Physical Analysis' | 'Material Analysis'
          description?: string | null
          applications?: string[] | null
          base_duration_hours?: number
          base_cost?: number
          sample_prep_requirements?: string | null
          created_at?: string
        }
      }
      analysis_requests: {
        Row: {
          id: string
          problem_description: string | null
          material_type: 'Semiconductor' | 'PCB' | 'Metal' | 'Polymer' | 'Ceramic' | 'Composite' | 'Coating' | 'Other' | null
          failure_type: 'Electrical' | 'Mechanical' | 'Thermal' | 'Chemical' | 'Interface' | null
          urgency_level: 'Standard' | 'Expedited' | 'Emergency'
          selected_equipment: any | null
          total_estimated_cost: number | null
          total_estimated_duration: number | null
          ai_recommendations: any | null
          created_at: string
        }
        Insert: {
          id?: string
          problem_description?: string | null
          material_type?: 'Semiconductor' | 'PCB' | 'Metal' | 'Polymer' | 'Ceramic' | 'Composite' | 'Coating' | 'Other' | null
          failure_type?: 'Electrical' | 'Mechanical' | 'Thermal' | 'Chemical' | 'Interface' | null
          urgency_level?: 'Standard' | 'Expedited' | 'Emergency'
          selected_equipment?: any | null
          total_estimated_cost?: number | null
          total_estimated_duration?: number | null
          ai_recommendations?: any | null
          created_at?: string
        }
        Update: {
          id?: string
          problem_description?: string | null
          material_type?: 'Semiconductor' | 'PCB' | 'Metal' | 'Polymer' | 'Ceramic' | 'Composite' | 'Coating' | 'Other' | null
          failure_type?: 'Electrical' | 'Mechanical' | 'Thermal' | 'Chemical' | 'Interface' | null
          urgency_level?: 'Standard' | 'Expedited' | 'Emergency'
          selected_equipment?: any | null
          total_estimated_cost?: number | null
          total_estimated_duration?: number | null
          ai_recommendations?: any | null
          created_at?: string
        }
      }
    }
  }
}