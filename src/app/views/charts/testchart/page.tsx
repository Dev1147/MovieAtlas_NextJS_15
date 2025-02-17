"use client";
import React, { useEffect } from 'react'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

function page() {


  const years:number[] = [2021, 2022, 2023, 2024, 2025];

  const fetchYearlyData = async () => {
    // const res= await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&primary_release_year=${2021}&page=1`);
    const res= await fetch(`https://api.themoviedb.org/3/trending/movie?api_key=${API_KEY}&day?language=en-US`);
    const data = await res.json();

    console.log(data);

  };

  useEffect(() => {
 
      fetchYearlyData();


  },[]);

  return (
    <div>test차트

    </div>
  )
}

export default page