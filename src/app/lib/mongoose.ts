// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI || "";

// if (!MONGODB_URI) {
//   throw new Error(" MongoDB 연결을 위한 MONGODB_URI 환경 변수를 설정하세요!");
// }

// const cached = global.mongoose || { conn: null, promise: null };  //.mongoose 애먹이네... global var되니 빌드 에러...

// export async function connectToDatabase() {
//   if (cached.promise) {
//     return cached.promise;
//   }

//   cached.promise = mongoose.connect(MONGODB_URI, {
//     dbName: "test", // 데이터베이스 이름 설정
//     bufferCommands: false,
//   })
//     .then((mongooseInstance) => {
//       console.log("몽고디비 접속 성공!");
//       cached.conn = mongooseInstance.connection; // mongoose.connection은 mongoose.Connection 타입입니다.
//       return mongooseInstance.connection; // mongoose.Connection을 반환
//     })
//     .catch((error) => {
//       console.error("몽고디비 접속 실패!", error);
//       throw error; 
//     });
  
//   return cached.conn;
// }
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("MongoDB 연결을 위한 MONGODB_URI 환경 변수를 설정하세요!");
}

let cachedConn: mongoose.Connection | null = null;
let cachedPromise: Promise<mongoose.Connection> | null = null;

export async function connectToDatabase() {
  if (cachedConn) {
    return cachedConn;
  }

  if (!cachedPromise) {
    cachedPromise = mongoose.connect(MONGODB_URI, {
      dbName: "test", // 데이터베이스 이름 설정
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,  // 서버 선택 타임아웃
    })
    .then((mongooseInstance) => {
      console.log("몽고디비 접속 성공!");
      cachedConn = mongooseInstance.connection;  // 연결 객체 저장
      return mongooseInstance.connection;
    })
    .catch((error) => {
      console.error("몽고디비 접속 실패!", error);
      throw error;
    });
  }

  await cachedPromise;

  return cachedConn;
}
