import { createClient } from '@supabase/supabase-js'

// Note: The `createBrowserClient` from '@supabase/ssr' is a good practice for server-side rendering,
// but for a purely client-side setup as we have now, the standard `createClient` is simpler and effective.

// 1. Get the Supabase URL and Anon Key from environment variables.
// The `NEXT_PUBLIC_` prefix is essential for Next.js to expose these variables to the browser.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 2. Check if the variables are loaded correctly. If not, throw an error.
// This provides a clear error message if the .env.local file is missing or the server wasn't restarted.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required. Check your .env.local file and restart the server.');
}

// 3. Create and export the Supabase client.
// This single instance will be imported and used throughout your application.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
