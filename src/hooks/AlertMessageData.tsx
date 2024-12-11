import { useEffect } from 'react';
import AlertStore from '../zustand/AlertStore';
import useUserStore from '../zustand/UserStore';

const AlertMessageData = () => {
  const {flag, setFlagState, openModal,setCompanyInfo} = AlertStore();
  const { isLoggedin } = useUserStore();


  useEffect(() => {
    if (!isLoggedin) return ;
    
    const eventSource = new EventSource(`http://localhost:30081/api/v1/alert/stream`,{withCredentials: true});
    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data)
      console.log(newData);
      setFlagState(!flag);
      setCompanyInfo(newData.company_name, newData.current_price, newData.symbol);
      openModal();
    };
    eventSource.onerror = (error) => {
      console.error('SSE connection error', error);
    };
    return () => {
      eventSource.close();
    };
  }, []);
};

export default AlertMessageData;
