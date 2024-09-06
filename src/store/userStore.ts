import { create } from 'zustand';
import { getUsers, createUser, deleteUser, updateUser } from '@/services/userService';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  addUser: (userData: User) => Promise<void>;
  removeUser: (id: number) => Promise<void>;
  editUser: (id: number, userData: User) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const users = await getUsers();
      set({ users, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  addUser: async (userData) => {
    set({ loading: true, error: null });
    try {
      const newUser = await createUser(userData);
      set((state) => ({ users: [...state.users, newUser], loading: false }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  removeUser: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteUser(id);
      set((state) => ({ users: state.users.filter((user) => user.id !== id), loading: false }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  editUser: async (id, userData) => {
    set({ loading: true, error: null });
    try {
      const updatedUser = await updateUser(id, userData);
      set((state) => ({
        users: state.users.map((user) => (user.id === id ? updatedUser : user)),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
