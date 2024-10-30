// import zoomPlugin from 'chartjs-plugin-zoom';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { useRef } from 'react';
// import { ChartOptions } from 'chart.js';
// import ApexChart from './CandleChart';

// import { useState } from 'react';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, zoomPlugin);

// const Chart: React.FC = () => {
//   const [filter, setFilter] = useState('day');
//   // day, week, month, year
//   const stockChartRef = useRef<ChartJS<'bar', number[][], unknown> | null>(null);
//   const volumeChartRef = useRef<ChartJS<'bar', number[], unknown> | null>(null);

//   const stockprice = [
//     [13, 15],
//     [15, 12],
//     [12, 10],
//     [10, 9],
//     [9, 13],
//     [13, 17],
//     [17, 15],
//     [15, 16],
//     [16, 14],
//     [14, 18],
//   ];
//   const trading_volume = [3, 4, 5, 3, 4, 2, 6, 8, 9, 10];
//   const labels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월'];

//   const StockData = {
//     labels: labels,
//     datasets: [
//       {
//         label: '주가',
//         data: stockprice,
//         backgroundColor: stockprice.map(([start, end]) => (start > end ? '#454DE3' : '#E34545')),
//       },
//     ],
//   };

//   const VolumeData = {
//     labels: labels,
//     datasets: [
//       {
//         label: '거래량',
//         data: trading_volume,
//         backgroundColor: stockprice.map(([start, end]) => (start > end ? '#454DE3' : '#E34545')),
//       },
//     ],
//   };

//   const StockOptions: ChartOptions<'bar'> = {
//     responsive: true,
//     maintainAspectRatio: false,
//     interaction: {
//       mode: 'index' as const,
//       intersect: false,
//     },
//     animation: { duration: 0 },
//     layout: {
//       padding: {
//         left: 20,
//         right: 20,
//         top: 20,
//       },
//     },
//     scales: {
//       x: {
//         grid: { display: true, drawTicks: true },
//         display: true, // x축 표시
//         ticks: {
//           color: 'white', // x축 레이블 색상 설정
//         },
//       },
//       y: {
//         grid: { display: true },
//         afterDataLimits: (scale) => {
//           // y의 최대값 여유롭게 설정
//           scale.max = scale.max * 1.2;
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: false,
//       },
//       zoom: {
//         pan: {
//           enabled: true,
//           mode: 'x',
//           onPan: ({ chart }) => handleSync(chart),
//         },
//         zoom: {
//           wheel: {
//             enabled: true,
//           },
//           mode: 'x',
//           onZoom: ({ chart }) => handleSync(chart),
//         },
//       },
//     },
//   };

//   const VolumeOptions: ChartOptions<'bar'> = {
//     responsive: true,
//     maintainAspectRatio: false,
//     interaction: {
//       mode: 'index' as const,
//       intersect: false,
//     },
//     animation: { duration: 0 },
//     layout: {
//       // 그래프 패딩
//       padding: {
//         left: 20,
//         right: 20,
//         bottom: 20,
//       },
//     },
//     scales: {
//       x: {
//         grid: { display: true },
//         display: true, // x축 표시
//       },
//       y: {
//         grid: { display: true },
//         afterDataLimits: (scale) => {
//           // y의 최대값 여유롭게 설정
//           scale.max = scale.max * 1.2;
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: false,
//       },
//       zoom: {
//         pan: {
//           enabled: true,
//           mode: 'x',
//           onPan: ({ chart }) => handleSync(chart),
//         },
//         zoom: {
//           wheel: {
//             enabled: true,
//           },
//           mode: 'x',
//           onZoom: ({ chart }) => handleSync(chart),
//         },
//       },
//     },
//   };

//   const handleSync = (chart: ChartJS) => {
//     const stockChart = stockChartRef.current;
//     const volumeChart = volumeChartRef.current;

//     if (stockChart && volumeChart) {
//       const xAxis = chart.scales.x;
//       stockChart.options.scales!.x!.min = xAxis.min;
//       stockChart.options.scales!.x!.max = xAxis.max;
//       volumeChart.options.scales!.x!.min = xAxis.min;
//       volumeChart.options.scales!.x!.max = xAxis.max;
//       stockChart.update();
//       volumeChart.update();
//     }
//   };

//   return (
//     <div className="w-full h-full flex flex-col justify-center items-center">
//       <div className="w-full flex justify-between items-center h-[7%]">
//         <p className="ml-[20px] text-[20px]">차트</p>
//         <div>
//           <button
//             className={`w-[35px] h-[35px] mx-[5px] my-[10px] rounded-[7px] transition-colors duration-300 ease-in-out ${filter === 'day' ? 'bg-gray' : 'bg-transparent'}`}
//             onClick={() => setFilter('day')}
//           >
//             일
//           </button>
//           <button
//             className={`w-[35px] h-[35px] mx-[5px] my-[10px] rounded-[7px] transition-colors duration-300 ease-in-out ${filter === 'week' ? 'bg-gray' : 'bg-transparent'}`}
//             onClick={() => setFilter('week')}
//           >
//             주
//           </button>
//           <button
//             className={`w-[35px] h-[35px] mx-[5px] my-[10px] rounded-[7px] transition-colors duration-300 ease-in-out ${filter === 'month' ? 'bg-gray' : 'bg-transparent'}`}
//             onClick={() => setFilter('month')}
//           >
//             월
//           </button>
//           <button
//             className={`w-[35px] h-[35px] mx-[5px] my-[10px] rounded-[7px] transition-colors duration-300 ease-in-out ${filter === 'year' ? 'bg-gray' : 'bg-transparent'}`}
//             onClick={() => setFilter('year')}
//           >
//             년
//           </button>
//         </div>
//         <div></div>
//       </div>
//       <div className="flex-growflex flex-col justify-center items-center w-full h-[93%]">
//         <ApexChart />
//         {/* <div className="w-full h-[60%]">
//           <Bar ref={stockChartRef} options={StockOptions} data={StockData} className="h-full" />
//         </div>
//         <div className="w-full h-[40%]">
//           <Bar ref={volumeChartRef} options={VolumeOptions} data={VolumeData} className="h-full" />
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default Chart;
