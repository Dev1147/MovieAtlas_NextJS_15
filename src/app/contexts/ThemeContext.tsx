"use client";
import { createTheme, CssBaseline } from "@mui/material";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ThemeProvider } from '@emotion/react';


// Context타입 정의
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme 컴포넌트
export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
//  export default function ThemeProviderContext ({ children }: { children: ReactNode }) {

    const [isDarkMode, setIsDarkMode] = useState(false);
  
    useEffect(() => {
      const savedTheme = localStorage.getItem('theme');
      setIsDarkMode(savedTheme === 'dark');
    }, []);
  
    const toggleTheme = () => {
      setIsDarkMode((prevMode) => {
        const newMode = !prevMode;
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
        return newMode;
      });
    };
  
    //MUI 테마 설정
    const theme = createTheme({
      palette: {
        mode: isDarkMode ? 'dark' : 'light',
      },
    });

  return(
    <div>
      <ThemeContext.Provider value={{isDarkMode, toggleTheme}}>
        <ThemeProvider theme={theme}>
          <CssBaseline />  
          {children}  
        </ThemeProvider>
      </ThemeContext.Provider>
    </div>
  );
};


// useTheme Hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if(!context){
    throw new Error("useTheme은 ThemeProvider 내에서 사용해야 합니다.");
  }
  return context;
}