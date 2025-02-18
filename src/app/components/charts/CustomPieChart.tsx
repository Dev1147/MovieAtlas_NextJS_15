import { Paper } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import React from 'react'

type PieType = {
budget:number,
revenue:number,
title:string,
}

function CustomPieChart({dataInfo}:{dataInfo:PieType[]}) {


  //파이 차트 수익률
  const pieDataset = dataInfo
    .filter((movie) => !isNaN(movie.budget) && !isNaN(movie.revenue) && movie.budget > 0 && movie.revenue > 0 ) //api의 0인 수익, 예산 제외
    .map((movie,index) => ({
      id: index,
      //title: movie.title, // 영화 제목
      label: movie.title,
      value: Math.round(((movie.revenue - movie.budget) / movie.budget) * 100 * 100) / 100, // 수익률 계산
    }))
    .sort((a, b) => b.value - a.value); // 높은 수익률 순으로 정렬

  return (
    <>
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
    </>
  )
}

export default CustomPieChart