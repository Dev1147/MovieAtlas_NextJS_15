import React, { useEffect, useState } from 'react';
import { API_URI,IMAGE_BASE_URL } from '../Config';
import { Box, Button, Link, Paper, Stack, Typography } from '@mui/material';
import Average from './Average';
import style from '../style/style.module.css';

interface MediaPosterCardProps {
  type:string
  mediaPosterCardInfo: { id:string, poster_path: string; name: string; character: string, vote_average:number }[]; // 배열로 정의
}//{ mediaCardInfo: { profile_path: string; name: string; character: string }[], showCount: number}

function MediaPosterCard({mediaPosterCardInfo}:MediaPosterCardProps) {

  return (
    <Box  sx={{width:'80%'}}>
      <Paper elevation={3} sx={{display:'flex',alignItems:'center',paddingTop:'30px', overflowY: 'auto', flexWrap: 'wrap', gap: 3, width:'100%', height:'590px', justifyContent:'center',}}>   
        {Array.isArray(mediaPosterCardInfo) && mediaPosterCardInfo.map((poster, index) => (  
          <Paper elevation={3} key={index} className={style.imageList}  sx={{position:'relative', borderRadius:'8px', width:'200px', height:'300px',display:'flex',justifyContent:'center' }}>
            <Link href={`/views/movie/${poster.id}`}>
              <img src={`${IMAGE_BASE_URL}/w500${poster.poster_path}` } width='200px'height='300px' style={{borderRadius: "8px",}}/>   
            </Link>
          </Paper >
        ))}
      </Paper>
    </Box>
  )
}

export default MediaPosterCard