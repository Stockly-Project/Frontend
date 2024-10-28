import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MainLogo from '../assets/icons/main_logo.svg';
import ProfileIcon from '../assets/icons/profile_icon.svg';
import useNavBarStore from '../zustand/TopNavBarStore';
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
  outline:"none"
};

interface TopNavBarProps {
  color: string;
}

function TopNavBar({ color }: TopNavBarProps) {
  const { home, myinvest, handleClick } = useNavBarStore();
  const navigate = useNavigate();

  const [modal, setModal] = React.useState(false);
  const handleModalOpen = () => setModal(true);
  const handleModalClose = () => setModal(false);

  const goToHome = () => {
    navigate('/main');
  };
  const goToMyInvest = () => {
    navigate('/myinvest');
  };

  const goToSetting = () => {
    navigate('/setting');
  }

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
            onClick={() => {
              handleClick('home');
              goToHome();
            }}
          >
            홈
          </div>

          <div
            className={`text-[17px] mx-[20px] cursor-pointer ${myinvest ? 'text-[#000000]' : 'text-[#B4BDC6]'}`}
            onClick={() => {
              handleClick('myinvest');
              goToMyInvest();
            }}
          >
            내 투자
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
          <MenuItem onClick={handleClose}>로그아웃</MenuItem>
          <MenuItem onClick={()=>{handleClose(); goToSetting();}}>설정</MenuItem>
        </Menu>
      </div>
    </>
  );
}

export default TopNavBar;
