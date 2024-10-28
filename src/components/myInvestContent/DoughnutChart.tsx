import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['삼성전자', '카카오', '네이버', '삼성SDI'],
  datasets: [
    {
      label: '주식 수',
      data: [1000000, 200000, 50000, 300000],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      hoverOffset: 4,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  layout:{
    padding:{
      left: 20,
      right: 20,
      top: 20,
      bottom: 20
    }
  },
  scales: {
    x: {
      display: false, // x축
      grid: {
        display: false, // 세로선
      },
    },
    y: {
      display: false, //y축
      grid: {
        display: false, //가로선
      },
    },
  },
};

function DoughnutChart() {
  return (
    <div className="w-full h-full flex flex-col  items-center">
      <div className="w-full text-[23px] p-[20px]">보유 종목</div>
      <div className="w-[80%] flex-grow flex justify-center items-center">
        <Doughnut data={data} options={options} className="h-full"/>
      </div>
    </div>
  );
}

export default DoughnutChart;
