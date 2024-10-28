import MainLogo from '../../assets/icons/main_logo.svg';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function OnBoarding1() {
  const navigate = useNavigate();
  const gotoLogin = () => {
    navigate('/login');
  };
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          ease: 'easeInOut',
          duration: 2,
          y: { duration: 1 },
        }}
      >
        <div className="flex flex-col justify-center items-center">
          <div className=" flex justify-center items-center">
            <div className="w-[200px] h-[300px] m-[20px]">
              <img src={MainLogo} />
            </div>
            <div className="flex flex-col jsutify-center items-center m-[20px]">
              <div className="text-[40px]">직접 투자하면서 배우는 모의 투자 서비스</div>
              <div className="text-[55px] font-bold">STOCKLY</div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              ease: 'easeInOut',
              duration: 3,
              y: { duration: 2 },
            }}
          >
            <button
              className="bg-MainBlue w-[340px] h-[80px] text-white text-[25px] rounded-[10px] hover:bg-[#1063d8] drop-shadow-xl"
              onClick={gotoLogin}
            >
              시작하기
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default OnBoarding1;
