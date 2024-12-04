import { useEffect, useState } from 'react';
import { HiMiniXMark } from 'react-icons/hi2';
import AlertStore from '../zustand/AlertStore';
import { useNavigate } from 'react-router-dom';

const NewAlertContent = () => {
  const [borderLength, setBorderLength] = useState(0);
  const { closeModal, symbol, company_name, price } = AlertStore();
  const navigate = useNavigate();

  const gotoDetails = (name: string, symbol: string, price: number) => {
    navigate(`/details/${symbol}`, {
      state: { name: name, initPrice: price, initRate: 0, initRatePrice: 0 },
    });
  };

  useEffect(() => {
    // 5초 후에 border-b의 길이를 100%로 설정
    const borderTimer = setTimeout(() => {
      setBorderLength(100);
    }, 100);

    // 10초 후에 모달 닫기
    const closeTimer = setTimeout(() => {
      closeModal();
    }, 10000);

    // cleanup timers
    return () => {
      clearTimeout(borderTimer);
      clearTimeout(closeTimer);
    };
  }, [closeModal]);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="w-full flex justify-end mb-[20px]">
          <HiMiniXMark className="text-[30px] text-[#a5a5a5]" onClick={closeModal} />
        </div>
        <span className="text-[20px] m-[5px]">
          {company_name}(이)가 {price}원에 도달했어요.
        </span>
        <span className="text-[20px] m-[5px]">확인하러 갈까요?</span>
        <div className="mt-[40px] mb-[20px]">
          <button
            className="text-[#5c5c5c] p-[7px] mx-[5px] border rounded-[10px] w-[100px] border-gray"
            onClick={closeModal}
          >
            무시하기
          </button>
          <button
            className="text-white bg-MainBlue p-[7px] mx-[5px] rounded-[10px] w-[100px]"
            onClick={() => {
              closeModal();
              gotoDetails(company_name, symbol, price);
            }}
          >
            보러 가기
          </button>
        </div>
      </div>
      <div
        className="h-[3px] bg-MainBlue"
        style={{
          width: `${borderLength}%`,
          transition: '8s', // border-bottom 애니메이션 적용
        }}
      ></div>
    </>
  );
};

export default NewAlertContent;
