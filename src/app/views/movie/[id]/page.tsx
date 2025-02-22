"use client";
import React, { useEffect, useState } from 'react'
import { API_URI,IMAGE_BASE_URL } from '../../../components/config';
import { useParams } from 'next/navigation';
import { Box, Button, Chip, Grid2, Rating, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import MediaCard from '@/app/components/ui/MediaCard';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import LargeAverage from '../../../components/common/LargeAverage';
import LikeButton from '@/app/components/common/LikeButton';
import VideoModal from '@/app/components/ui/VideoModal';
import Image from 'next/image';
import CustomBarChart from '@/app/components/charts/CustomBarChart';

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
  profile_path: string,
  character: string
  budget:number,
  revenue:number,
}

function Page() {
  //id값 가져오기
  const params = useParams();
  const {id} = params; // 객체로 {} 감쌈 alert(id)

  const [movie, setMovie] = useState<MoviesInfo | null>(null);
  const [casts, setCasts] = useState<{ profile_path: string; name: string; character: string }[]>([]);
  const [crews, setCrews] = useState<{ profile_path: string; name: string; character: string }[]>([]);
 // const [video, setVideo] = useState<string[]>([]);
  const [visibleCount, setvisibleCount] = useState(7);
  const [tabInfo, setTabInfo] = useState<string>('casts');
  const [exchangeRate, setExchangeRate] = useState<number>(0);

  useEffect(()=>{
    //영화 출연진
    const endpointCrew = `${API_URI}movie/${id}/credits?api_key=${API_KEY}`;
    //영화 상세 정보
    const endpointDetailInfo = `${API_URI}movie/${id}?api_key=${API_KEY}`;
    //영화 예고편
    //const endpointVideo = `${API_URI}movie/${id}/videos?api_key=${API_KEY}`;

    const fetchDetailInfo = async () => {
      const res = await fetch(endpointDetailInfo);
      const data = await res.json();
      //console.log(data)
      setMovie(data);
    }

    const fetchCrewInfo = async () => {
      const res = await fetch(endpointCrew);
      const data = await res.json();
      //console.log(data)
      setCasts(data.cast);
      setCrews(data.crew);
    }

    // const fetchVideoInfo = async () => {
    //   const res = await fetch(endpointVideo);
    //   const data = await res.json();
    //   //console.log(data)
    //   setVideo(data.results[0]);
    // }

    fetchDetailInfo();
    fetchCrewInfo();
    //fetchVideoInfo();

      //const cookies = document.cookie.split('; ');
      // const userRole = cookies.find(cookie => cookie.startsWith('userrole='));
      // const userCookie = cookies.find(cookie => cookie.startsWith('username='));

      const fetchExchangeRate = async () => {
        const res = await fetch("https://open.er-api.com/v6/latest/USD"); // 예제 API (무료)
        const data = await res.json();
        setExchangeRate(data.rates.KRW) // KRW 환율 반환
      };

      fetchExchangeRate();
  },[id])

  if (!movie) return <p>Loading...</p>; 

  const leadMoreHandler = () => {
    setvisibleCount(visibleCount + 7);
    console.log(visibleCount)
  }

  const handleTabInfoChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabInfo(newValue);
  };

  //상영시간 계산
  const totalMinutes = movie.runtime;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const timeString = `${hours}h${minutes}m`;
 
  // const [modalIsOpen, setModalIsOpen] = useState(false);

  // const [checkFavorite, setCheckFavorite] = useState<boolean>(false);
  // const [checkBookmark, setCheckBookmark] = useState<boolean>(false);

  // const videoUrl = `https://www.youtube.com/embed/${videoInfo.key}`;

  // const checkFavoriteHandler = () => {
  //   setCheckFavorite(prevCheck => !prevCheck);
  // }

  // const checkBookmarkHandler = () => {
  //   setCheckBookmark(prevCheck => !prevCheck);
  // }

  // const openModal = () => {

  //   setModalIsOpen(true);
  // };

  // const closeModal = () => {
  //   setModalIsOpen(false);
  // };


  const chartData = [{
    title: movie.title, // 영화 제목
    budget: isNaN(movie.budget) ? 0 : movie.budget, // 예산
    revenue: isNaN(movie.revenue) ? 0 : movie.revenue , // 수익
    }
  ]


  return (
    <>
      <Grid2 container style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
        url('${IMAGE_BASE_URL}w1280${movie.backdrop_path}') center top / cover no-repeat`, // background 속성에 모든 스타일을 통합
        minHeight: '500px',
        width: '100%',
        //position: 'relative',
        display:'flex',
        flexDirection:'row'
        }}>
        {/* 포스터 */}
        <Grid2 sx={{position: 'relative',top:50, left:100}}>
          <Image src={`${IMAGE_BASE_URL}w1280${movie.poster_path}`} alt={`${movie.name}`} width={300} height={400} style={{width:'300px', height:'400px'}}/>
        </Grid2>

        {/* 포스터 영화 정보  */}
        <Box sx={{position: 'relative',top:50, left:140 ,color:'white'}}>
          {/* 제목과 년도 */}
          <Box>
            <span style={{ color:'white', fontSize:'30px', fontWeight:'bolder'}}>{movie.title}</span>
            <span style={{ color:'white', fontSize:'30px', fontWeight:'lighter'}}>
              {movie.release_date ? `(${movie.release_date.slice(0,4)})` : '날짜 정보 없음'}
            </span>
          </Box>

          {/* 년도, 장르, 상영시간 정보 */}
          <Box sx={{display:'flex', marginTop:'10px'}}>
            <Typography variant="body2" color="textSecondary" sx={{color:'white'}}>
              {movie.release_date} ({movie.origin_country})
            </Typography>
            <Box component="span" sx={{ mx: 1 }}>•</Box>
            <Box display="inline-flex" gap={1} >
              {Array.isArray(movie.genres) &&
                movie.genres.map((genre: { id: number, name: string }) => (
                  <Chip key={genre.id} label={genre.name} variant="outlined" size="small" sx={{color:'white'}}/>
                ))}
            </Box>
            <Box component="span" sx={{ mx: 1 }}>•</Box>
            <Typography variant="body2" >{timeString}</Typography>
          </Box>

          {/* 평점 및 회원점수 */}
          <Box sx={{display:'flex', gap:1, marginTop:'10px'}}>
            <Rating  name="half-rating-read" value={movie.vote_average / 2} precision={0.5} readOnly />
            <LargeAverage voteAverage={movie.vote_average} />
            <span>&nbsp;&nbsp;당신은 어떻한가요?</span>
          </Box>

          {/* 좋아요, 트레일러 영상  */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <LikeButton movieId={movie.id} movieTitle={movie.title} moviePoster={movie.poster_path}/>
            <VideoModal movieId={movie.id}/>
          </Box>

          {/*개요 및 줄거리  */}
          <Box sx={{width:'900px', marginTop:'10px'}}>
            <Typography sx={{fontSize:'22px',}}>{movie.tagline}</Typography>
            <Typography variant='h5' sx={{fontWeight:'bold', marginTop:'15px'}}>개요</Typography>
            <Typography sx={{display:'flex', flexWrap:'wrap'}}>{movie.overview}</Typography>
          </Box>
        </Box>
      </Grid2>


      {/* 출연진, 스태프 정보  */}
      <Grid2 sx={{padding:'10px'}}>
        <TabContext value={tabInfo}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider',display:'flex', justifyContent:'space-between',padding:'10px' }}>
            <TabList onChange={handleTabInfoChange} aria-label="lab API tabs example">
              <Tab label="출연진" value="casts" />
              <Tab label="스태프" value="crews" />
            </TabList>
            <Button  size='small' variant='contained' onClick={leadMoreHandler}>더 보기</Button>
          </Box>
          <TabPanel value="casts">
            {/* 출연진 */}
            <MediaCard mediaCardInfo={casts} shownCount={visibleCount}/>
          </TabPanel>
          <TabPanel value="crews">
            {/* 감독 및 스태프 */}
            <MediaCard mediaCardInfo={crews} shownCount={visibleCount}/>
          </TabPanel>
        </TabContext>
      </Grid2>
      
      <Grid2 sx={{padding:'10px'}}>
        <Box sx={{marginBottom:'10px', borderBottom: '1px solid #ccc'}}>
          <Typography variant='h5'>수익 차트</Typography>
        </Box>
        <CustomBarChart dataInfo={chartData} showMargin={true}/>
      </Grid2>

      <TableContainer sx={{padding:'15px'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">제작비(원) 현재환율:{(exchangeRate).toFixed(2)}</TableCell>
            <TableCell align="center">수익(원)</TableCell>
            <TableCell align="center">수익률(%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align="center">{new Intl.NumberFormat('ko-KR').format(movie.budget * exchangeRate)}</TableCell>
            <TableCell align="center">{new Intl.NumberFormat('ko-KR').format(movie.revenue * exchangeRate)}</TableCell>
            <TableCell align="center">{ ((movie.revenue - movie.budget) / movie.budget * 100).toFixed(2) }</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
        
      

    </>
  )
}

export default Page