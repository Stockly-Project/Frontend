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

function App() {
  const location = useLocation();

  const showMenuBar = !['/', '/login'].includes(location.pathname);

  const startMarketStatusUpdater = useMarketStore(
    (state) => state.startMarketStatusUpdater
  );

  useEffect(() => {
    const stopUpdater = startMarketStatusUpdater(); // 상태 갱신 시작
    return () => stopUpdater(); // 컴포넌트 언마운트 시 정리
  }, [startMarketStatusUpdater]);


  return (
    <div className="flex">
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
