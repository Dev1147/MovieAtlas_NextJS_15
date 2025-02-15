import React, { useEffect, useState } from 'react';
import { API_URI,IMAGE_BASE_URL } from '../../components/Config';
import { Box, Button, Link, Paper, Stack, Typography } from '@mui/material';

interface MediaCardProps {
  mediaCardInfo: { profile_path: string; name: string; character: string }[]; // 배열로 정의
  shownCount: number;
}//{ mediaCardInfo: { profile_path: string; name: string; character: string }[], showCount: number}

function MediaCard({mediaCardInfo, shownCount}:MediaCardProps) {

  return (
    <>
      <Paper elevation={3} sx={{display:'flex',alignItems:'center', overflowY: 'auto', flexWrap: 'wrap', gap: '20px', width:'100%', height:'350px', justifyContent:'center',}}>   
        {Array.isArray(mediaCardInfo) && mediaCardInfo.slice(0, shownCount).map((cast, index) => (  
          <Paper elevation={3} key={index} sx={{border:'1px solid #ccc', borderRadius:'15px', width:'175px', height:'320px', }}>
            {/* <Box > */}
              <img src={`${IMAGE_BASE_URL}/w500${cast.profile_path}` } width='173px'height='230px' style={{borderTopLeftRadius: "15px",borderTopRightRadius: "15px"}}/>   
            {/* </Box> */}
            <Box sx={{}}>
              <Typography sx={{fontWeight:'bold'}} >{cast.name}</Typography>
              <Typography>{cast.character}</Typography>
            </Box>
          </Paper >
        ))}
      </Paper>
    </>
  )
}

export default MediaCard