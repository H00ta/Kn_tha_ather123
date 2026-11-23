// Supabase connection
const SUPABASE_URL = "https://gfmdvljbjhhfvubuqaeu.supabase.co";

// ضع هنا Publishable key من Supabase
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_9K3JSY79h4MbtMq3Z7eZwg_meM6ka8v";

window.supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);
