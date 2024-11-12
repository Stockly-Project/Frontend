import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

interface StockData {
  close: number;
  id: number;
  name: string;
  rate: number;
  rate_price: number;
  symbol: string;
  volume: number;
  trading_value: number;
}

function StockChart() {

  const navigate = useNavigate();
  const gotoDetails = (symbol: string, name: string) => {
    navigate("/details", { state: { symbol: symbol, name: name } });
  }

  const stockDatas = [
    {
      close: 0,
      id: 1,
      name: '삼성전자',
      rate: 0,
      rate_price: 0,
      symbol: '005930',
      volume: 0,
      trading_value: 0,
    },
    {
      close: 0,
      id: 2,
      name: 'SK하이닉스',
      rate: 0,
      rate_price: 0,
      symbol: '000660',
      volume: 0,
      trading_value: 0,
    },
    {
      close: 0,
      id: 3,
      name: 'LG엔솔',
      rate: 0,
      rate_price: 0,
      symbol: '373220',
      volume: 0,
      trading_value: 0,
    },
    {
      close: 0,
      id: 4,
      name: '현대차',
      rate: 0,
      rate_price: 0,
      symbol: '005380',
      volume: 0,
      trading_value: 0,
    },
    {
      close: 0,
      id: 5,
      name: '삼성바이오로직스',
      rate: 0,
      rate_price: 0,
      symbol: '207940',
      volume: 0,
      trading_value: 0,
    },
    {
      close: 0,
      id: 6,
      name: '기아',
      rate: 0,
      rate_price: 0,
      symbol: '000270',
      volume: 0,
      trading_value: 0,
    },
    {
      close: 0,
      id: 7,
      name: '셀트리온',
      rate: 0,
      rate_price: 0,
      symbol: '068270',
      volume: 0,
      trading_value: 0,
    },
    {
      close: 0,
      id: 8,
      name: 'LG화학',
      rate: 0,
      rate_price: 0,
      symbol: '051910',
      volume: 0,
      trading_value: 0,
    },
    {
      close: 0,
      id: 9,
      name: 'POSCO홀딩스',
      rate: 0,
      rate_price: 0,
      symbol: '005490',
      volume: 0,
      trading_value: 0,
    },
    {
      close: 0,
      id: 10,
      name: 'NAVER',
      rate: 0,
      rate_price: 0,
      symbol: '035420',
      volume: 0,
      trading_value: 0,
    },
    {
      close: 0,
      id: 11,
      name: '삼성SDI',
      rate: 0,
      rate_price: 0,
      symbol: '006400',
      volume: 0,
      trading_value: 0,
    },
    {
      close: 0,
      id: 12,
      name: 'KB금융',
      rate: 0,
      rate_price: 0,
      symbol: '105560',
      volume: 0,
      trading_value: 0,
    },
    {
      close: 0,
      id: 13,
      name: '삼성물산',
      rate: 0,
      rate_price: 0,
      symbol: '028260',
      volume: 0,
      trading_value: 0,
    },
    {
      close: 0,
      id: 14,
      name: '현대모비스',
      rate: 0,
      rate_price: 0,
      symbol: '012330',
      volume: 0,
      trading_value: 0,
    },
    {
      close: 0,
      id: 15,
      name: '신한지주',
      rate: 0,
      rate_price: 0,
      symbol: '055550',
      volume: 0,
      trading_value: 0,
    },
    {
      close: 0,
      id: 16,
      name: '카카오',
      rate: 0,
      rate_price: 0,
      symbol: '035720',
      volume: 0,
      trading_value: 0,
    },
    {
      close: 0,
      id: 17,
      name: '포스코케미칼',
      rate: 0,
      rate_price: 0,
      symbol: '003670',
      volume: 0,
      trading_value: 0,
    },
    {
      close: 0,
      id: 18,
      name: 'LG전자',
      rate: 0,
      rate_price: 0,
      symbol: '066570',
      volume: 0,
      trading_value: 0,
    },
    {
      close: 0,
      id: 19,
      name: '하나금융지주',
      rate: 0,
      rate_price: 0,
      symbol: '086790',
      volume: 0,
      trading_value: 0,
    },
    {
      close: 0,
      id: 20,
      name: '삼성생명',
      rate: 0,
      rate_price: 0,
      symbol: '032830',
      volume: 0,
      trading_value: 0,
    },
  ];

  const [datas, setDatas] = useState<StockData[]>(stockDatas);

  useEffect(() => {
    // Web Worker 초기화
    const dataWorker = new Worker(new URL('./DataWorker.js', import.meta.url));
    dataWorker.postMessage({ dataUrl: 'http://localhost.stock-server/api/v1/stockDetails/stream/multiple?page=1' });

    // 메인 스레드에서 Web Worker로부터 받은 메시지를 처리
    dataWorker.onmessage = (event) => {
      const newDataArray = event.data;
      const time = new Date();
      console.log("데이터 들어옴", time);

      // 기존 데이터와 비교해 필요한 부분만 업데이트
      setDatas((prevDatas) =>
        prevDatas.map((data) => {
          const newData = newDataArray.find((item:StockData) => item.id === data.id);
          return newData ? { ...data, ...newData } : data;
        })
      );
    };

    // 컴포넌트 언마운트 시 Web Worker 종료
    return () => {
      dataWorker.terminate();
    };
  }, []);

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
          <tr className="border-b border-[#e5e5e5]">
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
            onClick={()=>{gotoDetails(data.symbol, data.name)}}
          >
            <td className="text-left flex py-[10px] text-chart-font px-1 text-[18px]">
              <p className="text-MainBlue mr-10 font-bold text-[19px]">{index + 1}</p> {data.name}
            </td>
            <td className="text-right py-[10px] text-chart-font text-[18px]">
              {data.close.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
            </td>
            <td
              className={`text-right py-[10px] text-chart-font text-[18px] ${data.rate_price > 0 ? 'text-up' : 'text-down'}`}
            >
              {data.rate_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 ({data.rate})%
            </td>
            <td className="text-right py-[10px] text-chart-font text-[18px]">{data.trading_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
            <td className="text-right py-[10px] text-chart-font px-1 text-[18px]">{data.volume}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center my-4">{/* 페이지네이션 버튼 추가 */}</div>
    </div>
  );
}

export default StockChart;
