import { createClient } from '@supabase/supabase-js';
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);
const EMAIL_DOMAIN = 'internal.local';
export const toPseudoEmail = (username: string) => `${username.toLowerCase()}@${EMAIL_DOMAIN}`;