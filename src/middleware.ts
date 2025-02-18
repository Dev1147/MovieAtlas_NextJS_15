import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {

  // 보호된 경로 목록
  const protectedRoutes = ['/views/charts/bar_chart','/views/favorite'];

  // 요청된 경로 가져오기
  const pathname = req.nextUrl.pathname;
  // console.log("요청된경로: "+pathname)
  // console.log("보호된 경로 includes: "+protectedRoutes.includes(pathname)); //동적경로는 무조건 false
  // console.log("보호된 경로 startsWith: "+protectedRoutes.some(route => pathname.startsWith(route))); // 정적,동적 true
  // 보호된 경로인지 확인 true/false
  //protectedRoutes.some(route => pathname.startsWith(route));  //동적경로시 startsWith
  //protectedRoutes.includes(pathname) //특정 문자 포함시 

  if (protectedRoutes.some(route => pathname.startsWith(route)) ) {

    // OAuth 토큰 가져오기
    const tokenOAuth = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET, // NEXTAUTH_SECRET 환경 변수 설정 필요
    });
    //console.log("OAuth 토큰: ", tokenOAuth?.sessiontoken);

    // if (!tokenOAuth) {
    //   console.log('OAuth 토큰이 없습니다.');
    //   return NextResponse.redirect(new URL('/views/auth/login', req.url));
    // }

    // tokenOAuth실패시 일반 로그인 인증된 사용자 확인 (예: 쿠키에서 토큰 확인)
    const token = req.cookies.get('token')?.value;
    //console.log("토큰 확인 ")
    // 쿠키에서 userrole 확인
    //const userRole = req.cookies.get('userrole')?.value;

    if (!token && !tokenOAuth) {
      // 인증되지 않은 경우 로그인 페이지로 리디렉션
      return NextResponse.redirect(new URL('/views/auth/login', req.url));
    }

    //userRole이 'user' 또는 'admin'이 아닌 경우 접근 차단 (비회원)
    // if (userRole !== 'user' && userRole !== 'admin') {
    //   return NextResponse.redirect(new URL('/views/403', req.url)); // 비회원은 403 페이지로 리디렉션
    // }
  }

  // 인증된 경우 요청을 계속 진행
  return NextResponse.next();
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: ['/views/charts/bar_chart','/views/favorite'],  // 해당 경로에 미들웨어 적용
}
