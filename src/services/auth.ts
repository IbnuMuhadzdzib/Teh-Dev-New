import { supabase, toPseudoEmail } from '@/lib/supabase';
import type { LoginPayload, Profile } from '@/types/auth';

export async function loginRequest({ username, password }: LoginPayload) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: toPseudoEmail(username),
    password,
  });
  if (error) throw new Error('Username atau password salah');

  const profile = await fetchProfile(data.user.id);
  return { session: data.session, profile };
}

export async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) return null;
  return data;
}

export async function logoutRequest() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}