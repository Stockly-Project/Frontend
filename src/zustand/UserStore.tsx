import { create } from 'zustand';
import { persist} from 'zustand/middleware';

interface UserState {
  isLoggedin: boolean;
  email: string;
  name: string;
  setUserState: (login: boolean, name: string, email: string) => void;
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      isLoggedin: false,
      email: '',
      name: '',
      setUserState: (login: boolean, name: string, email: string) => {
        set({ isLoggedin: login, name: name, email: email });
      },
    }),
    {
      name: 'userStorage',
      storage: {
        getItem: (name) => {
          const storedValue = sessionStorage.getItem(name);
          return storedValue ? JSON.parse(storedValue) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    },
  ),
);

export default useUserStore;
