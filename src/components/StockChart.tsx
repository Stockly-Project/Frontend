import { useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import StockChartList from './StockChartList';

const tabStyles = {
  color: '#909090', // 기본 텍스트 색상
  '&.Mui-selected': { color: '#000000' }, // 선택된 탭 텍스트 색상
};

function StockChart() {
  const [sortedby, setSortedby] = useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log(event);
    setSortedby(newValue);
  };

  return (
    <div>
      <div className="m-[10px] text-[25px]">실시간 차트</div>
      <div className="p-[10px]">
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={sortedby} >
            <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
              <Tabs
                value={sortedby}
                onChange={handleChange}
                aria-label="lab API tabs example"
                sx={{
                  '& .MuiTabs-indicator': { backgroundColor: '#000000' }, //인디케이터 색상
                }}
              >
                <Tab sx={tabStyles} label="거래대금" value="1" disableRipple />
                <Tab sx={tabStyles} label="거래량" value="2" disableRipple />
                <Tab sx={tabStyles} label="급상승" value="3" disableRipple />
                <Tab sx={tabStyles} label="급하락" value="4" disableRipple />
              </Tabs>
            </Box>
            <TabPanel value="1" sx={{padding:0}}><StockChartList/></TabPanel>
            <TabPanel value="2" sx={{padding:0}}><StockChartList/></TabPanel>
            <TabPanel value="3" sx={{padding:0}}><StockChartList/></TabPanel>
            <TabPanel value="4" sx={{padding:0}}><StockChartList/></TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
}

export default StockChart;
