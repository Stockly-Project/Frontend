import { useState, useEffect } from 'react';

function SignUp() {
  const [isDisabled, setIsDisabled] = useState(true); // 버튼 활성화/비활성화
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (password === checkPassword) {
      if (password===""){
        setIsDisabled(true);
        setErrorMessage('');
      }
      else if (checkPasswordValid(password)) {
        setIsDisabled(false);
        setErrorMessage('');
      } else {
        setIsDisabled(true);
        setErrorMessage('비밀번호는 8글자 이상의 영어, 숫자, 특수기호를 포함해야 합니다.');
      }
    } else {
      setIsDisabled(true);
      setErrorMessage('비밀번호가 일치하지 않습니다. 다시 확인하세요');
    }
  }, [checkPassword, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:30080/api/v1/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      console.log(JSON.stringify({ name, email, password }));
      if (response.ok) {
        alert('회원가입 되었습니다. 로그인 후 서비스를 이용하세요.');
      } else {
        alert('이미 존재하는 이메일 주소입니다.');
        console.log(response);
      }
    } catch (error) {
      console.error('Network error: ', error);
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const checkPasswordValid = (password: string) => {
    // 길이가 8자 이상인지 확인
    const isLongEnough = password.length >= 8;

    // 영어와 숫자가 포함되어 있는지 확인
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    // 특수기호가 포함되어 있는지 확인
    const hasSpecialChar = /[~!@#$%^&*()_+]/.test(password);

    // 모든 조건을 만족하는지 확인
    return isLongEnough && hasLetter && hasNumber && hasSpecialChar;
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="text-[45px] mb-[10px]">계정 생성</div>
      <form className="w-full flex flex-col justify-center items-center" onSubmit={handleSubmit}>
        <input
          className="w-[60%] h-[75px] m-[15px] p-[20px] rounded-[7px] shadow"
          placeholder="이름"
          required
          onChange={(e) => setName(e.target.value)}
        ></input>
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
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          className="w-[60%] h-[75px] m-[15px] p-[20px] rounded-[7px] shadow"
          placeholder="비밀번호 확인"
          value={checkPassword}
          type="password"
          required
          onChange={(e) => setCheckPassword(e.target.value)}
        ></input>
        <span className='text-reset-red h-[10px]'>{errorMessage}</span>
        <button
          className="w-[300px] h-[65px] mt-[90px] text-white text-[23px] bg-MainBlue rounded-[10px] hover:bg-[#1063d8] drop-shadow-xl"
          type="submit"
          disabled={isDisabled}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default SignUp;
