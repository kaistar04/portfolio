import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xboudzrzstrqdkekuztx.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_Pljp3JF13GfDV-FDujEF5g_4T0IGppi';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
