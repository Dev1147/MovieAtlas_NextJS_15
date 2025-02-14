"use client"
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

function Footer() {
  return (
    <>
      <footer style={{width:'100%', height:'200px', display:'flex',justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,1)', color:'white'}}>
        <Stack  direction="row" spacing={4}>
          <div>
            <Typography variant='h3' sx={{fontWeight:'bold'}}> The MovieAtlas </Typography>
            <Typography variant='subtitle1'sx={{ fontWeight:'bold'}}> © 2025 MovieAtlas. All rights reserved. </Typography>
          </div>

          <div>
            <h4>기본정보</h4>
            <ul style={{listStyleType:'none'}}>
              <li><a href="#">홈</a></li>
              <li><a href="#">서비스</a></li>
              <li><a href="#">문의하기</a></li>
            </ul>    
          </div>
          <div>
            <h4>법적사항</h4>
            <ul style={{listStyleType:'none'}}>
              <li><a href="#">서비스이용약관</a></li>
              <li><a href="#">개인 정보약관</a></li>
            </ul>    
          </div>
        </Stack>
      </footer>
    </>
  )
}

export default Footer