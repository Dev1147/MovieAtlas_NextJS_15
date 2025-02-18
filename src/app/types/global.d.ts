//import mongoose from 'mongoose';



// declare global {
//   // 'mongooseConnection'을 전역에서 사용할 수 있도록 선언
//   const mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null };
// }

// global.d.ts 또는 프로젝트의 타입 선언 파일


// declare global {
//   namespace globalThis {
//     var mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null };
//   }
// }

// declare global {
//   // 'mongoose' 타입을 확장
//   // namespace NodeJS {
//     // interface Global {
//       var mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null };
//     // }
//   // }
// }

// declare global {  // no-var 오류는 ESLint 규칙 중 하나로, var 대신 let 또는 const를 사용하도록 권장하는 규칙
//   // globalThis 타입을 확장
//   var mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null };
// }
