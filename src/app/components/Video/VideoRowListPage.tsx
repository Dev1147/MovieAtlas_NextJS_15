import React, { useEffect,useState } from 'react'
import {API_URI, API_KEY, IMAGE_BASE_URL} from '../Config';
import { Box } from '@mui/system';
import style from '../style/style.module.css';

function MainVideoRowListPage({movieId}:{movieId:{id:number}[]}) {
 
  const [videoKey, setVideoKey] = useState<{key:string, name:string}[]>([]);

  // const videoUrl = `https://www.youtube.com/embed/${videoKey.key}`;
  // // YouTube 영상 크기 (기본값으로 560x315 설정)

  //단일객체를 배열로 만들어 영상 추출하기기
  const fetchMovieVideo = async () => {
    try{
      const videoList: {key:string, name:string}[] = []; 

      await Promise.all(
        movieId.map((movie) => 
          fetch(`${API_URI}movie/${movie.id}/videos?api_key=${API_KEY}`)
          .then(res => res.json())
          .then(data => {
            // console.log(data.results[0]);  //배열이 아닌 단일 객체로 들어옴옴
            if(data.results.length > 0){
              videoList.push({  //배열 가공
                key:data.results[0].key,
                name:data.results[0].name,
              });
            }
          })
        )
      );

      setVideoKey(videoList); //배열로 저장장

    }catch(error){
      console.error("영화 비디오 가져오기 실패!");
    }
  }

  useEffect(() => {

    fetchMovieVideo();
    
  },[movieId]);

  return (
    <>
      <Box sx={{display: 'flex', overflowX: 'scroll', gap: '20px', width:'100%', height:'250px', alignItems:'center', paddingLeft:'25px',paddingRight:'25px'}}>
        {Array.isArray(videoKey) &&videoKey.slice(0,5).map((video,index) => (
          <div key={index} className={style.imageList}>
            <iframe
              width={350}
              height={200}
              src={`https://www.youtube.com/embed/${video.key}`}
              title={video.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{border:'none', borderRadius:'10px'}}
            />
          </div>
        ))}
      </Box>
    </>
  )
}

export default MainVideoRowListPage