export type PriorityLevel = 'rendah' | 'menengah' | 'tinggi';

export interface DocumentCategory {
  id: string;
  name: string;
  sort_order: number;
  created_by: string | null;
  created_at: string;
}

export interface Document {
  id: string;
  category_id: string;
  name: string;
  link: string;
  note: string | null;
  priority: PriorityLevel;
  created_by: string | null;
  created_at: string;
  creator?: { username: string };
  category?: { name: string };
}

export interface CreateCategoryPayload {
  name: string;
}

export interface UpdateCategoryPayload {
  id: string;
  name?: string;
  sort_order?: number;
}

export interface CreateDocumentPayload {
  category_id: string;
  name: string;
  link: string;
  note?: string;
  priority?: PriorityLevel;
}

export interface UpdateDocumentPayload {
  id: string;
  category_id?: string;
  name?: string;
  link?: string;
  note?: string;
  priority?: PriorityLevel;
}