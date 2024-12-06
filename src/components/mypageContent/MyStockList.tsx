import { useState, useEffect } from 'react';

interface stockListItem {
  symbol: string;
  name: string;
  volume: number;
  purchase_price: number;
  current_price: number;
  price_difference: number;
  roi: number;
  total_stock_prices: number;
}

function MyStockList() {
  const [stocklist, setStockList] = useState<stockListItem[]>([]);

  useEffect(() => {
    fetch('http://localhost:30082/api/v1/invests/roi/latest', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          console.log('네트워크 응답이 올바르지 않습니다.');
        }
        return res.json();
      })
      .then((fetchedData) => {
        setStockList(fetchedData.data);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류가 발생하였습니다:', error);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center overflow-scroll m-[5px]">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#dddddd]">
            <th className="text-left w-[15%] py-[10px] text-chart-font px-2">종목</th>
            <th className="text-right w-[15%] py-[10px] text-chart-font">구매가</th>
            <th className="text-right w-[15%] py-[10px] text-chart-font">현재가</th>
            <th className="text-right w-[10%] py-[10px] text-chart-font">수량</th>
            <th className="text-right w-[20%] py-[10px] text-chart-font px-2">총합</th>
          </tr>
        </thead>
        <tbody>
          {stocklist.map((data, index) => (
            <tr key={index} className="rounded-[5px] hover:bg-Bg-gray cursor-pointer">
              <td className="text-left py-[10px] text-chart-font px-2 text-[17px]">{data.name}</td>
              <td className="text-right py-[10px] text-chart-font text-[17px]">
                {data.purchase_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
              </td>
              <td className={`text-right py-[10px] text-chart-font text-[17px]`}>
                {data.current_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </td>
              <td className="text-right py-[10px] text-chart-font text-[17px]">{data.volume}주</td>
              <td className="text-right py-[10px] text-chart-font text-[17px] px-2">
                <p>{(data.total_stock_prices).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</p>
                <p className={`text-[13px] ${data.roi > 0 ? 'text-up' : 'text-down'}`}>
                  {data.price_difference.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 ({data.roi})% 원
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyStockList;
