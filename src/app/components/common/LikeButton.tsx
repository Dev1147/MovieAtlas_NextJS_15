import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'

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

  const getTokenFromCookie = () => {
    const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
    return match ? match[2] : null;
  };

  useEffect(() => {
    const fetchFavoriteInfo = async () => {
      const res = await fetch('/api/favorite/',
        {
          method: "POST",
          headers:{"Content-Type": "application/json"},
          // credentials: 'include',
          body:JSON.stringify({ variables })
          
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
    const token = getTokenFromCookie();

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
      <Button onClick={onClickFavorited}>{Favorited? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}</Button>
    </div>
  )
}

export default LikeButton