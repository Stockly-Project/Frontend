import TopNavBar from '../components/TopNavBar';
import StockChartList from '../components/StockChart';
import useDrawerStore from '../zustand/MenuBarStore';
import { useEffect } from 'react';

function MainPage() {
useEffect(() => {

    fetch('http://localhost.stock-server/api/v1/users', {
      method: 'GET',
      credentials: "include",
    })
    .then((res) => {
      if (!res.ok) {
        console.log('네트워크 응답이 올바르지 않습니다');
        console.log(res);
      }
      return res.json();
    })
    .then((data)=>{
      console.log(data);
    })
    .catch((error) => {
      console.error('Fetch 에러:', error); // 에러 처리
    });
}, [])

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
