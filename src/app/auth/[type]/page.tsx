"use client";
// /app/auth/[type].tsx
import { useRouter,useParams  } from 'next/navigation';  // 'next/router'에서 useRouter 사용
import { useState, useEffect } from 'react';
import { TextField, Button, Box, Paper } from '@mui/material';
import { useForm } from "react-hook-form";
/*
 NextJS 15+ 에서는 usePrams()로 url의 원하는 값을 가져올 수 있다
*/

const page = () => { //{ params }: { params: { type: string } }

  const router = useRouter();
  const { type } = useParams();  // URL에서 'type'을 동적으로 가져옴
 
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [comparePassword, setComparePassword] = useState('');

  const {
      register,  // form onSubmit에 들어가는 함수
      handleSubmit, // onChange 등의 이벤트 객체 생성
      watch, // register를 통해 받은 모든 값 확인
      //setError, //서버 응답을 기반으로 오류 설정
      formState: { errors }, // errors: register의 에러 메세지 자동 출력
    } = useForm();

    useEffect(() => {
    // const storedUserName = localStorage.getItem('userName');
    // const storedToken  = localStorage.getItem('authToken');
    // if (storedUserName && storedToken ) {
    //   setName(storedUserName);
    // }
  },[]);

  // 폼 입력값 검증
  const validateEmail = (value: string) => {
    if (!value) return "이메일은 필수 입력입니다.";
    if (!/\S+@\S+\.\S+/.test(value)) return "올바른 이메일을 입력하세요.";
    return true;
  };

  const validatePassword = (value: string) => {
    if (!value) return "비밀번호를 입력하세요.";
    if (value.length < 6) return "비밀번호는 최소 6자 이상이어야 합니다.";
    return true;
  };


  const handleSignInOut = async (data:any) => { //e: React.FormEvent
   // e.preventDefault();

    if (type === 'login') {
      const res = await  fetch('/api/login',
        {
          method: "POST",
          headers:{"Content-Type": "application/josn"},
          body:JSON.stringify({ email: data.email, password: data.password })
        }, 
      )
  
      const resdata = await res.json();

      if (!res.ok) {
        // setError("email", { message: data.message || "로그인에 실패했습니다." });
        // setError("password", { message: data.message || "비밀번호에 실패했습니다." });
        return;
      }
  
  
      if (res.ok) {
  
        localStorage.setItem('authToken', resdata.results.token);
  
        const storedUserName =  resdata.results.user.name;
        localStorage.setItem('userName', storedUserName);
  
        //console.log("로그인 정보", data);
        alert('로그인 성공');
  
        router.push('/');
      } else {
        alert(resdata.message);
      }

    
      
    } else if (type === 'signup') {
      console.log('회원가입:', email, password);
    }
  };



  return (
    <Box sx={{display:'flex', justifyContent:'center'}}>
      <form onSubmit={handleSubmit(handleSignInOut)}> 
        {type === 'login' ? (
          <Paper elevation={3} sx={{width:'500px',margin:'10px', padding:'15px', display:''}}>
            <h1>{type === 'login' ? '로그인' : '회원가입'}</h1>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <TextField
                label="이메일"
                //value={email}
                //onChange={(e) => setEmail(e.target.value)}
                fullWidth
                {...register("email", {
                  required: "이메일은 필수 입력입니다.",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "올바른 이메일을 입력하세요.",
                  },
                })}
                error={!!errors.email}
                //helperText={errors.email?.message as string} //MUI UI꺼
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email.message as string}</p>}
              <TextField
                label="비밀번호"
                type="password"
                //value={password}
                //onChange={(e) => setPassword(e.target.value)}
                fullWidth
                {...register("password", {
                  required: "비밀번호는 필수 입력입니다.",
                  minLength: {
                    value: 5,
                    message: "비밀번호는 최소 5자 이상이어야 합니다.",
                  },
                })}
                error={!!errors.password}
                //helperText={errors.password?.message as string}  //MUI UI꺼
              />
              {errors.password && <p style={{ color: "red" }}>{errors.password.message as string}</p>}
              <Box sx={{display:'flex',justifyContent:'space-between'}}>
                <Button type="submit" variant="contained" color="primary">
                  로그인
                </Button>
                <Button  variant="contained" color="primary" onClick={()=>router.push('/auth/signup')}>
                  회원가입
                </Button>
              </Box>
            </Box>
          </Paper>
       
        ):(
          <Paper elevation={3} sx={{width:'500px',margin:'10px', padding:'15px', display:''}}>
            <h1>{type === 'login' ? '로그인' : '회원가입'}</h1>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <TextField
                label="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                sx={{marginBottom:'10px'}}
              />
              <TextField
                label="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                sx={{marginBottom:'10px'}}
              />
              <TextField
                label="비밀번호"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                sx={{marginBottom:'10px'}}
              />
              <TextField
                label="비밀번호 확인"
                type="password"
                value={comparePassword}
                onChange={(e) => setComparePassword(e.target.value)}
                fullWidth
                sx={{marginBottom:'10px'}}
              />
              <Box sx={{display:'flex',justifyContent:'space-between'}}>
                <Button type="submit" variant="contained" color="primary">
                  회원가입
                </Button>
                <Button  variant="contained" color="primary" onClick={()=>router.push('/auth/login')}>
                  로그인
                </Button>
              </Box>
            </Box>
          </Paper>
        )}
        {/* <Button type="submit" variant="contained" color="primary">
          {type === 'login' ? '로그인' : '회원가입'}
        </Button> */}
      </form>
    </Box>
  );
};

export default page;
