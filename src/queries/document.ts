import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { createDocument, getDocuments } from '@/services/document';
import type { CreateDocumentPayload } from '@/types/document';

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