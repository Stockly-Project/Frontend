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
  
  const [datas, setDatas] = useState<StockData[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 관리
  const [filteredCompanies, setFilteredCompanies] = useState(datas); // 필터된 회사 리스트 상태

  const navigate = useNavigate();
  const gotoDetails = (symbol: string, name: string, initPrice: number, initRate: number, initRatePrice: number) => {
    navigate(`/details/${symbol}`, {
      state: { name: name, initPrice: initPrice, initRate: initRate, initRatePrice: initRatePrice },
    });
  };

  useEffect(() => {
    fetch(`http://localhost:30080/api/v1/stockDetails/symbols`, {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          console.log('네트워크 응답이 올바르지 않습니다');
        }
        return res.json();
      })
      .then((fetchedData: StockData[]) => {
        setDatas(fetchedData);
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
