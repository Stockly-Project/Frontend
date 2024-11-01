import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  isLoggedin: boolean;
  email: string;
  setUserState: (login: boolean, name: string) => void;
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      isLoggedin: false,
      email: '',
      setUserState: (login: boolean, name: string) => {
        set({ isLoggedin: login, email: name });
      },
    }),
    {
      name: 'userStorage',
    },
  ),
);

export default useUserStore;
