import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem('accessToken') || null,
  setAccessToken: (token) => {
    localStorage.setItem('accessToken', token);
    console.log('저장할 토큰', token);

    set({ accessToken: token });
  },
  logout: () => {
    localStorage.removeItem('accessToken');
    set({ accessToken: null });
  },
}));

export default useAuthStore;
