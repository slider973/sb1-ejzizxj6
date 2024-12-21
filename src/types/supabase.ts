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
      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          due_date: string
          status: 'todo' | 'in_progress' | 'completed'
          assigned_to: string
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          due_date: string
          status?: 'todo' | 'in_progress' | 'completed'
          assigned_to: string
          created_by: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          due_date?: string
          status?: 'todo' | 'in_progress' | 'completed'
          assigned_to?: string
          created_by?: string
          created_at?: string
        }
      }
    }
  }
}