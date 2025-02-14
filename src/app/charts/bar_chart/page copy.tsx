"use client";
import React,{useState, useEffect} from 'react'
import { API_URI } from '../../components/Config';
import { axisClasses, BarChart } from "@mui/x-charts";
import { defaultizeValueFormatter } from '@mui/x-charts/internals';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

function page() {

  const [genresInfo, setGenresInfo] =useState<any[]>([]);
  const [genresMoviesInfo, setGenresMoviesInfo] =useState<any[]>([]);
  const [moviesIdInfo, setMoviesIdInfo] =useState<any[]>([]);
  const [revenueAndBudgetInfo, setRevenueAndBudgetInfo] =useState<any[]>([]);

  //장르 가져오기
  const fetchGenres = async(endpoint: string) => {
    try{
      const res = await fetch(endpoint);
      const data = await res.json();
   
        //console.log(data);
        setGenresInfo(data);
      

    }catch(error){
      console.error("영화 장르 가져오기 실패!");
    }
  }

  //장르별 영화 인기순으로 (평점순시 만점 많음)
  const fetchGenresMovies = async(endpoint: string) => {
    try{
      const res = await fetch(endpoint);
      const data = await res.json();

      if(data.results.length > 0){
        //console.log(data.results);
        setGenresMoviesInfo(data.results);
       // setMoviesIdInfo(data.results)
      }

    }catch(error){
      console.error("영화 장르르 가져오기 실패!");
    }
  }
 
  const fetchRevenueAndBuget = async() => {
    try{
      const data  = await Promise.all(
        genresMoviesInfo.map((movie) =>
          fetch(`${API_URI}movie/${movie.id}?api_key=${API_KEY}&language=ko-KR`)
            .then(res => res.json())
            
        )    
      )
      setRevenueAndBudgetInfo(data);
 
      // responses.forEach(data => {
      //  // console.log(data)
      // })
   


    }catch(error){
      console.error("영화 수익 가져오기 실패!");
    }
  }

  const GENRE_ID = 12;
    useEffect(()=>{

      let endpointGenres: string = `${API_URI}genre/movie/list?api_key=${API_KEY}&language=ko-KR`; //장르 ID 정보
      let endpointGenresMovies: string = `${API_URI}discover/movie?api_key=${API_KEY}&language=ko-KR&with_genres=${GENRE_ID}&sort_by=popularity.desc&page=1` //장르별 영화들
      let endpointGenresRevenue: string = `${API_URI}movie/939243?api_key=${API_KEY}`
      //let endPosintImages: string = `${API_URI}movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`; //영화 최신,인기 1페이지만
  
      // let popularPoint: string = `${API_URI}movie/popular?api_key=${API_KEY}`  //인기
      // let nowPlayingPoint: string = `${API_URI}movie/now_playing?api_key=${API_KEY}`  //스트리밍(현재 상영중)
      // let tvPopularPoint: string = `${API_URI}tv/popular?api_key=${API_KEY}` //TV인기
      // let rentPoint: string = `${API_URI}movie/popular?api_key=${API_KEY}&watch_region=KR&with_watch_monetization_types=rent` //대여
      // let moviePopularPoint: string = `${API_URI}movie/popular?api_key=${API_KEY}&watch_region=KR&with_watch_monetization_types=rent` //극장 상영중
     
     
      //let movie = `${API_URI}movie/${movie_id}?api_key=${API_KEY}`
      //let videoPoint: string = `${API_URI}movie/${영화ID값}/videos?api_key=${API_KEY}` // 영상 정보 추출
  
      fetchGenres(endpointGenres);
      fetchGenresMovies(endpointGenresMovies);
      fetchRevenueAndBuget();
    },[genresMoviesInfo]);

  
    const xAxisData = genresMoviesInfo.map((movie) => movie.title) ;
    const seriesData = [
      {
        data: genresMoviesInfo.map((movie) => movie.vote_average).sort((a, b) => b - a),
      }
    ];
    const seriesData2 = [
      {
        data: genresMoviesInfo.map((movie) => movie.vote_count).sort((a, b) => b - a),
      }
    ];
    const seriesData3 = [
      {
        data: genresMoviesInfo.map((movie) => movie.popularity).sort((a, b) => b - a),
      }
    ];




    // 데이터셋 준비
    const dataset2 = revenueAndBudgetInfo.map((movie, index) => ({
      title: movie.title, // 영화 제목
      budget: revenueAndBudgetInfo.map((budget) => budget.budget)[index],//.sort((a, b) => b - a)[index], // 해당 영화의 예산
      revenue: revenueAndBudgetInfo.map((revenue) => revenue.revenue)[index],//.sort((a, b) => b - a)[index], // 해당 영화의 수익
    }));

    const dataset = revenueAndBudgetInfo
    .map((movie) => ({
      title: movie.title, // 영화 제목
      budget: movie.budget, // 예산
      revenue: movie.revenue, // 수익
      profit: movie.revenue - movie.budget, // 이익 (수익 - 예산)
    }))
    .sort((a, b) => b.profit - a.profit); // 이익이 높은 순서대로 정렬
  
    const xAxisData2 = dataset.map((movie) => movie.title);
    const yAxisData2 = dataset.map((movie) => movie.revenue);
    // 숫자를 K, M, B 단위로 변환하는 함수
    const valueFormatter = (value:any) => {
      if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`; // 10억 이상 → B
      if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`; // 100만 이상 → M
      if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`; // 1000 이상 → K

      if (value === 0) return '0'; 

      if (value <= 1_000_000_000) return `-${(value / 1_000_000_000).toFixed(1)}B`; // 10억 이하 → B
      //if (value <= 1_000_000) return `-${(value / 1_000_000).toFixed(1)}M`; // 100만 이하 → M
      // if (value <= 1_000) return `${(value / 1_000).toFixed(1)}K`; // 1000 이하 → K
      return value; // 그대로 표시
    };
    
    const chartSetting = {
      // yAxis: [
      //   {
      //     label: '달러 (USD)'
      //   },
      // ],
      width: 500,
      height: 300,
      sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
          transform: 'translate(-20px, 0)',
        },
      },
    };
  return (
    <div style={{paddingLeft:'50px'}}>
      <BarChart  xAxis={[{ scaleType: 'band', data: xAxisData }]} 
        series={seriesData}
        width={500}
        height={300}
      />
      <BarChart  xAxis={[{ scaleType: 'band', data: xAxisData }]} 
        series={seriesData2}
        width={500}
        height={300}
      />
      <BarChart  xAxis={[{ scaleType: 'band', data: xAxisData }]} 
        series={seriesData3}
        width={500}
        height={300}
      />

      <BarChart 
        dataset={dataset}
        xAxis={[{ scaleType: 'band', data: xAxisData2 }]} 
        yAxis={[{  label: '달러 (USD)',valueFormatter, }]} 
        series={[
          { dataKey: 'budget', label: '예산' }, // 예산 시리즈    stack: 'A'
          { dataKey: 'revenue', label: '수익' }, // 수익 시리즈    stack: 'A'시 하나로 됨
          { dataKey: 'profit', label: '이익' }, //이익
        ]}
        //{...chartSetting}
        borderRadius={9}
        sx={{
          [`.${axisClasses.left} .${axisClasses.label}`]: {
          transform: 'translate(-30px, 0)',
          },
          padding:'30px',
        }}
        width={800}
        height={500}
      />
    </div>
  )
}

export default page