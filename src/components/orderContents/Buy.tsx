import { useState, useEffect } from 'react';
import BuyLimit from './BuyLimit';
import BuyMarket from './BuyMarket';

interface BuyProps {
  symbol: string;
  stockprice: number;
}

function Buy({ symbol, stockprice }: BuyProps) {
  const [purchase, setPurchase] = useState('limit');
  //limit : 지정가
  //market : 시장가

  const [userCash, setUserCash] = useState(0);

  const handleClickMarket = () => {
    setPurchase('market');
  };

  const handleClickLimit = () => {
    setPurchase('limit');
  };

  // 매수 가능 수량 조회
  useEffect(() => {
    fetch(`http://localhost:30082/api/v1/invests/info?symbol=${symbol}&type=buy`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          console.log('매수 가능 수량 조회 실패');
        }

        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUserCash(data.data.user_cash);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center my-[30px] w-full">
      <div className="flex flex-column  w-[90%] my-[5px]">
        <div className="w-[30%] h-[35px] content-center text-[17px]">구매 가격</div>
        <div className="bg-gray w-[70%] rounded-[7px] flex items-center relative ">
          <div
            className={`bg-white w-[50%] absolute rounded-[5px] z-1 text-white transition-transform duration-300 ease-in-out  ${purchase === 'limit' ? 'translate-x-[5%]' : 'translate-x-[95%]'}`}
          >
            .
          </div>
          <button
            className="w-[50%] text-[13px] flex justify-center items-center bg-none z-10 content-center"
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
      {purchase === 'limit' ? <BuyLimit symbol={symbol} cash={userCash}/> : <BuyMarket price={stockprice} symbol={symbol} cash={userCash}/>}
    </div>
  );
}

export default Buy;
