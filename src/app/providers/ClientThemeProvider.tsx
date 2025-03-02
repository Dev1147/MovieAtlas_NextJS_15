"use client"
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Menubar from '../components/layout/Menubar';

function ClientThemeProvider() {
  const [isDarkMode,setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
  }, []);

  const buttonTheme = () => {
    setIsDarkMode((prevMode) => { 
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
     
    });
  };

  const theme = createTheme({
    palette:{
      mode: isDarkMode ? 'dark' : 'light', 
    }
  });
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Menubar  isDarkMode={isDarkMode} buttonTheme={buttonTheme}/>
      </ThemeProvider>
    </div>
  )
}

export default ClientThemeProvider