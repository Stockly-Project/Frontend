import { IoHeart } from 'react-icons/io5';

const like_list = [
  { company_name: '삼성전자', symbol: '00928' },
  { company_name: '삼성SDI', symbol: '00929' },
  { company_name: '삼성전자', symbol: '00928' },
];

function MenuBarLikeContent() {
  return (
    <div>
      <div className="p-[15px] text-[20px] fixed w-full h-[70px] bg-Bg-gray border-b border-gray flex items-center">
        관심 종목
      </div>
      <hr className="w-[100%] border-font-gray" />
      <div className="mt-[70px]">
        {like_list.map((like) => (
          <div className="flex justify-between items-center m-[5px] hover:bg-[#e4e8ea] rounded-[10px] transition-color duration-300 cursor-pointer">
            <div className="flex justify-center items-center m-[10px]">
              <div className="content-center cursor-pointer">
                <IoHeart className="w-[23px] h-[23px]" />
              </div>
              <div className="m-[10px] text-[17px]">{like.company_name}</div>
            </div>
            <div className="m-[10px] text-[17px] text-[#93949bec]">{like.symbol}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuBarLikeContent;
