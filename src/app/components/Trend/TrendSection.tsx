"use client"
import React, { useEffect, useState } from 'react'
import {API_URI, API_KEY, IMAGE_BASE_URL} from '../Config';
import Image from "next/image";
import { Grid, Grid2, Stack, Box, Paper, Tabs, Tab, ImageList, ImageListItem, Typography } from '@mui/material';
import TrendRowListPage from './TrendRowListPage';


function PosterSection() {
   const [movieIdList, setMovieIdList] = useState<{id: number, poster_path:string, title:string, backdrop_path:string, release_date: string, vote_average:number}[]>([]);
  const [trendCategory, setTrendCategory] = useState('week');

  //트렌드 이번주, 오늘 변경경
  const handleChangeTrend = (event: React.SyntheticEvent, newValue: string) => {
    setTrendCategory(newValue);
  };


  //트렌드 이번주, 오늘 리스트
  const fetchImagesList = async(endpoint: string) => {
    try{
      const res = await fetch(endpoint);
      const data = await res.json();

      if(data.results.length > 0){
        
        setMovieIdList(data.results);
      }

    }catch(error){
      console.error("영화 트렌드 가져오기 실패!");
    }
  }

  useEffect(()=>{
    let endPosintImages: string = `${API_URI}movie/${trendCategory}?api_key=${API_KEY}&language=ko-KR&page=1`; //영화 최신,인기 1페이지만
    let endPosintTrend: string = `${API_URI}trending/movie/${trendCategory}?api_key=${API_KEY}&language=ko-KR&page=1`; //트렌드 영화
   // https://api.themoviedb.org/3/trending/movie/week?api_key=YOUR_API_KEY
    //let endPosintTv: string = `${API_URI}/trending/tv/${trendCategory}?api_key=${API_KEY}&language=ko-KR&page=1`; //트렌드 TV

    // let popularPoint: string = `${API_URI}movie/popular?api_key=${API_KEY}`  //인기
    // let nowPlayingPoint: string = `${API_URI}movie/now_playing?api_key=${API_KEY}`  //스트리밍(현재 상영중)
    // let tvPopularPoint: string = `${API_URI}tv/popular?api_key=${API_KEY}` //TV인기
    // let rentPoint: string = `${API_URI}movie/popular?api_key=${API_KEY}&watch_region=KR&with_watch_monetization_types=rent` //대여
    // let moviePopularPoint: string = `${API_URI}movie/popular?api_key=${API_KEY}&watch_region=KR&with_watch_monetization_types=rent` //극장 상영중

    //let videoPoint: string = `${API_URI}movie/${영화ID값}/videos?api_key=${API_KEY}` // 영상 정보 추출

    fetchImagesList(endPosintTrend);

  },[trendCategory]);

  return (
    <>
      {/* 영화 이미지 리스트 */}
      <Box  sx={{padding:'20px'}}>
        <Box sx={{ width: '100%', display:'flex', paddingLeft:'20px'}}>
          <Typography variant="h5" >
            트렌드
          </Typography>
          <Tabs
            value={trendCategory}
            onChange={handleChangeTrend}
            aria-label="wrapped label tabs example"
          >
            <Tab value="week" label="이번주" />
            <Tab value="day" label="오늘" />
          </Tabs>
        </Box>
        {/* 영화 가로 이미지 리스트 */}
        <TrendRowListPage movieInfo={movieIdList}/>
      </Box>
    </>
  )
}

export default PosterSection