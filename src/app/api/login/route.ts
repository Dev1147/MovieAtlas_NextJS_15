import { connectToDatabase } from "@/app/lib/mongoose";
import User, {IUser} from "@/app/models/user"
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
      return NextResponse.json({success: false, message:'이메일과 사용자가 일치하지 않습니다.'},{status:400})
    }
    
    const isMatch = await user.comparePassword(password);

    if(!isMatch){
      return NextResponse.json({success: false, message:'이메일과 사용자가 일치하지 않습니다.'},{status:400})
    }

    const token = jwt.sign({userId:user._id, role:user.role}, JWT_SECRET, {expiresIn:'1h'});
     
    // 쿠키에 토큰을 저장 (HttpOnly, Secure 옵션을 추가)
    const cookieOptions: cookie.SerializeOptions = {
      httpOnly: true,// 클라이언트 접근 불가
      secure: process.env.NODE_ENV === 'development', //dev 환경 사용
      sameSite: 'strict', //동일 출처에서만 쿠기 전송 // 'strict', 'lax', 'none' 중 하나로 설정
      maxAge: 60 * 60, //1시간만 유효
      path: '/', //전체 경로에.쿠키 접근
    }
    


    return NextResponse.json({success: true, message:'로그인,토큰 성공', results:{user,token}},{status:200, headers:{'Set-Cookie': cookie.serialize('token', token, cookieOptions)}})

  }catch(error){
    return NextResponse.json({success: false, message:'로그인실패'},{status:400})
  }
}

