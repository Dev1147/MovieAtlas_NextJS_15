import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
    <h1>403 - 권한 없음</h1>
    <p>이 페이지에 접근할 권한이 없습니다.</p>
    <Link href="/">홈으로 돌아가기</Link>
  </div>
  )
}

export default page