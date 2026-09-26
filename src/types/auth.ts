export type UserRole = 'worker' | 'pm' | 'pl' | 'founder';

export interface Profile {
  id: string;
  username: string;
  role: UserRole;
  created_at: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}