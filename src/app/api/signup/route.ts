import { NextRequest, NextResponse } from "next/server";
import User, {IUser} from "@/app/models/users";
import { connectToDatabase } from "@/app/lib/mongoose";


export async function POST(req:NextRequest, res:NextResponse) {

  const {email, name, password}:{email: string, name: string, password: string} = await req.json();

  await connectToDatabase();

  try{

    //이메일이이 이미 DB에 있는지 확인
    const exisitingUser = await User.findOne({email});

    if(exisitingUser){
      return NextResponse.json({success:false, message:"이미 등록된 이메일입니다."},{status:400})  
    }

    //사용자 등록
    const newUser = new User({
      email,
      name,
      password
    })

    await newUser.save();

    return NextResponse.json({success:true, message:"회원가입 성공"},{status:200})

  }catch(error){
    return NextResponse.json({success:false, message:"회원가입중 실패했습니다."},{status:400})
  } 
};