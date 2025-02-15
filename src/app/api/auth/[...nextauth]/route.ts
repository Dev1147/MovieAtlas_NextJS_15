import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/app/lib/mongoose";
import User from "@/app/models/user";
import bcrypt from "bcryptjs";

export const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<string, string> | undefined, req) {
        // 데이터베이스 연결
        await connectToDatabase();

        const { email, password } = credentials || {};
        if (!email || !password) {
          throw new Error("이메일과 비밀번호를 입력해 주세요.");
        }

        // 사용자 확인
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("이메일과 사용자가 일치하지 않습니다.");
        }

        // 비밀번호 비교
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("비밀번호가 일치하지 않습니다.");
        }

        // 인증 성공 시 반환할 사용자 정보 (NextAuth의 User 타입에 맞춰 반환)
        const userResponse = {
         id: user._id.toString(),  // _id를 string으로 변환하여 id에 할당
          email: user.email,
          role: user.role,  // 역할 포함
          name: user.name,
        };

        return userResponse;  // NextAuth에서 기대하는 형식으로 반환
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,  // 환경 변수 설정 필요
  session: {
    strategy: "jwt", // JWT 기반 세션 사용
  },
  pages: {
    signIn: "/login", // 로그인 페이지 경로
  },
});

export { handler as GET, handler as POST };
