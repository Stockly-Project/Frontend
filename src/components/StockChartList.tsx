import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import useChartListStore from '../zustand/ChartListStore';


function StockChartList() {
  const navigate = useNavigate();
  const gotoDetails = (symbol: string, name: string, initPrice: number, initRate: number, initRatePrice: number) => {
    navigate(`/details/${symbol}`, {
      state: { name: name, initPrice: initPrice, initRate: initRate, initRatePrice: initRatePrice },
    });
  };

  const { stockData } = useChartListStore();

  if (stockData.length === 0) {
    return (
      <>
        <div className="w-full h-[70vh] flex flex-col justify-center items-center">
          <CircularProgress size={50} sx={{ color: '#3182F6' }} />
          <p className="m-[10px]">Loading...</p>
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="m-[10px] text-[25px]">실시간 차트</div>
      <div className="p-[10px]">
        <div>
          <table className="w-full">
            <thead>
              <tr className="border-y border-[#dddddd]">
                <th className="text-left w-[20%] py-[10px] text-chart-font px-1">종목</th>
                <th className="text-right w-[15%] py-[10px] text-chart-font">현재가</th>
                <th className="text-right w-[25%] py-[10px] text-chart-font">등락률</th>
                <th className="text-right w-[20%] py-[10px] text-chart-font">거래대금</th>
                <th className="text-right w-[20%] py-[10px] text-chart-font px-1">거래량</th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((data, index) => (
                <tr
                  key={index}
                  className="rounded-[5px] hover:bg-Bg-gray cursor-pointer"
                  onClick={() => {
                    gotoDetails(data.symbol, data.name, data.close, data.rate, data.rate_price);
                  }}
                >
                  <td className="text-left flex py-[10px] text-chart-font px-1 text-[18px]">
                    <p className="text-MainBlue w-[45px] font-bold text-[19px]">{index + 1}</p> {data.name}
                  </td>
                  <td className="text-right py-[10px] text-chart-font text-[18px]">
                    {data.close.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                  </td>
                  <td
                    className={`text-right py-[10px] text-chart-font text-[18px] ${data.rate_price > 0 ? 'text-up' : 'text-down'}`}
                  >
                    {data.rate_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 ({data.rate})%
                  </td>
                  <td className="text-right py-[10px] text-chart-font text-[18px]">
                    {data.trading_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                  </td>
                  <td className="text-right py-[10px] text-chart-font px-1 text-[18px]">{data.volume}주</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="h-[50px]"></div>
        </div>
      </div>
    </div>
  );
}

export default StockChartList;
