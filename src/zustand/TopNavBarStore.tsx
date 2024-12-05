import { create } from 'zustand';


interface NavBarState {
  home: boolean;
  mypage: boolean;
  handleClick: (button: string) => void;
}

const useNavBarStore = create<NavBarState>((set) => ({
  home: true,
  mypage: false,
  handleClick: (button: string) =>
    set((state) => {
      // home 누르는 경우
      if (button==='home') {return {home:true, mypage:false}}
      else if (button==='mypage') {return {home:false, mypage:true}}
      
      return state;
    }),
}));

export default useNavBarStore;
