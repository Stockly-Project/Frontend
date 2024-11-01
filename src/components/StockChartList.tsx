import { useState, useEffect } from 'react';
import { GrFormNext } from 'react-icons/gr';
import { GrFormPrevious } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

interface StockData {
  id: number;
  name: string;
  symbol: string;
  close: number;
  rate_price: number;
  rate: number;
  volume: number;
  volume_price: number;
}

function StockChart() {
  // const datas = [
  //   {
  //     company_name: '삼성전자',
  //     price: 60000,
  //     fluctuation_price: 5300,
  //     fluctuation_rate: 2.3,
  //     amount: 10000,
  //     volume: 1234,
  //   },
  // ];

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
   const totalPages = 10;

  const [datas, setDatas] = useState<StockData[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(`http://localhost.stock-server/api/v1/stockDetails/stream/multiple?page=${currentPage}`);
    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setDatas(newData);
    };
    eventSource.onerror = () => {
      console.error('SSE connection error');
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const gotoStockDetails = () => {
    navigate('/details');
  };

  // 페이지 버튼 생성
  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= 10; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`px-3 py-1 mx-1 rounded-md w-[35px] h-[35px] flex items-center justify-center ${currentPage === i ? 'text-black bg-Bg-gray' : 'text-chart-font'}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>,
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      <table className="w-full">
        <tr className="border-b border-[#e5e5e5]">
          <th className="text-left w-[20%] py-[10px] text-chart-font px-1">종목</th>
          <th className="text-right w-[15%] py-[10px] text-chart-font">현재가</th>
          <th className="text-right w-[25%] py-[10px] text-chart-font">등락률</th>
          <th className="text-right w-[20%] py-[10px] text-chart-font">거래대금</th>
          <th className="text-right w-[20%] py-[10px] text-chart-font px-1">거래량</th>
        </tr>
        {datas.map((data, index) => (
          <tr
            // key={startIndex + index}
            key={index}
            className="rounded-[5px] hover:bg-Bg-gray cursor-pointer"
            onClick={gotoStockDetails}
          >
            <td className="text-left flex py-[10px] text-chart-font px-1 text-[18px]">
              <p className="text-MainBlue mr-10 font-bold text-[19px]">{index + 1}</p> {data.name}
            </td>
            <td className="text-right py-[10px] text-chart-font text-[18px]">
              {data.close.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
            </td>
            <td
              className={`text-right py-[10px] text-chart-font text-[18px] ${data.rate_price > 0 ? 'text-up' : 'text-down'}`}
            >
              {data.rate_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 ({data.rate})%
            </td>
            <td className="text-right py-[10px] text-chart-font text-[18px]">{data.volume}</td>
            <td className="text-right py-[10px] text-chart-font px-1 text-[18px]">{data.volume}</td>
          </tr>
        ))}
      </table>
      <div className="flex justify-center items-center my-4">
        <button className="px-4 py-2 mx-2 bg-gray-200 rounded-md" onClick={handlePrevPage} disabled={currentPage === 1}>
          <GrFormPrevious />
        </button>
        {renderPageNumbers()}
        <button
          className="px-4 py-2 mx-2 bg-gray-200 rounded-md"
          onClick={handleNextPage}
          disabled={currentPage === 10}
        >
          <GrFormNext />
        </button>
      </div>
    </div>
  );
}

export default StockChart;
