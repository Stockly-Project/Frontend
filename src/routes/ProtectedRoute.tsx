import React, { useRef } from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '../zustand/UserStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedin } = useUserStore();
  const alertShown = useRef(false); // 알림 표시 여부를 추적

  if (!isLoggedin) {
    if (!alertShown.current) {
      alert("로그인 후 이용하세요.");
      alertShown.current = true; // 알림 표시 후 플래그 설정
    }
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
