import {create} from 'zustand';

type User = {
    username: string;
    role: 'admin' | 'student' | 'usurper';
};

type Store = {
    user: User | null;
    setUser: (user: User | null) => void;
};

export const useStore = create<Store>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));