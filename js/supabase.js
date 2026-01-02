import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://votltdaxhvcvnbejhqzp.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_mOUXhFSIWoKEt1LGq1F4vQ_wDAoMeB1";

window.supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

