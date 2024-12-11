import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { useState, useEffect, useMemo } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, zoomPlugin);

interface RoiData {
  roi: number;
  date: string;
}

interface RoiChartProps {
  roistream: number;
}

function RoiChart({ roistream }: RoiChartProps) {
  const [roi, setRoi] = useState<number[]>([]);
  const [label, setLabel] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // const maxAbsoluteValue = useMemo(() => {
  //   return roi.reduce((max, num) => (Math.abs(num) > Math.abs(max) ? num : max), roi[0] || 0);
  // }, [roi]);

  //const y_range = useMemo(() => (Math.floor(maxAbsoluteValue / 10) + 1) * 10, [maxAbsoluteValue]);

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
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        grid: { display: true },
        min: label.length - 7,
        max: label.length,
      },
      y: {
        grid: { display: true },
        position: 'right',
        // min: -y_range,
        // max: y_range,
      },
    },
    plugins: {
      legend: { display: false },
      zoom: {
        pan: { enabled: true, mode: 'x' },
        zoom: { wheel: { enabled: true }, mode: 'x' },
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
          throw new Error('네트워크 응답이 올바르지 않습니다');
        }
        return res.json();
      })
      .then((data) => {
        if (!data.total_roi || !Array.isArray(data.total_roi)) {
          throw new Error('API 응답 데이터가 유효하지 않습니다');
        }

        const roiData = data.total_roi.map((item: RoiData) => item.roi);
        const dateData = data.total_roi.map((item: RoiData) => item.date.split('T')[0]);

        roiData.push(0); // 더미 데이터 추가
        const today = new Date().toISOString().split('T')[0];
        dateData.push(today);

        setRoi(roiData);
        setLabel(dateData);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error('데이터 로드 중 오류 발생:', error);
      });
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    if (roi.length > 0) {
      setRoi((prevArray) => {
        const newArray = [...prevArray];
        newArray[newArray.length - 1] = roistream;
        return newArray;
      });
    }
  }, [roistream, isLoaded]);

  return (
    <div className="w-full flex-grow flex justify-center items-center">
      <Line options={options} data={data} className="h-full" />
    </div>
  );
}

export default RoiChart;
