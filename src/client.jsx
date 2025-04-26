import { createClient } from "@supabase/supabase-js";

const URL = 'https://xlyqjujsoiyfikdbfwth.supabase.co';
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(URL, ANON_KEY);