import { Line } from 'react-chartjs-2';
import AssetsIcon from '../../assets/icons/assets_icon.svg';
import MoneyIcon from '../../assets/icons/money_icon.svg';
import RoiIcon from '../../assets/icons/roi_icon.svg';
import StockIcon from '../../assets/icons/stock_icon.svg';
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
      data: [12, 9, 15, 10, 12, 10, 11, 9, 11, 10, 15, 12],
      backgroundColor: ['rgba(75, 192, 192, 0.2)'],
      borderColor: ['rgba(75, 192, 192, 1)'],
      borderWidth: 1,
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
      min: 5,
      max: 20
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

function ExampleMyInvest() {
  return (
    <div className="m-[30px] p-[20px] shadow-xl rounded-[20px] border border-[#e9e9e9]">
      <Line options={LineOptions} data={LineData} />
      {/* 사각형 네 개 */}
      <div className="w-full flex flex-col justify-center items-center ">
        <div className="flex w-full">
          <div className="w-[50%] h-[90px] m-[10px] rounded-[10px] bg-Bg-gray">
            <div className="flex items-center mx-[8px] my-[10px]">
              <img src={AssetsIcon} className="mx-[10px] w-[18px] h-[18px]" />
              <span className="font-medium text-[#A2A5AC] text-[16px]">총자산</span>
            </div>
            <div className="mx-[20px] text-[17px] text-[#373737]">10,870,000 원</div>
          </div>
          <div className="w-[50%] h-[90px] m-[10px] rounded-[10px] bg-Bg-gray">
            <div className="flex items-center mx-[8px] my-[10px]">
              <img src={MoneyIcon} className="mx-[10px] w-[18px] h-[18px]" />
              <span className="font-medium text-[#A2A5AC] text-[16px]">예수금</span>
            </div>
            <div className="mx-[20px] text-[17px] text-[#373737]">5,000,000 원</div>
          </div>
        </div>
        <div className="flex w-full">
          <div className="w-[50%] h-[90px] m-[10px] rounded-[10px] bg-Bg-gray">
            <div className="flex items-center mx-[8px] my-[10px]">
              <img src={StockIcon} className="mx-[10px] w-[21px] h-[21px]" />
              <span className="font-medium text-[#A2A5AC] text-[16px]">주식</span>
            </div>
            <div className="mx-[20px] text-[17px] text-[#373737]">5,870,000 원</div>
          </div>
          <div className="w-[50%] h-[90px] m-[10px] rounded-[10px] bg-Bg-gray">
            <div className="flex items-start mx-[8px] my-[10px]">
              <img src={RoiIcon} className="mx-[10px] w-[20px] h-[20px]" />
              <span className="font-medium text-[#A2A5AC] text-[16px]">수익률</span>
            </div>
            <div className={`mx-[20px] text-[17px] text-[#ee5858]`}>+ 870,000 원(4.5%)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExampleMyInvest;
