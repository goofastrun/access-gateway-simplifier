// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zxrtgwbiwazhggxyxaqo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4cnRnd2Jpd2F6aGdneHl4YXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxMTgxNjIsImV4cCI6MjA0OTY5NDE2Mn0.y4na-vZOivBYsKjI9cHvy0yC-e_j5kiHjk57Ar1KNMc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);