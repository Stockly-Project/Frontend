import TopNavBar from '../components/TopNavBar';
import Order from '../components/orderContents/Order';
import useDrawerStore from '../zustand/MenuBarStore';
import TopContent from '../components/stockDetails/TopContent';
import ChartContainer from '../components/stockDetails/ChartContainer';
import OrderBook from '../components/stockDetails/OrderBook';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NewStockData } from "../types/NewStockData";

const boxStyles = {
  backgroundColor: '#ffffff',
  margin: '10px',
  borderRadius: '15px',
};

function StockDetailsPage() {
  const { openDrawer } = useDrawerStore();
  const location = useLocation();
  const { symbol, name } = location.state || {};
  const [newStockData, setNewStockData] = useState<NewStockData>();

  useEffect(() => {
    const eventSource = new EventSource(`http://localhost.stock-service/api/v1/stockDetails/sse/stream/${symbol}`);
    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setNewStockData(newData);
    }
    eventSource.onerror = () => {
      console.error('SSE connection error');
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  }, []);
  
  return (
    <>
      <div
        className={`w-full h-[100vh] bg-Bg-gray transition-all duration-300 ${openDrawer ? 'mr-[325px]' : 'mr-[65px]'}`}
      >
        <TopNavBar color={"gray"}/>
        <div className="w-full h-[30px]"></div>
        <div className="w-full min-w-[1300px] px-[10px]">
          <div className="w-full h-[5vh] flex justify-center items-center">
            <TopContent symbol={symbol} name={name} stockprice={newStockData?.close ?? 0} rate={newStockData?.rate ?? 0} rate_price={newStockData?.rate_price ?? 0}/>
          </div>
          <div className="flex h-[80vh]">
            <div className="w-[55%] h-full" style={boxStyles}>
              <ChartContainer symbol={symbol} newStockData={newStockData!}/>
            </div>
            <div className="w-[25%] h-full" style={boxStyles}>
              <OrderBook symbol={symbol}/>
            </div>
            <div className="w-[20%] h-full" style={boxStyles}>
              <Order stockprice={newStockData?.close ?? 0}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StockDetailsPage;
