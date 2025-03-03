import { useTheme } from '@/app/contexts/ThemeContext';
import { DarkMode, LightMode } from '@mui/icons-material';
import { IconButton,  } from '@mui/material'
import React from 'react'

// interface DarkModeProps {
//   isDarkMode: boolean;
//   buttonTheme: () => void; // 테마 변경 함수 전달
// }{isDarkMode,buttonTheme}:DarkModeProps

function DarkModeButton() {
   const {isDarkMode, toggleTheme} = useTheme();
  return (
    <div>
      <IconButton color="primary" onClick={toggleTheme}
        sx={{
          border: '2px solid', 
          borderColor: isDarkMode ? '#fff' : '#000', // 아웃라인 색상 변경
          borderRadius: '8px', 
          padding: '0px',
          color: isDarkMode ? '#ffc107' : '#B0BEC5', // 아이콘 색상 변경
          width:'30px',
          height:'30px'
        }}
      >
        {isDarkMode ? <LightMode/> : <DarkMode/>}
      </IconButton>
    </div>
  )
}

export default DarkModeButton
