import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import useMarketStore from '../../zustand/MarketStore';

interface OrderData {
  id: number;
  // symbol: string;
  // name: string;
  sell_price_0: number;
  sell_price_1: number;
  sell_price_2: number;
  sell_price_3: number;
  sell_price_4: number;
  sell_price_5: number;
  sell_price_6: number;
  sell_volume_0: number;
  sell_volume_1: number;
  sell_volume_2: number;
  sell_volume_3: number;
  sell_volume_4: number;
  sell_volume_5: number;
  sell_volume_6: number;
  buy_price_0: number;
  buy_price_1: number;
  buy_price_2: number;
  buy_price_3: number;
  buy_price_4: number;
  buy_price_5: number;
  buy_price_6: number;
  buy_volume_0: number;
  buy_volume_1: number;
  buy_volume_2: number;
  buy_volume_3: number;
  buy_volume_4: number;
  buy_volume_5: number;
  buy_volume_6: number;

  [key: string]: number;
}

interface OrderBookProps {
  symbol: string;
}

const OrderBook = ({ symbol }: OrderBookProps) => {
  const [askLength, setAskLength] = useState<number[]>([]);
  const [bidLength, setBidLength] = useState<number[]>([]);
  const [datas, setDatas] = useState<OrderData>();
  const isOrderBookAvailable = useMarketStore((state) => state.isOrderBookAvailable);

  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:30082/api/v1/invests/orderBook/${symbol}`);
    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setDatas(newData);
    };
    eventSource.onerror = () => {
      console.error('SSE connection error');
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  }, [symbol]);

  useEffect(() => {
    const calculateLengths = (data: OrderData): void => {
      // sell_volume과 buy_volume을 추출하여 배열로 구성
      const sellVolumes = [
        data.sell_volume_3,
        data.sell_volume_4,
        data.sell_volume_5,
        data.sell_volume_6,
        data.sell_volume_7,
        data.sell_volume_8,
        data.sell_volume_9,
        data.sell_volume_10,
      ];
      const buyVolumes = [
        data.buy_volume_1,
        data.buy_volume_2,
        data.buy_volume_3,
        data.buy_volume_4,
        data.buy_volume_5,
        data.buy_volume_6,
        data.buy_volume_7,
        data.buy_volume_8,
      ];

      // sell_volume과 buy_volume 중 최대값 찾기
      const maxVolume = Math.max(...sellVolumes, ...buyVolumes);

      // sell_volume과 buy_volume 각각에 대해 (volume / maxVolume) * 100 계산하여 리스트에 저장
      const calculatedSellLengths = sellVolumes.map((volume) => (volume / maxVolume) * 100);
      const calculatedBuyLengths = buyVolumes.map((volume) => (volume / maxVolume) * 100);

      // 상태에 계산된 길이 비율을 업데이트
      setAskLength(calculatedSellLengths);
      setBidLength(calculatedBuyLengths);
    };
    // 예시 데이터가 있을 때 함수 호출
    if (datas) {
      calculateLengths(datas);
    }
  }, [datas]);

  if (!isOrderBookAvailable) {
    return (
      <div className="w-full h-[70vh] flex flex-col justify-center items-center">
        <p className="text-[22px] text-[#545454]">지금은 호가 조회 시간이 아니에요</p>
        <p className="text-[17px] text-[#cacaca] m-[10px]">호가 정보는 평일 8:30 ~ 18:00에 제공합니다.</p>
      </div>
    );
  }

  if (datas === undefined) {
    return (
      <div className="w-full h-[70vh] flex flex-col justify-center items-center">
        <CircularProgress size={50} sx={{ color: '#3182F6' }} />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[70vh] flex flex-col justify-center items-center p-[20px]">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#c1c1c1]">
            <th className="w-[35%] h-[5vh] text-center p-[10px]">매도수량</th>
            <th className="w-[30%] h-[5vh] text-center p-[10px]">금액 (원)</th>
            <th className="w-[35%] h-[5vh] text-center p-[10px]">매수수량</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 8 }).map((_, index) => (
            <tr key={`ask-${index}`}>
              <td
                className="w-[35%] h-[4vh] text-right px-[10px] relative text-[13px] border-b-[3px] border-white"
                style={{ background: `linear-gradient(to left, #c6d2f6 ${askLength[index]}%, transparent 0)` }}
              >
                {datas[`sell_volume_${index + 3}`]} 주
              </td>
              <td className="w-[30%] h-[4vh] text-center py-2 px-[10px] border-x border-[#c1c1c1] bg-[#e7efff]">
                {datas[`sell_price_${index + 3}`].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </td>
              <td className="w-[35%] h-[4vh] text-center p-[10px]"></td>
            </tr>
          ))}
          {Array.from({ length: 8 }).map((_, index) => (
            <tr key={`bid-${index}`}>
              <td className="w-[35%] h-[4vh] text-center p-[10px]"></td>
              <td className="w-[30%] h-[4vh] text-center py-2 px-[10px] border-x border-[#c1c1c1] bg-[#ffe6e6]">
                {datas[`buy_price_${index + 1}`].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </td>
              <td
                className="w-[35%]  h-[4vh] text-left px-[10px] relative text-[13px] border-t-[3px] border-white"
                style={{ background: `linear-gradient(to right, #ffc9c9 ${bidLength[index]}%, transparent 0)` }}
              >
                {datas[`buy_volume_${index + 1}`]} 주
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderBook;
