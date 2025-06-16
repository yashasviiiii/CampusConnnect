import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          email: string
          college_id: string
          course: string
          year: string
          avatar_url?: string
          college_name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          college_id: string
          course: string
          year: string
          avatar_url?: string
          college_name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          college_id?: string
          course?: string
          year?: string
          avatar_url?: string
          college_name?: string
          created_at?: string
          updated_at?: string
        }
      }
      marketplace_items: { /* ...unchanged... */ }
      discussions: { /* ...unchanged... */ }
      events: { /* ...unchanged... */ }
      messages: { /* ...unchanged... */ }
      conversations: { /* ...unchanged... */ }

      comments: {
        Row: {
          id: string
          user_id: string
          discussion_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          discussion_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          discussion_id?: string
          content?: string
          created_at?: string
        }
      }
    }
  }
}
