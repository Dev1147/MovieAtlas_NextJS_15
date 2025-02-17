import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // 보호된 경로 목록
  const protectedRoutes = ['/views/charts/bar_chart','/views/favorite']; //'/moviedetail',

  // 요청된 경로 가져오기
  const pathname = request.nextUrl.pathname;

  // console.log("요청된경로: "+pathname)
  // console.log("보호된 경로 includes: "+protectedRoutes.includes(pathname)); //동적경로는 무조건 false

  // console.log("보호된 경로 startsWith: "+protectedRoutes.some(route => pathname.startsWith(route))); // 정적,동적 true
  // 보호된 경로인지 확인 true/false
  //protectedRoutes.some(route => pathname.startsWith(route));  //동적경로시 startsWith
  //protectedRoutes.includes(pathname) //특정 문자 포함시 
  if (protectedRoutes.some(route => pathname.startsWith(route)) ) {
    // 인증된 사용자 확인 (예: 쿠키에서 토큰 확인)
    const token = request.cookies.get('token')?.value;
    //console.log("토큰 확인 ")
    // 쿠키에서 userrole 확인
    const userRole = request.cookies.get('userrole')?.value;


    if (!token) {
      // 인증되지 않은 경우 로그인 페이지로 리디렉션
      return NextResponse.redirect(new URL('/views/auth/login', request.url));
    }

    // userRole이 'user' 또는 'admin'이 아닌 경우 접근 차단 (비회원)
    if (userRole !== 'user' && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/views/403', request.url)); // 비회원은 403 페이지로 리디렉션
    }
  }

  // 인증된 경우 요청을 계속 진행
  return NextResponse.next();
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: ['/views/charts/bar_chart','/views/favorite'],  // 해당 경로에 미들웨어 적용
}
