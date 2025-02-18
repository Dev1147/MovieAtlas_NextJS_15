"use client";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import { API_URI } from '../../components/config';
import MediaPosterCard from '@/app/components/common/MediaPosterCard';
import MovieSearchBar from '@/app/components/common/MovieSearchBar';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

export type MoviesInfo = {
  id:number, 
  poster_path:string, 
  name:string,
  title:string, 
  release_date:string, 
  vote_average:number,
  runtime:number,
  backdrop_path:string,
  origin_country:string,
  genres:string,
  tagline:string,
  overview:string,
  character:string,
}

function Page() {

  const [change, setChange] = useState<string>('popularity');
  const [changeDescAsc, setChangeDescAsc] = useState<string>('desc');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [Movies, setMovies] = useState<MoviesInfo[]>([])
  const [search, setSearch] = useState('');

  //인기,최신 핸들러
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>,) => {
    setChange(event.target.value)
  }

  // 내림차순/올림차순 핸들러
  const handleDescAsc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChangeDescAsc(event.target.value)
  }

  const fetchDiscoverMovies = async (endpoint:string, isSearch:boolean) =>{
    try{
      const res = await fetch(endpoint);
      const data =  await res.json();
        if(isSearch){ // 검색할 경우
          setMovies(data.results);
        }else{ //초기값 또는 검색 빈값으로 하면 초기값
          //setMovies(prevMovies => [...prevMovies, ...data.results]); // 이전 값 덮어쓰기
          setMovies(data.results);
          setCurrentPage(data.page);  

        }

    }catch(error){
      console.error("영화 정보 추출 실패!",error);
    }
  }

  //페이지 더 불러오기
  const leadMoreHandler = () => {
      const endpointDiscoverMovies: string = `${API_URI}discover/movie?api_key=${API_KEY}&language=ko-KR&sort_by=${change}.${changeDescAsc}&page=${currentPage + 1}`//`${API_URI}discover/movie?api_key=${API_KEY}&language=ko-KR&with_genres=${changeGenres}&sort_by=${change}.${changeDescAsc}&page=${currentPage + 2}`//&with_genres=${GENRE_ID}&sort_by=popularity.desc&page=1` //
      fetchDiscoverMovies(endpointDiscoverMovies, Boolean(search));

  };


  useEffect(()=>{

    //const endpointGenres: string = `${API_URI}genre/movie/list?api_key=${API_KEY}&language=ko-KR`; //장르 ID 정보
    //const endpointDiscoverMovies: string = `${API_URI}discover/movie?api_key=${API_KEY}&language=ko-KR&sort_by=${change}.${changeDescAsc}&page=1`//&with_genres=${changeGenres}&with_genres=${GENRE_ID}&sort_by=popularity.desc&page=1` //
    const endpointDiscoverMovies:string = search ? `${API_URI}search/movie?api_key=${API_KEY}&query=${search}&include_adult=false&language=en-US`
    :`${API_URI}discover/movie?api_key=${API_KEY}&language=ko-KR&sort_by=${change}.${changeDescAsc}&page=1`
    ;

    fetchDiscoverMovies(endpointDiscoverMovies, Boolean(search));

    
  },[search,change,changeDescAsc]);

  return (
    <>
      <Box sx={{paddingLeft:'40px', paddingRight:'40px', marginBottom:'20px'}}>
        <Typography variant='h4'> 영화 검색</Typography>
        <hr/>
      </Box>

      <Box sx={{width:'100%', height:'700px', display:'flex', paddingLeft:'40px', paddingRight:'40px', gap:2}}>
        <Paper elevation={3} sx={{width:'20%', height:'590px', padding:'10px'}}>
          {/* 영화 검색 */}
          <MovieSearchBar setSearch={setSearch}/>   {/* setSearch 상태를 전달하고 받기 */}
          {/* 영화 더 불러오기 */}
          <Button variant='contained' onClick={leadMoreHandler} >더 불러오기</Button>

          {/* 정렬 */}
          <Box sx={{borderBottom: '1px solid #ccc',padding:'5px', }}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">정렬</FormLabel>
              <RadioGroup
                row
                sx={{ padding: 0 }} 
                aria-labelledby="demo-radio-buttons-group-label"
                value={change}
                name="radio-buttons-group"
                onChange={handleChange}
              >
                <FormControlLabel value="popularity" control={<Radio size="small"/>} label="인기순" />
                <FormControlLabel value="revenue" control={<Radio size="small"/>} label="수익순" />
                <FormControlLabel value="release_date" control={<Radio size="small"/>} label="개봉일순" />
                <FormControlLabel value="vote_count" control={<Radio size="small"/>} label="투표순" />
              </RadioGroup>
            </FormControl>
          </Box>

          {/* 순서 */}
          <Box sx={{borderBottom: '1px solid #ccc',padding:'5px',}}>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">순서</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={changeDescAsc}
                onChange={handleDescAsc}
              >
                <FormControlLabel value="desc" control={<Radio />} label="내림차순" />
                <FormControlLabel value="asc" control={<Radio />} label="올림차순" />
              </RadioGroup>
            </FormControl>
          </Box>
        </Paper>
        
        {/* 영화 포스터 */}
        <MediaPosterCard type="poster" mediaPosterCardInfo={Movies}/>

      </Box>




    </>   
  )
}

export default Page