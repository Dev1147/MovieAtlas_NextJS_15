import React, { useEffect,useState } from 'react'
import {API_URI, IMAGE_BASE_URL} from '../config';
import style from '../style/style.module.css';
import { Box, Button, IconButton, Modal } from "@mui/material";
import { PlayArrow } from '@mui/icons-material';
import Image from 'next/image';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

function MainVideoRowListPage({videoInfo }:{videoInfo:{id:number, backdrop_path:string}[]}) {

  const [videoKey, setVideoKey] = useState<{key:string | null, name:string | null}>({key:null, name:null});

  // const videoUrl = `https://www.youtube.com/embed/${videoKey.key}`;
  // // YouTube 영상 크기 (기본값으로 560x315 설정)

  //단일객체를 배열로 만들어 영상 추출하기
  // const fetchMovieVideo = async () => {
  //   try{
  //     const videoList: {key:string, name:string}[] = []; 

  //     await Promise.all(
  //       movieId.map((movie) => 
  //         fetch(`${API_URI}movie/${movie.id}/videos?api_key=${API_KEY}`)
  //         .then(res => res.json())
  //         .then(data => {
  //           // console.log(data.results[0]);  //배열이 아닌 단일 객체로 들어옴옴
  //           if(data.results.length > 0){
  //             videoList.push({  //배열 가공
  //               key:data.results[0].key,
  //               name:data.results[0].name,
  //             });
  //           }
  //         })
  //       )
  //     );

  //     setVideoKey(videoList); //배열로 저장장

  //   }catch(error){
  //     console.error("영화 비디오 가져오기 실패!");
  //   }
  // }


  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const handleOpen = (movieId: number) => {
    setOpen(true);

    fetch(`${API_URI}movie/${movieId}/videos?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      console.log(data.results[0]) //
      setVideoKey(data.results[0]); //
    })
  }

  const handleClose = () => {
    setOpen(false);
    setVideoKey({key:null, name:null});
  }

  useEffect(() => {


    
  },[]);


  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1100,
    height: 600,
    bgcolor: 'black',
    border: '2px solid #000',
    borderRadius:'15px',
    boxShadow: 24,
    p: 0,
  };

  return (
    <>
      <Box sx={{display: 'flex', overflowX: 'auto', gap: '20px', width:'100%', height:'250px', alignItems:'center', paddingLeft:'25px',paddingRight:'25px'}}>
        {/* {Array.isArray(videoKey) &&videoKey.slice(0,5).map((video,index) => (
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
        ))} */}
        {/* 배경화면 이미지 클릭시 모달 창 오픈 */}
        {Array.isArray(videoInfo) && videoInfo.slice(0, 10).map((movid, index) => (
          <Box key={index} sx={{position:'relative'}} className={style.imageList}>
            <Image src={`${IMAGE_BASE_URL}/w500${movid.backdrop_path}` } alt='이미지 없음' width={350} height={200} style={{borderRadius: "15px"}}/>
            <IconButton onClick={() => handleOpen(movid.id)} sx={{ position:'absolute', left:120, top:50 ,color:'white'}} >
             <PlayArrow fontSize='large' sx={{fontSize:'100px'}}></PlayArrow>
            </IconButton>
          </Box>
        ))}

        {/* 비디오 모달 */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {videoKey ? (
            <Box sx={modalStyle}>
              <Box sx={{display:'flex', justifyContent:'space-between', color:'white', fontWeight:'bold',padding:'7px'}}>
                {videoKey.name}
                <Button size='small' onClick={handleClose}>닫기</Button>
              </Box>
              <iframe
                width={1096}
                height={550}
                src={`https://www.youtube.com/embed/${videoKey.key}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{border:'none', borderRadius:'10px'}}
              />
            </Box>
          ):(
            <p style={{ color: "white", textAlign: "center" }}>
              해당 영화의 비디오를 찾을 수 없습니다.
            </p>
          )}
        </Modal>

      </Box>
    </>
  )
}

export default MainVideoRowListPage