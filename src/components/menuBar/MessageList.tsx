import { useState, useEffect } from 'react';
import Delete from '../../assets/icons/cancel.svg';
import AlertStore from '../../zustand/AlertStore';

interface Message {
  notification_id: number;
  company_name: string;
  symbol: string;
  price: number;
  is_active: boolean;
  date: string;
}

function MenuBarAlertContent() {

  const [messageList, setMessageList] = useState<Message[]>([]);

  const {flag, setFlagState} = AlertStore(); // 알림목록에 변경사항 있으면 바뀌는 변수(useEffect 의존)

  const handleDelete = (notification_id: number) => {
    fetch(`http://localhost:30080/api/v1/alert/messages/${notification_id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          console.log('네트워크 응답이 올바르지 않습니다');
          console.log(JSON.stringify({ notification_id }));
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setFlagState(!flag);
      })
      .catch((error) => {
        console.error('Fetch 에러:', error); // 에러 처리
      });
  };

  useEffect(() => {
    // 메시지 조회
    fetch('http://localhost:30080/api/v1/alert/messages', {
      method: 'GET',
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
        setMessageList(data);
      })
      .catch((error) => {
        console.error('Fetch 에러:', error); // 에러 처리
      });
  }, [flag]);

  return (
    <div className="mt-[75px]">
      {messageList.length > 0 ? (
        messageList.map((message, index) => (
          <div key={index} className="bg-white rounded-[10px] m-[10px] p-[5px]">
            <div className="flex justify-between items-center">
              <div className="m-[10px] text-[14px] text-[#acacacd4]">{message.date}</div>
              <img src={Delete} className="m-[10px] cursor-pointer" onClick={()=>handleDelete(message.notification_id)}/>
            </div>
            <div className="m-[10px] text-[15px]">
              {message.company_name} (이)가 <br/> {message.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원에
              도달했습니다.
            </div>
          </div>
        ))
      ) : (
        <div className="m-[10px] text-center text-[16px] text-[#acacacd4] p-[20px]">알림 메시지가 없어요</div>
      )}
    </div>
  );
}

export default MenuBarAlertContent;
