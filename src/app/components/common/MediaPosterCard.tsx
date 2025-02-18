import React from 'react';
import {IMAGE_BASE_URL } from '../Config';
import { Box, Link, Paper} from '@mui/material';
import style from '../style/style.module.css';
import Image from 'next/image';

interface MediaPosterCardProps {
  type:string
  mediaPosterCardInfo: { id:number, poster_path: string; name: string; character: string, vote_average:number }[]; // 배열로 정의
}//{ mediaCardInfo: { profile_path: string; name: string; character: string }[], showCount: number}

function MediaPosterCard({mediaPosterCardInfo}:MediaPosterCardProps) {

  return (
    <Box  sx={{width:'80%'}}>
      <Paper elevation={3} sx={{display:'flex',alignItems:'center',paddingTop:'30px', overflowY: 'auto', flexWrap: 'wrap', gap: 3, width:'100%', height:'590px', justifyContent:'center',}}>   
        {Array.isArray(mediaPosterCardInfo) && mediaPosterCardInfo.map((poster, index) => (  
          <Paper elevation={3} key={index} className={style.imageList}  sx={{position:'relative', borderRadius:'8px', width:'200px', height:'300px',display:'flex',justifyContent:'center' }}>
            <Link href={`/views/movie/${poster.id}`}>
              <Image src={`${IMAGE_BASE_URL}/w500${poster.poster_path}` } alt='포스터 사진'  width={200} height={300} style={{borderRadius: "8px",}}/>   
            </Link>
          </Paper >
        ))}
      </Paper>
    </Box>
  )
}

export default MediaPosterCard