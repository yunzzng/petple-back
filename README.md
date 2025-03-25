# 🐾 PetPle

**PetPle**Petple(펫플)은 반려인을 위한 종합 서비스로, 반려동물과 함께하는 삶을 더욱 편리하고 즐겁게 만들어주는 웹 서비스입니다. 사용자에게 유용한 정보를 제공하고, 편리한 기능을 통해 반려동물과의 생활을 지원하는 것이 본 프로젝트의 목표입니다. 직관적인 UI/UX를 제공하고, 다양한 기능을 통합하여 사용자 경험을 극대화하는 데 중점을 두었습니다.

## 🚀 기술 스택
### Frontend
- React, TypeScript, Zustand, TanStack Query, React-Hook-Form, Zod, Axios, Socket.io-client

### Backend
- Node.js, Express, MongoDB, JWT, Socket.io

### DevOps
- Docker, Nginx, GitLab Runner

## 📌 주요 기능
### ✅ 커뮤니티 기능 (게시판, 좋아요, 댓글)
- [**Intersection Observer API를 활용한 useInfiniteQuery 기반 무한스크롤 기능 구현**](https://github.com/DonggunLim/Petple_front/wiki/Intersection-Observer-API%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-useInfiniteQuery-%EA%B8%B0%EB%B0%98-%EB%AC%B4%ED%95%9C%EC%8A%A4%ED%81%AC%EB%A1%A4-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84)
- [**tanstack-query를 활용한 데이터 캐싱 및 상태 동기화 최적화**](https://github.com/DonggunLim/Petple_front/wiki/tanstack%E2%80%90query%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%BA%90%EC%8B%B1-%EB%B0%8F-%EC%83%81%ED%83%9C-%EB%8F%99%EA%B8%B0%ED%99%94-%EC%B5%9C%EC%A0%81%ED%99%94)
- [**Context API와 Compound Pattern을 활용한 UI 공통 컴포넌트 설계 및 개발**](https://github.com/DonggunLim/Petple_front/wiki/Context-API%EC%99%80-Compound-Pattern%EC%9D%84-%ED%99%9C%EC%9A%A9%ED%95%9C-UI-%EA%B3%B5%ED%86%B5-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%84%A4%EA%B3%84-%EB%B0%8F-%EA%B0%9C%EB%B0%9C)
- [**AWS S3를 이용한 이미지 업로드 및 Lambda를 활용한 자동 이미지 리사이징 기능 구현**](https://github.com/DonggunLim/Petple_front/wiki/AWS-S3%EB%B2%84%ED%82%B7%EC%97%90-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C)

### ✅ 실시간 채팅 기능
- [**Socket.io 기반의 실시간 채팅과 Kakao Map API 및 MongoDB GeoJSON을 활용한 위치 기반 데이터 처리 구현**](https://github.com/DonggunLim/Petple_front/wiki/Socket.io%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%8B%A4%EC%8B%9C%EA%B0%84-%EC%B1%84%ED%8C%85-%EA%B5%AC%ED%98%84)

### ✅ 배포
- [**GitLab Runner, Docker, Nginx를 활용한 CI/CD 및 프론트엔드·백엔드 배포 자동화**](https://github.com/DonggunLim/Petple_front/wiki/GitLab-Runner%EC%99%80-Docker%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-CI-CD-%EA%B5%AC%EC%B6%95)

## 📌 링크
- **Frontend Repository**: [PetPle Frontend](https://github.com/yunzzng/petple-front)
- **Backend Repository**: [PetPle Backend](https://github.com/yunzzng/petple-back)
- **Figma**: [Petple Figma](https://www.figma.com/design/S8pxuYVx3NXhtFZJC7FrYU/elice-project3?node-id=0-1&p=f)
- **WebSite**: [Petple](https://petple-front-vert.vercel.app/)
## 📌 설치 및 실행 방법

### 프론트엔드 실행
```bash
npm install
npm run dev
```
### 백엔드 실행
```bash
npm install
node index.js
```

## 플로우 차트 
![1 (1)](https://github.com/user-attachments/assets/546c73a3-e21f-4917-90b4-0975891fab75)
![2 (1)](https://github.com/user-attachments/assets/497ce094-2b34-4a66-b770-306cdea36de9)
![3 (1)](https://github.com/user-attachments/assets/c619b2ae-9a9f-4cee-b454-0fed3af08ef7)
![4 (1)](https://github.com/user-attachments/assets/1030690a-e62a-4364-b86b-97ddcbdd3bda)


## ERD
![petple-erd drawio (1)](https://github.com/user-attachments/assets/b690d81d-8e59-4041-a805-164ae940a2cf)