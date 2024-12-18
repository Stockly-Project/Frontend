import RoiChart from './RoiChart';
import { GrFormNext } from 'react-icons/gr';
import { useState, useEffect } from 'react';
import MyStockList from './MyStockList';
import AssetsIcon from '../../assets/icons/assets_icon.svg';
import MoneyIcon from '../../assets/icons/money_icon.svg';
import RoiIcon from '../../assets/icons/roi_icon.svg';
import StockIcon from '../../assets/icons/stock_icon.svg';
import useMarketStore from '../../zustand/MarketStore';

interface userAccountData {
  roi: number;
  cash: number;
  total_investment: number;
  total_stock_value: number;
  asset_difference: number;
  total_asset: number;
}

interface AccountProps {
  dirty: boolean;
}

const Blur = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <p className="text-[22px]">주식을 구매하고 내 자산을 관리해보세요 !</p>
      <a href="/" className="text-MainBlue text-[15px]">주식 구매하러 가기</a>
    </div>
  );
};

function UserInfo({ dirty }: AccountProps) {
  const { isMarketOpen } = useMarketStore();
  const initData = { roi: 0, cash: 0, total_investment: 0, total_stock_value: 0, asset_difference: 0, total_asset: 0 };
  const [userAccount, setUserAccount] = useState<userAccountData>(initData); // 총자산, 예수금, 주식, 수익률 정보
  const [isLoaded, setIsLoaded] = useState(false);
  const [openHoldings, setOpenHoldings] = useState(true);

  useEffect(() => {
    fetch('http://localhost:30082/api/v1/invests/roi/total/latest', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          console.log('자산 정보를 받아오지 못했습니다.');
        }
        return res.json();
      })
      .then((data) => {
        setUserAccount(data.data);
        setIsLoaded(true);
        console.log("최신조회:", data);
      })
      .catch((error) => {
        console.error('오류가 발생하였습니다:', error);
      });
  }, []);

  // 실시간 내 자산 변동
  useEffect(() => {
    if (!isMarketOpen || !isLoaded) return;

    const eventSource = new EventSource(`http://localhost:30082/api/v1/invests/roi/realtime/total`, {
      withCredentials: true,
    });
    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setUserAccount(newData);
      console.log("실시간조회:",newData)
    };
    eventSource.onerror = () => {
      console.error('SSE connection error');
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  }, [isLoaded]);

  return (
    <div className="mx-[20px] my-[10px]">
      {/* 내 자산 */}
      <div>
        <div className="text-[25px] border-b border-gray text-[#373737] p-[10px]">수익률</div>
        <div className="w-full flex flex-col text-[25px] my-[20px] mx-[10px] items-start">
          <div className="text-[22px] text-[#373737]">
            <span className="text-[#7d7d7d] text-[18px]">총 자산&nbsp; </span>
            {userAccount.total_asset.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원{' '}
          </div>
          <div className={`text-[15px] ${userAccount.roi > 0 ? 'text-[#ee5858]' : 'text-down'}`}>
            {userAccount.asset_difference.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원 ({userAccount.roi}%){' '}
          </div>
        </div>
        <div className="relative w-full h-full">
          <div className={`${!dirty && 'blur-[2px]'}`}>
            <RoiChart roistream={userAccount.roi} />
          </div>
          {!dirty && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center ">
              <Blur />
            </div>
          )}
        </div>
        <div className="h-[30px]" />

        {/* 사각형 네 개 */}
        <div className="w-full">
          <div className="flex w-full">
            <div className="w-[50%] h-[120px] m-[10px] rounded-[10px] bg-Bg-gray">
              <div className="flex items-center mx-[10px] my-[15px]">
                <img src={AssetsIcon} className="mx-[10px] w-[23px] h-[23px]" />
                <span className="font-medium text-[#A2A5AC]">총자산</span>
              </div>
              <div className="mx-[20px] text-[21px] text-[#373737]">
                {userAccount.total_asset.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
              </div>
            </div>
            <div className="w-[50%] h-[120px] m-[10px] rounded-[10px] bg-Bg-gray">
              <div className="flex items-center mx-[10px] my-[15px]">
                <img src={MoneyIcon} className="mx-[10px] w-[25px] h-[25px]" />
                <span className="font-medium text-[#A2A5AC]">예수금</span>
              </div>
              <div className="mx-[20px] text-[21px] text-[#373737]">
                {userAccount.cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
              </div>
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-[50%] h-[120px] m-[10px] rounded-[10px] bg-Bg-gray">
              <div className="flex items-center mx-[10px] my-[15px]">
                <img src={StockIcon} className="mx-[10px] w-[25px] h-[25px]" />
                <span className="font-medium text-[#A2A5AC]">주식</span>
              </div>
              <div className="mx-[20px] text-[21px] text-[#373737]">
                {userAccount.total_stock_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
              </div>
            </div>
            <div className="w-[50%] h-[120px] m-[10px] rounded-[10px] bg-Bg-gray">
              <div className="flex items-start mx-[10px] my-[15px]">
                <img src={RoiIcon} className="mx-[10px] w-[21px] h-[21px]" />
                <span className="font-medium text-[#A2A5AC]">수익률</span>
              </div>
              <div className={`mx-[20px] text-[21px] ${userAccount.roi > 0 ? 'text-[#ee5858]' : 'text-down'}`}>
                {userAccount.asset_difference.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원({userAccount.roi}%)
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[80px]" />

      {/* 보유 주식 */}
      <div>
        <div className="text-[25px] flex justify-between border-b border-gray text-[#373737] p-[10px] my-[10px]">
          보유 주식
          <GrFormNext
            className={`text-[30px] cursor-pointer ${openHoldings && 'rotate-90'} transition-transform duration-300 ease-in-out`}
            onClick={() => setOpenHoldings(!openHoldings)}
          />
        </div>
        <div className={`${!openHoldings && 'invisible'} mt-[20px]`}>
          <MyStockList />
        </div>
      </div>
      <div className="h-[300px]" />
    </div>
  );
}

export default UserInfo;
