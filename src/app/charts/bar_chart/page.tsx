"use client";
import React,{useState, useEffect} from 'react'
import { API_URI } from '../../components/Config';
import { axisClasses, BarChart } from "@mui/x-charts";
import { defaultizeValueFormatter } from '@mui/x-charts/internals';
import { Accordion, AccordionSummary, AccordionDetails, Box, FormControl, FormControlLabel, FormLabel, List, ListItem, Radio, RadioGroup, Typography, FormGroup, Checkbox, Paper } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid, GridColDef  } from '@mui/x-data-grid';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

function page() {

  const [genresInfo, setGenresInfo] =useState<{id:number, name:string}[]>([]);
  const [genresMoviesInfo, setGenresMoviesInfo] =useState<any[]>([]);
  const [moviesIdInfo, setMoviesIdInfo] =useState<any[]>([]);
  const [revenueAndBudgetInfo, setRevenueAndBudgetInfo] =useState<any[]>([]);

  
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

  //영화 목록가져오기 (인기,최신순)
  // const fetchGenresMovies = async(endpoint: string) => {
  //   try{
  //     const res = await fetch(endpoint);
  //     const data = await res.json();

  //     if(data.results.length > 0){
  //       //console.log(data.results);
  //       setGenresMoviesInfo(data.results);
  //      // setMoviesIdInfo(data.results)
  //     }

  //   }catch(error){
  //     console.error("영화 장르 가져오기 실패!");
  //   }
  // }
 
  //영화 상세 API에서 금액 가져오기
  //const fetchRevenueAndBuget = async() => {
  //   try{
  //     //영화 목록가져오기 (인기,최신순)
  //     const data  = await Promise.all(
  //       genresMoviesInfo.map((movie) =>
  //         fetch(`${API_URI}movie/${movie.id}?api_key=${API_KEY}&language=ko-KR`)
  //           .then(res => res.json())    
  //       )    
  //     )
  //     setRevenueAndBudgetInfo(data);

  //   }catch(error){
  //     console.error("영화 수익 가져오기 실패!");
  //   }
  // }

  //위 2개 합쳐서 한번에
  const fetchGenresMoviesAndDetails = async (endpoint: string) => {
    try {
      const res = await fetch(endpoint);
      const data = await res.json();

      if(data.results.length > 0){
        setGenresMoviesInfo(data.results);
      }

      //영화 상세 API에서 금액 가져오기
      const dataDetailedMovies   = await Promise.all(
        genresMoviesInfo.map((movie) =>
          fetch(`${API_URI}movie/${movie.id}?api_key=${API_KEY}&language=ko-KR`)
            .then(res => res.json())    
        )    
      )
      setRevenueAndBudgetInfo(dataDetailedMovies);

    }catch(error){
      console.error("영화 정보 가져오기 실패!");
    }
  }


    useEffect(()=>{

      let endpointGenres: string = `${API_URI}genre/movie/list?api_key=${API_KEY}&language=ko-KR`; //장르 ID 정보
      let endpointGenresMovies: string = `${API_URI}discover/movie?api_key=${API_KEY}&language=ko-KR&with_genres=${changeGenres}&sort_by=${change}.${changeDescAsc}`//&with_genres=${GENRE_ID}&sort_by=popularity.desc&page=1` //장르별 영화들
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

      //fetchGenresMovies(endpointGenresMovies);
      //fetchRevenueAndBuget();
      //위 두개 합침
      fetchGenresMoviesAndDetails(endpointGenresMovies);
      
    },[genresMoviesInfo]); //genresMoviesInfo  revenueAndBudgetInfo


    //바 차트 영화 수익 데이터
    const dataset = revenueAndBudgetInfo
    .filter((movie) => movie.budget > 0)
    .map((movie) => ({
      title: movie.title, // 영화 제목
      budget: movie.budget, // 예산
      revenue: movie.revenue, // 수익
      profit: movie.revenue - movie.budget, // 이익 (수익 - 예산)
      //profitMargin: movie.budget > 0 ? ((movie.revenue - movie.budget) / movie.budget * 100).toFixed(2) : 0 // % 계산
    }))
   // .filter(Boolean)
    .sort((a, b) => b.profit - a.profit); // 이익이 높은 순서대로 정렬
  
    //파이 차트 수익률
    const pieDataset = revenueAndBudgetInfo
    .filter((movie) => movie.budget > 0)
    .map((movie,index) => ({
      id: index,
      //title: movie.title, // 영화 제목
      label: movie.title,
      value: Math.round(((movie.revenue - movie.budget) / movie.budget) * 100 * 100) / 100, // 수익률 계산
    }))
   // .filter(Boolean)
    .sort((a, b) => b.value - a.value); // 높은 수익률 순으로 정렬

    //영화제목
    const xAxisData = dataset.map((movie) => movie.title);

    // 숫자를 K, M, B 단위로 변환하는 함수
    const valueFormatter = (value:any) => {
      if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`; // 10억 이상 → B
      if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`; // 100만 이상 → M
      if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`; // 1000 이상 → K

      if (isNaN(value)) return '0'; 

      if (value <= 1_000_000_000) return `-${(value / 1_000_000_000).toFixed(1)}B`; // 10억 이하 → B

      return value; // 그대로 표시
    };
    
    //스타일 미사용
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


  const [change, setChange] = useState<string>('popularity');
  const [changeDescAsc, setChangeDescAsc] = useState<string>('desc');
  const [changeGenres, setChangeGenres] = useState<number[]>([]);

  //인기/최순 핸들러러
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

  //데이터 그리드드
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
  
  const dataRows = revenueAndBudgetInfo.map((movie, index) => ({
    id: index + 1, 
    title: movie.title, // 영화 제목
    budget: formatCurrency(movie.budget), // 예산
    revenue: formatCurrency(movie.revenue), // 수익
    profit: movie.revenue - movie.budget, //이익
    value: Math.round(((movie.revenue - movie.budget) / movie.budget) * 100 * 100) / 100, // 수익률 계산
  }))//.sort((a, b) => b.profit - a.profit); 

  return (
    <>
      <Box  sx={{display:'flex', justifyContent:'center',margin:'20px'}}> {/*display:'flex', alignItems:'center', justifyContent:'center', margin:'20px'*/}
        <Paper  elevation={3} sx={{padding:'5px', width:'250px',}} >
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
          <Paper elevation={3} sx={{marginBottom:'15px'}}>
            {/* 바 차트 */}
            <BarChart 
              dataset={dataset}
              xAxis={[{ scaleType: 'band', data: xAxisData }]} 
              yAxis={[{  label: '달러 (USD)',valueFormatter, }]} 
              series={[
                { dataKey: 'budget', stack: 'A',label: '예산' }, // 예산 시리즈    stack: 'A'
                { dataKey: 'revenue', stack: 'A', label: '수익' }, // 수익 시리즈    stack: 'A'시 하나로 됨
                { dataKey: 'profit', label: '이익' }, //이익
                //{ dataKey:'profitMargin', label:'수익률'}
              ]}
              //{...chartSetting}
              
              //라벨 위치
              sx={{
                [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translate(-30px, 0)',
                },
                padding:'30px'
              }}
              //그래프 크기 및 바 모양 조절
              borderRadius={9}
              width={1200}
              height={500}
            />
          </Paper>

          <Paper elevation={3} sx={{marginBottom:'15px'}}>
            {/*파이 차트 */}
            <PieChart
              series={[
                {
                  data: pieDataset,
                  highlightScope: { fade: 'global', highlight: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                  valueFormatter: (data) => `${data.value}%`,
                },
              ]}
              sx={{padding:0}}
              width={1200}
              height={300}
              
            />
          </Paper>

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

export default page