import { motion } from 'framer-motion';
import { IoCaretUp } from "react-icons/io5";
import CandleImg from "../../assets/images/CandleImg.png";

interface OnBoarding4Props {
  gotoTop: () => void;
}


function OnBoarding4({ gotoTop }: OnBoarding4Props) {
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center bg-gradient-to-b from-white to-[#e9f1f6bb]">
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
            <motion.div
              initial={{ opacity: 0, y: 200 }} // opacity 0 - 안 보임
              whileInView={{ opacity: 1, y: 0 }} // 컴포넌트가 뷰포트에 있을 때의 상태
              viewport={{ once: false }} // 애니메이션 최초 한 번만 실행할건지
              transition={{
                ease: 'easeInOut',
                duration: 2,
                y: { duration: 1.5 },
              }}
            >
              <div className="bg-white p-[20px] rounded-[10px] m-[80px] mx-[100px] border-gray shadow-xl">
                <img src={CandleImg} className="w-[27vw]"/>
              </div>
            </motion.div>

            <div className="flex flex-col justify-center items-start m-[80px] mx-[100px]">
              <div className="text-[60px] font-bold">한눈에 보이는 차트</div>
              <div className="text-[30px] text-[#aaaaaa]">
                복잡하고 어려운 주식 차트
                <br />
                간단한 UI로 쉽게 사용하세요.
              </div>
            </div>
          </div>
          <motion.div
          className="w-full flex justify-center items-center"
            whileInView={{ opacity: 1 }}
            animate={{ y: [0, -20, 0] }}
            transition={{
              ease: 'easeInOut',
              duration: 2,
              repeat: Infinity,
            }}
          >
            <button className="flex justify-center items-center m-[50px]" onClick={gotoTop}>
              <IoCaretUp className="w-[30px] h-[30px] m-[10px] text-[#929292]" /> <p className="text-[30px] text-[#929292]">시작하기</p>
            </button>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}

export default OnBoarding4;
