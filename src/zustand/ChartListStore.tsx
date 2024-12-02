import {create} from 'zustand';

interface StockData {
  symbol: string;
  name: string;
  high: number;
  low: number;
  volume: number;
  date: string;
  open: number;
  close: number;
  rate: number;
  rate_price: number;
  trading_value: number;
}

interface ChartListStore {
  stockData: StockData[];
  setStockData: (data: StockData[]) => void;
  updateStockData: (newData: StockData) => void;
}

const useChartListStore = create<ChartListStore>((set) => ({
  isMarketOpen: true,
  stockData: [],
  setStockData: (data) => set({ stockData: data }),
  updateStockData: (newData) =>
    set((state) => ({
      stockData: state.stockData.map((data) =>
        data.symbol === newData.symbol
          ? { ...data, ...newData}
          : data
      ),
    })),
}));

export default useChartListStore;
