import type { UserRole } from './auth';

export interface AppUser {
  id: string;
  username: string;
  role: UserRole;
  created_at: string;
}