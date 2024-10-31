import Buy from './Buy';
import Sell from './Sell';
import { useState } from 'react';

function Order() {
  const [content, setContent] = useState('buy');
  const [position, setPosition] = useState(0); // 시작 위치

  const handleClickBuy = () => {
    setContent('buy');
    setPosition(0); // 자식 div를 원래 위치로 이동
  };

  const handleClickSell = () => {
    setContent('sell');
    setPosition(100); // 자식 div를 오른쪽으로 이동
  };

  return (
    <div className="w-full h-[80vh] overflow-hidden">
      <div className="text-[20px] font-bold p-[15px]">주문하기</div>
      {/* <div className="w-full text-center justify-center items-center p-[20px]">지금은 거래시간이 아닙니다. </div> */}
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
        <Buy />
        <Sell />
      </div>
    </div>
  );
}

export default Order;
