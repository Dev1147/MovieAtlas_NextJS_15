import { Paper } from '@mui/material'
import { axisClasses,BarChart } from '@mui/x-charts'
import React from 'react'

type BarType = {
  budget:number,
  revenue:number,
  title:string,
  }

  
function CustomBarChart({dataInfo, showMargin}:{dataInfo: BarType[], showMargin : boolean}) {


  //바 차트 영화 수익 데이터
  const BarDataset = dataInfo
    .filter((movie) => movie.budget > 0 && movie.revenue > 0)//api의 0인 수익, 예산 제외 
    .map((movie) => ({
      title: movie.title, // 영화 제목
      budget: isNaN(movie.budget) ? 0 : movie.budget, // 예산
      revenue: isNaN(movie.revenue) ? 0 : movie.revenue, // 수익
      profit: movie.revenue - movie.budget, // 이익 (수익 - 예산)
      profitMargin: movie.budget > 0 ? ((movie.revenue - movie.budget) / movie.budget * 100) : 0 // % 계산
    }))
    .sort((a, b) => b.revenue - a.revenue); // 수익이 높은 순서대로 정렬
  
  //영화제목
  const xAxisData = BarDataset.map((movie) => movie.title);

  // 숫자를 K, M, B 단위로 변환하는 함수
  const valueFormatter = (value:number):string => {
    if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}억`; // 10억 이상 → B
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}만`; // 100만 이상 → M
    if (value >= 1_000) return `${(value / 1_000).toFixed(1)}천`; // 1000 이상 → K

    if (isNaN(value)) return '0'; 

    if (value <= 1_000_000_000) return `-${(value / 1_000_000_000).toFixed(1)}억`; // 10억 이하 → B

    return `${value}`; // 그대로 표시
  };

  return (
    <div>
      {showMargin ? (
              <Paper elevation={3} sx={{marginBottom:'15px'}}>
              {/* 바 차트 */}
              <BarChart 
                dataset={BarDataset}
                xAxis={[{ scaleType: 'band', data: xAxisData }]} 
                yAxis={[{  label: '달러 (USD)',valueFormatter, }]} 
                series={[
                  { dataKey: 'budget', label: '예산', stack:'1'}, // 예산 시리즈    stack: 'A'
                  { dataKey: 'revenue',  label: '수익', stack:'1' }, // 수익 시리즈    stack: 'A'시 하나로 됨
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
      ):(
              <Paper elevation={3} sx={{marginBottom:'15px'}}>
              {/* 바 차트 */}
              <BarChart 
                dataset={BarDataset}
                xAxis={[{ scaleType: 'band', data: xAxisData }]} 
                yAxis={[{  label: '달러 (USD)',valueFormatter, }]} 
                series={[
                  { dataKey: 'budget', label: '예산' }, // 예산 시리즈    stack: 'A'
                  { dataKey: 'revenue',  label: '수익' }, // 수익 시리즈    stack: 'A'시 하나로 됨
                  //{ dataKey: 'profit', label: '이익' }, //이익
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
      )}
    </div>
  )
}

export default CustomBarChart