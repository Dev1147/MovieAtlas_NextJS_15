import { Button, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import { BookmarkAdd, BookmarkBorder, Favorite, FavoriteBorder, PlayArrow } from '@mui/icons-material';

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

  useEffect(() => {
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
      
    }

    fetchFavoriteInfo();
  },[]);

  const onClickFavorited = async() => {
    const token = getUserFromToken();

    if(!token){
      alert("로그인이 필요합니다");
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