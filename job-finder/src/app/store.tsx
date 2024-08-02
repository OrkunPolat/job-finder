import { create } from 'zustand';
import axios from 'axios';

interface AuthState {
  [x: string]: any;
  isAuthenticated: boolean;
  user: { name: string } | null;
  accessToken: string | null;
  errorMessage: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  accessToken: null,
  errorMessage: null,

  login: async (email: string, password: string) => {
    try {
      const response = await axios.post('https://novel-project-ntj8t.ampt.app/api/login', { email, password });
      const { accessToken, user } = response.data;
      set({ isAuthenticated: true, accessToken, user, errorMessage: null });
      localStorage.setItem('accessToken', accessToken);
    } catch (error: any) {
      const message = error.response?.data.message || 'An error occurred';
      set({ errorMessage: message });
      console.error('Login failed:', message);
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    set({ isAuthenticated: false, user: null, accessToken: null });
  },

  register: async (email: string, password: string) => {
    try {
      await axios.post('https://novel-project-ntj8t.ampt.app/api/register', { email, password });
      set({ errorMessage: null });
    } catch (error: any) {
      const message = error.response?.data.message || 'An error occurred';
      set({ errorMessage: message });
      console.error('Registration failed:', message);
    }
  },
}));
