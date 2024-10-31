import Echart from './Echart';
import { EChartOption } from 'echarts';

interface StockData {
  date: string;
  open: number;
  low: number;
  high: number;
  close: number;
  volume: number;
}

interface SplitData {
  categoryData: string[];
  values: [number, number, number, number][];
  volumes: [number, number, number][];
}

const YearChart = () => {
  const upColor = '#da0000';
  const downColor = '#2300ec';

  function splitData(rawData: StockData[]): SplitData {
    const categoryData: string[] = [];
    const values: [number, number, number, number][] = [];
    const volumes: [number, number, number][] = [];

    for (let i = 0; i < rawData.length; i++) {
      const item = rawData[i];
      categoryData.push(item.date);
      values.push([item.open, item.close, item.low, item.high]);
      volumes.push([i, item.volume, item.open > item.close ? 1 : -1]);
    }
    return {
      categoryData,
      values,
      volumes,
    };
  }

  function calculateMA(dayCount: number, data: SplitData) {
    const result = [];
    for (let i = 0; i < data.values.length; i++) {
      if (i < dayCount) {
        result.push('-');
        continue;
      }

      let sum = 0;
      for (let j = 0; j < dayCount; j++) {
        sum += data.values[i - j][1]; // 'close' 값 (index 1)을 사용하여 이동 평균 계산
      }
      result.push((sum / dayCount).toFixed(3));
    }
    return result;
  }

  const dummyData = [
    {
      date: '2021-03-08 13:30:00',
      open: 1280,
      low: 1250,
      high: 1350,
      close: 1330,
      volume: 300,
    },
    {
      date: '2022-04-09 13:30:00',
      open: 1330,
      low: 1280,
      high: 1370,
      close: 1300,
      volume: 1020,
    },
    {
      date: '2023-05-10 13:30:00',
      open: 1300,
      low: 1270,
      high: 1400,
      close: 1370,
      volume: 600,
    },
    {
      date: '2024-06-11 13:30:00',
      open: 1370,
      low: 1340,
      high: 1420,
      close: 1385,
      volume: 700,
    },
    {
      date: '2025-07-12 13:30:00',
      open: 1385,
      low: 1330,
      high: 1400,
      close: 1355,
      volume: 870,
    },
    {
      date: '2026-08-13 13:30:00',
      open: 1355,
      low: 1300,
      high: 1380,
      close: 1320,
      volume: 930,
    },
    {
      date: '2027-09-14 13:30:00',
      open: 1320,
      low: 1250,
      high: 1350,
      close: 1275,
      volume: 1020,
    },
    {
      date: '2028-10-15 13:30:00',
      open: 1275,
      low: 1250,
      high: 1330,
      close: 1305,
      volume: 500,
    },
  ];
  const data = splitData(dummyData);
  const ChartOption: EChartOption = {
    animation: false,
    legend: {
      top: 10,
      left: 'left',
      data: ['주가', 'MA5', 'MA10', 'MA20', 'MA30'],
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      textStyle: { color: '#000' },
    },

    axisPointer: {
      link: [{ xAxisIndex: 'all' }],
      label: { backgroundColor: '#777' },
    },
    toolbox: {
      feature: {
        brush: { type: ['lineX', 'clear'] },
      },
    },
    brush: {
      xAxisIndex: 'all',
      brushLink: 'all',
      outOfBrush: { colorAlpha: 0.1 },
    },
    visualMap: [{
      show: false,
      seriesIndex: 5,
      dimension: 2,
      pieces: [
        { value: 1, color: downColor },
        { value: -1, color: upColor },
      ],
    }],
    grid: [
      { left: '0%', right: '8%', height: '60%' },
      { left: '0%', right: '8%', top: '63%', height: '26%' },
    ],
    xAxis: [
      {
        type: 'category',
        data: data.categoryData,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: 'dataMin',
        max: 'dataMax',
        axisLabel: {
          formatter: function (value: string) {
            const date = new Date(value); // 날짜 문자열을 Date 객체로 변환
            return `${date.getFullYear()}`; // 'YYYY-MM-DD' 형식으로 변환
          },
        },
      },
      {
        type: 'category',
        gridIndex: 1,
        data: data.categoryData,
        boundaryGap: false,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        min: 'dataMin',
        max: 'dataMax',
      },
    ],
    yAxis: [
      {
        scale: true,
        splitArea: { show: true },
        position: 'right',
        axisLabel: {
          showMinLabel: false,
          showMaxLabel: false,
          inside: true,
        },
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      },
    ],
    dataZoom: [
      { type: 'inside', xAxisIndex: [0, 1], start: 0, end: 100 },
    ],
    series: [
      {
        name: '주가',
        type: 'candlestick',
        data: data.values,
        itemStyle: {
          color: upColor,
          color0: downColor,
          borderColor: upColor,
          borderColor0: downColor,
        },
      },
      { name: 'MA5', type: 'line', data: calculateMA(5, data), smooth: true, lineStyle: { opacity: 0.5 } },
      { name: 'MA10', type: 'line', data: calculateMA(10, data), smooth: true, lineStyle: { opacity: 0.5 } },
      { name: 'MA20', type: 'line', data: calculateMA(20, data), smooth: true, lineStyle: { opacity: 0.5 } },
      { name: 'MA30', type: 'line', data: calculateMA(30, data), smooth: true, lineStyle: { opacity: 0.5 } },
      { name: '거래량', type: 'bar', xAxisIndex: 1, yAxisIndex: 1, data: data.volumes },
    ],
  };

  return <Echart chartOption={ChartOption} />;
};
export default YearChart;
