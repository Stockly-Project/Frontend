import Buy from './Buy';
import Sell from './Sell';
import { useState } from 'react';
import useMarketStore from '../../zustand/MarketStore';

interface OrderProps{
  stockprice: number;
}

function Order({stockprice}: OrderProps) {
  const [content, setContent] = useState('buy');
  const [position, setPosition] = useState(0); // 시작 위치
  const isMarketOpen = useMarketStore((state) => state.isMarketOpen);

  const handleClickBuy = () => {
    setContent('buy');
    setPosition(0); // 자식 div를 원래 위치로 이동
  };

  const handleClickSell = () => {
    setContent('sell');
    setPosition(100); // 자식 div를 오른쪽으로 이동
  };

  if(!isMarketOpen){
    return (
      <div className="w-full h-[70vh] flex flex-col justify-center items-center">
        <p className="text-[21px] text-[#545454]">지금은 거래 시간이 아니에요</p>
        <p className="text-[17px] text-[#cacaca] m-[10px] text-center">정규 거래 시간은 평일 9:00 ~ 15:30입니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[70vh] overflow-hidden">
      <div className="flex px-[15px]">
        <button
          className={`w-[50px]  text-[17px] rounded-[18px] ${content === 'buy' ? 'text-buy-red bg-[#FFF2F2]' : 'text-font-gray'}`}
          onClick={handleClickBuy}
        >
          매수
        </button>
        <button
          className={`w-[50px] h-[35px] text-[17px] rounded-[18px] ${content === 'sell' ? 'text-MainBlue bg-[#F2F2FF]' : 'text-font-gray'}`}
          onClick={handleClickSell}
        >
          매도
        </button>
      </div>
      <div 
        className={`flex w-[200%] transform transition-transform duration-300 ${position === 0 ? 'translate-x-0' : '-translate-x-1/2'}`}
      >
        <Buy stockprice={stockprice}/>
        <Sell stockprice={stockprice}/>
      </div>
    </div>
  );
}

export default Order;
