// import { IoHeart } from 'react-icons/io5';
import { FaRegClock } from 'react-icons/fa6';
import { FaBell } from 'react-icons/fa';
// import MenuBarLikeContent from './MenuBarLikeContent';
import MenuBarChartContent from './/MenuBarChartContent';
import MenuBarAlertContent from './MenuBarAlertContent';
import useDrawerStore from '../../zustand/MenuBarStore';

function MenuBar() {
  const { openDrawer, alert, chart, handleDrawer } = useDrawerStore();

  return (
    <div className={`flex h-[100vh] fixed top-0 right-0 `}>
      <div
        className={`transition-all duration-300 bg-Bg-gray overflow-auto  ${
          openDrawer ? 'w-[270px] border-l solid border-[#cfcfcf] ' : 'w-0'
        }`}
      >
        <>
          {/* {like && <MenuBarLikeContent />} */}
          {alert && <MenuBarAlertContent />}
          {chart && <MenuBarChartContent />}
        </>
      </div>
      <div className="w-[65px] bg-Bg-gray border-l solid border-[#cfcfcf] flex flex-col z-10">
        {/* <button
          className="flex flex-col justify-center items-center m-[10px] group"
          onClick={() => handleDrawer('like')}
        >
          {like ? (
            <>
              <IoHeart className="w-[25px] h-[25px] m-[5px] text-[#06032d]" />
              <p className="text-[#06032d] text-[15px]">관심</p>
            </>
          ) : (
            <>
              <IoHeart className="w-[25px] h-[25px] m-[5px] text-font-gray group-hover:text-[#06032d]" />
              <p className="text-font-gray group-hover:text-[#06032d] text-[15px]">관심</p>
            </>
          )}
        </button> */}

        <button
          className="flex flex-col justify-center items-center m-[10px] group"
          onClick={() => handleDrawer('alert')}
        >
          {alert ? (
            <>
              <FaBell className="w-[25px] h-[25px] m-[5px] text-[#06032d]" />
              <p className="text-[#06032d] text-[15px]">알림</p>
            </>
          ) : (
            <>
              <FaBell className="w-[25px] h-[25px] m-[5px] text-font-gray group-hover:text-[#06032d]" />
              <p className="text-font-gray group-hover:text-[#06032d] text-[15px]">알림</p>
            </>
          )}
        </button>

        <div className="flex justify-center items-center w-[100%] my-[10px]">
          <hr className="border-font-gray w-[80%]" />
        </div>

        <button
          className="flex flex-col justify-center items-center m-[10px] group "
          onClick={() => handleDrawer('chart')}
        >
          {chart ? (
            <>
              <FaRegClock className="w-[23px] h-[25px] m-[5px] text-[#06032d]" />
              <p className="text-[#06032d] text-[15px]">실시간</p>
            </>
          ) : (
            <>
              <FaRegClock className="w-[23px] h-[25px] m-[5px] text-font-gray group-hover:text-[#06032d]" />
              <p className="text-font-gray group-hover:text-[#06032d] text-[15px]">실시간</p>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default MenuBar;
