"use client"
import React, { useEffect, useState } from 'react'
import {API_URI, API_KEY, IMAGE_BASE_URL} from '../Config';
import Image from "next/image";
import { Grid, Grid2, Stack, Box, Paper, Tabs, Tab, ImageList, ImageListItem, Typography } from '@mui/material';
import style from '../style/style.module.css';


function PosterRowListPage({movieInfo}:{movieInfo:{poster_path:string, title:string, release_date:string}[]}) {

  return (
    <>
      {/* 영환 콘텐츠 리스트 */}
      <Box sx={{display: 'flex', overflowX: 'scroll', gap: '20px', width:'100%', height:'350px', alignItems:'center', paddingLeft:'25px',paddingRight:'25px'}}>
        {Array.isArray(movieInfo) && movieInfo.slice(0,10).map((movie, index) => (  
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
    </>
  )
}

export default PosterRowListPage