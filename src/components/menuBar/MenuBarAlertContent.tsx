import { IoMdTrash } from 'react-icons/io';
import { useState } from 'react';
import Delete from '../../assets/icons/cancel.svg';

const alert_list = [
  { company_name: '삼성전자111', price: 5000 },
  { company_name: '삼성SDI', price: 5000 },

];

const message_list = [
  { company_name: '삼성전자1111', price: 5000, date: '2002.05.19' },
  { company_name: '삼성SDI', price: 5000, date: '2002.05.27' },

];

function MenuBarLikeContent() {
  const [content, setContent] = useState('list');

  const handleClickList = () => {
    setContent('list');
  };
  const handleMessageList = () => {
    setContent('message');
  };
  return (
    <div>
      <div className="flex fixed w-full h-[70px] bg-Bg-gray border-b border-gray items-center">
        <div
          className={`p-[15px] text-[20px] cursor-pointer ${content === 'list' ? 'text-black' : 'text-[#b5b6bdeb]'}`}
          onClick={handleClickList}
        >
          알림목록
        </div>
        <div
          className={`p-[15px] text-[20px] cursor-pointer ${content === 'message' ? 'text-black' : 'text-[#b5b6bdeb]'}`}
          onClick={handleMessageList}
        >
          메시지
        </div>
      </div>

      <hr className="w-[100%] border-font-gray" />
      {content === 'list' ? (
  <div className="mt-[70px]">
    {alert_list.length > 0 ? (
      alert_list.map((like) => (
        <div className="flex justify-between items-center m-[5px] hover:bg-[#e4e8ea] rounded-[10px] transition-color duration-300 cursor-pointer">
          <div className="mx-[10px] text-[17px] text-chart-font">{like.company_name}</div>
          <div className="flex justify-center items-center m-[10px]">
            <div className="m-[10px] text-[17px] ">{like.price}원</div>
            <div className="m-[10px] cursor-pointer">
              <IoMdTrash className="w-[23px] h-[23px] text-chart-font" />
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="m-[10px] text-center text-[16px] text-[#acacacd4] p-[20px]">
        가격 알림 신청 목록이 없어요
      </div>
    )}
  </div>
) : (
  <div className="mt-[75px]">
    {message_list.length > 0 ? (
      message_list.map((message) => (
        <div className="bg-white rounded-[10px] m-[10px] p-[5px]">
          <div className="flex justify-between items-center">
            <div className="m-[10px] text-[14px] text-[#acacacd4]">
              {message.date}
            </div>
            <img src={Delete} className="m-[10px] cursor-pointer" />
          </div>
          <div className="m-[10px] text-[16px]">
            {message.company_name}가 {message.price}원에 도달했습니다.
          </div>
        </div>
      ))
    ) : (
      <div className="m-[10px] text-center text-[16px] text-[#acacacd4] p-[20px]">
        알림 메시지가 없어요
      </div>
    )}
  </div>
)}

    </div>
  );
}

export default MenuBarLikeContent;
