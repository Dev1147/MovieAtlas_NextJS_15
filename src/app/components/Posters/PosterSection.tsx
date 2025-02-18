"use client"
import React, { useEffect, useState } from 'react'
import {API_URI} from '../config';

import {  Box, Tabs, Tab, Typography } from '@mui/material';
import PosterRowListPage from './PosterRowListPage';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

function PosterSection() {
   const [movieIdList, setMovieIdList] = useState<{id: number, poster_path:string, title:string, backdrop_path:string, release_date: string, vote_average:number}[]>([]);
  const [imageCategory, setImageCategory] = useState('popular');

  //최신,인기 콘텐츠 이미지 변경
  const handleChangeImage = (event: React.SyntheticEvent, newValue: string) => {
    setImageCategory(newValue);
  };


  //메인 영화 콘텐츠 최신,인기 리스트
  const fetchImagesList = async(endpoint: string) => {
    try{
      const res = await fetch(endpoint);
      const data = await res.json();

      if(data.results.length > 0){
        //console.log(data.results);
        setMovieIdList(data.results);
      }

    }catch(error){
      console.error("영화 대표 이미지 가져오기 실패!",error);
    }
  }

  useEffect(()=>{
    const endPosintImages: string = `${API_URI}movie/${imageCategory}?api_key=${API_KEY}&language=ko-KR&page=1`; //영화 최신,인기 1페이지만

    // let popularPoint: string = `${API_URI}movie/popular?api_key=${API_KEY}`  //인기
    // let nowPlayingPoint: string = `${API_URI}movie/now_playing?api_key=${API_KEY}`  //스트리밍(현재 상영중)
    // let tvPopularPoint: string = `${API_URI}tv/popular?api_key=${API_KEY}` //TV인기
    // let rentPoint: string = `${API_URI}movie/popular?api_key=${API_KEY}&watch_region=KR&with_watch_monetization_types=rent` //대여
    // let moviePopularPoint: string = `${API_URI}movie/popular?api_key=${API_KEY}&watch_region=KR&with_watch_monetization_types=rent` //극장 상영중

    //let videoPoint: string = `${API_URI}movie/${영화ID값}/videos?api_key=${API_KEY}` // 영상 정보 추출

    fetchImagesList(endPosintImages);

  },[imageCategory]);

  return (
    <>
      {/* 영화 이미지 리스트 */}
      <Box  sx={{padding:'20px'}}>
        <Box sx={{ width: '100%', display:'flex', paddingLeft:'20px'}}>
          <Typography variant="h5" >
            영화 콘텐츠
          </Typography>
          <Tabs
            value={imageCategory}
            onChange={handleChangeImage}
            aria-label="wrapped label tabs example"
          >
            <Tab value="popular" label="인기" />
            <Tab value="upcoming" label="최신" />
            <Tab value="now_playing" label="현재 상영중" />
          </Tabs>
        </Box>
        {/* 영화 가로 이미지 리스트 */}
        <PosterRowListPage movieInfo={movieIdList}/>
      </Box>
    </>
  )
}

export default PosterSection