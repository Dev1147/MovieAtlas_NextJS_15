"use client";
import { Box, Button, Checkbox, Chip, FormControl, FormControlLabel, FormGroup, FormLabel, Grid2, Input, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper';
import { API_URI } from '../../components/Config';
import MediaPosterCard from '@/app/components/common/MediaPosterCard';
import MediaCard from '@/app/components/common/MediaCard';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

function pages() {

  const [genresInfo, setGenresInfo] =useState<{id:number, name:string}[]>([]);
  const [change, setChange] = useState<string>('popularity');
  const [changeDescAsc, setChangeDescAsc] = useState<string>('desc');
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [pageCount, setPageCount] = useState<number>(2);
  const [changeGenres, setChangeGenres] = useState<number[]>([]);
  //인기/최순 핸들러
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>,) => {
    setChange(event.target.value)
  }

  // 내림차순/올림차순 핸들러
  const handleDescAsc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChangeDescAsc(event.target.value)
  }

  const handleGenres = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((genreId) => genreId !== id) : [...prev, id]
    );
  };

  //장르 핸들러
  const handleGenres2 = (event: React.ChangeEvent<HTMLInputElement>) => {
  
    const genreId:number  = parseInt(event.target.value);
    setSelectedGenres((prevGenre) =>
      // {
      //   if(event.target.checked){
      //     return [...prevGenre, genreId]
      //   }else{
      //     return prevGenre.filter((id:string) => id !== genreId);
      //   }
      // }
 
        event.target.checked
        ? [...prevGenre, genreId]  // 체크되었으면 장르 추가
        : prevGenre.filter((id) => id !== genreId)  // 체크 해제되었으면 장르 제거
    )

  }
  //장르 가져오기
  const fetchGenres = async(endpoint: string) => {
    try{
      const res = await fetch(endpoint);
      const data = await res.json();  
        //console.log(data.genres);
        setGenresInfo(data.genres);   

    }catch(error){
      console.error("영화 장르 가져오기 실패!");
    }
  }

  const [Movies, setMovies] = useState<any[]>([])
  const [search, setSearch] = useState('');


  const fetchMoviesData = async (endpoint:string, isSearch = false) =>{
    await fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      setMovies(data.results)
      // console.log(response.results)
      if(isSearch){ // 검색 결과만 설정
        setMovies([...data.results])
      }
      else{ // 기존 목록에 추가
        //setMovies([...Movies, ...data.results])
        setMovies([...data.results])
      }
      
    }) 
  }

  const fetchDiscoverMovies = async (endpoint:string) =>{
    await fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      setMovies([...data.results])    
    }) 
  }

  const handleSearch = () =>{
   
    const endpointSearch = `${API_URI}search/movie?api_key=${API_KEY}&query=${search}&include_adult=false&language=en-US&page=1`;
  
    // const endpointInitial  = `${API_URI}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    let endpointDiscoverMovies: string = `${API_URI}discover/movie?api_key=${API_KEY}&language=ko-KR&with_genres=${changeGenres}&sort_by=${change}.${changeDescAsc}`//&with_genres=${GENRE_ID}&sort_by=popularity.desc&page=1` //
    // console.log(search)
    // console.log(endpointSearch)
    //fetchMoviesSearch(endpointSearch)

    if(!search){
      fetchMoviesData(endpointDiscoverMovies,false)
    }else{
      fetchMoviesData(endpointSearch,true)
    }
    
  }

  const leadMoreHandler = () => {
    setPageCount(pageCount + 2);
    // let endpointDiscoverMovies: string = `${API_URI}discover/movie?api_key=${API_KEY}&language=ko-KR&with_genres=${changeGenres}&sort_by=${change}.${changeDescAsc}&page=${pageCount}`//&with_genres=${GENRE_ID}&sort_by=popularity.desc&page=1` //
    // console.log(pageCount)
    // fetchDiscoverMovies(endpointDiscoverMovies);
 

  };

  useEffect(()=>{

    let endpointGenres: string = `${API_URI}genre/movie/list?api_key=${API_KEY}&language=ko-KR`; //장르 ID 정보
    let endpointDiscoverMovies: string = `${API_URI}discover/movie?api_key=${API_KEY}&language=ko-KR&sort_by=${change}.${changeDescAsc}&page=${pageCount}`//&with_genres=${changeGenres}&with_genres=${GENRE_ID}&sort_by=popularity.desc&page=1` //
    // let endpointGenresRevenue: string = `${API_URI}movie/939243?api_key=${API_KEY}`

    fetchGenres(endpointGenres);
    fetchDiscoverMovies(endpointDiscoverMovies);

    
  },[]);

  return (
    <>
      <Box sx={{border:'1px solid red', width:'100%', height:'600px', display:'flex', paddingLeft:'40px', paddingRight:'40px', gap:2}}>
        <Box sx={{border:'1px solid green', width:'20%', height:'600px'}}>

          {/* 영화 검색 */}
          <Box>
            <TextField type='text' 
              style={{ width: 'calc(100% - 80px)' }} 
              placeholder='영화 제목을 입력하세요'  
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) =>{
                if(e.key ==='Enter'){ handleSearch();}
              }}
              />
            <Button variant='contained' onClick={handleSearch} >검색</Button>
          </Box>
          <Button variant='contained' onClick={leadMoreHandler} >더 불러오기</Button>


          {/* <Paper  elevation={3} sx={{padding:'5px', width:'250px',}} > */}
            {/* 정렬 */}
            {/* <Box sx={{borderBottom: '1px solid #ccc',padding:'5px', }}>
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
                </RadioGroup>
              </FormControl>
            </Box> */}

            {/* 장르 */}
            {/* <Box sx={{borderBottom: '1px solid #ccc',padding:'5px',}}>
              <FormControl>
                <FormLabel id="group">장르</FormLabel>
                <FormGroup sx={{ padding: 0 ,display:'flex',flexWrap: 'wrap',flexDirection: 'row',gap:1}} >
                  {genresInfo.map((genre, index) => (
                      <Chip key={index} label={genre.name} variant={selectedGenres.includes(genre.id) ? 'filled' : 'outlined'} color={selectedGenres.includes(genre.id) ? 'primary' : 'default'} onClick={() =>handleGenres(genre.id)} />
                  ))}
                </FormGroup>
              </FormControl>
            </Box> */}

            {/* 순서 */}
            {/* <Box sx={{borderBottom: '1px solid #ccc',padding:'5px',}}>
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
          </Paper> */}
        </Box>
        <Box sx={{border:'1px solid blue', width:'80%', height:'600px'}}>
          <MediaPosterCard type="poster" mediaCardInfo={Movies}/>
 
        </Box>
      </Box>




    </>   
  )
}

export default pages