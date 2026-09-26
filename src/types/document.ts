export interface Document {
  id: string;
  name: string;
  link: string;
  note: string | null;
  created_by: string | null;
  created_at: string;
  creator?: { username: string };
}

export interface CreateDocumentPayload {
  name: string;
  link: string;
  note?: string;
}