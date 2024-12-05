import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '../zustand/UserStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const {isLoggedin} = useUserStore();

  if (!isLoggedin) {
    // 로그아웃 상태에서 접근 시 로그인 페이지로 리디렉션
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
