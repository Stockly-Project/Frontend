import { GoPlus } from 'react-icons/go';
import { HiMinus } from 'react-icons/hi2';
import { useState, useEffect } from 'react';

interface BuyMarketProps {
  price: number;
  symbol: string;
  cash: number;
}

function BuyMarket({ price, symbol, cash }: BuyMarketProps) {
  const [isDisabled, setIsDisabled] = useState(true);

  const [quantity, setQuantity] = useState('');
  const plusQuantity = () => {
    setQuantity(String(Number(quantity) + 1));
  };

  const minusQuantity = () => {
    setQuantity(String(Number(quantity) - 1));
  };

  useEffect(() => {
    if (Number(quantity) > 0 && quantity[0] !== '0' && price*Number(quantity) <= cash) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [quantity]); // price 또는 quantity가 변경되면 실행

  const handleChangeQuantity = (percent: number) => {
    const can_buy = Math.floor(Math.floor(cash / Number(price)) * percent);
    setQuantity(can_buy.toString());
    console.log(can_buy);
  };

  const handleClick = () => {
    fetch('http://localhost:30082/api/v1/invests/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        order_type: '매수',
        price_type: '지정가',
        symbol: symbol,
        price: Number(price),
        quantity: Number(quantity),
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('주문을 실패하였습니다.'); // 예외 발생
        }
        return res.json();
      })
      .then(() => {
        alert('주문이 정상적으로 처리되었습니다.');
      })
      .catch((error) => {
        alert(error.message || '오류가 발생하였습니다.'); // 실패 시 메시지 표시
        console.error('오류가 발생하였습니다:', error);
      });
  };

  return (
    <>
      <div className="flex flex-column justify-end w-[90%] my-[5px]">
        <div className="w-[30%] h-[33px]"></div>
        <div className="flex items-center w-[70%] border border-gray rounded-[7px] px-[10px] bg-gray text-[#787878]">
          최대한 빠른 가격
        </div>
      </div>
      <div className="flex flex-column w-[90%] my-[5px]">
        <div className="w-[30%] h-[33px] text-[17px]">수량</div>
        <div className="flex justify-center items-center w-[70%] border border-gray rounded-[7px] px-[10px]">
          <input
            className="w-[75%] outline-none"
            placeholder="수량 입력"
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
          ></input>
          <GoPlus className="w-[12%] cursor-pointer" onClick={plusQuantity} />
          <HiMinus className="w-[12%] cursor-pointer" onClick={minusQuantity} />
        </div>
      </div>
      <div className="flex flex-column  w-[90%]">
        <div className="w-[30%] h-[33px]"></div>
        <div className="w-[70%] flex justify-between">
          <button
            className="w-[23%] h-[25px] border rounded-[5px] text-[13px] border border-gray my-[5px]"
            onClick={() => handleChangeQuantity(0.1)}
          >
            10%
          </button>
          <button
            className="w-[23%] h-[25px] border rounded-[5px] text-[13px] border border-gray my-[5px]"
            onClick={() => handleChangeQuantity(0.25)}
          >
            25%
          </button>
          <button
            className="w-[23%] h-[25px] border rounded-[5px] text-[13px] border border-gray my-[5px]"
            onClick={() => handleChangeQuantity(0.5)}
          >
            50%
          </button>
          <button
            className="w-[23%] h-[25px] border rounded-[5px] text-[13px] border border-gray my-[5px]"
            onClick={() => handleChangeQuantity(1)}
          >
            최대
          </button>
        </div>
      </div>
      <hr className="w-[95%] border-font-gray my-[25px]" />
      <div className="flex flex-column  w-[90%] my-[5px]">
        <div className="w-[40%] h-[33px] text-[17px]">구매 가능</div>
        <div className="w-[60%] text-right">{cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</div>
      </div>
      <div className="flex flex-column  w-[90%] my-[5px]">
        <div className="w-[40%] h-[33px] text-[17px]">예상 총 금액</div>
        <div className="w-[60%] text-right">
          {quantity!=="" ? (price * Number(quantity)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0'}원
        </div>
      </div>
      <button
        className={`w-[90%] h-[40px] rounded-[7px] my-[10px] ${isDisabled ? 'bg-[#eeeeee] text-[#a6a6a6]' : 'bg-buy-red text-white'}`}
        onClick={handleClick}
        disabled={isDisabled}
      >
        매수하기
      </button>
    </>
  );
}

export default BuyMarket;
