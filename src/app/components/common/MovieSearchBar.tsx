import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { API_URI } from '../../components/Config';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

function MovieSearchBar({setSearch}:{setSearch:React.Dispatch<React.SetStateAction<any>>}) { //상위로 보낼려면  상태업데이트 함수 지정

  const [searchlocal, setSearchLocal] = useState('');

  //상위 setSearch에 입력값을 전달 boolean으로 처리 값이 있으면 true 아니면 fasle
  const handleSearch = () =>{
    setSearch(searchlocal);
  };

  useEffect(()=>{
  
  },[]);

  return (
    <div>          
      {/* 영화 검색 */}
    <Box sx={{ display:'flex'}} >
      <TextField type='text' size='small'
        sx={{ }} 
        placeholder='영화 제목을 입력하세요'  
        value={searchlocal} 
        onChange={(e) => setSearchLocal(e.target.value)}
        onKeyDown={(e) =>{
          if(e.key ==='Enter'){ handleSearch();}
        }}
        />
      <Button variant='contained' onClick={handleSearch} >검색</Button>
    </Box>
    </div>
  )
}

export default MovieSearchBar