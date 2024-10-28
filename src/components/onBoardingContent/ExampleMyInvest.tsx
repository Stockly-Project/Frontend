import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  Title,
  ChartData,
  ChartOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Tooltip, Legend, Title);

const LineData: ChartData<'line'> = {
  labels: ['1일', '2일', '3일', '4일', '5일', '6일', '7일', '8일', '9일', '10일', '11일', '12일'],
  datasets: [
    {
      label: 'Sales',
      data: [120, 200, 150, 80, 250, 120, 200, 150, 80, 250, 10, 400],
      backgroundColor: ['rgba(75, 192, 192, 0.2)'],
      borderColor: ['rgba(75, 192, 192, 1)'],
      borderWidth: 1,
    },
  ],
};

const BarData: ChartData<'bar'> = {
    labels: ['1일', '2일', '3일', '4일', '5일', '6일', '7일', '8일', '9일', '10일', '11일', '12일'],
    datasets: [
      {
        label: 'Sales',
        data: [120, 200, 150, 80, 250, 120, 200, 150, 80, 250, 10, 400],
        backgroundColor: ['rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

const DoughnutData: ChartData<'doughnut'> = {
  labels: ['삼성전자', '카카오', '네이버', '삼성SDI'],
  datasets: [
    {
      label: 'My First Dataset',
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

const LineOptions: ChartOptions<'line'> = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      grid: {
        display: true, // 세로선
      },
    },
    y: {
      grid: {
        display: true, //가로선
      },
    },
  },
  animation: {
    duration: 2000, // 애니메이션 지속 시간
    easing: 'easeInOutQuad', // 애니메이션 이징 함수
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const BarOptions: ChartOptions<'bar'> = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: true, // 세로선
        },
      },
      y: {
        grid: {
          display: true, //가로선
        },
      },
    },
    animation: {
      duration: 2000, // 애니메이션 지속 시간
      easing: 'easeInOutQuad', // 애니메이션 이징 함수
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

const DoughnutOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  animation: {
    duration: 2000, // 애니메이션 지속 시간
    easing: 'easeInOutQuad', // 애니메이션 이징 함수
  },
  plugins: {
    legend: {
      display: false, // 차트 상단의 라벨 표시
    },
  },
};

function RoiChart() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full text-[18px] p-[10px]">수익률</div>
      <div className="w-[80%] flex justify-center items-center">
        <Line options={LineOptions} data={LineData} />
      </div>
    </div>
  );
}

function DoughnutChart() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full text-[18px] p-[10px]">보유 종목</div>
      <div className="w-[80%] content-center">
        <Doughnut data={DoughnutData} options={DoughnutOptions} />
      </div>
    </div>
  );
}

function BarChart() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full text-[18px] p-[10px]">계좌 변동 한 눈에 보기</div>
      <div className="w-[80%] flex justify-center items-center">
        <Bar options={BarOptions} data={BarData} />
      </div>
    </div>
  );
}

function AssetChart() {
  return <div className="flex justify-center items-center m-[10px]"></div>;
}

function ExampleMyInvest() {
  return (
    <>
      <div className="w-full h-[100%] border border-gray bg-Bg-gray flex p-[20px] rounded-[10px]">
        <div className="flex flex-col w-[59%] justify-between">
          <div className="h-[48%] bg-white rounded-[15px] m-[10px]">
            <BarChart />
          </div>
          <div className="h-[48%] bg-white rounded-[15px] m-[10px]">
            <RoiChart />
          </div>
        </div>
        <div className="flex flex-col w-[39%] justify-between">
          <div className="h-[30%] bg-white rounded-[15px] m-[10px]">
            <AssetChart />
          </div>
          <div className="h-[66%] bg-white rounded-[15px] m-[10px]">
            <DoughnutChart />
          </div>
        </div>
      </div>
    </>
  );
}

export default ExampleMyInvest;
