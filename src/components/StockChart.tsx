import StockChartList from './StockChartList';


function StockChart() {

  return (
    <div>
      <div className="m-[10px] text-[25px]">실시간 차트</div>
      <div className="p-[10px]">
        <StockChartList />
      </div>
    </div>
  );
}

export default StockChart;
