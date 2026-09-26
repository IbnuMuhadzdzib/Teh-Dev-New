import { supabase } from '@/lib/supabase';
import type { CreateDocumentPayload, Document } from '@/types/document';

export async function getDocuments(): Promise<Document[]> {
  const { data, error } = await supabase
    .from('documents')
    .select('*, creator:profiles!created_by(username)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as unknown as Document[];
}

export async function createDocument(
  payload: CreateDocumentPayload,
  createdBy: string,
): Promise<Document> {
  const { data, error } = await supabase
    .from('documents')
    .insert({ ...payload, created_by: createdBy })
    .select()
    .single();

  if (error) throw error;
  return data;
}