import React, { useEffect,useState } from 'react'
import {API_URI, API_KEY, IMAGE_BASE_URL} from '../Config';
import { Box, Typography, Stack, Button, IconButton, Modal } from "@mui/material";
import { Home, Search, Favorite, FavoriteBorder, BookmarkBorder, Bookmark, PlayArrow, Close, Height } from '@mui/icons-material';

//필요할때 수정 다시 하자
function VideoModal({openInfo, modalInfo}:{openInfo:boolean, modalInfo:{key:string | null, name:string | null}}) {

  const [videoKey, setVideoKey] = useState<{key:string | null, name:string | null}>({key:null, name:null});

  const [open, setOpen] = React.useState(openInfo);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  
  // 상위 컴넌트에 버튼을 추가해주세요
  // const handleOpen = (movieId: number) => {
  //   setOpen(true);

  //   fetch(`${API_URI}movie/${movieId}/videos?api_key=${API_KEY}`)
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data.results[0]) //
  //     setVideoKey(data.results[0]); //
  //   })
  // }

  const handleClose = () => {
    setOpen(false);
    setVideoKey({key:null, name:null});
  }
  
  const style = {
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
    setOpen(openInfo)
  },[openInfo])
  console.log(open)
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {modalInfo ? (
          <Box sx={style}>
            <Box sx={{display:'flex', justifyContent:'space-between', color:'white', fontWeight:'bold',padding:'7px'}}>
              {modalInfo.name}
              <Button size='small' onClick={handleClose}>닫기</Button>
            </Box>
            <iframe
              width={1096}
              height={550}
              src={`https://www.youtube.com/embed/${modalInfo.key}`}
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