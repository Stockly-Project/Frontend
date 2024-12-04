// 알림목록, 메시지에 변경사항이 생길 때마다 화면에 바로 반영하기 위해서 useEffect의 의존값으로 사용하는 flag

import { create } from 'zustand';
interface AlertState {
  flag: boolean;
  isModalOpen: boolean; // 모달 열림/닫힘 상태
  company_name: string;
  price: number;
  symbol:string;
  setFlagState: (flag:boolean) => void;
  openModal: () => void;
  closeModal: () => void;
  setCompanyInfo: (name:string, price:number, symbol:string) => void;
}

const AlertStore = create<AlertState>((set) => ({
  flag: false,
  isModalOpen: false,
  company_name: '',
  price: 0,
  symbol: '',
  setFlagState: (flag) => set({ flag: flag }),
  openModal: () => set({ isModalOpen: true }), // 모달 열기
  closeModal: () => set({ isModalOpen: false }), // 모달 닫기
  setCompanyInfo: (name, price, symbol) => set({ company_name: name, price: price, symbol: symbol }),
}));

export default AlertStore;
