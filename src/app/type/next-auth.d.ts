
import NextAuth from "next-auth";
import { IUser } from "@/app/models/user";  // 유저 모델을 가져옵니다.

declare module "next-auth" {
  interface User extends IUser {
    role: "admin" | "user";  // role을 추가합니다.
  }

  interface Session {
    user: User;
  }
}
