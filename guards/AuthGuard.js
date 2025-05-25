
import { useEffect } from 'react';

import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'next/navigation';

export const AuthGuard = ({ children }) => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      logout();
      router.replace('/login');
    }
    else {
      router.replace('/dashboard');
    }
  }, []);


  return children 


};
