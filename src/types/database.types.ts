export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      forms: {
        Row: {
          id: string
          title: string
          description: string | null
          status: 'draft' | 'published' | 'archived'
          created_by: string
          created_at: string
          updated_at: string
          settings: Json
          is_template: boolean
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          status?: 'draft' | 'published' | 'archived'
          created_by: string
          created_at?: string
          updated_at?: string
          settings?: Json
          is_template?: boolean
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          status?: 'draft' | 'published' | 'archived'
          created_by?: string
          created_at?: string
          updated_at?: string
          settings?: Json
          is_template?: boolean
        }
      }
      form_fields: {
        Row: {
          id: string
          form_id: string
          type: string
          label: string
          description: string | null
          required: boolean
          order_index: number
          properties: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          form_id: string
          type: string
          label: string
          description?: string | null
          required?: boolean
          order_index: number
          properties?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          form_id?: string
          type?: string
          label?: string
          description?: string | null
          required?: boolean
          order_index?: number
          properties?: Json
          created_at?: string
          updated_at?: string
        }
      }
      form_responses: {
        Row: {
          id: string
          form_id: string
          user_id: string | null
          respondent_email: string | null
          ip_address: string | null
          submitted_at: string
          metadata: Json
        }
        Insert: {
          id?: string
          form_id: string
          user_id?: string | null
          respondent_email?: string | null
          ip_address?: string | null
          submitted_at?: string
          metadata?: Json
        }
        Update: {
          id?: string
          form_id?: string
          user_id?: string | null
          respondent_email?: string | null
          ip_address?: string | null
          submitted_at?: string
          metadata?: Json
        }
      }
      field_answers: {
        Row: {
          id: string
          response_id: string
          field_id: string
          value: string | null
          file_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          response_id: string
          field_id: string
          value?: string | null
          file_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          response_id?: string
          field_id?: string
          value?: string | null
          file_url?: string | null
          created_at?: string
        }
      }
      files: {
        Row: {
          id: string
          storage_path: string
          original_name: string
          mime_type: string
          size: number
          uploaded_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          storage_path: string
          original_name: string
          mime_type: string
          size: number
          uploaded_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          storage_path?: string
          original_name?: string
          mime_type?: string
          size?: number
          uploaded_by?: string | null
          created_at?: string
        }
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
  }
} 