import { create } from 'zustand';

interface NavBarState {
  home: boolean;
  news: boolean;
  myinvest: boolean;
  handleClick: (button: string) => void;
}

const useNavBarStore = create<NavBarState>((set) => ({
  home: true,
  news: false,
  myinvest: false,
  handleClick: (button: string) =>
    set((state) => {
      // home 누르는 경우
      if (button==='home') {return {home:true, news:false, myinvest:false}}
      else if (button==='news') {return {home:false, news:true, myinvest:false}}
      else if (button==='myinvest') {return {home:false, news:false, myinvest:true}}
      
      return state;
    }),
}));

export default useNavBarStore;
