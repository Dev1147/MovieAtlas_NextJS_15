"use client";
import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import {  Favorite, FavoriteBorder, } from '@mui/icons-material';
import { useSession } from 'next-auth/react';
import { parse } from 'cookie';

export type MoviesInfo = {
  id:number, 
  poster_path:string, 
  title:string, 
  release_date:string, 
  vote_average:number,
  runtime:number,
  backdrop_path:string,
  origin_country:string,
  genres:string,
  tagline:string,
  overview:string,
}

function LikeButton({movieId,movieTitle,moviePoster}:{movieId:number, movieTitle:string,moviePoster:string}) {
  const [FavoriteNumber, setFavoriteNumber] = useState(0);  
  const [Favorited, setFavorited] = useState(false); 
  const { data: session } = useSession(); //console.log(session);

  //쿠키에 사용자 정보 가져오기
  const getLoginInfoFromCookie = () => {
    if (typeof window !== 'undefined') {
      const cookies = parse(document.cookie);
      const token = cookies.token;
      const userRole = cookies.userrole;
      const username = cookies.username;
  
      // console.log('토큰:', token);
      // console.log('사용자 역할:', userRole);
      // console.log('사용자 이름:', username);

      if (token === undefined && userRole === undefined && username === undefined) {
        return null; 
      }
  
      // 쿠키 정보가 있으면 반환
      return { token, userRole, username };
    }
    return null;
  };

  const variables = {
    movieId: movieId,
    movieTitle: movieTitle,
    moviePoster: moviePoster,

  };

  //단순 검증은 비추천 토큰 만료나 변조되어 유효할 수 있다고 함
  // const getTokenFromCookie = () => {
  //   const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
  //   return match ? match[2] : null;
  // };

  const getUserFromToken  = () => {
     // 정규식을 사용하여 쿠키에서 "token" 값을 추출
    const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
    const token = match ? match[2] : null; // 실제 토큰 값만 추출

    if(!token) return null;

    try{
      const decode = jwtDecode<{userId: string, username:string}>(token);
      return decode;
    }catch(error){
      console.error("토큰 검증 실패: "+error);
      return null;
    }

  };

  //사용자 좋아요 클릭 정보 가져오기기
  const fetchFavoriteInfo = async () => {
    const res = await fetch(`/api/favorite/${movieId}`,
      {
        method: "GET",
        headers:{"Content-Type": "application/json"},
        credentials: 'include',
        //body:JSON.stringify({ variables })
        
      }, 
    );
    const data = await res.json();
    if(data.success){
      console.log(data);
      setFavorited(data.favorited);
      setFavoriteNumber(data.favoriteNumber);
    } 
  };

  useEffect(() => {
    //일반 로그인 정보 없을시 호출 중단
    const loginInfo = getLoginInfoFromCookie();
    if (!loginInfo || !loginInfo.token || !loginInfo.userRole || !loginInfo.username) {
      //console.log("쿠키 정보 없음, 요청 중단");
      return;
    }else{
      fetchFavoriteInfo();
    }
  },[fetchFavoriteInfo]);

  const onClickFavorited = async() => {
    //OAuth 토큰 추가
    const tokenOAuth = session?.user.sessiontoken  ?? null; //console.log(tokenOAuth)
    const token = tokenOAuth ?? getUserFromToken();

    if(!token){
      alert("로그인이 필요합니다");
      return;
    }

    if(Favorited){ //true일경우 좋아요 취소
      const res = await fetch(`/api/favorite/${movieId}`,
        {
          method: "DELETE",
          headers:{"Content-Type": "application/json"},
          credentials: 'include',
          body:JSON.stringify({variables})
        }, 
      );

      //const data = await res.json();

      if(res.ok){
        setFavorited(!Favorited);
        setFavoriteNumber(FavoriteNumber - 1);
         alert("좋아요 취소!")
      }else{
        alert("좋아요 취소 실패")
      }
    }else{
      const res = await fetch(`/api/favorite/${movieId}`,
        {
          method: "POST",
          headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          credentials: 'include',
          body:JSON.stringify({ variables })
        }, 
      );
      //console.log(res)
      //const data = await res.json();

      if(res.ok){
        setFavorited(!Favorited);
        setFavoriteNumber(FavoriteNumber + 1);
         alert("좋아요 추가!")
      }else{
        alert("좋아요 추가 실패")
      }
    }
  }

  return (
    <div>
      <IconButton color="primary" onClick={onClickFavorited}>
        {Favorited? <Favorite sx={{ color: 'red', fontSize: 30 }}/> : <FavoriteBorder sx={{ color: 'red', fontSize: 30 }}/> } 
        {/* {FavoriteNumber}     */}
      </IconButton>
      {/* {Favorited? "Not Favorite"(클릭전) : "Add to Favorite"(클릭후)} */}  
    </div>
  )
}

export default LikeButton