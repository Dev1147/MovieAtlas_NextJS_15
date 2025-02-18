"use client"
import React from 'react'
import { IMAGE_BASE_URL} from '../config';

import { Box, Paper} from '@mui/material';
import style from '../style/style.module.css';
import Average from '../common/Average';
import Link from 'next/link';
import Image from 'next/image';

function PosterRowListPage({movieInfo}:{movieInfo:{id:number, poster_path:string, title:string, release_date:string, vote_average:number}[]}) {

  return (
    <>
      {/* 영환 콘텐츠 리스트 */}
      <Box sx={{display: 'flex', overflowX: 'auto', gap: '20px', width:'100%', height:'350px', alignItems:'center', paddingLeft:'25px',paddingRight:'25px'}}>
        {Array.isArray(movieInfo) && movieInfo.slice(0,10).map((movie, index) => (  
          <Paper elevation={3} key={index} className={style.imageList} sx={{border:'1px solid #ccc', borderRadius:'15px', width:'150px', height:'300px', }}>
            <Box sx={{width:'150px', height:'225px'}}>
              <Link href={`/views/movie/${movie.id}`}>
                <Image src={`${IMAGE_BASE_URL}/w500${movie.poster_path}` } alt='포스터 사진진' width={150} height={225} style={{borderRadius: "15px"}}/>
              </Link>
            </Box>
            <Box sx={{width:'150px', height:'50px', whiteSpace:'',paddingTop:'20px', paddingLeft:'5px'}}>
              <div>{movie.title}</div>
              <div>{movie.release_date}</div>
            </Box>
            {/* 평균 공통 컴포넌트 */}
            <Average voteAverage={movie.vote_average}/>
          </Paper > 
        ))}
      </Box>
    </>
  )
}

export default PosterRowListPage