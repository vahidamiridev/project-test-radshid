import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      userInfo: null, 

      login: ({ token, userInfo }) => {
        set({ isAuthenticated: true, token, userInfo });
        localStorage.setItem('authToken', token);
        localStorage.setItem('authUser', JSON.stringify(userInfo));
      },

      logout: () => {
        set({ isAuthenticated: false, token: null, user: null });
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
      },
    }),
    {
      name: 'auth',
    }
  )
);
