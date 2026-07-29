# 포트폴리오 웹사이트 및 관리자 페이지 PRD (Product Requirements Document)

## 1. 프로젝트 개요
본 프로젝트는 개발자/디자이너를 위한 개인 포트폴리오 웹사이트와, 코딩 없이 웹상에서 자기소개 및 프로젝트(작업물)를 손쉽게 수정·관리할 수 있는 **관리자 페이지(Admin Dashboard)**를 구축하는 것을 목표로 합니다. 모든 데이터는 백엔드 서버 없이 브라우저의 **`localStorage`**에 저장되며, 언제든지 자유롭게 수정 및 복구가 가능합니다.

- **선택된 기술 스택**: Vite + React + Vanilla CSS
- **선택된 인증 방식**: ID / 비밀번호 입력 방식 (기본 계정 제공 및 비밀번호 변경 기능 지원)
- **선택된 이미지 등록 방식**: 이미지 URL 입력 및 PC 파일 업로드(Base64 변환) 동시 지원

---

## 2. 주요 기능 요구사항

### 2.1 포트폴리오 메인 페이지 (Public View)
- **히어로 섹션 (Hero)**: 메인 타이틀, 직무/타이틀, 한 줄 소개, 프로필 이미지, C.V 다운로드/연락처 버튼
- **자기소개 섹션 (About Me)**: 상세 자기소개, 주요 역량 및 기술 스택 태그 목록
- **작업물 갤러리 (Projects)**: 
  - 관리자 페이지에서 등록한 프로젝트 카드 목록 표시
  - 카테고리/기술 스택 필터링 기능
  - 카드 클릭 시 상세 정보 모달 출력
- **연락처 섹션 (Contact)**: 이메일, GitHub, Social 링크 및 문의 양식
- **관리자 접근 버튼**: 푸터(Footer) 또는 헤더의 관리자 로그인 진입 버튼

---

### 2.2 로그인 & 인증 (Authentication)
- **로그인 폼**: Admin ID (`admin`) / Password (`admin1234`) 입력창 제공
- **인증 처리**: 입력 정보 검증 후 `localStorage` 세션 토큰 저장 및 관리자 페이지(`/admin`)로 리다이렉트
- **비밀번호 변경**: 관리자 페이지 내에서 ID 및 비밀번호 변경 가능

---

### 2.3 관리자 페이지 (Admin Dashboard)
- **자기소개 관리 (Profile Manager)**
  - 프로필 이미지 수정 (URL 직접 입력 또는 내 컴퓨터 파일 업로드 지원)
  - 이름, 직무/타이틀, 한 줄 소개, 상세 자기소개 수정
  - 기술 스택(Skills) 태그 추가/삭제/수정
  - 소셜 링크(GitHub, Blog, LinkedIn, Email) 수정
- **작업물(프로젝트) 관리 (Project Manager)**
  - **목록 조회**: 등록된 전체 프로젝트 리스트 확인 및 검색
  - **프로젝트 추가/수정/삭제 (CRUD)**:
    - 프로젝트 제목 및 요약
    - 상세 설명 (주요 기능, 역할, 문제 해결 경험)
    - 썸네일 이미지 (URL 직접 입력 또는 내 컴퓨터 파일 업로드 지원)
    - 사용 기술 스택 (예: React, TypeScript, Tailwind)
    - 라이브 데모 URL 및 GitHub 저장소 URL
  - **프로젝트 순서 변경**: 전시 순서 변경
- **데이터 백업 및 리셋 (Data Backup & Reset)**
  - **JSON 데이터 백업/복구**: `localStorage` 데이터를 JSON 파일로 저장하거나 불러오기
  - **샘플 데이터 리셋**: 초기 데모 상태로 복원

---

## 3. 데이터 구조 명세 (`localStorage`)

```json
{
  "portfolio_profile": {
    "name": "홍길동",
    "title": "Frontend Developer",
    "bio": "사용자 경험을 최우선으로 생각하는 프론트엔드 개발자입니다.",
    "about": "안녕하세요! 웹 기술로 사용자 경험을 혁신하는 것에 열정을 가진 프론트엔드 개발자입니다.",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
    "skills": ["React", "TypeScript", "JavaScript", "HTML5/CSS3", "Vite", "Git"],
    "contacts": {
      "email": "developer@example.com",
      "github": "https://github.com/kaistar04",
      "blog": "https://velog.io",
      "linkedin": "https://linkedin.com"
    }
  },
  "portfolio_projects": [
    {
      "id": "proj_1",
      "title": "인터랙티브 포트폴리오 & 관리자 시스템",
      "summary": "로컬 스토리지 기반의 실시간 편집 가능한 개인 포트폴리오 웹 애플리케이션",
      "description": "Vite + React로 구현된 포트폴리오 웹사이트입니다. 관리자 페이지를 통해 자기소개 및 프로젝트를 직접 추가, 수정, 삭제할 수 있으며 모든 데이터는 localStorage에 안전하게 보관됩니다.",
      "thumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
      "tags": ["React", "Vite", "CSS3", "LocalStorage"],
      "demoUrl": "https://example.com",
      "githubUrl": "https://github.com/kaistar04/portfolio",
      "createdAt": "2026-07-29"
    }
  ],
  "portfolio_auth": {
    "adminId": "admin",
    "adminPassword": "admin1234",
    "isLoggedIn": false
  }
}
```
