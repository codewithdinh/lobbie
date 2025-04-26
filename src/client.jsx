import { createClient } from "@supabase/supabase-js";

const URL = "https://xlyqjujsoiyfikdbfwth.supabase.co";
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhseXFqdWpzb2l5ZmlrZGJmd3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMDYyNjYsImV4cCI6MjA2MDg4MjI2Nn0.cQ4bHG0FA4droBKS1OngSv0yfd9HHKv3uauYSr6VfUY";

// Add fallback handling for when env variables aren't available
if (!URL || !ANON_KEY) {
  console.error("Missing Supabase environment variables. Check your .env file and Vercel configuration.");
}

export const supabase = createClient(URL, ANON_KEY);