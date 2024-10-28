import TopNavBar from '../components/TopNavBar';
import StockChartList from '../components/StockChart';
import useDrawerStore from '../zustand/MenuBarStore';

function MainPage() {
  const { openDrawer } = useDrawerStore();
  return (
    <>
      <div className={`w-[100%] h-[100vh] transition-all duration-300 ${openDrawer ? 'mr-[325px]' : 'mr-[65px]'}`}>
        <TopNavBar color={"white"}/>
        <div className="w-full h-[50px]"></div>
        <div className="flex justify-center ">
          <div className="w-[95%] min-w-[800px] max-w-[1500px]">
            <StockChartList />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
