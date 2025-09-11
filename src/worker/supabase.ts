
import { createClient } from '@supabase/supabase-js'
import { Env } from './env'

export const getSupabaseClient = (env: Env) => {
  const supabaseUrl = env.SUPABASE_URL
  const supabaseKey = env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY must be set in environment variables')
  }

  return createClient(supabaseUrl, supabaseKey)
}
