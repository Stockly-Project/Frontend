import { motion } from 'framer-motion';
import OrderImg from '../../assets/images/OrderImg.svg';

function OnBoarding2() {
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center bg-gradient-to-t from-white to-[#e9f1f6bb]">
      <motion.div
        initial={{ opacity: 0, y: 100 }} // opacity 0 - 안 보임
        whileInView={{ opacity: 1, y: 0 }} // 컴포넌트가 뷰포트에 있을 때의 상태
        viewport={{ once: false }} // 애니메이션 최초 한 번만 실행할건지
        transition={{
          ease: 'easeInOut',
          duration: 2,
          y: { duration: 1 },
        }}
      >
        <div className=" flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 200 }} //
            whileInView={{ opacity: 1, y: 0 }} // 컴포넌트가 뷰포트에 있을 때의 상태
            viewport={{ once: false }} // 애니메이션 최초 한 번만 실행할건지
            transition={{
              ease: 'easeInOut',
              duration: 2,
              y: { duration: 2 },
            }}
          >
            <div className="w-[400px] h-[600px] m-[50px] mx-[100px]">
              <img src={OrderImg} />
            </div>
          </motion.div>

          <div className="flex flex-col jsutify-center items-start m-[50px] mx-[100px]">
            <div className="text-[60px] font-bold">주식 투자를 게임처럼</div>
            <div className="text-[30px] text-[#aaaaaa]">
              주식을 처음 구매하는 사람도,
              <br />
              쉽게 이해할 수 있는 모의 투자 서비스
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default OnBoarding2;
