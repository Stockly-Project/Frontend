import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { EChartOption } from 'echarts';
import useDrawerStore from '../../zustand/MenuBarStore';


interface EchartProps{
  chartOption: EChartOption;
}

const Echart = ({ chartOption }: EchartProps) => {
  const { openDrawer } = useDrawerStore();
  // chartCss와 chartOption을 props으로 받기
  // 차트가 그려질 DOM 요소에 대한 참조자 chartRef를 생성하기
  const chartRef = useRef(null)

  // useEffect 훅
  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);
    chartInstance.setOption(chartOption as echarts.EChartOption);
  
    // ResizeObserver를 사용해 chartRef 크기 변화를 감지
    const resizeObserver = new ResizeObserver(() => {
      chartInstance.resize();
    });
  
    if (chartRef.current) {
      resizeObserver.observe(chartRef.current);
    }
  
    return () => {
      chartInstance.dispose();
      resizeObserver.disconnect();
    };
  }, [chartOption, openDrawer]);
  // JSX 태그로 정의한 React 엘리먼트는 실제 DOM 엘리먼트로 변환됨
  return <div style={{width:"100%", height:"100%"}} ref={chartRef} />
}

export default Echart