import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import MenuBar from './components/menuBar/MenuBar';
import MyInvest from './pages/MyInvestPage';
import StockDetailsPage from './pages/StockDetailsPage';
import OnBoardingPage from './pages/OnBoardingPage';
import SettingsPage from './pages/SettingsPage';
import useMarketStore from './zustand/MarketStore';
import { useEffect } from 'react';
import RealTimeData from './hooks/RealTimeData';
import AlertMessageData from './hooks/AlertMessageData';
import Modal from './components/Modal';
import NewAlertContent from './components/NewAlertContent';
import AlertStore from './zustand/AlertStore';

function App() {
  const location = useLocation();
  const { isModalOpen, closeModal } = AlertStore();
  const showMenuBar = !['/', '/login'].includes(location.pathname);

  const startMarketStatusUpdater = useMarketStore((state) => state.startMarketStatusUpdater);

  useEffect(() => {
    const stopUpdater = startMarketStatusUpdater(); // 상태 갱신 시작
    return () => stopUpdater(); // 컴포넌트 언마운트 시 정리
  }, [startMarketStatusUpdater]);

  // 실시간 주식 리스트 zustand에 저장
  RealTimeData();
  AlertMessageData();

  return (
    <div className="flex">
      <Modal isOpen={isModalOpen} onClose={closeModal} >
        <NewAlertContent />
      </Modal>
      <Routes>
        <Route path="/" element={<OnBoardingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/myinvest" element={<MyInvest />} />
        <Route path="/details/:symbol" element={<StockDetailsPage />} />
        <Route path="/setting" element={<SettingsPage />} />
      </Routes>

      {showMenuBar && (
        <div className="w-[70px] fixed right-0 top-0 h-full">
          <MenuBar />
        </div>
      )}
    </div>
  );
}

export default function RootApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
