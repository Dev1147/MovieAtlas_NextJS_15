"use client";
// /app/auth/[type].tsx
import { useRouter,useParams  } from 'next/navigation';  // 'next/router'에서 useRouter 사용
import { useState, useEffect, useRef } from 'react';
import { TextField, Button, Box, Paper, Alert } from '@mui/material';
import { useForm } from "react-hook-form";
/*
 NextJS 15+ 에서는 usePrams()로 url의 원하는 값을 가져올 수 있다
*/

const page = () => { //{ params }: { params: { type: string } }

  const router = useRouter();
  const { type } = useParams();  // URL에서 'type'을 동적으로 가져옴
 
  // const [email, setEmail] = useState('');
  // const [name, setName] = useState('');
  // const [password, setPassword] = useState('');
  // const [comparePassword, setComparePassword] = useState('');

  //React_Hook_Form에 사용하는 함수수
  const {
      register,  // form onSubmit에 들어가는 함수
      handleSubmit, // onChange 등의 이벤트 객체 생성
      watch, // register를 통해 받은 모든 값 확인
      setError, //서버 응답을 기반으로 오류 설정
      clearErrors, //에러 초기화
      formState: { errors }, // errors: register의 에러 메세지 자동 출력
    } = useForm();


    useEffect(() => {
    // const storedUserName = localStorage.getItem('userName');
    // const storedToken  = localStorage.getItem('authToken');
    // if (storedUserName && storedToken ) {
    //   setName(storedUserName);
    // }
  },[]);

  //비밀번호 확인
  const password = useRef<HTMLInputElement>(null);; // ref 생성
  password.current = watch("password"); 

  //React_Hook_Form 사용시 data를 사용하여 처리해야 됨

  const handleSignInOut = async (data:any) => { //e: React.FormEvent
   // e.preventDefault();
    //로그인
    if (type === 'login') {
      const res = await  fetch('/api/login',
        {
          method: "POST",
          headers:{"Content-Type": "application/json"},
          credentials: 'include',
          body:JSON.stringify({ email: data.email, password: data.password })
        }, 
      )
  
      const resdata = await res.json();

      if (!res.ok) {
        setError("errorMessage", { message: resdata.message || "이메일과 비밀번호가 일치하지 않습니다." });

        // 에러 메시지를 설정한 후 clearErrors를 호출
        setTimeout(() => {
          clearErrors("errorMessage");  // 일정 시간 후 clearErrors 호출
        }, 1000); //1초
        
        return;
        
      }
      

      // if (res.ok) {
        // localStorage.setItem('authToken', resdata.results.token);
        // localStorage.setItem('userName', resdata.results.user.name);
  
        //console.log("로그인 정보", data);
        alert('로그인 성공');
        
        //await router.push('/');
        window.location.href = '/';
      // } else {
        
      //   alert(resdata.message);
      // }

    //회원가입
    } else if (type === 'signup') {

      const res = await  fetch('/api/signup',
        {
          method: "POST",
          headers:{"Content-Type": "application/json"},
          body:JSON.stringify({ email: data.email, name: data.name, password: data.password })
        }, 
      )
  
      const resdata = await res.json();

      if (!res.ok) {
        setError("email", { message: resdata.message || "이미 등록된 사용자입니다" });
        // setError("password", { message: data.message || "비밀번호에 실패했습니다." });
        return;
      }
  
      if (res.ok) {

        alert('회원가입 성공');
  
        router.push('/auth/login');
      } else {
        
        alert(resdata.message);
      }

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
              {errors.email && <Alert severity="error" style={{ color: "red" }}>{errors.email.message as string}</Alert>}
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
              {errors.password && <Alert severity="error" style={{ color: "red" }}>{errors.password.message as string}</Alert>}
              {errors.errorMessage && <Alert severity="error" style={{ color: "red" }}>{errors.errorMessage.message as string}</Alert>}
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
                //value={email}
                //onChange={(e) => setEmail(e.target.value)}
                fullWidth
                sx={{marginBottom:'10px'}}
                {...register("email", {
                  required: "이메일은 필수 입력입니다.",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "올바른 이메일을 입력하세요.",
                  },
                })}
                error={!!errors.email}
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email.message as string}</p>}
              <TextField
                label="이름"
                //value={name}
                //onChange={(e) => setName(e.target.value)}
                fullWidth
                sx={{marginBottom:'10px'}}
                {...register("name", {
                  required: "이름은 필수 입력입니다.",
                 
                })}
              />
              {errors.name && <p style={{ color: "red" }}>{errors.name.message as string}</p>}
              <TextField
                label="비밀번호"
                type="password"
                //value={password}
                //onChange={(e) => setPassword(e.target.value)}
                fullWidth
                sx={{marginBottom:'10px'}}
                {...register("password", {
                  required: "비밀번호는 필수 입력입니다.",
                  minLength: {
                    value: 5,
                    message: "비밀번호는 최소 5자 이상이어야 합니다.",
                  },
                })}
                error={!!errors.password}
              />
              {errors.password && <p style={{ color: "red" }}>{errors.password.message as string}</p>}
              <TextField
                label="비밀번호 확인"
                type="password"
                //value={comparePassword}
                //onChange={(e) => setComparePassword(e.target.value)}
                fullWidth
                sx={{marginBottom:'10px'}}
                {...register("comparePassword", {
                  required: "비밀번호 확인은 필수 입력입니다.",
                  validate: (value) => value === password.current || "비밀번호가 일치하지 않습니다.",
                  
                })}
                error={!!errors.comparePassword}
              />
              {errors.comparePassword && <p style={{ color: "red" }}>{errors.comparePassword.message as string}</p>}
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
