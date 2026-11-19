
// CONEXIÓN CON SUPABASE

const SUPABASE_URL = "https://vyduyawpxlydjbxshimh.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_H6Ct9hVQ6CWWZVxM2kLU-g_5XBkL_8T";

window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
