import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { ChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, zoomPlugin);


const labels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
const datas = [10, 10, 15, 20, 25, 20, 10, -2, -8, 0, 10, 12]


const maxAbsoluteValue = datas.reduce((max, num) => {
  return Math.abs(num) > Math.abs(max) ? num : max;
}, datas[0]);

const y_range = (Math.floor(maxAbsoluteValue/10) + 1) * 10

const data = {
  labels: labels,
  datasets: [
    {
      label: '수익률(%)',
      data: datas,
      backgroundColor: ['rgba(75, 192, 192, 0.2)'],
      borderColor: ['rgba(75, 192, 192, 1)'],
      borderWidth: 1,
    },
  ],
};

const options: ChartOptions<'line'> = {
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
      grid: {
        display: true, // 세로선
      },
      min: labels.length-7, 
      max: labels.length, // 처음에 최근 7개의 데이터만 표시
    },
    y: {
      grid: {
        display: true, //가로선
      },
      min: -y_range,
      max: y_range ,
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
  }
};

function RoiChart() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full text-[23px] p-[20px]">수익률</div>
      <div className="w-full flex-grow flex justify-center items-center">
        <Line options={options} data={data} className="h-full"/>
      </div>
    </div>
  );
}

export default RoiChart;
