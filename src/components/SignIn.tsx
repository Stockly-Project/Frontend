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
      const response = await fetch('http://localhost.stock-server/api/v1/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        alert('로그인 하였습니다.');
        setUserState(true, email);
        gotoMain();
      } else {
        alert('로그인 실패');
        console.log(response);
      }
    } catch (error) {
      console.error('Network error: ', error);
      alert('네트워크 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.');
    }


  };


  const gotoMain = () => {
    navigate('/main');
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
          onChange={(e)=>setEmail(e.target.value)}
        ></input>
        <input
          className="w-[60%] h-[75px] m-[15px] p-[20px] rounded-[7px] shadow"
          placeholder="비밀번호"
          type="password"
          required
          onChange={(e)=>setPassword(e.target.value)}
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
