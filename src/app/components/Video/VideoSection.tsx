"use client"
import React, { useEffect, useState } from 'react'
import {API_URI, API_KEY, IMAGE_BASE_URL} from '../Config';
import Image from "next/image";
import { Grid, Grid2, Stack, Box, Paper, Tabs, Tab, ImageList, ImageListItem, Typography } from '@mui/material';
import VideoRowListPage from './VideoRowListPage';

function VideoSection() {

  const [videoCategory, setVideoCategory] = useState('popular');
  const [videoInfo, setVideoInfo] = useState<{id: number, backdrop_path:string}[]>([]);

  const handleChangeVideo = (event: React.SyntheticEvent, newValue: string) => {
    setVideoCategory(newValue);
  };

     //메인 영화 콘텐츠 최신,인기 리스트
     const fetchVideosList = async(endpoint: string) => {
      try{
        const res = await fetch(endpoint);
        const data = await res.json();
  
        if(data.results.length > 0){
          // console.log(data.results)
          setVideoInfo(data.results);
        }
  
      }catch(error){
        console.error("영화 대표 비디오오 가져오기 실패!");
      }
    }

    useEffect(()=>{
      let endPosintVedeos: string = `${API_URI}movie/${videoCategory}?api_key=${API_KEY}&language=ko-KR&page=3`; //영화 최신,인기 1페이지만
      fetchVideosList(endPosintVedeos);
    },[videoCategory]);

    
  return (
    <>
      {/* 영화 예고편 영상 리스트 */}
      <Box  sx={{padding:'20px', }}>
        <Box sx={{ width: '100%', display:'flex', paddingLeft:'20px'}}>
          <Typography variant="h5">
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
        <VideoRowListPage videoInfo={videoInfo}/>

      </Box>
    </>
  )
}

export default VideoSection