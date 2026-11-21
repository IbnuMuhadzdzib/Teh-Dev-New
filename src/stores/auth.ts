import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabase';
import { fetchProfile } from '@/services/auth';
import type { UserRole } from '@/types/auth';

interface AuthState {
  userId: string | null;
  username: string;
  role: UserRole | '';
  ready: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({ userId: null, username: '', role: '', ready: false }),

  getters: {
    isLoggedIn: (s) => !!s.userId,
    canAssignTask: (s) => s.role === 'pm' || s.role === 'pl' || s.role === 'founder',
    isFounder: (s) => s.role === 'founder',
  },

  actions: {
    async init() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (!error && data?.session) {
          await this.loadProfile(data.session.user.id);
        }

        supabase.auth.onAuthStateChange((_event, session) => {
          if (session) this.loadProfile(session.user.id);
          else this.reset();
        });
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        this.ready = true;
      }
    },

    async loadProfile(userId: string) {
      try {
        const profile = await fetchProfile(userId);
        this.userId = userId;
        this.username = profile?.username ?? '';
        this.role = profile?.role ?? '';
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    },

    reset() {
      this.userId = null;
      this.username = '';
      this.role = '';
    },

    async logout() {
      await supabase.auth.signOut();
      this.reset();
    },
  },
});