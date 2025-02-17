import { connectToDatabase } from "@/app/lib/mongoose";
import User, {IUser} from "@/app/models/users"
import { NextRequest, NextResponse } from "next/server";
import cookie from 'cookie';
import jwt  from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req:NextRequest, res:NextResponse) {
  
  const {email, password}:{email:string, password:string} = await req.json();

  await connectToDatabase();

  try{
    const user = await User.findOne({email});
    

    if(!user){
      return NextResponse.json({success: false, message:'이메일은 사용자와 일치하지 않습니다.'},{status:400})
    }
    
    const isMatch = await user.comparePassword(password);

    if(!isMatch){
      return NextResponse.json({success: false, message:'비밀번호는 사용자와 일치하지 않습니다.'},{status:400})
    }

    const token = jwt.sign({userId:user._id, role:user.role}, JWT_SECRET, {expiresIn:'1h'});
     
    // 쿠키에 토큰을 저장 (HttpOnly, Secure 옵션을 추가)
    const cookieOptions: cookie.SerializeOptions = {
      httpOnly: false,// 클라이언트 접근 불가 true , 접근 false
      secure: process.env.NODE_ENV === 'development' ? true : false, //dev 환경 사용
      sameSite: 'none', //동일 출처에서만 쿠기 전송 // 'strict', 'lax', 'none' 중 하나로 설정
      maxAge: 60 * 60, //1시간만 유효
      path: '/', //전체 경로에.쿠키 접근
    }
    
    //console.log(user,token)
    // 쿠키 설정
    const tokenCookie = cookie.serialize('token', token, cookieOptions);
    const userRoleCookie = cookie.serialize('userrole', user.role, cookieOptions);
    const usernameCookie = cookie.serialize('username', user.name, cookieOptions);
  
    //여러 쿠키를 각각 추가
    return NextResponse.json({success: true, message:'로그인,토큰 성공', results:{user,token}},{status:200, headers:{'Set-Cookie': `${tokenCookie},${userRoleCookie},${usernameCookie}}`,}})

  }catch(error){
    return NextResponse.json({success: false, message:'로그인실패'},{status:400})
  }
}

