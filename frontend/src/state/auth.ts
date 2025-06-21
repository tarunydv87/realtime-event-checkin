import { create } from 'zustand'

type AuthState = {
  token: string
  setToken: (token: string) => void
  clearToken: () => void
}

export const useAuth = create<AuthState>((set) => ({
  token: '',
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: '' }),
}))
