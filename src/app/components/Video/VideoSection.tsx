"use client"
import React, { useEffect, useState } from 'react'
import {API_URI, API_KEY, IMAGE_BASE_URL} from '../Config';
import Image from "next/image";
import { Grid, Grid2, Stack, Box, Paper, Tabs, Tab, ImageList, ImageListItem, Typography } from '@mui/material';
import MainVideoRowListPage from './VideoRowListPage';

function VideoSection() {

  const [videoCategory, setVideoCategory] = useState('popular');
  const [VideoIdList, setVideoIdList] = useState<{id: number}[]>([]);

  const handleChangeVideo = (event: React.SyntheticEvent, newValue: string) => {
    setVideoCategory(newValue);
  };

     //메인 영화 콘텐츠 최신,인기 리스트
     const fetchVideosList = async(endpoint: string) => {
      try{
        const res = await fetch(endpoint);
        const data = await res.json();
  
        if(data.results.length > 0){
          
          setVideoIdList(data.results);
        }
  
      }catch(error){
        console.error("영화 대표 이미지 가져오기 실패!");
      }
    }

    useEffect(()=>{
      let endPosintVedeos: string = `${API_URI}movie/${videoCategory}?api_key=${API_KEY}&language=ko-KR&page=3`; //영화 최신,인기 1페이지만
      fetchVideosList(endPosintVedeos);
    },[videoCategory]);
    
  return (
    <>
      {/* 영화 예고편 영상 리스트 */}
      <Box  sx={{padding:'20px'}}>
        <Box sx={{ width: '100%', display:'flex',}}>
          <Typography variant="h4">
            예고편
          </Typography>
          <Tabs
            value={videoCategory}
            onChange={handleChangeVideo}
            aria-label="wrapped label tabs example"
          >
            <Tab value="popular" label="인기" />
            <Tab value="upcoming" label="최신" />
            <Tab value="now_playing" label="현재 상영중" />
          </Tabs>
        </Box>
        {/* 영화 가로 예고편 리스트 */}
        <MainVideoRowListPage movieId={VideoIdList}/>
        {/* {videoCategory === 'popular' && <MainVideoRowListPage movieId={VideoIdList} />}
        {videoCategory === 'upcoming' && <MainVideoRowListPage movieId={VideoIdList} />} */}
      </Box>
    </>
  )
}

export default VideoSection