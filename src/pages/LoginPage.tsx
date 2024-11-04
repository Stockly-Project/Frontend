import '../index.css';
import MainLogo from '../assets/icons/main_logo.svg';
import {useState} from 'react';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

function LoginPage() {

    const [login, setLogin] = useState(true);

    const ShowLogin = () => {
        setLogin(true);
    }

    const ShowSignUp = () => {
        setLogin(false);
    }


  return (
    <div className="w-[100vw] h-[100vh] flex min-w-[1270px]">
      <div className="w-[45%] flex justify-center items center">
        <div className="flex flex-col justify-center items-center">
          <div className="text-[30px]">직접 투자하며 배우는 </div>
          <div className="text-[50px] font-bold m-[10px]">모의 투자 서비스 </div>
          <div className="flex items-end m-[30px]">
            <img src={MainLogo} className="w-[190px] h-[260px]"></img>
            <div className="text-[45px] font-bold">STOCKLY</div>
          </div>
          <div className="m-[30px]">
            <button className="w-[230px] h-[65px] text-white bg-MainBlue rounded-[10px] text-[25px] m-[10px] drop-shadow-xl hover:bg-[#1063d8]" onClick={ShowLogin}> 로그인 </button>
            <button className="w-[230px] h-[65px] rounded-[10px] text-[25px] border-solid border-[1px] border-[#d0d0d0] m-[10px] drop-shadow-xl hover:bg-[#fcfdff] " onClick={ShowSignUp}> 회원가입 </button>
          </div>
        </div>
      </div>
      <div className="w-[55%] bg-[#F6F7F9] rounded-l-[30px] flex justify-center items-center">
        { login ?  <SignIn/> : <SignUp/>} 
      </div>
    </div>
  );
}

export default LoginPage;
