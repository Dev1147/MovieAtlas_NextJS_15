"use client"
import React, { useEffect, useState } from 'react'
import {API_URI, API_KEY, IMAGE_BASE_URL} from './Config';
import Image from "next/image";
import { Grid, Grid2, Stack, Box, Paper, Tabs, Tab, ImageList, ImageListItem, Typography } from '@mui/material';

import style from './style/style.module.css';


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

function MainImage() {

  const [mainMovieList, setMainMovieList] = useState<{poster_path:string, title:string, backdrop_path:string, release_date: string}[]>([]);
  const [category, setCategory] = React.useState('popular');

  //최신/인기 콘텐츠 변경
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCategory(newValue);
  };

  //메인 영화 콘텐츠 리스트트
  const mainImagList = async(endpoint: string) => {
    try{
      const res = await fetch(endpoint);
      const data = await res.json();

      if(data.results.length > 0){
        
        setMainMovieList(data.results);
      }

      //console.log(data.results)

    }catch(error){
      console.error("영화 대표 이미지 가져오기 실패!");
    }
  }

  useEffect(()=>{
    let mainImagPoint: string = `${API_URI}movie/${category}?api_key=${API_KEY}&language=ko-KR&page=1`; //영화 API

    mainImagList(mainImagPoint);
  },[category]);



  return (
    <div>
      <Box sx={{padding:'20px'}}>
        {/* 영화 콘텐츠 메뉴 */}
        <Box sx={{ width: '100%', display:'flex',}}>
          <Typography variant="h4">
            영화 콘텐츠
          </Typography>
          <Tabs
            value={category}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
          >
            <Tab value="popular" label="인기" />
            <Tab value="upcoming" label="최신" />
          </Tabs>
        </Box>
        {/* 영환 콘텐츠 리스트 */}
        <Box sx={{display: 'flex', overflowX: 'scroll', gap: '20px', width:'100%', height:'350px', alignItems:'center', paddingLeft:'25px',paddingRight:'25px'}}>
          {Array.isArray(mainMovieList) && mainMovieList.slice(0,10).map((movie, index) => (  
              <Paper elevation={3} key={index} className={style.imageList} sx={{border:'1px solid #ccc', borderRadius:'15px', width:'150px', height:'300px', }}>
                <Box sx={{width:'150px', height:'225px'}}>
                  <img src={`${IMAGE_BASE_URL}/w500${movie.poster_path}` } width='150px'height='225px' style={{borderRadius: "15px"}}/>
                </Box>
                <Box sx={{width:'150px', height:'50px', whiteSpace:''}}>
                  <div>{movie.title}</div>
                  <div>{movie.release_date}</div>
                </Box>
              </Paper > 
          ))}
        </Box>
      </Box>

    </div>
  )
}

export default MainImage