import { useState, useEffect } from 'react';

function Charge() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (Number(price) > 0 && price[0] !== '0') {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [price]); // price 가 변경되면 실행

  const handleClick = () => {
    console.log(price);
  };

  return (
    <div className="flex flex-col justify-between w-[350px]">
      <div className="flex flex-col justify-center">
        <div className="w-[100%] flex justify-between items-center">
          <div className="text-[18px] w-[25%]">충전 금액</div>
          <div className="w-[65%] h-[40px] border border-gray rounded-[10px] px-[10px] outline-none flex justify-center items-center">
            <input
              className="outline-none w-[90%]"
              placeholder="충전할 금액을 입력하세요"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
            <p className="w-[10%] text-end">원</p>
          </div>
        </div>
        <hr className="border-gray my-[20px]" />
        <div className="w-[100%] flex justify-between items-center ">
          <div className="text-[18px]">충전 후 잔액</div>
          <div className="m-[10px]">0원</div>
        </div>
        <div className="h-[100px]"/>
        <button
          className={`w-full h-[45px] rounded-[7px] ${isDisabled ? 'bg-[#eeeeee] text-[#a6a6a6]' : 'bg-MainBlue text-white'}`}
          onClick={handleClick}
          disabled={isDisabled}
        >
          충전하기
        </button>
      </div>
    </div>
  );
}

export default Charge;
