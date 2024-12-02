import useChartListStore from '../../zustand/ChartListStore';
import { useNavigate } from 'react-router-dom';

function MenuBarChartContent() {
  const { stockData } = useChartListStore();
  const navigate = useNavigate();
  const gotoDetails = (symbol: string, name: string, initPrice: number, initRate: number, initRatePrice: number) => {
    navigate(`/details/${symbol}`, {
      state: { name: name, initPrice: initPrice, initRate: initRate, initRatePrice: initRatePrice },
    });
  };

  return (
    <div>
      <div className="flex fixed w-full h-[70px] bg-Bg-gray border-b border-gray items-center">
        <div className="p-[15px] text-[20px]">실시간</div>
      </div>
      <hr className="w-[100%] border-font-gray" />
      <div className="mt-[70px]">
        {stockData.map((data, index) => (
          <div
            className="flex justify-between items-center m-[5px] hover:bg-[#e4e8ea] rounded-[10px] transition-color duration-300 cursor-pointer"
            onClick={() => {
              gotoDetails(data.symbol, data.name, data.close, data.rate, data.rate_price);
            }}
          >
            <div className="m-[10px] text-[16px] flex text-chart-font">
              <p className="mr-[10px] text-MainBlue font-bold text-[16px]">{index + 1}</p>
              {data.name}
            </div>
            <div className="flex flex-col jsutify-center items-center m-[10px]">
              <div className="text-[16px]">{data.close}원</div>
              <div className={`text-[12px] font-thin ${data.rate_price > 0 ? 'text-up' : 'text-down'}`}>
                {data.rate_price > 0 ? '+' : ''}
                {data.rate_price}원 ({data.rate}%)
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuBarChartContent;
