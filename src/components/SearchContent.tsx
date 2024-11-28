import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface StockData {
  close: number;
  id: number;
  name: string;
  rate: number;
  rate_price: number;
  symbol: string;
  volume: number;
  trading_value: number;
}

function SearchContent() {
  const stockDatas = [
    {
      close: 0,
      id: 1,
      name: '삼성전자',
      rate: 0,
      rate_price: 0,
      symbol: '005930',
      volume: 0,
      trading_value: 0,
    },
    {
      close: 0,
      id: 2,
      name: 'LG',
      rate: 0,
      rate_price: 0,
      symbol: '003550',
      volume: 0,
      trading_value: 0,
    },
    {
      close: 0,
      id: 3,
      name: 'SK하이닉스',
      rate: 0,
      rate_price: 0,
      symbol: '000660',
      volume: 0,
      trading_value: 0,
    },
    {
      close: 0,
      id: 4,
      name: '삼성바이오로직스',
      rate: 0,
      rate_price: 0,
      symbol: '207940',
      volume: 0,
      trading_value: 0,
    },
    {
      close: 0,
      id: 5,
      name: '기아',
      rate: 0,
      rate_price: 0,
      symbol: '000270',
      volume: 0,
      trading_value: 0,
    },
  ];
  const [datas, setDatas] = useState<StockData[]>(stockDatas);
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 관리
  const [filteredCompanies, setFilteredCompanies] = useState(datas); // 필터된 회사 리스트 상태

  const navigate = useNavigate();
  const gotoDetails = (symbol: string, name: string, initPrice: number, initRate: number, initRatePrice: number) => {
    navigate(`/details/${symbol}`, {
      state: { name: name, initPrice: initPrice, initRate: initRate, initRatePrice: initRatePrice },
    });
  };

  useEffect(() => {
    fetch(`http://localhost.stock-service/api/v1/stockDetails/symbols`, {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          console.log('네트워크 응답이 올바르지 않습니다');
        }
        return res.json();
      })
      .then((fetchedData: StockData[]) => {
        setDatas((prevDatas) =>
          prevDatas.map((data) => {
            // 서버에서 받은 데이터 중, symbol이 같은 항목 찾기
            const updatedData = fetchedData.find((item) => item.symbol === data.symbol);

            // 같은 symbol을 가진 데이터가 있으면 업데이트, 없으면 기존 데이터 유지
            return updatedData
              ? {
                  ...data,
                  close: updatedData.close,
                  rate: updatedData.rate,
                  rate_price: updatedData.rate_price,
                  volume: updatedData.volume,
                  trading_value: updatedData.trading_value,
                }
              : data;
          }),
        );
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
      });
  }, []);

  useEffect(() => {
    // 검색어에 따라 회사 이름 필터링
    const filtered = datas.filter((company) => company.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredCompanies(filtered);
  }, [searchTerm, datas]);

  return (
    <div>
      <input
        placeholder="검색어를 입력하세요"
        className="bg-Box-gray w-full h-[40px] rounded-[20px] p-[20px] mb-[20px] outline-none"
        value={searchTerm} // 검색어를 input에 바인딩
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="h-[30vh] overflow-auto">
        {filteredCompanies.map((company, index) => (
          <div
            className=" p-[10px] cursor-pointer hover:bg-Bg-gray rounded-[10px] flex"
            onClick={() => {
              gotoDetails(company.symbol, company.name, company.close, company.rate, company.rate_price);
            }}
          >
            <div className="mx-[10px] text-MainBlue font-bold">{index + 1}</div>
            <div className="mx-[10px]">{company.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SearchContent;
