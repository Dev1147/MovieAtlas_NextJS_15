![스크린샷 2025-02-16 181925](https://github.com/user-attachments/assets/9e44f4a7-7ec7-40af-94e9-4a2ebae75621)### 프로젝트 개요

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

    ![스크린샷 2025-02-16 181925](https://github.com/user-attachments/assets/1d4ccf6f-cf02-434c-8e01-d21741dddb55)

    ![스크린샷 2025-02-19 221701](https://github.com/user-attachments/assets/ba2d6d80-fcac-480a-b828-3ee088e62254)

- **영화 상세 페이지 이미지**
    
    ![스크린샷 2025-02-19 221857](https://github.com/user-attachments/assets/ff40f3c7-509f-410a-99f7-83fb45732d29)

    ![스크린샷 2025-02-19 221915](https://github.com/user-attachments/assets/e4e0c22b-a44e-457b-9a89-4e2181455a37)

- **로그인 페이지 이미지**
    
    ![스크린샷 2025-02-19 221451](https://github.com/user-attachments/assets/34726f63-534d-4351-88e5-e623e983880c)

    ![스크린샷 2025-02-19 222013](https://github.com/user-attachments/assets/e809ccae-be15-4701-bee8-471b013b2f1c)


- **회원가입 페이지 이미지**

    ![스크린샷 2025-02-19 222048](https://github.com/user-attachments/assets/9aeff410-d7d9-4161-afd3-f825fa766549)

    ![스크린샷 2025-02-19 222149](https://github.com/user-attachments/assets/2cb28a3b-efeb-47ae-87db-daef833bb3b6)

- **영화 검색 페이지**
    
    ![스크린샷 2025-02-19 222238](https://github.com/user-attachments/assets/d3a93dc3-62a4-4c14-b1fd-655f7a88ca0f)


- **좋아요 페이지 이미지**

    ![스크린샷 2025-02-19 222454](https://github.com/user-attachments/assets/239f6e22-128d-4d23-8c59-de5106e57add)

- **차트 데이터 시각화 페이지 이미지**

    ![스크린샷 2025-02-19 222544](https://github.com/user-attachments/assets/e5ffdd84-5834-4f1f-a551-b704bb6ce5e3)

    ![스크린샷 2025-02-19 222600](https://github.com/user-attachments/assets/0eeaf4ed-bacb-4d98-8b2d-ff457fd597d8)
