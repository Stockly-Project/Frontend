import RoiChart from './RoiChart';
import AssetChart from './AssetChart';
import { GrFormNext } from 'react-icons/gr';
import { useState } from 'react';
import MyStockList from './MyStockList';

function UserInfo() {
  const [openHoldings, setOpenHoldings] = useState(false);
  return (
    <div className="mx-[20px] my-[10px]">
      {/* 내 자산 */}
      <div>
        <div className="text-[25px] border-b border-gray text-[#373737] p-[10px]">수익률</div>
        <div className="w-full flex text-[25px] my-[20px] mx-[10px] justify-start items-end">
          <div className="text-[23px] text-[#373737]">123,456,780 원 </div>
          <div className="text-[19px] text-up">&nbsp; 16,780 원 (+3.5%) </div>
        </div>
        <div>
          <AssetChart />
        </div>
        <div className="h-[30px]" />
        <div>
          <RoiChart />
        </div>
      </div>
      <div className="h-[60px]" />

      {/* 보유 주식 */}
      <div>
        <div className="text-[25px] flex justify-between border-b border-gray text-[#373737] p-[10px] my-[10px]">
          보유 주식
          <GrFormNext
            className={`text-[30px] cursor-pointer ${openHoldings && 'rotate-90'} transition-transform duration-300 ease-in-out`}
            onClick={() => setOpenHoldings(!openHoldings)}
          />
        </div>
        <div className={`${!openHoldings && 'invisible'} mt-[20px]`}>
          <MyStockList />
        </div>
      </div>
      <div className="h-[300px]" />
    </div>
  );
}

export default UserInfo;
