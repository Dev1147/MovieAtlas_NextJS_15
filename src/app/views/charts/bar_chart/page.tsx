"use client";
import React,{useState, useEffect} from 'react'
import { API_URI } from '../../../components/config';
import { Box, FormControl, FormControlLabel, FormLabel,Radio, RadioGroup, FormGroup, Checkbox, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CustomPieChart from '@/app/components/charts/CustomPieChart';
import CustomBarChart from '@/app/components/charts/CustomBarChart';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

function Page() {

  const [genresInfo, setGenresInfo] =useState<{id:number, name:string}[]>([]);
  const [moviesIds, setMoviesIds] =useState<number[]>([]);
  const [moviesDetailInfo, setMoviesDetailInfo] =useState<{title:string, budget:number, revenue: number}[]>([]);
  const [change, setChange] = useState<string>('popularity');
  const [changeDescAsc, setChangeDescAsc] = useState<string>('desc');
  const [changeGenres, setChangeGenres] = useState<number[]>([]);
  
  //장르 가져오기
  const fetchGenres = async(endpoint: string) => {
    try{
      const res = await fetch(endpoint);
      const data = await res.json();  
        //console.log(data.genres);
        setGenresInfo(data.genres);   

    }catch(error){
      console.error("영화 장르 가져오기 실패!",error);
    }
  }

 const fetchGetMoviesIds = async(endpoint: string) => {
    try{
      const res = await fetch(endpoint);
      const data = await res.json();  
      const movieIds = data.results.map((movie:{id:number}) => movie.id);
      setMoviesIds(movieIds);   

    }catch(error){
      console.error("영화ID 가져오기 실패!",error);
    }
}



  // const fetchGenresMoviesAndDetails = async (endpoint: string) => {
  //   try {
  //     const res = await fetch(endpoint);
  //     const data = await res.json();

  //     if(data.results.length > 0){
  //       const movieIds = data.results.map((movie:{id:number}) => movie.id);
  //       //console.log(movieIds);
  //       setMoviesIds(movieIds);
  //     }



  //     //영화 상세 API에서 금액 가져오기
  //     // const dataDetailedMovies   = await Promise.all(
  //     //   moviesIds //.filter((movie) => movie.budget > 0 && movie.revenue > 0)
  //     //   .map((id) =>
  //     //     fetch(`${API_URI}movie/${id}?api_key=${API_KEY}&language=ko-KR`)
  //     //       .then(res => res.json())    
  //     //   )    
  //     // );
  //     //console.log("length:", dataDetailedMovies.length); // 배열 확인

  //     // setMoviesDetailInfo(dataDetailedMovies);

  //   }catch(error){
  //     console.error("영화 정보 가져오기 실패!",error);
  //   }
  // }


  useEffect(()=>{

    const endpointGenres: string = `${API_URI}genre/movie/list?api_key=${API_KEY}&language=ko-KR`; //장르 ID 정보
    const endpointMovies: string = `${API_URI}discover/movie?api_key=${API_KEY}&language=ko-KR&with_genres=${changeGenres}&sort_by=${change}.${changeDescAsc}`//&with_genres=${GENRE_ID}&sort_by=popularity.desc&page=1` //장르별 영화들
    // let endpointMoviesDetail: string = `${API_URI}movie/${id}?api_key=${API_KEY}&language=ko-KR`

    fetchGenres(endpointGenres);
    fetchGetMoviesIds(endpointMovies);

    const fetchGetMoviesDetail = async() => {
      try{
    
        const dataDetailedMovies   = await Promise.all(
          moviesIds //.filter((movie) => movie.budget > 0 && movie.revenue > 0)
          .map((id) =>
            fetch(`${API_URI}movie/${id}?api_key=${API_KEY}&language=ko-KR`)
              .then(res => res.json())    
          )    
        );
    
        setMoviesDetailInfo(dataDetailedMovies);   
    
      }catch(error){
        console.error("영화 정보 가져오기 실패!",error);
      }
    }

    fetchGetMoviesDetail();
    
  },[moviesIds, change, changeDescAsc, changeGenres]);


  //인기/최순 핸들러
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>,) => {
    setChange(event.target.value)
  }

  // 내림차순/올림차순 핸들러
  const handleDescAsc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChangeDescAsc(event.target.value)
  }

  //장르 핸들러
  const handleGenres = (event: React.ChangeEvent<HTMLInputElement>) => {
  
    const genreId:number  = parseInt(event.target.value);
    setChangeGenres((prevGenre) =>
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

  //데이터 그리드
  const columns = [
    { field: 'id', headerName: '번호', width: 50 },
    { field: 'title', headerName: '제목', width: 150, },
    { field: 'budget', headerName: '예산', width: 150, },
    { field: 'revenue', headerName: '수익', width: 150, },
    { field: 'profit', headerName: '이익', width: 150},
    { 
      field: 'value', 
      headerName: '수익률 (%)',
      width: 150, 
      valueFormatter: (data:number) => {
        // 예산이 0이거나 값이 비정상적인 경우 처리
        if (isNaN(data) || data === Infinity || data === -Infinity) {
          return '0%';  // 0%로 표시하거나 다른 값으로 처리 가능
        }
        return `${data}%`; // 정상적으로 수익률 표시
      }
    },
   
  ];

  const formatCurrency = (amount:number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  const dataRows = moviesDetailInfo
    .filter((movie) => movie.budget > 0 && movie.revenue > 0)//api의 0인 수익, 예산 제외 
    .map((movie, index) => ({
      id: index + 1, 
      title: movie.title, // 영화 제목
      budget: formatCurrency(movie.budget), // 예산
      revenue: formatCurrency(movie.revenue), // 수익
      profit: movie.revenue - movie.budget, //이익
      value: Math.round(((movie.revenue - movie.budget) / movie.budget) * 100 * 100) / 100, // 수익률 계산
    }))
    //.sort((a, b) => b.value - a.value); // 높은 수익률 순으로 정렬

  return (
    <>
      <Box  sx={{display:'flex', justifyContent:'center',margin:'20px'}}> {/*display:'flex', alignItems:'center', justifyContent:'center', margin:'20px'*/}
        <Paper  elevation={3} sx={{padding:'5px', width:'250px', }} >
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
              </RadioGroup>
            </FormControl>
          </Box>

          {/* 장르 */}
          <Box sx={{borderBottom: '1px solid #ccc',padding:'5px',}}>
            <FormControl>
              <FormLabel id="group">장르</FormLabel>
              <FormGroup sx={{ padding: 0 ,display:'flex',flexWrap: 'wrap',flexDirection: 'row'}} >
                {genresInfo.map((genre, index) => (
                  // <ListItem key={index}>
                    <FormControlLabel key={index} value={genre.id} control={<Checkbox onChange={handleGenres}/>} label={genre.name} />
                  //  </ListItem> 
                ))}
          
              {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
              <FormControlLabel required control={<Checkbox />} label="Required" />
              <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}

              </FormGroup>
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



        <Box sx={{paddingLeft:'15px'}}>
          {/* 바 차트 */}
          <CustomBarChart dataInfo={moviesDetailInfo} showMargin={false}/>

          {/*파이 차트 */}
          <CustomPieChart dataInfo={moviesDetailInfo}/>

          <Paper elevation={3} sx={{marginBottom:'0px'}}>
            {/* 데이타 그리드 */}
            <Box>
              <DataGrid
                rows={dataRows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                //checkboxSelection
                disableRowSelectionOnClick
                sx={{width:'1200px'}}
              />
            </Box>
          </Paper>
          
        </Box> 
      </Box>

    </>
  )
}

export default Page;