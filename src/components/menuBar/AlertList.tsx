import { IoMdTrash } from 'react-icons/io';
import { useState, useEffect } from 'react';
import useUserStore from '../../zustand/UserStore';

interface Alert {
  notification_id: number;
  company_name: string;
  symbol: string;
  price: number;
  is_active: boolean;
}

function AlertList() {
  const { isLoggedin } = useUserStore();

  const [alertList, setAlertList] = useState<Alert[]>([]);

  const handleDelete = (notification_id: number) => {
    fetch(`http://localhost:30080/api/v1/alert/prices/${notification_id}`, {
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
      })
      .catch((error) => {
        console.error('Fetch 에러:', error); // 에러 처리
      });
  };

  useEffect(() => {
    // 알림 목록 조회
    fetch('http://localhost:30080/api/v1/alert/prices', {
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
        setAlertList(data);
      })
      .catch((error) => {
        console.error('Fetch 에러:', error); // 에러 처리
      });
  }, [isLoggedin]);

  return (
    <div className="mt-[70px]">
      {alertList.length > 0 ? (
        alertList.map((alert, index) => (
          <div
            key={index}
            className="flex justify-between items-center m-[5px] rounded-[10px] transition-color duration-300"
          >
            <div className="mx-[10px] text-[17px] text-chart-font">{alert.company_name}</div>
            <div className="flex justify-center items-center m-[10px]">
              <div className="m-[10px] text-[17px]">
                {alert.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </div>
              <div
                className="w-[35px] h-[35px] flex  justify-center items-center cursor-pointer rounded-[17px] hover:bg-[#e4e8ea]"
                onClick={() => handleDelete(alert.notification_id)}
              >
                <IoMdTrash className="w-[23px] h-[23px] text-chart-font" />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="m-[10px] text-center text-[16px] text-[#acacacd4] p-[20px]">가격 알림 신청 목록이 없어요</div>
      )}
    </div>
  );
}

export default AlertList;
