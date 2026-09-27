export interface DocumentCategory {
  id: string;
  name: string;
  created_by: string | null;
  created_at: string;
}

export interface Document {
  id: string;
  category_id: string;
  name: string;
  link: string;
  note: string | null;
  created_by: string | null;
  created_at: string;
  creator?: { username: string };
  category?: { name: string };
}

export interface CreateCategoryPayload {
  name: string;
}

export interface CreateDocumentPayload {
  category_id: string;
  name: string;
  link: string;
  note?: string;
}