import { useState, useEffect } from 'react';

const order = [
  {
    name: '삼성전자',
    type: '매도',
    date: '2022-11-10',
    price: 58000,
    volume: 100,
    status: '체결',
  },
  {
    name: 'LG',
    type: '매수',
    date: '2023-01-01',
    price: 58000,
    volume: 100,
    status: '미체결',
  },
  {
    name: '기아',
    type: '매도',
    date: '2024-12-10',
    price: 58000,
    volume: 100,
    status: '미체결',
  }
];

function MyOrderList() {
  const [latest, setLatest] = useState(false); // 최신순
  const [buy, setBuy] = useState(false); // 매수
  const [sell, setSell] = useState(false); // 매도
  const [success, setSuccess] = useState(false); // 체결
  const [fail, setFail] = useState(false); // 미체결
  const [filteredOrderList, setFilteredOrderList] = useState(order);

  useEffect(() => {
    const filterOrders = () => {
      // 매수/매도 필터링
      const buySellFiltered = order.filter((item) => {
        if ((buy && sell) || (!buy && !sell)) return true; // 둘 다 눌린 경우 모두 표시
        if (buy) return item.type === '매수';
        if (sell) return item.type === '매도';
        return true;
      });

      // 체결/미체결 필터링
      const statusFiltered = buySellFiltered.filter((item) => {
        if ((success && fail) || (!success && !fail)) return true; // 둘 다 눌린 경우 모두 표시
        if (success) return item.status === '체결';
        if (fail) return item.status === '미체결';
        return true;
      });

      // 최신순 정렬
      const sorted = latest
        ? [...statusFiltered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        : statusFiltered;

      setFilteredOrderList(sorted);
    };

    filterOrders();
  }, [latest, buy, sell, success, fail]);

  // 각 필터 버튼 클릭 시 필터링
  const toggleFilter = (filterType: 'buy' | 'sell' | 'success' | 'fail' | 'latest') => {
    switch (filterType) {
      case 'buy':
        setBuy(!buy);
        break;
      case 'sell':
        setSell(!sell);
        break;
      case 'success':
        setSuccess(!success);
        break;
      case 'fail':
        setFail(!fail);
        break;
      case 'latest':
        setLatest(!latest);
        break;
    }
  };

  return (
    <div className="w-full flex flex-col justify-start items-center">
      {/* 필터링 칩 버튼 */}
      <div className="w-full">
        <div className="flex">
          <div
            className={`shadow-md border px-[15px] py-[7px] rounded-[20px] m-[5px] cursor-pointer ${latest ? 'border-MainBlue bg-[#f0f8ff]' : 'border-gray'}`}
            onClick={() => {
              toggleFilter('latest');
            }}
          >
            최신순
          </div>
          <div
            className={`shadow-md border px-[15px] py-[7px] rounded-[20px] m-[5px] cursor-pointer ${buy ? 'border-MainBlue bg-[#f0f8ff]' : 'border-gray'}`}
            onClick={() => {
              toggleFilter('buy');
            }}
          >
            매수
          </div>
          <div
            className={`shadow-md border px-[15px] py-[7px] rounded-[20px] m-[5px] cursor-pointer ${sell ? 'border-MainBlue bg-[#f0f8ff]' : 'border-gray'}`}
            onClick={() => {
              toggleFilter('sell');
            }}
          >
            매도
          </div>
          <div
            className={`shadow-md border px-[15px] py-[7px] rounded-[20px] m-[5px] cursor-pointer ${success ? 'border-MainBlue bg-[#f0f8ff]' : 'border-gray'}`}
            onClick={() => {
              toggleFilter('success');
            }}
          >
            체결
          </div>
          <div
            className={`shadow-md border px-[15px] py-[7px] rounded-[20px] m-[5px] cursor-pointer ${fail ? 'border-MainBlue bg-[#f0f8ff]' : 'border-gray'}`}
            onClick={() => {
              toggleFilter('fail');
            }}
          >
            미체결
          </div>
        </div>
      </div>
      <div className="h-[20px]"/>
      <table className="w-[98%]">
        <tr className="">
          <th className="text-left w-[17%] py-[10px] text-chart-font px-1">날짜</th>
          <th className="text-right w-[14%] py-[10px] text-chart-font">종목</th>
          <th className="text-right w-[18%] py-[10px] text-chart-font">거래유형</th>
          <th className="text-right w-[13%] py-[10px] text-chart-font">수량</th>
          <th className="text-right w-[23%] py-[10px] text-chart-font px-1">가격</th>
          <th className="text-right w-[15%] py-[10px] text-chart-font px-1">체결여부</th>
        </tr>
        {filteredOrderList.map((order) => (
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
            <td className="text-right py-[10px] text-chart-font text-[18px]">{order.status}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default MyOrderList;
