import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();

  const gotoMain = () => {
    navigate('/main');
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-[45px] mb-[10px]">로그인</div>
      <form className="flex flex-col justify-center items-center">
        <div className="w-[575px] h-[75px] m-[15px] p-[20px] "></div>
        <input
          className="w-[575px] h-[75px] m-[15px] p-[20px] rounded-[7px] shadow"
          placeholder="이메일"
          type="email"
          required
        ></input>
        <input
          className="w-[575px] h-[75px] m-[15px] p-[20px] rounded-[7px]"
          placeholder="비밀번호"
          type="password"
          required
        ></input>
        <div className="w-[575px] h-[75px] m-[15px] p-[20px]"></div>
        <button
          className="w-[300px] h-[65px] mt-[100px] text-[28px] bg-MainBlue text-white rounded-[10px] hover:bg-[#1063d8] drop-shadow-xl"
          type="submit"
          onClick={gotoMain}
        >
          로그인
        </button>
      </form>
    </div>
  );
}

export default SignIn;
