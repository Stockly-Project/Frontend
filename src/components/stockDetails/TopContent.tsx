import like from '../../assets/icons/like.svg';
import alerticon from '../../assets/icons/alert.svg';
import alert_hover from '../../assets/icons/alert_hover.svg';
import like2 from '../../assets/icons/like2.svg';
import like2_hover from '../../assets/icons/like2_hover.svg';
import { useState, useEffect } from 'react';
import * as React from 'react';
import Menu from '@mui/material/Menu';
import AlertStore from '../../zustand/AlertStore';

interface TopContentProps {
  symbol: string;
  name: string;
  stockprice: number;
  rate: number;
  rate_price: number;

}

const TopContent = ({ symbol, name, stockprice, rate, rate_price }: TopContentProps) => {
  const [likeSrc, setLikeSrc] = useState(like);
  const [alertSrc, setAlertSrc] = useState(alerticon);
  const [price, setPrice] = useState(''); // 사용자가 알림 받기 입력한 값 
  const [isDisabled, setIsDisabled] = useState(true); // 알림 받기 버튼 활성/비활성
  const [isLike, setIsLike] = useState(false); // 좋아요 유무
  const {flag, setFlagState} = AlertStore();


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLike = () => {
    setIsLike(!isLike);
  };

  useEffect(() => {
    if (Number(price) > 0 && price[0] !== '0') {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [price]);

  const handleSubmitAlert = () => {
    fetch(`http://localhost:30080/api/v1/alert/prices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ symbol, price: Number(price) }),
    })
      .then((res) => {
        if (!res.ok) {
          console.log('네트워크 응답이 올바르지 않습니다.');
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        alert('알림받기를 신청하였습니다.');
        setFlagState(!flag);
        handleClose();
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('알림받기 신청 중 문제가 발생했습니다.');
      });
  };
  

  return (
    <div className="flex justify-between w-full">
      <div className="flex flex-col justify-center items-start my-[10px]">
        <div className="flex">
          <div className="text-[20px] font-bold mx-[10px]"> {name}</div>
          <div className="text-[19px] text-font-gray mx-[10px]">{symbol}</div>
        </div>
        <div className="flex justify-center items-center">
          <div className="text-[22px] mx-[10px]">{stockprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</div>
          <p className="text-[17px] mx-[5px]">어제보다</p>
          <p className={`${rate_price>0 ? "text-up" : "text-down"}`}>{rate_price > 0 && "+"}{rate_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 ({rate}%)</p>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={handleClick}
          id="basic-button"
          aria-haspopup="true"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          className="mx-[5px]"
        >
          <img
            src={alertSrc}
            className="cursor-pointer w-full h-full "
            alt="알림"
            onMouseEnter={() => setAlertSrc(alert_hover)} // hover 상태일 때
            onMouseLeave={() => setAlertSrc(alerticon)} // 기본 상태로 복귀
          />
        </button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          sx={{
            '& .MuiPaper-root': { borderRadius: '10px' },
          }}
          anchorOrigin={{
            vertical: 'bottom', // 버튼의 아래쪽에 메뉴가 나타나도록 설정
            horizontal: 'right', // 버튼의 왼쪽에 맞춰서 나타나도록 설정
          }}
          transformOrigin={{
            vertical: 'top', // 메뉴의 위쪽이 버튼 아래로 연결
            horizontal: 'right', // 메뉴의 왼쪽이 버튼 왼쪽에 맞춰짐
          }}
        >
          <div className="w-[250px] h-[200px] rounded-[100px]">
            <div className="m-[20px]">
              {name} (이)가
              <br />
              얼마일 때 알려드릴까요?
            </div>
            <div className="border border-MainBlue mx-[20px] rounded-[5px] flex justify-between items-center">
              <input
                className="w-[90%] outline-none px-[5px] m-[2px]"
                placeholder="가격을 입력하세요"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <p className="w-[10%]">원</p>
            </div>
          </div>
          <div>
            <div className="w-full flex justify-end ">
              <button
                className=" m-[20px] bg-MainBlue text-white w-[60px] h-[30px] text-[13px] rounded-[3px]"
                disabled={isDisabled}
                onClick={handleSubmitAlert}
              >
                알림 받기
              </button>
            </div>
          </div>
        </Menu>
        <button className="mx-[5px]" onClick={handleLike}>
          <img
            src={likeSrc}
            className="cursor-pointer w-full h-full "
            alt="좋아요"
            onMouseEnter={() => setLikeSrc(isLike ? like2_hover : like2_hover)} // hover 상태일 때
            onMouseLeave={() => setLikeSrc(isLike ? like2 : like)} // 기본 상태로 복귀
          />
        </button>
      </div>
    </div>
  );
};

export default TopContent;
