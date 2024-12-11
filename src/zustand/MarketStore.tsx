import { create } from 'zustand';

interface MarketState {
  isMarketOpen: boolean;
  isOrderBookAvailable: boolean;
  startMarketStatusUpdater: () => () => void; // 주기적 상태 갱신 시작
}

const useMarketStore = create<MarketState>((set) => {
  const checkMarketStatus = () => {
    const now = new Date();
    const day = now.getDay(); // 0: 일요일, 1: 월요일 ... 6: 토요일
    const hour = now.getHours();
    const minute = now.getMinutes();

    const isWeekday = day >= 1 && day <= 5;
    const isMarketOpen = isWeekday && ((hour >= 9 && hour < 15) || (hour === 15 && minute < 30));
    const isOrderBookAvailable = isWeekday && ((hour >= 9 && hour < 15) || (hour === 15 && minute < 30));

    set({ isMarketOpen, isOrderBookAvailable });
  };

  return {
    isMarketOpen: false,
    isOrderBookAvailable: false,
    startMarketStatusUpdater: () => {
      checkMarketStatus(); // 처음 호출
      const interval = setInterval(checkMarketStatus, 15000); // 15초마다 상태 갱신

      // stopUpdater 함수 반환
      return () => clearInterval(interval); // 정리 함수 반환
    },
  };
});

export default useMarketStore;
