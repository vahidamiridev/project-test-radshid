// stores/useAuthStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      login: (token) =>{
          set({ isAuthenticated: true, token })
            localStorage.setItem('authToken', token);
      } ,
      logout: () =>{
          set({ isAuthenticated: false, token: null })
                localStorage.removeItem('authToken');
      } 
    }),
    {
      tokenName: 'authToken', 
    }
  )
);
