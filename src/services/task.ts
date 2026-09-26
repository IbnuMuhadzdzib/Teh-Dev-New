import { supabase } from '@/lib/supabase';
import type { CreateTaskPayload, Task, UpdateTaskPayload } from '@/types/task';

const TASK_SELECT = '*, projects(name), assignee:profiles!assigned_to(username)';

export async function getMyTasks(userId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select(TASK_SELECT)
    .eq('assigned_to', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as unknown as Task[];
}

export async function getAllTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select(TASK_SELECT)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as unknown as Task[];
}

export async function createTask(payload: CreateTaskPayload): Promise<Task> {
  const { data, error } = await supabase.from('tasks').insert(payload).select().single();
  if (error) throw error;
  return data;
}

export async function updateTask({ id, ...rest }: UpdateTaskPayload): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .update({ ...rest, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}