import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import MenuBar from './components/menuBar/MenuBar';
import StockDetailsPage from './pages/StockDetailsPage';
import OnBoardingPage from './pages/OnBoardingPage';
import MypagePage from './pages/MypagePage';
import useMarketStore from './zustand/MarketStore';
import { useEffect } from 'react';
import RealTimeData from './hooks/RealTimeData';
import AlertMessageData from './hooks/AlertMessageData';
import Modal from './components/Modal';
import NewAlertContent from './components/NewAlertContent';
import AlertStore from './zustand/AlertStore';
import ProtectedRoute from './routes/ProtectedRoute';
import GuestRoute from './routes/GuestRoute';

function App() {
  const location = useLocation();
  const { isModalOpen, closeModal } = AlertStore();
  const showMenuBar = !['/onboarding', '/login'].includes(location.pathname);

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
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <NewAlertContent />
      </Modal>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/*" element={<MainPage />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/onboarding"
          element={
            <GuestRoute>
              <OnBoardingPage />
            </GuestRoute>
          }
        />
        <Route path="/details/:symbol" element={<StockDetailsPage />} />
        <Route
          path="/mypage"
          element={
            <ProtectedRoute>
              <MypagePage />
            </ProtectedRoute>
          }
        />
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
