import { useState, useEffect } from 'react';

function Charge() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [price, setPrice] = useState(0);
  const [userCash, setUserCash] = useState(0);

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
        setUserCash(data.data.cash);
      })
      .catch((error) => {
        console.error('오류가 발생하였습니다:', error);
      });
  }, []);

  useEffect(() => {
    if (Number(price) > 0 ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [price]); // price 가 변경되면 실행

  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:30082/api/v1/invests/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ amount:price }),
      });
      // 응답 상태 확인
      if (response.status === 200) {
        alert('충전이 완료되었습니다.')
      } else {
        alert('충전에 실패하였습니다.');
        console.log(response)
      }
    } catch (error) {
      console.error('네트워크 오류:', error); // 네트워크 에러 출력
      alert('네트워크 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.');
    }
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
              onChange={(e) => setPrice(Number(e.target.value))}
              value={price}
            />
            <p className="w-[10%] text-end">원</p>
          </div>
        </div>
        <hr className="border-gray my-[20px]" />
        <div className="w-[100%] flex justify-between items-center ">
          <div className="text-[18px]">충전 후 잔액</div>
          <div className="m-[10px]">{(userCash + price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</div>
        </div>
        <div className="h-[100px]" />
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
