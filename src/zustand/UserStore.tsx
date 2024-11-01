import { create } from 'zustand';

interface UserState {
  isLoggedin: boolean;
  email: string;
  setUserState:(login: boolean, name: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  isLoggedin: false,
  email: '',
  setUserState: (login: boolean, name: string) => {
    set({isLoggedin: login, email:name})
  },
}));

export default useUserStore;
