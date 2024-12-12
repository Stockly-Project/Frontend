import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useUserStore from '../zustand/UserStore';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserState } = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:30080/api/v1/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      // 응답 상태 확인
      if (response.status === 200) {
        const data = await response.json(); // JSON 데이터 파싱
        console.log('로그인 성공:', data); // JSON 데이터 출력
        getUserInfo(); // 사용자 정보 zustand에 저장
        alert('로그인 하였습니다.');
        gotoMain();
      } else {
        console.log('로그인 실패:', response); // 실패 응답 출력
        alert('이메일과 비밀번호가 일치하지 않습니다. 다시 시도해주세요');
      }
    } catch (error) {
      console.error('네트워크 오류:', error); // 네트워크 에러 출력
      alert('네트워크 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.');
    }
  };

  // 사용자 정보 조회
  const getUserInfo = () => {
    fetch('http://localhost:30080/api/v1/users', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          console.log('네트워크 응답이 올바르지 않습니다');
        }
        return res.json();
      })
      .then((data) => {
        setUserState(true, data.name, data.email);
      })
      .catch((error) => {
        console.error('Fetch 에러:', error); // 에러 처리
      });
  };

  const gotoMain = () => {
    navigate('/');
  };

  return (
    <div className=" w-full flex flex-col justify-center items-center">
      <div className="text-[45px] mb-[10px]">로그인</div>
      <form className=" w-full flex flex-col justify-center items-center" onSubmit={handleSubmit}>
        <div className="w-full h-[75px] m-[15px] p-[20px]"></div>
        <input
          className="w-[60%] h-[75px] m-[15px] p-[20px] rounded-[7px] shadow"
          placeholder="이메일"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className="w-[60%] h-[75px] m-[15px] p-[20px] rounded-[7px] shadow"
          placeholder="비밀번호"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <div className=" w-full h-[75px] m-[15px] p-[20px]"></div>
        <button
          className="w-[300px] h-[65px] mt-[100px] text-[28px] bg-MainBlue text-white rounded-[10px] hover:bg-[#1063d8] drop-shadow-xl"
          type="submit"
        >
          로그인
        </button>
      </form>
    </div>
  );
}

export default SignIn;
