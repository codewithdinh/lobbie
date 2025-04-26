import { createClient } from "@supabase/supabase-js";

const URL = import.meta.env.VITE_SUPABASE_URL;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Add fallback handling for when env variables aren't available
if (!URL || !ANON_KEY) {
  console.error("Missing Supabase environment variables. Check your .env file and Vercel configuration.");
}

export const supabase = createClient(URL, ANON_KEY);