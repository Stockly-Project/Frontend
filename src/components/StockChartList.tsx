import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import useMarketStore from '../zustand/MarketStore';

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

function StockChartList() {
  const navigate = useNavigate();
  const gotoDetails = (symbol: string, name: string, initPrice: number, initRate: number, initRatePrice: number) => {
    navigate(`/details/${symbol}`, {
      state: { name: name, initPrice: initPrice, initRate: initRate, initRatePrice: initRatePrice },
    });
  };

  const [datas, setDatas] = useState<StockData[]>([]);
  const isMarketOpen = useMarketStore((state) => state.isMarketOpen);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    fetch(`http://localhost.stock-service/api/v1/stockDetails/symbols`, {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          console.log('네트워크 응답이 올바르지 않습니다');
        }
        return res.json();
      })
      .then((fetchedData: StockData[]) => {
        setDatas(fetchedData);
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
      dataUrl: 'http://localhost.stock-service/api/v1/stockDetails/sse/stream/multiple/symbols?page=1',
    });

    // 메인 스레드에서 Web Worker로부터 받은 메시지를 처리
    dataWorker.onmessage = (event) => {
      const newData = event.data[0];

      setDatas((prevDatas) =>
        prevDatas.map((data) =>
          data.symbol === newData.symbol
            ? {
                ...data,
                open: newData.open,
                close: newData.close,
                high: newData.high,
                low: newData.low,
                rate: newData.rate,
                rate_price: newData.rate_price,
                volume: newData.volume,
                trading_value: newData.trading_value,
                date: newData.timestamp
              }
            : data,
        ),
      );
    };

    // 컴포넌트 언마운트 시 Web Worker 종료
    return () => {
      dataWorker.terminate();
    };
  }, [isLoaded]);

  if (datas.length === 0) {
    return (
      <>
        <div className="w-full h-[70vh] flex flex-col justify-center items-center">
          <CircularProgress size={50} sx={{ color: '#3182F6' }} />
          <p className="m-[10px]">Loading...</p>
        </div>
      </>
    );
  }

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="border-y border-[#dddddd]">
            <th className="text-left w-[20%] py-[10px] text-chart-font px-1">종목</th>
            <th className="text-right w-[15%] py-[10px] text-chart-font">현재가</th>
            <th className="text-right w-[25%] py-[10px] text-chart-font">등락률</th>
            <th className="text-right w-[20%] py-[10px] text-chart-font">거래대금</th>
            <th className="text-right w-[20%] py-[10px] text-chart-font px-1">거래량</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr
              key={index}
              className="rounded-[5px] hover:bg-Bg-gray cursor-pointer"
              onClick={() => {
                gotoDetails(data.symbol, data.name, data.close, data.rate, data.rate_price);
              }}
            >
              <td className="text-left flex py-[10px] text-chart-font px-1 text-[18px]">
                <p className="text-MainBlue w-[45px] font-bold text-[19px]">{index + 1}</p> {data.name}
              </td>
              <td className="text-right py-[10px] text-chart-font text-[18px]">
                {data.close.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
              </td>
              <td
                className={`text-right py-[10px] text-chart-font text-[18px] ${data.rate_price > 0 ? 'text-up' : 'text-down'}`}
              >
                {data.rate_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 ({data.rate})%
              </td>
              <td className="text-right py-[10px] text-chart-font text-[18px]">
                {data.trading_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </td>
              <td className="text-right py-[10px] text-chart-font px-1 text-[18px]">{data.volume}주</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-[50px]"></div>
    </div>
  );
}

export default StockChartList;
