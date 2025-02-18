import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  // 쿠키 삭제를 위한 옵션 설정
  const cookieOptions = {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'development' ? true : false,  // production 환경에서만 secure 설정
    maxAge: -1,  // 쿠키 만료
    path: '/',  // 모든 경로에서 쿠키 삭제
  };

  // 쿠키 삭제 설정
  // const cookies = [
  //   cookie.serialize('token', '', cookieOptions),
  //   cookie.serialize('user-role', '', cookieOptions),
  //   cookie.serialize('username', '', cookieOptions),
  // ];
  const tokenCookie = serialize('token', '', cookieOptions);
  const userRoleCookie = serialize('userrole', '', cookieOptions);
  const usernameCookie = serialize('username', '', cookieOptions);

  const combinedCookies = `${tokenCookie}, ${userRoleCookie}, ${usernameCookie}`;
  // Set-Cookie 헤더를 사용하여 쿠키 삭제 처리
  return NextResponse.json({ success: true, message: '로그아웃 성공' }, {
    status: 200,
    headers: {
      'Set-Cookie': combinedCookies  // 여러 쿠키를 하나의 Set-Cookie 헤더로 병합
    },
  });
}