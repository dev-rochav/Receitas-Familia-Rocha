<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
  const SUPABASE_URL = "https://votltdaxhvcvnbejhqzp.supabase.co";
  const SUPABASE_ANON_KEY = process.env.SUPABASE_KEY;

  window.supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );
</script>
