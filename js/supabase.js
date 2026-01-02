<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://votltdaxhvcvnbejhqzp.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
  const supabase = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
  );
</script>