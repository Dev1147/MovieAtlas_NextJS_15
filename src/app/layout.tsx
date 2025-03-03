import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Menubar from "./components/layout/Menubar";
import Footer from "./components/layout/Footer";
import ClientSessionProvider from "./providers/ClientSessionProvider";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import Menubar from "./components/layout/Menubar";

  
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body >
        <ClientSessionProvider>
          <ThemeContextProvider>
            {/* 메뉴바 */}
            <Menubar/>
            
            {children}

            {/* Footer */}
            <Footer/>
          </ThemeContextProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
