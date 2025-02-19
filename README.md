### 프로젝트 개요

MovieAtlas는 사용자에게 다양한 영화 정보를 제공하는 웹 애플리케이션입니다. 사용자는 영화 목록을 탐색하고, 각 영화의 상세 정보 및 출연진 목록을 확인할 수 있습니다. 그리고 로그인하여 영화별로 예산, 수익에 관한 차트를 넣어 시각적으로 표현하고 있습니다.이 프로젝트는 React와 Next.js를 사용해 개발했으며, Vercel을 통해 배포되었습니다.

### 접속 링크

링크: [https://movie-atlas-next-js-15.vercel.app](https://movie-atlas-next-js-15.vercel.app/)

### 기술스택

**프론트**: React, Next.js, TypeScript

**백엔드**: RESTful API (외부 영화 정보 API 사용)

**데이터베이스**: MongoDB

**배포**: Vercel

**기타**: Next-Auth, JWT, bcrypt, openssl

### **주요 기능**

1. **일반 로그인 및 구글 로그인**: 사용자는 일반 로그인 또는 구글 로그인을 통해 애플리케이션에 접근할 수 있습니다.
2. **영화 좋아요 기능**: 각 영화의 상세 페이지에서 **좋아요 기능**을 제공하며, 별도의 **"좋아요 페이지"**에서 사용자가 좋아요한 영화 목록을 확인할 수 있습니다.
3. **영화 검색 기능**: 인기순 및 최신순으로 영화를 검색할 수 있는 기능을 제공합니다.
4. **영화 수익 정보**: 영화의 수익을 기준으로, 높은 수익을 올린 영화를 확인할 수 있습니다. (로그인 필요)

### **기술적 도전**

- **서버 사이드 렌더링 (SSR)**: Next.js의 SSR 기능을 활용하여 SEO 최적화와 빠른 페이지 로딩 속도를 구현.
- **데이터 시각화**: 복잡한 영화 데이터를 **Chart.js**를 사용하여 차트로 시각화하는 기능을 구현했습니다.
- **로그인 및 인증 시스템**: Google OAuth와 기본 로그인 시스템을 구현하여 보안과 사용자 편의성을 강화했습니다.

### **배운 점**

- **Next.js의 SSR과 SSG**: 서버 사이드 렌더링을 통해 SEO를 개선하고, 페이지 로딩 속도를 최적화하는 방법을 배웠습니다.
- **API 연동**: 외부 API와의 연동을 통해 실시간 영화 정보를 제공하는 방법을 익혔습니다.
- **데이터 시각화**: Chart.js를 활용하여 복잡한 데이터를 시각적으로 표현하는 방법을 배웠습니다.

### MovieAtlas 이미지

- **메인 페이지 이미지**
    
    ![image.png](attachment:49b07216-8f53-40e8-84d1-e2e8f8ea0966:image.png)
    
    ![image.png](attachment:d136fc8a-b486-4559-a99b-d6a371415db1:image.png)
    

- **영화 상세 페이지 이미지**
    
    ![image.png](attachment:1b497ce7-b582-43a2-ae28-387089a85e70:32b4a621-01eb-4c0a-9a75-2de32d907c8d.png)
    
    ![image.png](attachment:25c059bc-c4db-41b1-851d-f44e70072134:image.png)
    

- **로그인 페이지 이미지**
    
    ![image.png](attachment:3399f92f-5892-4a1c-8920-f6e67f7dc292:image.png)
    
    ![image.png](attachment:28e23aa3-eaff-43ad-a5a5-6839650a7d9d:image.png)
    

- **회원가입 페이지 이미지**
    
    ![image.png](attachment:d60a3558-bf79-429d-8f79-10816939e8a4:image.png)
    
    ![image.png](attachment:e0c1a7b1-21ee-4dde-a232-779d6f2f3da6:image.png)
    
- **영화 검색 페이지**
    
    ![image.png](attachment:e49a98f8-359c-4cd5-ae76-f77f31bd656b:image.png)
    

- **좋아요 페이지 이미지**
    
    ![image.png](attachment:8c5102c7-3e6b-4515-9fa5-64dc26f03754:image.png)
    

- **차트 데이터 시각화 페이지 이미지**
    
    ![image.png](attachment:317d0928-0137-4f66-9c51-09052f71a085:image.png)
    
    ![image.png](attachment:7374234e-a0c2-4a8b-b59d-ac6765f8fa51:image.png)

