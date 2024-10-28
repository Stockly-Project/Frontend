import { useState, useEffect } from 'react';
const companies = [
  {
    company_name: '삼성',
    symbol: '11111',
  },
  {
    company_name: 'LG',
    symbol: '11111',
  },
  {
    company_name: 'KIA',
    symbol: '11111',
  }
];
function SearchContent() {
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 관리
  const [filteredCompanies, setFilteredCompanies] = useState(companies); // 필터된 회사 리스트 상태

  useEffect(() => {
    // 검색어에 따라 회사 이름 필터링
    const filtered = companies.filter((company) =>
      company.company_name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredCompanies(filtered);
  }, [searchTerm]);

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
          <div className=" p-[10px] cursor-pointer hover:bg-Bg-gray rounded-[10px] flex">
            <div className="mx-[10px] text-MainBlue font-bold">{index+1}</div>
            <div className="mx-[10px]">{company.company_name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SearchContent;
