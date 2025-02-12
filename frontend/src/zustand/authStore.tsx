import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  userType: 'admin' | 'company' | 'personal' | null;
  setAuth: (token: string, userType: 'admin' | 'company' | 'personal') => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem('accessToken') || null,
  userType: localStorage.getItem('userType') as 'admin' | 'company' | 'personal' | null,

  setAuth: (token, userType) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userType', userType);

    set({ accessToken: token, userType });
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userType');
    set({ accessToken: null, userType: null });
  },
}));

export default useAuthStore;
