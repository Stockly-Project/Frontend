import Echart from './Echart';
import { EChartOption, ECElementEvent } from 'echarts';
import { useEffect, useState, useRef } from 'react';
import { NewStockData } from "../../types/NewStockData";

interface StockData {
  date: string;
  open: number;
  low: number;
  high: number;
  close: number;
  volume: number;
  rate: number;
  rate_price: number;
  symbol: string;
}

interface SplitData {
  categoryData: string[];
  values: [number, number, number, number][];
  volumes: [number, number, number][];
}

interface MonthChartProps {
  symbol: string;
  newStockData: NewStockData;
}


const MonthChart = ({symbol, newStockData} : MonthChartProps) => {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const zoomRange = useRef({ start: 50, end: 100 }); // 줌 상태 저장

  useEffect(() => {
    fetch(`http://localhost:30081/api/v1/stockDetails/historicalFilter?symbol=${symbol}&interval=1m`, {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          console.log('네트워크 응답이 올바르지 않습니다');
        }
        return res.json();
      })
      .then((data) => {
        const dummyData: StockData = {
          date:  "",
          open: data[data.length-1].open,
          low: data[data.length-1].low,
          high: data[data.length-1].high,
          close: data[data.length-1].close,
          volume: data[data.length-1].volume,
          rate: 0,
          rate_price: 0,
          symbol: '',
        };
        setStockData([...data, dummyData]);
        setIsDataLoaded(true);
      });
  }, [symbol]);

  // 실시간 데이터 받아오기
  useEffect(() => {
    if (!isDataLoaded) return;
      setStockData((prevStockData) => {
        const updatedStockData = [...prevStockData];

        if (updatedStockData.length > 0) {
          updatedStockData[updatedStockData.length - 1] = {
            ...updatedStockData[updatedStockData.length - 1],
            ...newStockData,
          };
        }

        return updatedStockData; // 수정된 배열 반환
      });
  }, [isDataLoaded, symbol, newStockData]);

  // 줌 상태 관리
  const onDataZoom = (event: ECElementEvent) => {
    if (event.batch) {
      const start = event.batch[0].start;
      const end = event.batch[0].end;
      zoomRange.current = { start, end };
    }
  };
  const onEvents = {
    dataZoom: onDataZoom,
  };

  const upColor = '#fe4a4a';
  const downColor = '#5235f2';

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
    for (let i = 0; i < data.values.length - 1; i++) {
      if (i < dayCount) {
        result.push('-');
        continue;
      }

      let sum = 0;
      for (let j = 0; j < dayCount; j++) {
        sum += data.values[i - j][1]; // 'close' 값 (index 1)을 사용하여 이동 평균 계산
      }
      result.push((sum / dayCount ).toFixed(3));
    }
    return result;
  }

  if (!stockData) {
    return <div>Loading...</div>;
  }

  const data = splitData(stockData);
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
    visualMap: [
      {
        show: false,
        seriesIndex: 5,
        dimension: 2,
        pieces: [
          { value: 1, color: downColor },
          { value: -1, color: upColor },
        ],
      },
    ],
    grid: [
      { left: '0%', right: '0%', height: '60%' },
      { left: '0%', right: '0%', top: '63%', height: '26%' },
    ],
    xAxis: [
      {
        type: 'category',
        data: data.categoryData,
        boundaryGap: true,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: 'dataMin',
        max: 'dataMax',
        axisLabel: {
          formatter: function (value: string) {
            if(value==="") return ""
            const date = new Date(value); // 날짜 문자열을 Date 객체로 변환
            return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`; // 'YYYY-MM-DD' 형식으로 변환
          },
        },
      },
      {
        type: 'category',
        gridIndex: 1,
        data: data.categoryData,
        boundaryGap: true,
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
    dataZoom: [{ type: 'inside', xAxisIndex: [0, 1], start: zoomRange.current.start, end: zoomRange.current.end }],
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

  return <Echart chartOption={ChartOption} onEvents={onEvents} />;
};
export default MonthChart;
