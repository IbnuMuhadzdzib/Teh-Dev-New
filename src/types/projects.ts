export interface Project {
  id: string;
  name: string;
  description: string | null;
  preview_url: string | null;
  design_link: string | null;
  repo_link: string | null;
  contract_link: string | null;
  document_link: string | null;
  status: string;
  created_by: string | null;
  created_at: string;
}

export interface CreateProjectPayload {
  name: string;
  description?: string;
  preview_url?: string;
  design_link?: string;
  repo_link?: string;
  contract_link?: string;
  document_link?: string;
}