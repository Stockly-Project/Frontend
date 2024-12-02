import { GrFormNext } from 'react-icons/gr';
import Modal from '../Modal';
import { useState } from 'react';
import useUserStore from '../../zustand/UserStore';
import { useNavigate } from 'react-router-dom';

function UserInfo() {
  const navigate = useNavigate();

  // 로그아웃 모달 상태 관리
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const openLogoutModal = () => setLogoutModalOpen(true);
  const closeLogoutModal = () => setLogoutModalOpen(false);

  // 회원탈퇴 모달 상태 관리
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const openWithdrawModal = () => setWithdrawModalOpen(true);
  const closeWithdrawModal = () => setWithdrawModalOpen(false);

  // zustand에서 사용자 정보 불러오기
  const { name, email, setUserState } = useUserStore();
  const clearUserStorage = useUserStore.persist.clearStorage;

  // 로그인 페이지로 이동
  const goToLogin = () => {
    navigate('/login');
  };

  // 로그아웃 함수
  const handleLogOut = () => {
    fetch('http://localhost:30080/api/v1/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          console.log('네트워크 응답이 올바르지 않습니다');
        }
        return res.json();
      })
      .then((data) => {
        console.log('로그아웃 데이터', data);
        clearUserStorage();
        setUserState(false, '', '');
        alert('로그아웃 되었습니다.');
        goToLogin();
      })
      .catch((error) => {
        console.error('로그아웃 중 에러 발생:', error);
      });
  };

  // 회원탈퇴 함수

  const handleWithdraw = () => {
    fetch('http://localhost:30080/api/v1/users', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          console.log('네트워크 응답이 올바르지 않습니다');
        }
        return res.json();
      })
      .then((data) => {
        console.log('회원탈퇴', data);
        clearUserStorage();
        setUserState(false, '', '');
        alert('계정이 삭제 되었습니다.');
        goToLogin();
      })
      .catch((error) => {
        console.error('회원탈퇴 중 에러 발생:', error);
      });
  };

  // 로그아웃 모달 내용
  const LogoutModalContent = () => {
    return (
      <div>
        <div className="text-[20px] m-[10px] p-[10px]">로그아웃 하시겠습니까?</div>
        <div className="h-[30px]" />
        <div className="flex justify-end">
          <button
            className="text-[#5c5c5c] p-[7px] mx-[5px] border rounded-[10px] w-[60px] border-gray"
            onClick={closeLogoutModal}
          >
            취소
          </button>
          <button
            className="text-white bg-MainBlue p-[7px] mx-[5px] rounded-[10px] w-[60px]"
            onClick={() => {
              closeLogoutModal();
              handleLogOut();
            }}
          >
            확인
          </button>
        </div>
      </div>
    );
  };

  // 회원탈퇴 모달 내용
  const WithdrawModalContent = () => {
    return (
      <div>
        <div className="text-[20px] p-[10px]">회원 탈퇴 하시겠습니까?</div>
        <div className="p-[10px] text-[#6c6c6c] text-[15x]">
          탈퇴할 경우 사용자의 모든 투자 기록과 자산 정보가 삭제됩니다.
        </div>
        <div className="h-[30px]" />
        <div className="flex justify-end">
          <button
            className="text-[#5c5c5c] p-[7px] mx-[5px] border rounded-[10px] w-[60px] border-gray"
            onClick={closeWithdrawModal}
          >
            취소
          </button>
          <button
            className="text-white bg-MainBlue p-[7px] mx-[5px] rounded-[10px] w-[60px]"
            onClick={() => {
              closeWithdrawModal();
              handleWithdraw();
            }}
          >
            확인
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="">
      <div>
        <div className="text-[25px] border-b border-gray text-[#373737] p-[10px]">내 정보</div>
        <div className="my-[10px]">
          <div className="flex justify-between">
            <div className="text-[18px] p-[10px] my-[5px] text-[#6a6a6a]">이름</div>
            <div className="text-[18px] p-[10px] ">{name}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-[18px] p-[10px] my-[5px] text-[#6a6a6a]">이메일 주소</div>
            <div className="text-[18px] p-[10px]">{email}</div>
          </div>
        </div>
      </div>
      <div className="h-[50px]" />
      <div>
        <div className="text-[25px] border-b border-gray text-[#373737] p-[10px]">계정 관리</div>
        <div className="my-[10px]">
          <Modal isOpen={logoutModalOpen} onClose={closeLogoutModal}>
            <LogoutModalContent />
          </Modal>
          <div
            className="flex justify-between cursor-pointer hover:bg-Bg-gray rounded-[15px]"
            onClick={openLogoutModal}
          >
            <div className="text-[18px] p-[10px] my-[5px] text-[#6a6a6a]">로그아웃</div>
            <div className="text-[18px] p-[10px] content-center text-center">
              <GrFormNext className="text-[25px]" />
            </div>
          </div>
          <Modal isOpen={withdrawModalOpen} onClose={closeWithdrawModal}>
            <WithdrawModalContent />
          </Modal>
          <div
            className="flex justify-between cursor-pointer hover:bg-Bg-gray rounded-[15px]"
            onClick={openWithdrawModal}
          >
            <div className="text-[18px] p-[10px] my-[5px] text-[#6a6a6a] ">회원 탈퇴</div>
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
