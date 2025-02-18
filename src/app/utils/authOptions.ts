import NextAuth, { Account, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt"; // 🔹 JWT 타입 추가
import { Session } from "next-auth";
import { Profile } from "next-auth";

// authOptions 정의
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }: { token: JWT; account?: Account | null; profile?: Profile }) {
      if (account && profile) {
        token.accessToken = account.access_token;
        token.email = profile.email ?? null;
        token.name = profile.name ?? null;
        token.image = profile.image ?? null;
        token.sessiontoken = account.access_token;
        token.id = profile.sub ?? null; // Google의 고유 ID (sub)
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.accessToken = token.accessToken ?? ''; // 액세스 토큰 설정
      session.user.name = token.name ?? '';
      session.user.image = token.image ?? '';
      session.user.sessiontoken = token.sessiontoken ?? '';
      session.user.id = token.id ?? ''; // Google의 고유 ID (sub)
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // 필수 환경 변수
  session: {
    strategy: "jwt", // 세션 전략을 JWT로 설정
  },
};

// Next.js API 라우트에서 NextAuth 핸들러 처리
import { NextApiRequest, NextApiResponse } from 'next';

const authHandler = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);

export default authHandler;