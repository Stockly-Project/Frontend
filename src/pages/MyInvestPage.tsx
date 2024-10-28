import TopNavBar from '../components/TopNavBar';
import useDrawerStore from '../zustand/MenuBarStore';
import DoughnutChart from '../components/myInvestContent/DoughnutChart';
import RoiChart from '../components/myInvestContent/RoiChart';
import BarChart from '../components/myInvestContent/BarChart';
import MyStockList from '../components/myInvestContent/MyStockList';
import AssetChart from '../components/myInvestContent/AssetChart';
import MyOrderList from '../components/myInvestContent/MyOrderList'

function MyInvestPage() {
  const {openDrawer} = useDrawerStore();
  return (
    <>
      <div className={`w-full bg-Bg-gray transition-all duration-300 ${openDrawer ? 'mr-[325px]' : 'mr-[65px]' }`}>
        <TopNavBar color={"gray"}/>
        <div className="w-full h-[50px]"></div>
        <div className="flex justify-center ">
          <div className="w-[95%] min-w-[1300px] max-w-[1500px]">
            <div className="flex justify-between h-[850px] my-[30px]">
              <div className="flex flex-col w-[59%] justify-between">
                <div className="h-[48%] bg-white rounded-[15px]"> <BarChart/> </div>
                <div className="h-[48%] bg-white rounded-[15px]"> <RoiChart/> </div>
              </div>
              <div className="flex flex-col w-[39%] justify-between">
                <div className="h-[45%] bg-white rounded-[15px]"> <AssetChart/> </div>
                <div className="h-[51%] bg-white rounded-[15px]"> <DoughnutChart/> </div>
              </div>
            </div>
            <div className="flex justify-between h-[600px] my-[30px]">
            <div className="w-[66%] bg-white rounded-[15px] overflow-auto"> <MyOrderList/> </div>
              <div className="w-[32%] bg-white rounded-[15px] overflow-auto"> <MyStockList/> </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyInvestPage;
