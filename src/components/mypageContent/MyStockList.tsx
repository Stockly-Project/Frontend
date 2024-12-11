function MyStockList() {
  const stocks = [
    { company_name: '삼성전자', volume: 2, price: 60000, rate: 2.5, rate_price: 3500 },
    { company_name: '삼성전자', volume: 2, price: 60000, rate: -2.5, rate_price: -3500 },
    { company_name: '삼성전자111', volume: 2, price: 60000, rate: 2.5, rate_price: 3500 },
  ];
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
          {stocks.map((data, index) => (
            <tr key={index} className="rounded-[5px] hover:bg-Bg-gray cursor-pointer">
              <td className="text-left py-[10px] text-chart-font px-2 text-[17px]">{data.company_name}</td>
              <td className="text-right py-[10px] text-chart-font text-[17px]">
                {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
              </td>
              <td
                className={`text-right py-[10px] text-chart-font text-[17px]`}
              >
                {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </td>
              <td className="text-right py-[10px] text-chart-font text-[17px]">{data.volume}주</td>
              <td className="text-right py-[10px] text-chart-font text-[17px] px-2">
                <p>{(data.price * data.volume).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</p>
                <p className={`text-[13px] ${data.rate>0 ? "text-up" : "text-down"}`}>
                  {data.rate_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 ({data.rate})% 원
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
