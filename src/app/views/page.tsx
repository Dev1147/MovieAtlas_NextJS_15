"use client";
import React, { useEffect } from 'react'
import PosterSection from '../components/Posters/PosterSection';
import VideoSection from '../components/Video/VideoSection';
import TrendSection from '../components/Trend/TrendSection';
import { Box } from '@mui/material';
import MainImage from '../components/common/MainImage';


function Page() {


  useEffect(()=>{

  },[]);

  
  return (
    <>
      <Box>

        {/* 대표 이미지 */}
        <MainImage/>

        {/* 트렌드 영화 */}
        <TrendSection/>
        
        {/* 영화 포스터 이미지*/}
        <PosterSection/>

        {/* 영화 예고편 영상 */}
        <VideoSection/>

      </Box>
    </>
  )
}

export default Page