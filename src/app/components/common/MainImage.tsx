"use client";
import { Button, Grid2, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {API_URI, IMAGE_BASE_URL} from '../config';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

function MainImage() {
  const [mainImage, setMainImage] = useState<{poster_path:string}[]>([]);
  useEffect(() => {
    const popularPoint: string = `${API_URI}movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`

    fetch(popularPoint)
      .then(res => res.json())
      .then(data => {
        // console.log(data.results);
        setMainImage(data.results.slice(0,5));
      });
  },[]);

  return (
    <>
      <Grid2 container  sx={{ width:'100%', height:'400px', marginTop:'0px', display:'flex', justifyContent:'center'}}>
        <Grid2   sx={{ width:'1150px', height:'400px',position:'absolute'}}>
          {/* 대표 글 */}
          <Grid2  sx={{position:'absolute', zIndex:'2', bottom:'100px',left:'30px', color:'white'}}>
            <Typography variant='h2' >2024년 영화</Typography>
            <Typography variant='subtitle1' >최고의 작폼과 최악의 작품을 확인해보세요.</Typography>
            <Button variant="outlined" sx={{marginTop:'15px',borderWidth:'3px',borderColor:'white' ,borderRadius: '20px', color:'white'}}>Check it out!</Button>
          </Grid2>

          {/* 대표 포스터 */}
          <Grid2 size={{xs:10, sm:10, md:12}} sx={{position:'absolute',display:'flex'}}>
            {Array.isArray(mainImage) && mainImage.map((image, index) => (
              <div key={index} style={{background:`url(${IMAGE_BASE_URL}/w500${image.poster_path})`, width:'230px', height:'400px', backgroundSize:'cover',  backgroundPosition: "center", backgroundRepeat: "no-repeat"}}></div>   
            ))}
          </Grid2>

          {/* 그라데이션 */}
          <Grid2 sx={{width:'100%', height:'100%', position:'relative',zIndex:'1', background:'linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))'}}></Grid2>          
        </Grid2 >
      </Grid2>
    </>
  )
}

export default MainImage