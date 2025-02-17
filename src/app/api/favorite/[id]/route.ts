import { connectToDatabase } from "@/app/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import Favorite from "@/app/models/favorites";
import { useForm } from "react-hook-form";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Params } from "next/dist/server/request/params";

const JWT_SECRET = process.env.JWT_SECRET as string;

//내가 좋아요한 상태 가져오기
export async function GET(req: NextRequest, {params}:{params: { id: number }}) { 
  //const {movieId, userForm}:{movieId:number, userForm:string} = await req.json();
  const  {id}  = await params;

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

      const favorite  =  await Favorite.findOne({movieId:id, userForm:userId});

      // if(!results){
      //   return NextResponse.json({success:true, message:'좋아요가 없습니다', favoriteNumber: results ? 1:0, favorited:false},{status:200});
      // }
 
      return NextResponse.json({success:true, message:'좋아요 조회 성공!', favoriteNumber: favorite ? 1:0, favorited: favorite ? true : false},{status:200});

  }catch(error){
    return NextResponse.json({success:false},{status:400});
  }

}


//좋아요 클릭한 정보 추가
export async function POST(req: NextRequest, {params}:{params: { id: number }}) {//{params}:{params: { id: number }}
  // const {movieId, movieTitle, moviePoster}:{  movieId: number,movieTitle: string, moviePoster: string} = await req.json();

  const  {id}  = await params;

  //객체로 전달 받을때때
  const { variables } = await req.json(); // `variables` 객체를 먼저 받음
  //console.log("받은 데이터:", variables);
  const { movieId, movieTitle, moviePoster } = variables;

  await connectToDatabase();

  try{

    // 쿠키에서 'token' 값을 가져오기
    const token = req.cookies.get('token')?.value;
    //console.log("토큰"+token);
    if (!token) {
      return NextResponse.json({ success: false, message: '토큰이 없습니다.' }, { status: 401 });
    }

    //토큰 검증
    // const tokenValue = token?.startsWith("Bearer ") ? token.split(" ")[1] : token;
    // console.log("tokenValue: "+tokenValue);

    // const decodedWithoutVerify = jwt.decode(token, { complete: true });
    // console.log("디코딩된 토큰 (검증 없이):", decodedWithoutVerify);

    // JWT 토큰 검증 및 디코딩
    //console.log("토큰 검증 시작");
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload | string;
    //console.log("디코딩된 토큰:", decoded);

     // 토큰이 유효하고 userId가 포함되어 있는지 확인
    if (typeof decoded === 'string') {
      return NextResponse.json({ success: false, message: '유효하지 않은 토큰' }, { status: 401 });
    }
 
    const userId = decoded.userId; 
    //console.log(userId)

    const newFavorite = new Favorite({movieId:id, movieTitle, moviePoster,userForm:userId});

    await newFavorite.save();

    return NextResponse.json({success:true, message:'좋아요 추가 성공!'},{status:200});

  }catch(error){
    console.error("JWT 검증 오류:", error);
    return NextResponse.json({success:false, error},{status:400});
  }

}

//좋아요 취소한 정보 삭제
export async function DELETE(req: NextRequest, { params }: { params: { id: number }}) {  //res:NextResponse, 파람사용시 삭제
 // const {movieId}:{movieId:number} = await req.json();
 const  {id}  = await params;
  //console.log("파람 아이디"+id);

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

    //console.log(id,userId);

    await Favorite.findOneAndDelete({movieId:id, userForm:userId});

    return NextResponse.json({success:true, message:'좋아요 삭제 성공!'},{status:200});

  }catch(error){
    return NextResponse.json({success:false},{status:400});
  }
}