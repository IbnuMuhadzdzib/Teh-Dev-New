import { supabase } from '@/lib/supabase';
import type { CreateCategoryPayload, CreateDocumentPayload, Document, DocumentCategory, UpdateCategoryPayload, UpdateDocumentPayload } from '@/types/document';

export async function getCategories(): Promise<DocumentCategory[]> {
  const { data, error } = await supabase
    .from('document_categories')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createCategory(
  payload: CreateCategoryPayload,
  createdBy: string,
): Promise<DocumentCategory> {
  const { data, error } = await supabase
    .from('document_categories')
    .insert({ ...payload, created_by: createdBy })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCategory(payload: UpdateCategoryPayload): Promise<DocumentCategory> {
  const { id, ...updates } = payload;
  const { data, error } = await supabase
    .from('document_categories')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCategory(id: string): Promise<void> {
  const { error } = await supabase.from('document_categories').delete().eq('id', id);
  if (error) throw error;
}

export async function getDocuments(): Promise<Document[]> {
  const { data, error } = await supabase
    .from('documents')
    .select('*, creator:profiles!created_by(username), category:document_categories!category_id(name)')
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
  return data as unknown as Document;
}

export async function updateDocument(payload: UpdateDocumentPayload): Promise<Document> {
  const { id, ...updates } = payload;
  const { data, error } = await supabase
    .from('documents')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as unknown as Document;
}

export async function deleteDocument(id: string): Promise<void> {
  const { error } = await supabase.from('documents').delete().eq('id', id);
  if (error) throw error;
}