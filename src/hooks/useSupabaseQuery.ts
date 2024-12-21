import { useState, useEffect } from 'react'
import { handleSupabaseError } from '@/lib/supabase'

export function useSupabaseQuery<T>(
  queryFn: () => Promise<{ data: T | null; error: any }>,
  deps: any[] = []
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true

    async function fetchData() {
      try {
        setLoading(true)
        const result = await handleSupabaseError(queryFn())
        if (mounted) {
          setData(result)
          setError(null)
        }
      } catch (err) {
        console.error('Query error:', err)
        if (mounted) {
          setError(err instanceof Error ? err : new Error('An error occurred'))
          setData(null)
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      mounted = false
    }
  }, deps)

  return { data, loading, error }
}