import TopNavBar from '../components/TopNavBar';
import Order from '../components/orderContents/Order';
import useDrawerStore from '../zustand/MenuBarStore';
import TopContent from '../components/stockDetails/TopContent';
import ChartContainer from '../components/stockDetails/ChartContainer';
import OrderPrice from '../components/stockDetails/OrderBook';

const boxStyles = {
  backgroundColor: '#ffffff',
  margin: '10px',
  borderRadius: '15px',
};

function StockDetailsPage() {
  const { openDrawer } = useDrawerStore();
  return (
    <>
      <div
        className={`w-full h-[100vh] bg-Bg-gray transition-all duration-300 ${openDrawer ? 'mr-[325px]' : 'mr-[65px]'}`}
      >
        <TopNavBar color={"gray"}/>
        <div className="w-full h-[30px]"></div>
        <div className="w-full min-w-[1300px] px-[10px]">
          <div className="w-full h-[5vh] flex justify-center items-center">
            <TopContent />
          </div>
          <div className="flex h-[80vh]">
            <div className="w-[55%] h-full" style={boxStyles}>
              <ChartContainer />
            </div>
            <div className="w-[25%] h-full" style={boxStyles}>
              <OrderPrice />
            </div>
            <div className="w-[20%] h-full" style={boxStyles}>
              <Order />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StockDetailsPage;
