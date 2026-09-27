import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { createCategory, createDocument, deleteCategory, deleteDocument, getCategories, getDocuments, updateCategory, updateDocument } from '@/services/document';
import type { CreateCategoryPayload, CreateDocumentPayload, UpdateCategoryPayload, UpdateDocumentPayload } from '@/types/document';

export function useCategoriesQuery() {
  return useQuery({ queryKey: ['document_categories'], queryFn: getCategories });
}

export function useCreateCategoryMutation(createdBy: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateCategoryPayload) => createCategory(payload, createdBy),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['document_categories'] }),
  });
}

export function useUpdateCategoryMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateCategoryPayload) => updateCategory(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['document_categories'] }),
  });
}

export function useDeleteCategoryMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['document_categories'] }),
  });
}

export function useDocumentsQuery() {
  return useQuery({ queryKey: ['documents'], queryFn: getDocuments });
}

export function useCreateDocumentMutation(createdBy: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateDocumentPayload) => createDocument(payload, createdBy),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['documents'] }),
  });
}

export function useUpdateDocumentMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateDocumentPayload) => updateDocument(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['documents'] }),
  });
}

export function useDeleteDocumentMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteDocument(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['documents'] }),
  });
}