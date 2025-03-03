"use client"
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import React, { useEffect, useState } from 'react'

function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode,setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
    console.log(savedTheme === 'dark')
  }, []);

  // const buttonTheme = () => {
  //   setIsDarkMode((prevMode) => { 
  //     const newMode = !prevMode;
  //     localStorage.setItem('theme', newMode ? 'dark' : 'light');
  //     console.log("버튼 클릭 후 다크 모드 상태:", newMode);
  //     return newMode;
     
  //   });
  // }; 

  const theme = createTheme({
    palette:{
      mode: isDarkMode ? 'dark' : 'light', 
    }
  });
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        {/* <Menubar  isDarkMode={isDarkMode} buttonTheme={buttonTheme}/> */}
        { children }
      </ThemeProvider>
    </div>
  )
}

export default ClientThemeProvider