import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';

function PieChartPage() {

  //파이 차트 수익률
  // const pieDataset = revenueAndBudgetInfo
  // .filter((movie) => movie.budget > 0)
  // .map((movie,index) => ({
  //   id: index,
  //   //title: movie.title, // 영화 제목
  //   label: movie.title,
  //   value: Math.round(((movie.revenue - movie.budget) / movie.budget) * 100 * 100) / 100, // 수익률 계산
  // }))
  // // .filter(Boolean)
  // .sort((a, b) => b.value - a.value); // 높은 수익률 순으로 정렬

  return (
    <div>
      {/* <PieChart
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
        
      /> */}
    </div>
  )
}

export default PieChartPage