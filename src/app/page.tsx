"use client";
import React from 'react'
import MainImage from './components/common/MainImage';
import MainSection, {SectionTypeEnum} from './components/ui/MainSection';



export default function Home() {
  return (
    <div>

      {/* 대표 이미지 */}
      <MainImage/>

      {/* 트렌드 영화 */}
      <MainSection type={SectionTypeEnum.TREND} title='트렌트' sub1='이번주' sub2='오늘' />

      {/* 영화 포스터 이미지*/}
      <MainSection type={SectionTypeEnum.POSTER} title='영화' sub1='인기' sub2='최신' sub3='상영중'/>

      {/* 영화 예고편 영상 */}
      <MainSection type={SectionTypeEnum.VIDEO} title='예고편' sub1='인기' sub2='최신' sub3='상영중'/>
    </div>
  );
}
