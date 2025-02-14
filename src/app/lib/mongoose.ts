// lib/mongodb.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error(" MongoDB 연결을 위한 MONGODB_URI 환경 변수를 설정하세요!");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "test", // 데이터베이스 이름 설정
      bufferCommands: false,
    }).then((mongoose) => {
      console.log("몽고디비 접속 성공!");
      return mongoose;
    })
    .catch((error) =>{
      console.error("몽고디비 접속 실패!", error);
    });
  }

  

  cached.conn = await cached.promise;
  return cached.conn;
}
