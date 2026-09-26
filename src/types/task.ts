export type TaskStatus = 'on_progress' | 'on_hold' | 'completed';

export interface Task {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  progress_percent: number;
  assigned_to: string;
  assigned_by: string;
  created_at: string;
  updated_at: string;
  projects?: { name: string };
  assignee?: { username: string };
}

export interface CreateTaskPayload {
  project_id: string;
  title: string;
  description?: string;
  assigned_to: string;
  assigned_by: string;
}

export interface UpdateTaskPayload {
  id: string;
  status?: TaskStatus;
  progress_percent?: number;
}