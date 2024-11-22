import { GrFormNext } from 'react-icons/gr';
import { useState } from 'react';
import Modal from '../components/Modal';
import Charge from '../components/Charge';
import { MdErrorOutline } from 'react-icons/md';

function UserInfo() {
  const [chargeModalOpen, setLogoutModalOpen] = useState(false);
  const openChargeModal = () => setLogoutModalOpen(true);
  const closeChargeModal = () => setLogoutModalOpen(false);

  const [resetModalOpen, setWithdrawModalOpen] = useState(false);
  const openResetModal = () => setWithdrawModalOpen(true);
  const closeResetModal = () => setWithdrawModalOpen(false);

  const ResetContet = () => {
    return (
      <div>
        <div className="text-[22px] m-[10px] p-[10px] flex">
          파산하기
          <MdErrorOutline className="text-[#ff0f02ec] m-[5px]" />
        </div>
        <div className="flex  flex-col justify-center items-ceter m-[10px] p-[10px] text-[18px] text-[#4c4c4c]">
          <p>파산을 할 경우 사용자의 모든 투자 기록과 자산 정보가 초기의 상태로 돌아가며,</p>
          <p>데이터가 영구 삭제되어 기록을 복구할 수 없습니다. </p>
          <p className="my-[30px]">정말로 파산하시겠습니까?</p>
        </div>
        <div className="h-[20px]" />
        <div className="flex justify-end">
          <button
            className="text-[#5c5c5c] p-[7px] mx-[5px] border rounded-[10px] w-[80px] border-gray shadow-md"
            onClick={closeResetModal}
          >
            취소
          </button>
          <button
            className="text-white bg-[#c20000] p-[7px] mx-[5px] rounded-[10px] w-[80px]"
            onClick={closeResetModal}
          >
            파산하기
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className="">
      <div>
        <div className="text-[25px] border-b border-gray text-[#373737] p-[10px]">계좌 충전</div>
        <div className="my-[10px]">
          <Modal isOpen={chargeModalOpen} onClose={closeChargeModal}>
            <Charge />
          </Modal>
          <div
            className="flex justify-between cursor-pointer hover:bg-Bg-gray rounded-[15px]"
            onClick={openChargeModal}
          >
            <div className="text-[18px] p-[10px] my-[5px] text-[#6a6a6a]">계좌 충전하기</div>
            <div className="text-[18px] p-[10px] content-center text-center">
              <GrFormNext className="text-[25px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[50px]" />
      <div>
        <div className="text-[25px] border-b border-gray text-[#373737] p-[10px]">계좌 초기화</div>
        <div className="my-[10px]">
          <Modal isOpen={resetModalOpen} onClose={closeResetModal}>
            <ResetContet />
          </Modal>
          <div className="flex justify-between cursor-pointer hover:bg-Bg-gray rounded-[15px]" onClick={openResetModal}>
            <div className="text-[18px] p-[10px] my-[5px] text-[#6a6a6a]">파산하기</div>
            <div className="text-[18px] p-[10px] content-center text-center">
              <GrFormNext className="text-[25px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
