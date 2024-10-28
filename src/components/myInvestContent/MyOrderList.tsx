function MyOrderList() {
  const orderList = [
    { date: '2022.05.19', company_name: '삼성전자', type: 'ask', volume: 100, price: 60000, success:false},
    { date: '2022.05.19', company_name: '삼성전자', type: 'ask', volume: 100, price: 60000, success:true},
    { date: '2022.05.19', company_name: '삼성전자', type: 'ask', volume: 100, price: 60000, success:true },
    { date: '2022.05.19', company_name: '삼성전자', type: 'bid', volume: 100, price: 60000, success:false },
    { date: '2022.05.19', company_name: '삼성전자', type: 'ask', volume: 100, price: 60000, success:true },
    { date: '2022.05.19', company_name: '삼성전자', type: 'ask', volume: 100, price: 60000, success:false },
    { date: '2022.05.19', company_name: '삼성전자', type: 'bid', volume: 100, price: 60000, success:true },
  ];
  //bid: 매수
  //ask: 매도
  return (
    <div className="w-full flex flex-col justify-start items-center">
      <div className="w-full h-[70px] text-[25px] p-[30px] sticky top-0 bg-white">전체 주문 내역</div>
      <div className="w-[90%] flex flex-col justify-center items-center overflow-scroll m-[20px]">
        <table className="w-full">
          <tr className="border-b border-[#e5e5e5]">
            <th className="text-left w-[17%] py-[10px] text-chart-font px-1">날짜</th>
            <th className="text-right w-[14%] py-[10px] text-chart-font">종목</th>
            <th className="text-right w-[18%] py-[10px] text-chart-font">거래유형</th>
            <th className="text-right w-[13%] py-[10px] text-chart-font">수량</th>
            <th className="text-right w-[23%] py-[10px] text-chart-font px-1">가격</th>
            <th className="text-right w-[15%] py-[10px] text-chart-font px-1">체결여부</th>
          </tr>
          {orderList.map((order) => (
            <tr
              className="rounded-[5px] hover:bg-Bg-gray"
            >
              <td className="text-left flex py-[10px] text-chart-font px-1 text-[18px]">
                {order.date}
              </td>
              <td className="text-right py-[10px] text-chart-font text-[18px]">
                {order.company_name}
              </td>
              <td
                className={`text-right py-[10px] text-chart-font text-[18px] ${order.type === "bid" ? 'text-up' : 'text-down'}`}
              >
                {order.type === "bid" ? "매수" : "매도"}
              </td>
              <td className="text-right py-[10px] text-chart-font text-[18px]">{order.volume}</td>
              <td className="text-right py-[10px] text-chart-font px-1 text-[18px]">{order.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
              <td className="text-right py-[10px] text-chart-font text-[18px]">{order.success ? "체결" : "미체결"}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default MyOrderList;
