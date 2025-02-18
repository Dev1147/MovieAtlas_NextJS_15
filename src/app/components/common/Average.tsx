import React from 'react'
import {  Box, Typography, CircularProgress } from '@mui/material';

function Average({voteAverage}:{voteAverage:number}) {
  return (
    <>
      <Box sx={{position:'relative', display:'flex', top:-70, left:20}}>
        <CircularProgress sx={{backgroundColor:'black', padding:'2px', borderRadius:'50%'}} color='success' variant="determinate" value={Math.round(voteAverage * 10)}/>
        <Box sx={{ position:'absolute',top:9,left:8,}}>
          <Typography  sx={{color:'white', fontWeight:'bold'}} variant="caption" component="div" color="textSecondary">{Math.round(voteAverage * 10)}%</Typography>
        </Box>
      </Box>
    </>
  )
}

export default Average