import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL='https://tqzezltsstvvhupbzbuu.supabase.co'
const SUPABASE_API='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxemV6bHRzc3R2dmh1cGJ6YnV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMzA3ODIsImV4cCI6MjA2ODcwNjc4Mn0.ltZ01AaFPsFK0JSa1SvuluwyoLC1sQLiR0Iy0OgEoWo'
export const supabase = createClient(SUPABASE_URL, SUPABASE_API)