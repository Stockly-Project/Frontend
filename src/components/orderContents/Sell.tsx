import { useState, useEffect } from 'react';
import SellLimit from './SellLimit';
import SellMarket from './SellMarket';

interface SellProps {
  stockprice: number;
  symbol: string;
}

function Sell({ stockprice, symbol }: SellProps) {
  const [purchase, setPurchase] = useState('limit');
  //limit : 지정가
  //market : 시장가

  const [userVolume, setUserVolume] = useState(0);

  const handleClickMarket = () => {
    setPurchase('market');
  };

  const handleClickLimit = () => {
    setPurchase('limit');
  };

  // 매도 가능 수량 조회
  useEffect(() => {
    fetch(`http://localhost:30082/api/v1/invests/info?symbol=${symbol}&type=sell`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          console.log('매도 가능 수량 조회 실패');
        }
        return res.json();
      })
      .then((data) => {
        setUserVolume(data.data.sellable_quantity);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center my-[30px] w-full">
      <div className="flex flex-column  w-[90%] my-[5px]">
        <div className="w-[30%] h-[35px] text-[17px]">판매 가격</div>
        <div className="bg-gray w-[70%] rounded-[7px] flex items-center relative">
          <div
            className={`bg-white w-[50%] absolute rounded-[5px] z-1 text-white transition-transform duration-300 ease-in-out  ${purchase === 'limit' ? 'translate-x-[5%]' : 'translate-x-[95%]'}`}
          >
            .
          </div>
          <button
            className="w-[50%] text-[13px] flex justify-center items-center bg-none z-10 content-center "
            onClick={handleClickLimit}
          >
            지정가
          </button>
          <button
            className="w-[50%] text-[13px] flex justify-center items-center bg-none z-10 content-center"
            onClick={handleClickMarket}
          >
            시장가
          </button>
        </div>
      </div>
      {purchase === 'limit' ? <SellLimit symbol={symbol} volume={userVolume}/> : <SellMarket price={stockprice} symbol={symbol} volume={userVolume}/>}
    </div>
  );
}

export default Sell;
