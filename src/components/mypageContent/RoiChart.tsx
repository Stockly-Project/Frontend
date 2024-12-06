import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { useState, useEffect } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, zoomPlugin);

function RoiChart() {
  const [roi, setRoi] = useState<number[]>([]);
  const [label, setLabel] = useState<string[]>([]);

  const labels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const datas = [10, 10, 15, 20, 25, 20, 10, -2, -8, 0, 10, 12];

  const maxAbsoluteValue = datas.reduce((max, num) => {
    return Math.abs(num) > Math.abs(max) ? num : max;
  }, datas[0]);

  const y_range = (Math.floor(maxAbsoluteValue / 10) + 1) * 10;

  const data = {
    labels: label,
    datasets: [
      {
        label: '수익률(%)',
        data: roi,
        backgroundColor: ['rgba(75, 97, 192, 0.2)'],
        borderColor: ['#3182F6'],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: true, // 세로선
        },
        min: labels.length - 7,
        max: labels.length, // 처음에 최근 7개의 데이터만 표시
      },
      y: {
        grid: {
          display: true, //가로선
        },
        position: 'right',
        min: -y_range,
        max: y_range,
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

  useEffect(() => {
    fetch(`http://localhost:30082/api/v1/invests/roi/daily`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          console.log('네트워크 응답이 올바르지 않습니다');
        }
        return res.json();
      })
      .then((data) => {
        const roiData = data.total_roi.map((item: { value: number; date: string }) => item.value);
        const dateData = data.total_roi.map((item: { value: number; date: string }) =>
          new Date(item.date).toLocaleDateString('ko-KR') // 날짜를 한국 형식으로 변환
        );

        setRoi(roiData); // roi 상태 업데이트
        setLabel(dateData); // label 상태 업데이트
      });
  }, []);
  return (
    <div className="w-full flex-grow flex justify-center items-center">
      <Line options={options} data={data} className="h-full" />
    </div>
  );
}

export default RoiChart;
