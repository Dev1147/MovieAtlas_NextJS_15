"use client";
import { IMAGE_BASE_URL } from '@/app/components/config'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

type Favorite = {
  movieId:string,
  moviePoster:string,
  movieTitle:string,
  userForm:string,
}

  function Page() {

  const[Favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(()=>{

    const fetchMayFavoriteMovie = async() => {
      const res = await fetch(`/api/favorite/`,
        {
          method: "GET",
          headers:{"Content-Type": "application/json"},
          credentials: 'include',
        }, 
      );
      const data = await res.json(); 
      if(data.success){
        //console.log(data.results);
        setFavorites(data.results); 
    }
    };

    fetchMayFavoriteMovie();

  },[]);

  const onClickDelete = async(movieId:string, userForm:string) => {

    if(confirm("정말로 삭제하시겠습니까?")){

      const res = await fetch(`/api/favorite/`,
        {
          method: "DELETE",
          headers:{"Content-Type": "application/json"},
          credentials: 'include',
          body:JSON.stringify({ movieId,userForm })
        }, 
      );
      const data = await res.json();
      if(data.success){
        setFavorites((prev) => prev.filter((favorites) => favorites.movieId !== movieId)); //상태 업데이트
        alert("삭제 완료");
      }

      return;
    }
  };

  

  return (
    <div style={{width:'85%', margin:'5rem auto'}}>
    <h2>내가 좋아요한 영화 목록</h2>
    <hr/>
    <br/>
    <table>
        <thead>
            <tr>
                <th>번호</th>
                <th>포스터</th>
                <th>영화제목</th>
                <th>좋아요 삭제</th>
            </tr>
        </thead>

        <tbody>
        {Array.isArray(Favorites) && Favorites.map((favorite, index)=>(
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
            {favorite.moviePoster ? (
              <Image
                src={`${IMAGE_BASE_URL}/w500${favorite.moviePoster}`}
                alt={`Poster for ${favorite.movieTitle}`}
                width={100}
                height={200}
                style={{ borderRadius: '15px' }}
              />
            ) : (
              <span>포스터 없음</span>
            )
            }
            </td>
            <td>{favorite.movieTitle || '제목없음'}</td>
            <td><button onClick={()=> onClickDelete(favorite.movieId, favorite.userForm)}>Remove</button></td>
          </tr>
        ))}

        </tbody>
    </table>

</div>
  )
}

export default Page