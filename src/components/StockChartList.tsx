import { useState } from 'react';
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import {useNavigate} from 'react-router-dom';

function StockChart() {
  const datas = [
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: 5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: -5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: -5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: 5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: -5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: -5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: 5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: -5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: -5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: 5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: -5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: -5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: 5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: -5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: -5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },{
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: -5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: -5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: 5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: -5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: -5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: 5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: -5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: -5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: 5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: -5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: -5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: 5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: -5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    },
    {
      company_name: '삼성전자',
      price: 60000,
      fluctuation_price: -5300,
      fluctuation_rate: 2.3,
      amount: 10000,
      volume: 1234,
    }
  ];

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지에 표시할 데이터 수

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = datas.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(datas.length / itemsPerPage); // 총 페이지 수 계산

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
  }

  // 페이지 버튼 생성
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxButtons = 10; // 최대 버튼 개수
    const startPage = Math.floor((currentPage - 1) / maxButtons) * maxButtons + 1; // 현재 페이지에 따라 시작 페이지 결정
    const endPage = Math.min(startPage + maxButtons - 1, totalPages); // 끝 페이지 결정

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`px-3 py-1 mx-1 rounded-md w-[35px] h-[35px] flex items-center justify-center ${currentPage === i ? 'text-black bg-Bg-gray' : 'text-chart-font'}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
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
        {currentData.map((data, index) => (
          <tr key={startIndex + index} className="rounded-[5px] hover:bg-Bg-gray cursor-pointer" onClick={gotoStockDetails}>
            <td className="text-left flex py-[10px] text-chart-font px-1 text-[18px]">
              <p className="text-MainBlue mr-10 font-bold text-[19px]">{startIndex + index + 1}</p> {data.company_name}
            </td>
            <td className="text-right py-[10px] text-chart-font text-[18px]">
              {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
            </td>
            <td
              className={`text-right py-[10px] text-chart-font text-[18px] ${data.fluctuation_price > 0 ? 'text-up' : 'text-down'}`}
            >
              {data.fluctuation_price > 0 ? '+' : ''}
              {data.fluctuation_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 ({data.fluctuation_rate})%
            </td>
            <td className="text-right py-[10px] text-chart-font text-[18px]">{data.amount}</td>
            <td className="text-right py-[10px] text-chart-font px-1 text-[18px]">{data.volume}</td>
          </tr>
        ))}
      </table>
      <div className="flex justify-center items-center my-4">
        <button className="px-4 py-2 mx-2 bg-gray-200 rounded-md" onClick={handlePrevPage} disabled={currentPage === 1}>
          <GrFormPrevious/>
        </button>
        {renderPageNumbers()}
        <button
          className="px-4 py-2 mx-2 bg-gray-200 rounded-md"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <GrFormNext/>
        </button>
      </div>
    </div>
  );
}

export default StockChart;
