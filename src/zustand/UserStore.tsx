import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
    },
  ),
);

export default useUserStore;
