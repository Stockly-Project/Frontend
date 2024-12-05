import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

function AssetChart() {
  const data1 = {
    labels: ['총자산'],
    datasets: [
      {
        label: '%',
        data: [100], // 퍼센트 값
        backgroundColor: '#3182F6',
        borderColor: '#3182F6',
        borderWidth: 1,
        borderRadius: 5
      },
    ],
  };
  const data2 = {
    labels: ['주식'],
    datasets: [
      {
        label: '%',
        data: [60], // 퍼센트 값
        backgroundColor: '#3182F6',
        borderColor: '#3182F6',
        borderWidth: 1,
        borderRadius: 5
      },
    ],
  };
  const data3 = {
    labels: ['예수금'],
    datasets: [
      {
        label: '%',
        data: [40], // 퍼센트 값
        backgroundColor: '#3182F6',
        borderColor: '#3182F6',
        borderWidth: 1,
        borderRadius: 5
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const, // 가로 바 차트를 위한 설정
    maxBarThickness: 10,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: false,
          text: '퍼센트',
        },
        display: false,
        min: 0,
        max: 100, // 퍼센트 범위
      },
      y: {
        display: false,
        title: {
          display: false,
          text: '항목',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full flex-grow flex flex-col justify-around items-center">
        <div className="flex justify-between items-center w-full h-[40px]">
          <div className="w-[10%] text-center">총자산</div>
          <div className="w-[70%] pr-[30px]">
            <Bar options={options} data={data1} />
          </div>
          <div className="w-[20%] text-center bg-[#e3efff] rounded-[5px]">₩ 8,042,404</div>
        </div>
        <div className="flex justify-between items-center w-full h-[40px]">
          <div className="w-[10%] text-center">주식</div>
          <div className="w-[70%] pr-[30px]">
            <Bar options={options} data={data2} />
          </div>
          <div className="w-[20%] text-center bg-[#e3efff] rounded-[5px]">₩ 7,000,000</div>
        </div>
        <div className="flex justify-between items-center w-full h-[40px]">
          <div className="w-[10%] text-center">예수금</div>
          <div className="w-[70%] pr-[30px]">
            <Bar options={options} data={data3} />
          </div>
          <div className="w-[20%] text-center bg-[#e3efff] rounded-[5px]">₩ 1,042,404</div>
        </div>
      </div>
    </div>
  );
}

export default AssetChart;
