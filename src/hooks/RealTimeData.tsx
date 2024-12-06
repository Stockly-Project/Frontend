import { useEffect, useState } from 'react';
import useMarketStore from '../zustand/MarketStore';
import useChartListStore from '../zustand/ChartListStore';

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

const RealTimeData = () => {
  const isMarketOpen = useMarketStore((state) => state.isMarketOpen);
  const [isLoaded, setIsLoaded] = useState(false);
  const { setStockData, updateStockData } = useChartListStore();


  useEffect(() => {
    setIsLoaded(false);
    fetch(`http://localhost:30081/api/v1/stockDetails/symbols`, {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          console.log('네트워크 응답이 올바르지 않습니다');
        }
        return res.json();
      })
      .then((fetchedData: StockData[]) => {
        setStockData(fetchedData);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
      });
  }, []);

  useEffect(() => {
    // 주식 장 닫혀있는 시간이면 SSE 연결 하지 않음
    if (!isMarketOpen || !isLoaded) return;

    // Web Worker 초기화
    const dataWorker = new Worker(new URL('./DataWorker.js', import.meta.url));
    dataWorker.postMessage({
      dataUrl: 'http://localhost:30081/api/v1/stockDetails/sse/stream/multiple/symbols?page=1',
    });

    // 메인 스레드에서 Web Worker로부터 받은 메시지를 처리
    dataWorker.onmessage = (event) => {
      const newData = event.data[0];
      updateStockData(newData);

    };

    // 컴포넌트 언마운트 시 Web Worker 종료
    return () => {
      dataWorker.terminate();
    };
  }, [isLoaded]);

};

export default RealTimeData
