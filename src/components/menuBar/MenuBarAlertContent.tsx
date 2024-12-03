import { useState } from 'react';
import useUserStore from '../../zustand/UserStore';
import AlertList from './AlertList';
import MessageList from './MessageList';

function MenuBarAlertContent() {
  const { isLoggedin } = useUserStore();

  if (!isLoggedin) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span className="text-[15px] text-[#757575]">로그인 후 이용할 수 있습니다.</span>
      </div>
    );
  }

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
      {content === 'list' ? <AlertList /> : <MessageList />}
    </div>
  );
}

export default MenuBarAlertContent;
