import TopNavBar from '../components/TopNavBar';
import useDrawerStore from '../zustand/MenuBarStore';
import Charge from '../components/Charge';
import Reset from '../components/Reset';
import { IoSettingsSharp } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';
import { FcCancel } from 'react-icons/fc';

function SettingPage() {
  const { openDrawer } = useDrawerStore();
  return (
    <>
      <div className={`w-full transition-all duration-300 ${openDrawer ? 'mr-[325px]' : 'mr-[65px]'}`}>
        <TopNavBar color={'white'} />
        <div className="w-full h-[30px]"></div>
        <div className="flex justify-center">
          <div className="w-[95%] min-w-[800px] max-w-[1500px]">
            <div className="text-[40px] m-[20px] my-[40px] flex items-center">
              <IoSettingsSharp />
              <p className="m-[10px] font-bold">설정</p>
            </div>
            <hr className="w-[100%] border-font-gray  m-[20px]" />
            <div className="w-full h-[30px]"></div>
            {/* 내 정보 */}
            <div className="w-full flex items-start m-[20px] my-[30px]">
              <div className="text-[22px] w-[25%] my-[10px]">| 내 정보</div>
              <div className="w-full m-[10px]">
                <div className="flex w-full mb-[20px]">
                  <div className="w-[20%] text-[19px] text-[#7b7b7bec]">이름</div>
                  <div className="text-[19px]">강서영</div>
                </div>
                <div className="flex w-full my-[20px]">
                  <div className="w-[20%] text-[19px] text-[#7b7b7bec] ">이메일</div>
                  <div className="text-[19px]">aaa@gmail.com</div>
                </div>
              </div>
            </div>
            <hr className="w-[100%] border-font-gray m-[20px]" />
            {/* 내 계좌 관리 */}
            <div className="w-full flex items-start m-[20px] my-[30px]">
              <div className="text-[22px] w-[25%]">| 내 계좌 관리</div>
              <div className="w-full">
                <div className="flex my-[20px]">
                  <div className="w-[20%] text-[19px] text-[#7b7b7bec] ">계좌 충전</div>
                  <Charge />
                </div>
                <div className="w-full h-[80px]"></div>
                <div className="flex my-[20px]">
                  <div className="w-[20%] text-[19px] text-[#7b7b7bec]">투자 기록 초기화</div>
                  <Reset />
                </div>
              </div>
            </div>
            <hr className="w-[100%] border-font-gray  m-[20px]" />
            {/* 계정관리 */}
            <div className="w-full flex m-[20px] my-[30px]">
              <div className="text-[22px] w-[25%] my-[10px]">| 계정 관리</div>
              <div className="w-full m-[10px]">
                <div className="text-[18px] text-[#7b7b7bec] my-[10px] mb-[20px] cursor-pointer flex items-center">
                  <MdLogout />
                  <p className="m-[10px]">로그아웃</p>
                </div>
                <div className="text-[18px] text-[#d50a0aeb] my-[10px] cursor-pointer flex items-center">
                  <FcCancel />
                  <p className="m-[10px]">계정탈퇴</p>
                </div>
              </div>
            </div>
            <div className="w-full h-[30px]"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingPage;
