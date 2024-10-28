import { Bar } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, zoomPlugin);

const labels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월']

const data = {
  labels: labels,
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

const options: ChartOptions<'bar'> = {
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
      min: labels.length-7, 
      max: labels.length, // 최근 7개의 데이터만 표시
    },
    y: {
      grid: {
        display: true,
      },
      stacked: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    zoom: {
      pan: {
        enabled: true,
        mode: 'x',
      },
      zoom: {
        wheel: {
          enabled: true,
        },
        mode: 'x',
      },
    },
  },
};

function BarChart() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full text-[23px] p-[20px]">계좌 변동 한 눈에 보기</div>
      <div className="w-full flex-grow flex justify-center items-center">
        <Bar options={options} data={data} className="h-full" />
      </div>
    </div>
  );
}

export default BarChart;
