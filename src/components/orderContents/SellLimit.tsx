import { GoPlus } from 'react-icons/go';
import { HiMinus } from 'react-icons/hi2';
import { useState, useEffect } from 'react';

interface SellLimitProps {
  symbol: string;
  volume: number;
}

function SellLimit({ symbol, volume }: SellLimitProps) {
  const [isDisabled, setIsDisabled] = useState(true);

  const [price, setPrice] = useState('');
  const plusPrice = () => {
    setPrice(String(Number(price) + 100));
  };
  const minusPrice = () => {
    setPrice(String(Number(price) - 100));
  };
  const [quantity, setQuantity] = useState('');
  const plusQuantity = () => {
    setQuantity(String(Number(quantity) + 1));
  };

  const minusQuantity = () => {
    setQuantity(String(Number(quantity) - 1));
  };

  const handleChangeVolume = (percent: number) => {
    const can_sell = Math.floor(Math.floor(volume * percent));
    setQuantity(can_sell.toString());
    console.log(can_sell);
  };

  useEffect(() => {
    if (Number(price) > 0 && price[0] !== '0' && Number(quantity) > 0 && quantity[0] !== '0') {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [price, quantity]); // price 또는 quantity가 변경되면 실행

  const handleClick = () => {
    fetch('http://localhost:30082/api/v1/invests/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        order_type: '매도',
        price_type: '지정가',
        symbol: symbol,
        price: Number(price),
        quantity: Number(quantity),
      }),
    })
      .then((res) => {
        if (res.status === 400) {
          // 돈 부족 에러
          alert('보유 주식 수보다 많은 주식을 팔려고 하시네요.');
        } else if (!res.ok) {
          alert('네트워크 응답이 올바르지 않습니다.');
        }
        return res.json();
      })
      .then(() => {
        alert('주문이 정상적으로 처리되었습니다.');
      })
      .catch((error) => {
        console.error('오류가 발생하였습니다:', error);
      });
  };

  return (
    <>
      <div className="flex flex-column justify-end w-[90%] my-[5px]">
        <div className="w-[30%] h-[33px]"></div>
        <div className="flex justify-center items-center w-[70%] border border-gray rounded-[7px] px-[10px]">
          <input
            className="w-[75%] outline-none"
            placeholder="가격 입력"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></input>
          <p className="text-[14px] mr-[5px]">원</p>
          <GoPlus className="w-[12%] cursor-pointer" onClick={plusPrice} />
          <HiMinus className="w-[12%] cursor-pointer" onClick={minusPrice} />
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
            onClick={() => handleChangeVolume(0.1)}
          >
            10%
          </button>
          <button
            className="w-[23%] h-[25px] border rounded-[5px] text-[13px] border border-gray my-[5px]"
            onClick={() => handleChangeVolume(0.25)}
          >
            25%
          </button>
          <button
            className="w-[23%] h-[25px] border rounded-[5px] text-[13px] border border-gray my-[5px]"
            onClick={() => handleChangeVolume(0.5)}
          >
            50%
          </button>
          <button
            className="w-[23%] h-[25px] border rounded-[5px] text-[13px] border border-gray my-[5px]"
            onClick={() => handleChangeVolume(1)}
          >
            최대
          </button>
        </div>
      </div>
      <hr className="w-[95%] border-font-gray my-[25px]" />
      <div className="flex flex-column  w-[90%] my-[5px]">
        <div className="w-[40%] h-[33px] text-[17px]">판매 가능</div>
        <div className="w-[60%] text-right">{volume}주</div>
      </div>
      <div className="flex flex-column  w-[90%] my-[5px]">
        <div className="w-[40%] h-[33px] text-[17px]">총 금액</div>
        <div className="w-[60%] text-right">
          {!isDisabled ? (Number(quantity) * Number(price)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0'}원
        </div>
      </div>
      <button
        className={`w-[90%] h-[40px] rounded-[7px] my-[10px] ${isDisabled ? 'bg-[#eeeeee] text-[#a6a6a6]' : 'bg-MainBlue text-white'}`}
        onClick={handleClick}
        disabled={isDisabled}
      >
        매도하기
      </button>
    </>
  );
}

export default SellLimit;
