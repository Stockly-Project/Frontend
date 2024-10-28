import { motion } from 'framer-motion';
import { FaAnglesUp } from 'react-icons/fa6';

interface OnBoarding4Props {
  gotoTop: () => void;
}

function OnBoarding4({ gotoTop }: OnBoarding4Props) {

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
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
        <div className="flex flex-col">
          <div className=" flex justify-center items-center">
            <div className="border">주식차트 들어갈 예정~</div>
            <div className="flex flex-col justify-center items-start m-[50px]">
              <div className="text-[60px] font-bold">한눈에 보이는 차트</div>
              <div className="text-[30px] text-[#aaaaaa]">
                복잡하고 어려운 주식 차트
                <br />
                간단한 UI로 쉽게 사용하세요.
              </div>
            </div>
          </div>
          <button className="flex justify-center items-center m-[50px]" onClick={gotoTop}>
            <FaAnglesUp className="w-[40px] h-[40px] m-[10px]" /> <p className="text-[40px]">시작하기</p>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default OnBoarding4;
