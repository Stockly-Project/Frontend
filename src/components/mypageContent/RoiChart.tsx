import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { useState, useEffect } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, zoomPlugin);

interface RoiData {
  roi: number;
  date: string;
}

interface RoiChartProps {
  roistream: number;
}

function RoiChart({roistream}:RoiChartProps) {
  const [roi, setRoi] = useState<number[]>([]);
  const [label, setLabel] = useState<string[]>([]);

  const maxAbsoluteValue = roi.reduce((max, num) => {
    return Math.abs(num) > Math.abs(max) ? num : max;
  }, roi[0]);

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
        min: label.length - 7,
        max: label.length, // 처음에 최근 7개의 데이터만 표시
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
        const roiData = data.total_roi.map((item: RoiData) => item.roi); // roi 값 배열 생성
        const dateData = data.total_roi.map((item: RoiData) => item.date.split('T')[0]); // date 값 배열 생성
        setRoi(roiData); // roi 상태 업데이트
        setLabel(dateData); // label 상태 업데이트
        console.log();
        console.log(roi);
      });
  }, []);
  return (
    <div className="w-full flex-grow flex justify-center items-center">
      <Line options={options} data={data} className="h-full" />
    </div>
  );
}

export default RoiChart;
