import { motion } from 'framer-motion';
import ExampleMyInvest from './ExampleMyInvest';
import { useState } from 'react';

function OnBoarding3() {
  const [isInView, setIsInView] = useState(false);
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 100 }} // opacity 0 - 안 보임
        whileInView={{ opacity: 1, y: 0 }} // 컴포넌트가 뷰포트에 있을 때의 상태
        onViewportEnter={() => setIsInView(true)}
        onViewportLeave={() => setIsInView(false)}
        viewport={{ once: false }} // 애니메이션 최초 한 번만 실행할건지
        transition={{
          ease: 'easeInOut',
          duration: 2,
          y: { duration: 1 },
        }}
      >
        <div className=" flex justify-center items-center">
          <div className="flex flex-col jsutify-center items-start m-[50px] mx-[60px]">
            <div className="text-[60px] font-bold">사용자별 대시보드</div>
            <div className="text-[30px] text-[#aaaaaa]">
              그래프와 차트를 이용한
              <br />
              사용자의 수익률을 한눈에
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 200 }} // opacity 0 - 안 보임
            whileInView={{ opacity: 1, y: 0 }} // 컴포넌트가 뷰포트에 있을 때의 상태
            onViewportEnter={() => setIsInView(true)}
            onViewportLeave={() => setIsInView(false)}
            viewport={{ once: false }} // 애니메이션 최초 한 번만 실행할건지
            transition={{
              ease: 'easeInOut',
              duration: 2,
              y: { duration: 2 },
            }}
          >
            <div className="w-[700px] m-[50px] mx-[60px]">{isInView && <ExampleMyInvest />}</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default OnBoarding3;
