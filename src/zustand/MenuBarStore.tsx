import { create } from 'zustand';

interface DrawerState {
  openDrawer: boolean;
  like: boolean;
  alert: boolean;
  chart: boolean;
  handleDrawer: (button: string) => void;
}

const useDrawerStore = create<DrawerState>((set) => ({
  openDrawer: false,
  like: false,
  alert: false,
  chart: false,
  handleDrawer: (button: string) =>
    set((state) => {
      // drawer가 닫혀있다가 열리는 경우
      if (!state.openDrawer) {
        if (button === 'like') {
          return { openDrawer: true, like: true, alert: false, chart: false };
        } 
        else if (button === 'alert'){
          return { openDrawer: true, like: false, alert: true, chart: false };
        }
        else if (button === 'chart') {
          return { openDrawer: true, like: false, alert: false, chart: true };
        }
      } else {
        // drawer가 열려있던 상태에서 한 번 더 눌러서 drawer를 닫을 경우
        if (state.like && button === 'like') {
          return { openDrawer: false, like: false };
        } 
        else if (state.alert && button === 'alert'){
          return { openDrawer: false, alert: false };
        } 
        else if (state.chart && button === 'chart') {
          return { openDrawer: false, chart: false };

        // drawer가 열려있던 상태에서 다른 버튼을 눌러서 content 변화시킬 경우
        } else if (state.like && button === 'alert') {
          return { like: false, alert: true };
        }
        else if (state.like && button === 'chart') {
          return { like: false, chart: true };
        }
        else if (state.alert && button === 'like') {
          return { alert: false, like: true };
        }
        else if (state.alert && button === 'chart') {
          return { alert: false, chart: true };
        } 
        else if (state.chart && button === 'like') {
          return { chart: false, like: true };
        }
        else if (state.chart && button === 'alert') {
          return { chart: false, alert: true };
        }
      }
      return state;
    }),
}));

export default useDrawerStore;