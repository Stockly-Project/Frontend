import React, { useState } from 'react';
import ApexCharts from 'react-apexcharts';

const data = [
  {
    date: '2021-02-02 13:30:00',
    open: 134.8993,
    low: 134.63,
    high: 134.96,
    close: 134.95,
    volume: 10,
  },
  {
    date: '2021-02-02 13:31:00',
    open: 134.9,
    low: 134.8593,
    high: 135.0799,
    close: 134.8993,
    volume: 15,
  },
  {
    date: '2021-02-02 13:32:00',
    open: 134.8993,
    low: 134.94,
    high: 135.2593,
    close: 135.0108,
    volume: 20,
  },
  {
    date: '2021-02-02 13:33:00',
    open: 135.275,
    low: 135.14,
    high: 135.4692,
    close: 135.2338,
    volume: 9,
  },
  {
    date: '2021-02-02 13:34:00',
    open: 135.2338,
    low: 135.63,
    high: 135.96,
    close: 135.76,
    volume: 15,
  },
  {
    date: '2021-02-02 13:35:00',
    open: 135.76,
    low: 135.2338,
    high: 135.96,
    close: 135.2338,
    volume: 15,
  },
  {
    date: '2021-02-02 13:36:00',
    open: 135.2338,
    low: 134.94,
    high: 135.2593,
    close: 135.0108,
    volume: 5,
  },
  {
    date: '2021-02-02 13:37:00',
    open: 135.2338,
    low: 134.94,
    high: 135.2593,
    close: 135.25,
    volume: 5,
  },
  {
    date: '2021-02-02 13:38:00',
    open: 135.25,
    low: 135.14,
    high: 135.4692,
    close: 135.4,
    volume: 7,
  },
  {
    date: '2021-02-02 13:39:00',
    open: 135.2338,
    low: 134.8593,
    high: 135.2338,
    close: 134.8993,
    volume: 18,
  },
  {
    date: '2021-02-02 13:40:00',
    open: 135.76,
    low: 135.2338,
    high: 135.96,
    close: 135.2338,
    volume: 15,
  },
  {
    date: '2021-02-02 13:41:00',
    open: 135.2338,
    low: 134.94,
    high: 135.2593,
    close: 135.0108,
    volume: 5,
  },
  {
    date: '2021-02-02 13:42:00',
    open: 135.2338,
    low: 134.94,
    high: 135.2593,
    close: 135.25,
    volume: 5,
  },
  {
    date: '2021-02-02 13:43:00',
    open: 135.25,
    low: 135.14,
    high: 135.4692,
    close: 135.4,
    volume: 7,
  },
  {
    date: '2021-02-02 13:44:00',
    open: 135.2338,
    low: 134.8593,
    high: 135.2338,
    close: 134.8993,
    volume: 18,
  },
];

const ApexChart: React.FC = () => {
  const [xaxisRange, setXaxisRange] = useState({
    min: new Date(data[0].date).getTime(),
    max: new Date(data[data.length - 1].date).getTime(),
  });

  const candlestickData = data.map((price) => ({
    x: price.date,
    y: [price.open, price.high, price.low, price.close],
  }));

  const volumeData = data.map((price) => ({
    x: price.date,
    y: price.volume,
    color: price.close > price.open ? 'rgba(255, 26, 26, 1)' : 'rgba(48, 18, 247, 1)',
  }));

  // 이동평균선 데이터를 계산 (여기서는 간단하게 close 값의 평균을 이동평균선으로 사용)
  const movingAverageData = data.map((price, index, arr) => {
    const sum = arr.slice(Math.max(0, index - 2), index + 1).reduce((acc, curr) => acc + curr.close, 0);
    const avg = sum / Math.min(index + 1, 3); // 간단한 3일 이동평균
    return { x: price.date, y: avg.toFixed(2) };
  });

  interface ChartContext {
    w: {
      globals: {
        minX: number;
        maxX: number;
      };
    };
  }

  const handleSync = (chartContext: ChartContext) => {
    const newMin = chartContext.w.globals.minX;
    const newMax = chartContext.w.globals.maxX;

    setXaxisRange({ min: newMin, max: newMax });
  };

  return (
    <div className="w-full h-[74vh] flex flex-col justify-center items-center">
      <div id="chart-candlestick" className="w-full h-[50vh]">
        <ApexCharts
          type="candlestick"
          series={[
            { name: '주가', data: candlestickData },
            { name: '이동평균선', type: 'line', data: movingAverageData },
          ]}
          height="100%"
          options={{
            chart: {
              toolbar: {
                tools: {},
              },
              background: 'transparent',
              animations: {
                enabled: false, // 애니메이션 비활성화
              },
              events: {
                zoomed: handleSync,
                scrolled: handleSync,
              },
            },
            grid: {
              show: true,
            },
            plotOptions: {
              candlestick: {
                wick: {
                  useFillColor: true,
                },
                colors: {
                  upward: '#ff1a1a',
                  downward: '#3012f7',
                },
              },
            },
            xaxis: {
              type: 'datetime',
              min: xaxisRange.min,
              max: xaxisRange.max,
              crosshairs: {
                show: true,
              },
              labels: {
                show: false,
              },
              axisBorder: {
                show: true,
              },
              axisTicks: {
                show: false,
              },
              tooltip: {
                enabled: false,
              },
            },
            yaxis: {
              show: true,
              opposite: true,
              forceNiceScale: true,
              tooltip: {
                enabled: true,
              },
              labels: {
                maxWidth: 50,
                minWidth: 50
              }
            },
            tooltip: {
              custom: function ({ seriesIndex, dataPointIndex, w }) {
                const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex]
                const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex]
                const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex]
                const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex]
                const ema = w.globals.series[seriesIndex][dataPointIndex]

                if (seriesIndex === 0) {
                  return (
                    '<div class="apexcharts-tooltip-candlestick" style="padding:10px;">' +
                    '<div>시가: <span class="value">' +
                    o +
                    ' 원</span></div>' +
                    '<div>고가: <span class="value">' +
                    h +
                    ' 원</span></div>' +
                    '<div>저가: <span class="value">' +
                    l +
                    ' 원</span></div>' +
                    '<div>종가: <span class="value">' +
                    c +
                    ' 원</span></div>' +
                    '</div>'
                  )
                }
                else {
                  return (
                    '<div class="apexcharts-tooltip-candlestick" style="padding:10px;">' +
                    '<div>이동평균: <span class="value">' +
                    ema +
                    ' 원</span></div>' +'</div>'
                  )
                }
              }
            },
            legend: {
              show: true,
              position: 'top',
            },
          }}
        />
      </div>
      <hr className="border-black w-full" />
      <div id="chart-bar" className="w-full h-[20vh] ">
        <ApexCharts
          type="bar"
          series={[{ name: 'Volume', data: volumeData }]}
          height="100%"
          options={{
            chart: {
              toolbar: {
                show: false,
              },
              animations: {
                enabled: false, // 애니메이션 비활성화
              },
              events: {
                zoomed: handleSync,
                scrolled: handleSync,
              },
            },
            plotOptions: {
              bar: {
                distributed: true, // 각 바의 색상 적용
              },
            },
            dataLabels: {
              enabled: false,
            },
            colors: volumeData.map((data) => data.color), // 색상 배열 적용
            legend: {
              show: false,
            },
            xaxis: {
              crosshairs: {
                show: true,
                opacity: 1,
                position: 'back',
                stroke: { width: 1, dashArray: 4 },
              },
              type: 'datetime',
              min: xaxisRange.min,
              max: xaxisRange.max,
              labels: {
                show: true,
              },
              axisBorder: {
                show: true,
              },
              axisTicks: {
                show: true,
              },
            },
            yaxis: {
              opposite: true,
              show: true,
              min: 0,
              tooltip: {
                enabled: true,
              },
              labels: {
                maxWidth: 50,
                minWidth: 50
              }
            },
            tooltip: {
              custom: function ({ series, seriesIndex, dataPointIndex }) {
                return `<div style="padding: 10px; background: white; border-radius: 5px;"> 거래량: ${series[seriesIndex][dataPointIndex]} 주 </div>`;
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ApexChart;
