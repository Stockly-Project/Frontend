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
      label: '수익률',
      data: [120, 200, 150, 80, 250, 120, 200, 150, 80, 250, 10, 400],
      backgroundColor: ['rgba(75, 192, 192, 0.2)'],
      borderColor: ['rgba(75, 192, 192, 1)'],
      borderWidth: 1,
    },
  ],
};
const barlabels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월']
const BarData: ChartData<'bar'> = {
  labels: barlabels,
  datasets: [
    {
      label: '예수금',
      data: [50, 40, 20, 30, 30, 40, 20, 40],
      backgroundColor: '#76d3ae',
    },
    {
      label: '주식',
      data: [10, 20, 30, 40, 30, 40, 20, 10],
      backgroundColor: '#f8d865',
      borderWidth: 1,
    },
  ],
};

const DoughnutData: ChartData<'doughnut'> = {
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

const data1: ChartData<'bar'> = {
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
const data2: ChartData<'bar'> = {
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
const data3: ChartData<'bar'> = {
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

const AssetOptions: ChartOptions<'bar'> = {
  indexAxis: 'y' as const, // 가로 바 차트를 위한 설정
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
  maintainAspectRatio: false,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  layout: {
    padding: {
      left: 20,
      right: 20,
      top: 20,
      bottom: 20
    },
  },
  scales: {
    x: {
      grid: {
        display: true,
      },
      stacked: true,
      min: barlabels.length - 7,
      max: barlabels.length, // 최근 7개의 데이터만 표시
    },
    y: {
      grid: {
        display: true,
      },
      stacked: true,
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
    zoom: {
      pan: {
        enabled: false,
        mode: 'x',
      },
      zoom: {
        wheel: {
          enabled: false,
        },
        mode: 'x',
      },
    },
  },
};

const DoughnutOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  layout: {
    padding: {
      left: 20,
      right: 20,
      top: 20,
      bottom: 20
    }
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
  return (
    <div className="h-full flex flex-col justify-center items-center m-[10px]">
      <div className="w-full h-[10%] text-start mb-[10px]">내 자산</div>
      <div className="w-full h-[90%] flex flex-col justify-center items-center">
        <div className="flex justify-between items-center w-full my-[5px]">
          <div className="w-[15%] text-center text-[8px]">총자산</div>
          <div className="w-[60%]">
            <Bar options={AssetOptions} data={data1} height="7" />
          </div>
          <div className="w-[24%] text-center bg-[#d0e2fc] rounded-[5px] text-[7px]">₩ 8,042,404</div>
        </div>
        <div className="flex justify-between items-center w-full my-[5px]">
          <div className="w-[15%] text-center text-[8px]">주식</div>
          <div className="w-[60%]">
            <Bar options={AssetOptions} data={data2} height="7" />
          </div>
          <div className="w-[24%] text-center bg-[#d0e2fc] rounded-[5px] text-[7px]">₩ 7,000,000</div>
        </div>
        <div className="flex justify-between items-center w-full my-[5px]">
          <div className="w-[15%] text-center text-[8px]">예수금</div>
          <div className="w-[60%]">
            <Bar options={AssetOptions} data={data3} height="7" />
          </div>
          <div className="w-[24%] text-center bg-[#d0e2fc] rounded-[5px] text-[7px]">₩ 1,042,404</div>
        </div>
      </div>

    </div>
  );
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
          <div className="h-[40%] bg-white rounded-[15px] m-[10px]">
            <AssetChart />
          </div>
          <div className="h-[56%] bg-white rounded-[15px] m-[10px]">
            <DoughnutChart />
          </div>
        </div>
      </div>
    </>
  );
}

export default ExampleMyInvest;
