import TopNavBar from '../components/TopNavBar';
import Order from '../components/orderContents/Order';
import useDrawerStore from '../zustand/MenuBarStore';
import TopContent from '../components/stockDetails/TopContent';
//import ChartContainer from '../components/stockDetails/ChartContainer';
import OrderBook from '../components/stockDetails/OrderBook';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NewStockData } from '../types/NewStockData';
import useMarketStore from '../zustand/MarketStore';

const boxStyles = {
  backgroundColor: '#ffffff',
  margin: '10px',
  borderRadius: '15px',
};

function StockDetailsPage() {
  const { openDrawer } = useDrawerStore();
  const location = useLocation();
  const { name, initPrice, initRate, initRatePrice } = location.state || {};
  const [newStockData, setNewStockData] = useState<NewStockData>();
  const { symbol } = useParams<{ symbol: string }>();
  const isMarketOpen = useMarketStore((state) => state.isMarketOpen);

  useEffect(() => {
    // 주식 장 닫혀있는 시간이면 SSE 연결 하지 않음
    if (!isMarketOpen) return;

    const eventSource = new EventSource(`http://localhost:30081/api/v1/stockDetails/sse/stream/${symbol}`);
    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setNewStockData(newData);
    };
    eventSource.onerror = () => {
      console.error('SSE connection error');
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  }, [symbol, isMarketOpen]);

  return (
    <>
      <div
        className={`w-full h-[100vh] bg-Bg-gray transition-all duration-300 ${openDrawer ? 'mr-[335px]' : 'mr-[65px]'}`}
      >
        <TopNavBar color={'gray'} />
        <div className="w-full h-[30px]"></div>
        <div className="w-full min-w-[1300px] px-[10px]">
          <div className="w-full h-[5vh] flex justify-center items-center">
            <TopContent
              symbol={symbol ?? ''}
              name={name}
              stockprice={newStockData?.close ?? initPrice}
              rate={newStockData?.rate ?? initRate}
              rate_price={newStockData?.rate_price ?? initRatePrice}
            />
          </div>
          <div className="flex h-[80vh]">
            <div className="w-[55%] h-full" style={boxStyles}>
              {/* <ChartContainer symbol={symbol ?? ''} newStockData={newStockData!} /> */}
            </div>
            <div className="w-[25%] h-[80vh]" style={boxStyles}>
              <div className="text-[20px] font-bold p-[15px]">호가</div>
              <OrderBook symbol={symbol ?? ''} />
            </div>
            <div className="w-[20%] h-[80vh]" style={boxStyles}>
              <div className="text-[20px] font-bold p-[15px]">주문하기</div>
              <Order symbol={symbol ?? ''} stockprice={newStockData?.close ?? 0} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StockDetailsPage;
