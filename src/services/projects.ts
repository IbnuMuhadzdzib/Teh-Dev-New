import { supabase } from '@/lib/supabase';
import type { CreateProjectPayload, Project } from '@/types/projects';

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getProjectById(id: string): Promise<Project> {
  const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function createProject(
  payload: CreateProjectPayload,
  createdBy: string,
): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .insert({ ...payload, created_by: createdBy })
    .select()
    .single();

  if (error) throw error;
  return data;
}