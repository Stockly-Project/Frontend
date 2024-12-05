import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '../zustand/UserStore';

interface GuestRouteProps {
  children: React.ReactNode;
}

const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
  const { isLoggedin } = useUserStore();

  if (isLoggedin) {
    // 로그인 상태에서 접근 시 메인 페이지로 리디렉션
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default GuestRoute;
