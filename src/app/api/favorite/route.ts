import { connectToDatabase } from "@/app/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import Favorite from "@/app/models/favorites";
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

//내가 좋아요한 목록가져오기
export async function GET(req: NextRequest) { 
  //const {movieId, userForm}:{movieId:number, userForm:string} = await req.json();
  //const { variables } = await req.json(); // `variables` 객체를 먼저 받음
  //console.log("받은 데이터:", variables);
  //const { movieId, movieTitle, moviePoster } = variables;

  await connectToDatabase();

  try{

      // 쿠키에서 'token' 값을 가져오기
      const token = req.cookies.get('token')?.value;
      //console.log("토큰"+token);
      if (!token) {
        return NextResponse.json({ success: false, message: '토큰이 없습니다.' }, { status: 401 });
      }

      // JWT 토큰 검증 및 디코딩
      //console.log("토큰 검증 시작");
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload | string;
      //console.log("디코딩된 토큰:", decoded);

        // 토큰이 유효하고 userId가 포함되어 있는지 확인
      if (typeof decoded === 'string') {
        return NextResponse.json({ success: false, message: '유효하지 않은 토큰' }, { status: 401 });
      }
    
      const userId = decoded.userId; 

      const favorited  =  await Favorite.find({userForm:userId});

      if(!favorited){
        return NextResponse.json({success:true, message:'좋아요가 없습니다'},{status:200});
      }
 
      return NextResponse.json({success:true, message:'좋아요 조회 성공!', results: favorited },{status:200});

  }catch(error){
    console.error(error);
    return NextResponse.json({success:false},{status:400});
  }

}

//좋아요 목록을 삭제하기
export async function DELETE(req:NextRequest) {

  const {movieId, userForm}:{movieId:string, userForm:string} = await req.json();

  try{

    const exsistingFavorite  = await Favorite.findOne({movieId:movieId, userForm:userForm});

    if(!exsistingFavorite){
      return NextResponse.json({success:false, message:'좋아요가 존재 하지 않습니다.'},{status:400});
    }

    await Favorite.findOneAndDelete({movieId:movieId, userForm:userForm});

    return NextResponse.json({success:true, message:'좋아요 삭제 성공!'},{status:200});
  }catch(error){
    console.error(error); 
    return NextResponse.json({success:false},{status:400});
  }
}


