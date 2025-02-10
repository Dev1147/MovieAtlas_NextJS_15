"use client"
import React, { useEffect, useState } from 'react'
import PosterSection from './Posters/PosterSection';
import VideoSection from './Video/VideoSection';
import { Grid, Grid2, Stack, Box, Paper, Tabs, Tab, ImageList, ImageListItem, Typography } from '@mui/material';

type moviesData =  {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: "en"
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video:boolean;
  vote_average: number;
  vote_count: number;
}

function LandingPage() {


  useEffect(()=>{

  },[]);

  
  return (
    <>
      <Box>
        {/* 영화 포스터 이미지*/}
        <PosterSection/>

        {/* 영화 예고편 영상 */}
        <VideoSection/>



        

      </Box>
    </>
  )
}

export default LandingPage