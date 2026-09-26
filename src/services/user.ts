import { supabase } from '@/lib/supabase';
import type { UserRole } from '@/types/auth';
import type { AppUser } from '@/types/user';

export async function getAllUsers(): Promise<AppUser[]> {
  const { data, error } = await supabase.from('profiles').select('*').order('username');
  if (error) throw error;
  return data;
}

export async function updateUserRole(userId: string, role: UserRole): Promise<AppUser> {
  const { data, error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}