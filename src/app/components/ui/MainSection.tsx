import {Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ModalVideoCartd from './ModalVideoCartd';
import {API_URI} from '../config';
import MainPosterCard from './MainPosterCard';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";



// 섹션 타입 
export enum SectionTypeEnum {
  POSTER = 'poster',
  TREND = 'trend',
  VIDEO = 'video' 
};

type TabType = "이번주" | "오늘" | "인기" | "최신" | "상영중" ;

interface SectionType {
  type: SectionTypeEnum,
  title: string,
  sub1: TabType,
  sub2: TabType,
  sub3?: TabType
}

function MainSection({type, title, sub1, sub2, sub3}:SectionType) {
  const [moviePopularList, setMoviePopularList] = useState<{id: number, poster_path:string, title:string, backdrop_path:string, release_date: string, vote_average:number}[]>([]);
  const [movieTrendList, setMovieTrendList] = useState<{id: number, poster_path:string, title:string, backdrop_path:string, release_date: string, vote_average:number}[]>([]);
  const [imageCategory, setImageCategory] = useState('popular');
  const [trendCategory, setTrendCategory] = useState('week');
  const [videoCategory, setVideoCategory] = useState('popular');
  const [videoInfo, setVideoInfo] = useState<{id: number, backdrop_path:string}[]>([]);

  //트렌드 이번주, 오늘 변경
  const handleChangeTrend = (event: React.SyntheticEvent, newValue: string) => {
    setTrendCategory(newValue);
  };

  //최신,인기 콘텐츠 이미지 변경
  const handleChangeImage = (event: React.SyntheticEvent, newValue: string) => {
    setImageCategory(newValue);
  };

  //비디오 이미지지
  const handleChangeVideo = (event: React.SyntheticEvent, newValue: string) => {
    setVideoCategory(newValue);
  };

  //트렌드 영화
  const fetchTrendList = async(endpoint: string) => {
    try{
      const res = await fetch(endpoint);
      const data = await res.json();

      if(data.results.length > 0){
        //console.log(data.results);
        setMovieTrendList(data.results);
      }

    }catch(error){
      console.error("영화 대표 이미지 가져오기 실패!",error);
    }
  }

  //메인 영화 콘텐츠 최신,인기 리스트
  const fetchPopularList = async(endpoint: string) => {
    try{
      const res = await fetch(endpoint);
      const data = await res.json();

      if(data.results.length > 0){
        //console.log(data.results);
        setMoviePopularList(data.results);
      }

    }catch(error){
      console.error("영화 대표 이미지 가져오기 실패!",error);
    }
  }

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
      console.error("영화 대표 비디오오 가져오기 실패!",error);
    }
  }

  useEffect(()=>{
    const endPosintPopular: string = `${API_URI}movie/${imageCategory}?api_key=${API_KEY}&language=ko-KR&page=1`; //영화 최신,인기 1페이지만
    const endPosintTrend: string = `${API_URI}trending/movie/${trendCategory}?api_key=${API_KEY}&language=ko-KR&page=1`; //트렌드 영화
    const endPosintVedeos: string = `${API_URI}movie/${videoCategory}?api_key=${API_KEY}&language=ko-KR&page=3`;

    // let popularPoint: string = `${API_URI}movie/popular?api_key=${API_KEY}`  //인기
    // let nowPlayingPoint: string = `${API_URI}movie/now_playing?api_key=${API_KEY}`  //스트리밍(현재 상영중)
    // let tvPopularPoint: string = `${API_URI}tv/popular?api_key=${API_KEY}` //TV인기
    // let rentPoint: string = `${API_URI}movie/popular?api_key=${API_KEY}&watch_region=KR&with_watch_monetization_types=rent` //대여
    // let moviePopularPoint: string = `${API_URI}movie/popular?api_key=${API_KEY}&watch_region=KR&with_watch_monetization_types=rent` //극장 상영중
     //영화 최신,인기 1페이지만
    //let videoPoint: string = `${API_URI}movie/${영화ID값}/videos?api_key=${API_KEY}` // 영상 정보 추출

    fetchTrendList(endPosintTrend);
    fetchPopularList(endPosintPopular);
    fetchVideosList(endPosintVedeos);

  },[trendCategory, imageCategory, videoCategory]);


  return (
    <>
      {type === SectionTypeEnum.TREND ? (
        <div>
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
            <MainPosterCard  movieInfo={movieTrendList}/>
          </Box>
        </div>
      ): type === SectionTypeEnum.POSTER ? (
        <div>
          {/* 영화 이미지 리스트 */}
          <Box  sx={{padding:'20px'}}>
            <Box sx={{ width: '100%', display:'flex', paddingLeft:'20px'}}>
              <Typography variant="h5" >
                {title}
              </Typography>
              <Tabs
                value={imageCategory}
                onChange={handleChangeImage}
                aria-label="wrapped label tabs example"
              >
                <Tab value="popular" label={sub1} />
                <Tab value="upcoming" label={sub2} />
                <Tab value="now_playing" label={sub3} />
              </Tabs>
            </Box>
            {/* 영화 가로 이미지 리스트 */}
            <MainPosterCard  movieInfo={moviePopularList}/>
          </Box>
        </div>
      ):(
        <div>
          {/* 영화 예고편 영상 리스트 */}
          <Box  sx={{padding:'20px', }}>
            <Box sx={{ width: '100%', display:'flex', paddingLeft:'20px'}}>
              <Typography variant="h5">
                {title}
              </Typography>
              <Tabs
                value={videoCategory}
                onChange={handleChangeVideo}
                aria-label="wrapped label tabs example"
              >
                <Tab value="popular" label={sub1} />
                <Tab value="upcoming" label={sub2} />
                <Tab value="now_playing" label={sub3} />
              </Tabs>
            </Box>
            {/* 영화 가로 예고편 리스트 */}
            <ModalVideoCartd videoInfo={videoInfo}/>
          </Box>
        </div>
      )}


    </>
  )
}

export default MainSection