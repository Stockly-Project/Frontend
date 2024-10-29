import { motion } from 'framer-motion';
import { FaAnglesUp } from 'react-icons/fa6';
import React, { useState } from 'react';
import ApexCharts from 'react-apexcharts';

interface OnBoarding4Props {
  gotoTop: () => void;
}

const data = [
  {
    date: '2021-02-02 13:30:00',
    open: 1000,
    low: 900,
    high: 1050,
    close: 980,
    volume: 200,
  },
  {
    date: '2021-02-03 13:30:00',
    open: 980,
    low: 980,
    high: 1200,
    close: 1100,
    volume: 500,
  },
  {
    date: '2021-02-04 13:30:00',
    open: 1100,
    low: 1030,
    high: 1100,
    close: 1080,
    volume: 890,
  },
  {
    date: '2021-02-05 13:30:00',
    open: 1080,
    low: 1100,
    high: 1210,
    close: 1210,
    volume: 600,
  },
  {
    date: '2021-02-06 13:30:00',
    open: 1210,
    low: 1150,
    high: 1250,
    close: 1230,
    volume: 950,
  },
  {
    date: '2021-02-07 13:30:00',
    open: 1230,
    low: 1220,
    high: 1300,
    close: 1280,
    volume: 1100,
  },
  {
    date: '2021-02-08 13:30:00',
    open: 1280,
    low: 1250,
    high: 1350,
    close: 1330,
    volume: 300,
  },
  {
    date: '2021-02-09 13:30:00',
    open: 1330,
    low: 1280,
    high: 1370,
    close: 1300,
    volume: 1020,
  },
  {
    date: '2021-02-10 13:30:00',
    open: 1300,
    low: 1270,
    high: 1400,
    close: 1370,
    volume: 600,
  },
  {
    date: '2021-02-11 13:30:00',
    open: 1370,
    low: 1340,
    high: 1420,
    close: 1385,
    volume: 700,
  },
  {
    date: '2021-02-12 13:30:00',
    open: 1385,
    low: 1330,
    high: 1400,
    close: 1355,
    volume: 870,
  },
  {
    date: '2021-02-13 13:30:00',
    open: 1355,
    low: 1300,
    high: 1380,
    close: 1320,
    volume: 930,
  },
  {
    date: '2021-02-14 13:30:00',
    open: 1320,
    low: 1250,
    high: 1350,
    close: 1275,
    volume: 1020,
  },
  {
    date: '2021-02-15 13:30:00',
    open: 1275,
    low: 1250,
    high: 1330,
    close: 1305,
    volume: 500,
  },
  {
    date: '2021-02-16 13:30:00',
    open: 1305,
    low: 1290,
    high: 1350,
    close: 1320,
    volume: 960,
  },
  {
    date: '2021-02-17 13:30:00',
    open: 1320,
    low: 1260,
    high: 1340,
    close: 1280,
    volume: 1040,
  },
  {
    date: '2021-02-18 13:30:00',
    open: 1280,
    low: 1250,
    high: 1300,
    close: 1265,
    volume: 500,
  },
  {
    date: '2021-02-19 13:30:00',
    open: 1265,
    low: 1240,
    high: 1310,
    close: 1290,
    volume: 920,
  },
  {
    date: '2021-02-20 13:30:00',
    open: 1290,
    low: 1260,
    high: 1340,
    close: 1335,
    volume: 980,
  },
  {
    date: '2021-02-21 13:30:00',
    open: 1335,
    low: 1300,
    high: 1360,
    close: 1320,
    volume: 900,
  },
  {
    date: '2021-02-22 13:30:00',
    open: 1320,
    low: 1280,
    high: 1350,
    close: 1315,
    volume: 950,
  },
  {
    date: '2021-02-23 13:30:00',
    open: 1315,
    low: 1250,
    high: 1340,
    close: 1260,
    volume: 1010,
  },
  {
    date: '2021-02-24 13:30:00',
    open: 1260,
    low: 1200,
    high: 1280,
    close: 1270,
    volume: 1070,
  },
  {
    date: '2021-02-25 13:30:00',
    open: 1270,
    low: 1180,
    high: 1250,
    close: 1210,
    volume: 650,
  },
  {
    date: '2021-02-26 13:30:00',
    open: 1210,
    low: 1150,
    high: 1230,
    close: 1170,
    volume: 990,
  },
  {
    date: '2021-02-27 13:30:00',
    open: 1170,
    low: 1160,
    high: 1230,
    close: 1200,
    volume: 700,
  },
  {
    date: '2021-02-28 13:30:00',
    open: 1200,
    low: 1100,
    high: 1250,
    close: 1200,
    volume: 1200,
  },
  {
    date: '2021-03-01 13:30:00',
    open: 1200,
    low: 1150,
    high: 1260,
    close: 1260,
    volume: 850,
  },
  {
    date: '2021-03-02 13:30:00',
    open: 1260,
    low: 1050,
    high: 1260,
    close: 1170,
    volume: 500,
  },
  {
    date: '2021-03-03 13:30:00',
    open: 1170,
    low: 1100,
    high: 1190,
    close: 1160,
    volume: 890,
  },
  {
    date: '2021-03-04 13:30:00',
    open: 1160,
    low: 1140,
    high: 1200,
    close: 1150,
    volume: 870,
  },
  {
    date: '2021-03-05 13:30:00',
    open: 1150,
    low: 940,
    high: 1150,
    close: 960,
    volume: 910,
  },
  {
    date: '2021-03-06 13:30:00',
    open: 960,
    low: 950,
    high: 1160,
    close: 1090,
    volume: 850,
  },
  {
    date: '2021-03-07 13:30:00',
    open: 1090,
    low: 1070,
    high: 1200,
    close: 1190,
    volume: 810,
  },
  {
    date: '2021-03-08 13:30:00',
    open: 1190,
    low: 1100,
    high: 1290,
    close: 1280,
    volume: 860,
  },
  {
    date: '2021-03-09 13:30:00',
    open: 1280,
    low: 1260,
    high: 1350,
    close: 1330,
    volume: 830,
  },
  {
    date: '2021-03-10 13:30:00',
    open: 1330,
    low: 1300,
    high: 1340,
    close: 1335,
    volume: 870,
  },
];


const ApexChart: React.FC = () => {
  const [xaxisRange, _] = useState({
    min: new Date(data[0].date).getTime(),
    max: new Date(data[data.length - 1].date).getTime(),
  });

  const candlestickData = data.map((price) => ({
    x: price.date,
    y: [price.open, price.high, price.low, price.close],
  }));

  const volumeData = data.map((price) => ({
    x: price.date,
    y: price.volume,
    color: price.close > price.open ? 'rgba(255, 26, 26, 1)' : 'rgba(48, 18, 247, 1)',
  }));

  // 이동평균선 데이터를 계산 (여기서는 간단하게 close 값의 평균을 이동평균선으로 사용)
  const movingAverageData = data.map((price, index, arr) => {
    const sum = arr.slice(Math.max(0, index - 2), index + 1).reduce((acc, curr) => acc + curr.close, 0);
    const avg = sum / Math.min(index + 1, 3); // 간단한 3일 이동평균
    return { x: price.date, y: avg.toFixed(2) };
  });

  return (
    <div className="w-[26vw] flex flex-col justify-center items-center">
      <div id="chart-candlestick" className="w-full h-[26vh]">
        <ApexCharts
          type="candlestick"
          series={[
            { name: '주가', data: candlestickData },
            { name: '이동평균선', type: 'line', data: movingAverageData },
          ]}
          height="100%"
          options={{
            chart: {
              toolbar: {
                tools: {},
              },
              background: 'transparent',
              animations: {
                enabled: true,
              },
              zoom: {
                enabled: false
              },
            },
            grid: {
              show: true,
            },
            plotOptions: {
              candlestick: {
                wick: {
                  useFillColor: true,
                },
                colors: {
                  upward: '#ff1a1a',
                  downward: '#3012f7',
                },
              },
            },
            xaxis: {
              type: 'datetime',
              min: xaxisRange.min,
              max: xaxisRange.max,
              crosshairs: {
                show: false,
              },
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              tooltip: {
                enabled: false,
              },
            },
            yaxis: {
              show: false,
              opposite: true,
              forceNiceScale: true,
              tooltip: {
                enabled: false,
              },
            },
            legend: {
              show: false,
            },
            tooltip: {
              enabled: false
            },
          }}
        />
      </div>
      <div id="chart-bar" className="w-full h-[15vh] ">
        <ApexCharts
          type="bar"
          series={[{ name: 'Volume', data: volumeData }]}
          height="100%"
          options={{
            chart: {
              toolbar: {
                show: false,
              },
              animations: {
                enabled: true,
              },
              zoom: {
                enabled: false
              },
            },
            plotOptions: {
              bar: {
                distributed: true,
              },
            },
            dataLabels: {
              enabled: false,
            },
            colors: volumeData.map((data) => data.color),
            legend: {
              show: false,
            },
            xaxis: {
              crosshairs: {
                show: true,
                opacity: 1,
                position: 'back',
                stroke: { width: 1, dashArray: 4 },
              },
              type: 'datetime',
              min: xaxisRange.min,
              max: xaxisRange.max,
              labels: {
                show: true,
              },
              axisBorder: {
                show: true,
              },
              axisTicks: {
                show: true,
              },
            },
            yaxis: {
              opposite: true,
              show: false,
              tooltip: {
                enabled: false,
              },

            },
            tooltip: {
              enabled: false
            },
          }}
        />
      </div>
    </div>
  );
};

function OnBoarding4({ gotoTop }: OnBoarding4Props) {
  const [isInView, setIsInView] = useState(false);
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
            ></motion.div>
            <div className="bg-Bg-gray p-[20px] rounded-[10px] m-[80px]"><div className="bg-white">{isInView && <ApexChart />}</div></div>
            <div className="flex flex-col justify-center items-start m-[80px]">
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
