import { StateStorage, createJSONStorage, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';

// Types
import { TUser } from '@/types';

// services
import {
  getItemLocalStorage,
  removeItemLocalStorage,
  setItemLocalStorage,
} from '@/services';

type TAuthState = {
  user: TUser;
};

export type TAuthAction = {
  setUser: (data: Partial<TAuthState>) => void;
};

const initialState: TAuthState = {
  user: {
    id: '',
    email: '',
    password: '',
  },
};

const myStore: () => StateStorage = (): StateStorage => ({
  getItem: (key) => getItemLocalStorage(key),
  setItem: (key, value) => setItemLocalStorage(key, value),
  removeItem: (key) => removeItemLocalStorage(key),
});

export const authStore = createWithEqualityFn(
  persist<TAuthState & TAuthAction>(
    (set) => ({
      ...initialState,
      setUser: (data: Partial<TAuthState>) => set(data),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(myStore),
    },
  ),
);
