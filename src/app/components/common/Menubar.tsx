"use client"
import React, { useEffect, useState } from 'react'
import {Menu,AppBar,Box ,Toolbar, Typography, IconButton, Button, MenuItem, Container,Tooltip, Avatar }  from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import MenuIcon from '@mui/icons-material/Menu';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Menubar() {

  const router = useRouter();

  const pages = ['영화', '수익', '준비중'];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const open1 = Boolean(anchorEl2);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGeneresClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleGeneresClose = () => {
    setAnchorEl2(null);
  };


    

    

    //useEffect(() => {
      //사용자 가져오기
      // const storedUserName = localStorage.getItem('userName');
      // const storedToken  = localStorage.getItem('authToken');

      // setUserName(storedUserName); // 상태 업데이트
    //}, []);

    

    // 로그아웃 처리
    // const handleLogout = () => {
    
    //   localStorage.removeItem('authToken')
    //   localStorage.removeItem('userName'); // 로컬 스토리지에서 사용자 이름 삭제
    //   setUserName(null); // 상태 초기화
    // router.push('/auth/login');
    // };


    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
      // 쿠키에서 사용자,권한, 토큰을 읽어오기
      const cookies = document.cookie.split('; ');
      const userRole = cookies.find(cookie => cookie.startsWith('userrole='));
      const userCookie = cookies.find(cookie => cookie.startsWith('username='));
      //console.log(document.cookie)
      // console.log(userCookie)
      if (userCookie) {
        const userName = userCookie.split('=')[1];
       // console.log(userName);
       setUserName(userName);  // 사용자명을 상태에 저장
      }
    }, []);

    const handleLogout  = async() => {
      try {
        const response = await fetch('/api/logout', {
          method: 'POST',
          //credentials: 'include',  // 쿠키를 포함하여 요청
        });
    
        const data = await response.json();
        if (data.success) {
          console.log('로그아웃 성공');
          // 로그아웃 후 리디렉션하거나 UI 업데이트 등을 할 수 있습니다.
          window.location.href = '/auth/login';  // 예: 로그인 페이지로 이동
          //await router.push('/');
        } else {
          console.error('로그아웃 실패');
        }
      } catch (error) {
        console.error('로그아웃 중 오류 발생:', error);
      }
    }
    

  return (
    <div style={{marginBottom:'80px'}}>    
    <AppBar position="fixed" sx={{backgroundColor: '#000'}} >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MovieIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            The MovieAtlas
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <MovieIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            The MovieAtlas
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                
              >
                {page}
              </Button>
            ))} */}
            <Button id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick} sx={{ my: 2, color: 'white', display: 'block' }}>영화</Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              disableScrollLock={true}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>인기순</MenuItem>
              <MenuItem onClick={handleClose}>평점순</MenuItem>
              <MenuItem onClick={handleClose}>개봉예정</MenuItem>
            </Menu>

            <Button  onClick={handleGeneresClick} sx={{ my: 2, color: 'white', display: 'block' }}>수익</Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl2}
              open={open1}
              onClose={handleGeneresClose}
              disableScrollLock={true}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}>
              <MenuItem onClick={handleGeneresClose}>
               <Link href='/charts/bar_chart' passHref>영화 수익</Link> 
              </MenuItem>
            </Menu>
          </Box>
          {userName ? (
            <Box  >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 , color:'white'}}>
                {/* <Avatar alt="Remy Sharp" src="/" /> */}
                <div>{userName}님! 환영합니다.</div>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              disableScrollLock={true} // 클릭시 메뉴 밀리는 현상 막기
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  
                </MenuItem>
              ))}
              <Typography sx={{ textAlign: 'center' }}><Button onClick={handleLogout}>진짜 로그아웃</Button></Typography>
            </Menu>
          </Box>
          ):(
            <Box sx={{ flexGrow: 0 }}>
              {/* <Link href='/auth/login'>로그인</Link> */}
              <Button color="inherit"  onClick={() => router.push('/auth/login')}>Login</Button>
            </Box>
          )}

        </Toolbar>
      </Container>
    </AppBar>
  </div>
  )
}

export default Menubar