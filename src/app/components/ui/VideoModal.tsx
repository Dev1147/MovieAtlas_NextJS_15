import React, { useEffect,useState } from 'react'
import {API_URI,} from '../config';
import { Box, Button, IconButton, Modal } from "@mui/material";
import { PlayArrow } from '@mui/icons-material';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

//영화 아이디값 받기
function VideoModal({movieId}:{movieId:number}) {

  const [videoKey, setVideoKey] = useState<{key:string | null, name:string | null}>({key:null, name:null});

  const [open, setOpen] = React.useState(false);

  const handleOpen = (movieId: number) => {
    setOpen(true);

    fetch(`${API_URI}movie/${movieId}/videos?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      //console.log(data.results[0]) //
      setVideoKey(data.results[0]); //
    })
  }

  const handleClose = () => {
    setOpen(false);
    setVideoKey({key:null, name:null});
  }
  
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

  useEffect(() =>{
    //setOpen(openInfo);
  },[]);
 

  return (
    <div>
      {/* 배경화면 이미지 클릭시 모달 창 오픈 */}
      <Box>
        <IconButton onClick={() => handleOpen(movieId)} sx={{color:'white'}} >
          <PlayArrow fontSize='large' sx={{fontSize:'30px'}}></PlayArrow>트레이러 재생
        </IconButton>
      </Box>


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
    </div>
  )
}

export default VideoModal