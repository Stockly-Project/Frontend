import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MainLogo from '../assets/icons/main_logo.svg';
import ProfileIcon from '../assets/icons/profile_icon.svg';
import useNavBarStore from '../zustand/TopNavBarStore';
import useUserStore from '../zustand/UserStore';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SearchContent from './SearchContent';

const style = {
  position: 'absolute',
  top: '25%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'white',
  boxShadow: 10,
  borderRadius: '20px',
  p: 4,
  outline: 'none',
};

interface TopNavBarProps {
  color: string;
}

function TopNavBar({ color }: TopNavBarProps) {
  // navigation바 상태
  const { home, mypage, handleClick } = useNavBarStore();

  // zustand에서 사용자 정보 불러오기
  const { isLoggedin, name, setUserState } = useUserStore();
  const clearUserStorage = useUserStore.persist.clearStorage;


  const navigate = useNavigate();

  const [modal, setModal] = React.useState(false);
  const handleModalOpen = () => setModal(true);
  const handleModalClose = () => setModal(false);

  const goToHome = () => {
    navigate('/');
    handleClick('home');
  };

  const goToOnboarding = () => {
    navigate('/onboarding');
  };

  const goToMypage = () => {
    handleClick('mypage')
    navigate('/mypage');
  };

  const handleLogOut = () => {
    fetch('http://localhost:30080/api/v1/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          console.log('네트워크 응답이 올바르지 않습니다');
          console.log(res);
        }
        return res.json();
      })
      .then((data) => {
        console.log('로그아웃 데이터', data);
        clearUserStorage();
        setUserState(false, '', '');
        handleClick('home');

        alert('로그아웃 되었습니다.');
      })
      .catch((error) => {
        console.error('로그아웃 중 에러 발생:', error);
      });
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div
        className={`w-[100%] flex justify-between items-center min-w-[800px] sticky top-0 ${color === 'white' ? 'bg-white' : 'bg-Bg-gray'}`}
      >
        <div className="flex items-center m-[10px] cursor-pointer" onClick={goToHome}>
          <img src={MainLogo} className="w-[50px] h-[50px]" />
          <p className="text-[25px]">STOCKLY</p>
        </div>
        <div className="flex items-center">
          <div
            className={`text-[17px] mx-[20px] cursor-pointer ${home ? 'text-[#000000]' : 'text-[#B4BDC6]'}`}
            onClick={() => goToHome()}
          >
            홈
          </div>

          <div
            className={`text-[17px] mx-[20px] cursor-pointer ${mypage ? 'text-[#000000]' : 'text-[#B4BDC6]'}`}
            onClick={() => {
              handleClick('mypage');
              goToMypage();
            }}
          >
            마이페이지
          </div>
          <div
            className="m-[10px] bg-Box-gray w-[230px] h-[40px] rounded-[30px] p-[15px] cursor-pointer flex items-center text-[#9e9ea2]"
            onClick={handleModalOpen}
          >
            원하는 종목을 검색하세요
          </div>
          <Modal
            open={modal}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <SearchContent />
            </Box>
          </Modal>
        </div>
        {isLoggedin ? (
          <>
            <button
              className="m-[10px] cursor-pointer"
              onClick={handleClickProfile}
              id="basic-button"
              aria-haspopup="true"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
            >
              <img src={ProfileIcon} />
            </button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem> {name} 님, 반가워요</MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  goToMypage();
                }}
              >
                마이페이지
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleLogOut();
                }}
              >
                로그아웃
              </MenuItem>
            </Menu>
          </>
        ) : (
          <button
            className="bg-MainBlue w-[90px] h-[40px] text-white rounded-[5px] m-[20px] hover:bg-[#1063d8]"
            onClick={goToOnboarding}
          >
            로그인
          </button>
        )}
      </div>
    </>
  );
}

export default TopNavBar;
