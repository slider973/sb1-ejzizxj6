import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/supabase'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  },
  global: {
    fetch: fetch.bind(globalThis)
  }
})

export async function handleSupabaseError<T>(
  promise: Promise<{ data: T | null; error: any }>
): Promise<T> {
  try {
    const { data, error } = await promise
    
    if (error) {
      console.error('Supabase error:', error)
      throw new Error(error.message || 'An error occurred while fetching data')
    }
    
    if (!data) {
      throw new Error('No data returned from Supabase')
    }
    
    return data
  } catch (error) {
    console.error('Request failed:', error)
    throw error
  }
}