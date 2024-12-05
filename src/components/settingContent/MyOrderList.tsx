import {useState} from 'react';

const order = [
  {
    name: '삼성전자',
    type: '매도',
    date: '2022-11-10',
    price: 58000,
    volume: 100,
    status: '미체결',
  },
  {
    name: '삼성전자',
    type: '매수',
    date: '2023-01-01',
    price: 58000,
    volume: 100,
    status: '미체결',
  },
  {
    name: '삼성전자',
    type: '매도',
    date: '2024-12-10',
    price: 58000,
    volume: 100,
    status: '미체결',
  },
];

function MyOrderList() {
  const [latest, setLatest] = useState(false); // 최신순
  const [buy, setBuy] = useState(false); // 매수
  const [sell, setSell] = useState(false); // 매도
  const [success, setSuccess] = useState(false); // 성공
  const [fail, setFail] = useState(false); // 실패


  return (
    <div className="w-full flex flex-col justify-start items-center">
      <div className="w-full">
        <div className="flex">
          <div className={`shadow-md border px-[15px] py-[7px] rounded-[20px] m-[5px] cursor-pointer ${latest ? "border-MainBlue bg-[#f0f8ff]" : "border-gray" }`} onClick={()=>setLatest(!latest)}>최신순</div>
          <div className={`shadow-md border px-[15px] py-[7px] rounded-[20px] m-[5px] cursor-pointer ${buy ? "border-MainBlue bg-[#f0f8ff]" : "border-gray" }`} onClick={()=>setBuy(!buy)}>매수</div>
          <div className={`shadow-md border px-[15px] py-[7px] rounded-[20px] m-[5px] cursor-pointer ${sell ? "border-MainBlue bg-[#f0f8ff]" : "border-gray" }`} onClick={()=>setSell(!sell)}>매도</div>
          <div className={`shadow-md border px-[15px] py-[7px] rounded-[20px] m-[5px] cursor-pointer ${success ? "border-MainBlue bg-[#f0f8ff]" : "border-gray" }`} onClick={()=>setSuccess(!success)}>체결</div>
          <div className={`shadow-md border px-[15px] py-[7px] rounded-[20px] m-[5px] cursor-pointer ${fail ? "border-MainBlue bg-[#f0f8ff]" : "border-gray" }`} onClick={()=>setFail(!fail)}>미체결</div>
        </div>
      </div>
      <table className="w-full">
        <tr className="border-b border-[#e5e5e5]">
          <th className="text-left w-[17%] py-[10px] text-chart-font px-1">날짜</th>
          <th className="text-right w-[14%] py-[10px] text-chart-font">종목</th>
          <th className="text-right w-[18%] py-[10px] text-chart-font">거래유형</th>
          <th className="text-right w-[13%] py-[10px] text-chart-font">수량</th>
          <th className="text-right w-[23%] py-[10px] text-chart-font px-1">가격</th>
          <th className="text-right w-[15%] py-[10px] text-chart-font px-1">체결여부</th>
        </tr>
        {order.map((order) => (
          <tr className="rounded-[5px] hover:bg-Bg-gray">
            <td className="text-left flex py-[10px] text-chart-font px-1 text-[18px]">{order.date}</td>
            <td className="text-right py-[10px] text-chart-font text-[18px]">{order.name}</td>
            <td
              className={`text-right py-[10px] text-chart-font text-[18px] ${order.type === '매수' ? 'text-up' : 'text-down'}`}
            >
              {order.type}
            </td>
            <td className="text-right py-[10px] text-chart-font text-[18px]">{order.volume}</td>
            <td className="text-right py-[10px] text-chart-font px-1 text-[18px]">
              {order.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
            </td>
            <td className="text-right py-[10px] text-chart-font text-[18px]">{order.status ? '체결' : '미체결'}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default MyOrderList;
