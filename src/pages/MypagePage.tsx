import TopNavBar from '../components/TopNavBar';
import UserInfo from '../components/mypageContent/UserInfo';
import Account from '../components/mypageContent/Account';
import useDrawerStore from '../zustand/MenuBarStore';
import { useState, useEffect } from 'react';
import OrderList from '../components/mypageContent/OrderList';

function SettingPage() {
  const { openDrawer } = useDrawerStore();
  const [selectedMenu, setSelectedMenu] = useState('account');
  const [dirty, setDirty] = useState(false);
  // account : 자산
  // orderlist : 주문 내역
  // myinfo : 내 정보
  
  useEffect(() => {
    fetch('http://localhost:30082/api/v1/invests/stocks', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          console.log('네트워크 응답이 올바르지 않습니다.');
        }
        return res.json();
      })
      .then((fetchedData) => {
        if (fetchedData.data.length > 0){setDirty(true)}
        else{setDirty(false)}
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류가 발생하였습니다:', error);
      });
  }, []);

  return (
    <>
      <div className={`w-full transition-all duration-300 ${openDrawer ? 'mr-[335px]' : 'mr-[65px]'}`}>
        <TopNavBar color={'white'} />
        <div className="w-full h-[30px]"></div>
        <div className="flex justify-center">
          <div className="w-[95%] flex justify-around min-w-[800px] max-w-[1200px]">
            <div className="w-[20%]">
              <div
                className={`w-[90%] m-[5px] p-[10px] rounded-[10px] cursor-pointer hover:bg-Box-gray ${selectedMenu === 'account' ? 'bg-Box-gray' : 'bg-white'}`}
                onClick={() => setSelectedMenu('account')}
              >
                자산
              </div>
              <div
                className={`w-[90%] m-[5px] p-[10px] rounded-[10px] cursor-pointer  hover:bg-Box-gray ${selectedMenu === 'orderlist' ? 'bg-Box-gray' : 'bg-white'}`}
                onClick={() => setSelectedMenu('orderlist')}
              >
                주문 내역
              </div>
              <div
                className={`w-[90%] m-[5px] p-[10px] rounded-[10px] cursor-pointer  hover:bg-Box-gray ${selectedMenu === 'myinfo' ? 'bg-Box-gray' : 'bg-white'}`}
                onClick={() => setSelectedMenu('myinfo')}
              >
                내 정보
              </div>
            </div>
            <div className="w-[80%]">
              {selectedMenu === 'account' && <Account dirty={dirty}/>}
              {selectedMenu === 'orderlist' && <OrderList />}
              {selectedMenu === 'myinfo' && <UserInfo />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingPage;
