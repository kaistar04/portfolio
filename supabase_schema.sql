-- ==========================================================================
-- Supabase Table Schema & Seed Data for Developer Portfolio
-- Supabase 대시보드의 SQL Editor에서 아래 쿼리를 전체 복사하여 [Run] 해주세요.
-- ==========================================================================

-- 1. 자기소개 & 프로필 테이블 (portfolio_profile)
CREATE TABLE IF NOT EXISTS portfolio_profile (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'main',
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    bio TEXT,
    about TEXT,
    avatar TEXT,
    skills JSONB DEFAULT '[]'::jsonb,
    contacts JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 작업물/프로젝트 테이블 (portfolio_projects)
CREATE TABLE IF NOT EXISTS portfolio_projects (
    id VARCHAR(100) PRIMARY KEY,
    title TEXT NOT NULL,
    summary TEXT,
    description TEXT,
    thumbnail TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    demo_url TEXT,
    github_url TEXT,
    created_at TEXT,
    sort_order INT DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 관리자 계정 테이블 (portfolio_auth)
CREATE TABLE IF NOT EXISTS portfolio_auth (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'main',
    admin_id TEXT NOT NULL DEFAULT 'admin',
    admin_password TEXT NOT NULL DEFAULT 'admin1234',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================================================
-- RLS (Row Level Security) 접근 권한 설정
-- ==========================================================================

ALTER TABLE portfolio_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_auth ENABLE ROW LEVEL SECURITY;

-- 기존 정책 초기화 후 재생성
DROP POLICY IF EXISTS "Allow public select profile" ON portfolio_profile;
DROP POLICY IF EXISTS "Allow public all profile" ON portfolio_profile;
CREATE POLICY "Allow public select profile" ON portfolio_profile FOR SELECT USING (true);
CREATE POLICY "Allow public all profile" ON portfolio_profile FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public select projects" ON portfolio_projects;
DROP POLICY IF EXISTS "Allow public all projects" ON portfolio_projects;
CREATE POLICY "Allow public select projects" ON portfolio_projects FOR SELECT USING (true);
CREATE POLICY "Allow public all projects" ON portfolio_projects FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public select auth" ON portfolio_auth;
DROP POLICY IF EXISTS "Allow public all auth" ON portfolio_auth;
CREATE POLICY "Allow public select auth" ON portfolio_auth FOR SELECT USING (true);
CREATE POLICY "Allow public all auth" ON portfolio_auth FOR ALL USING (true);

-- ==========================================================================
-- 초기 샘플 데이터 생성 (Initial Seed Data)
-- ==========================================================================

INSERT INTO portfolio_profile (id, name, title, bio, about, avatar, skills, contacts)
VALUES (
  'main',
  '김개발',
  'Frontend Developer & UI/UX Craftsman',
  '사용자 경험과 모던 웹 기술을 바탕으로 신뢰성 높은 인터페이스를 구축합니다.',
  '안녕하세요! React, TypeScript 및 클린 아키텍처 기술을 기반으로 직관적이고 빠르게 동작하는 웹 서비스를 만드는 프론트엔드 개발자입니다.\n\n사용자의 첫인상을 좌우하는 UI/UX 디자인 시스템 구축부터, 유지보수가 용이한 컴포넌트 설계에 깊은 관심이 있습니다.',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500',
  '["React", "TypeScript", "JavaScript", "HTML5/CSS3", "Vite", "Git", "Tailwind CSS", "REST API", "Supabase"]'::jsonb,
  '{"email": "kaistar04@example.com", "github": "https://github.com/kaistar04", "blog": "https://velog.io/@kaistar04", "linkedin": "https://linkedin.com/in/kaistar04"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO portfolio_projects (id, title, summary, description, thumbnail, tags, demo_url, github_url, created_at, sort_order)
VALUES 
(
  'proj_1',
  '포트폴리오 & Supabase 클라우드 연동',
  'Supabase 데이터베이스 기반 실시간 편집 개인 포트폴리오 웹사이트',
  'Vite와 React를 활용하여 구축된 개인 포트폴리오 및 관리자 템플릿입니다. Supabase 클라우드 데이터베이스와 연동되어 자기소개, 스킬 태그, 프로젝트 CRUD(추가/수정/삭제)를 완벽하게 지원합니다.',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
  '["React", "Vite", "CSS3", "Supabase", "PostgreSQL"]'::jsonb,
  'https://github.com/kaistar04/portfolio',
  'https://github.com/kaistar04/portfolio',
  '2026-07-29',
  1
),
(
  'proj_2',
  '인터랙티브 포춘쿠키 웹 애플리케이션',
  '3D 쪼개짐 애니메이션과 사운드가 적용된 감성 웹 서비스',
  '쿠키 클릭 시 동적인 물리 애니메이션 및 효과음과 함께 오늘의 명언, 행운의 번호, 히스토리 컬렉션 기능을 제공하는 인터랙티브 웹 앱입니다.',
  'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600',
  '["JavaScript", "HTML5 Canvas", "Web Audio API", "CSS3"]'::jsonb,
  'https://github.com/kaistar04',
  'https://github.com/kaistar04',
  '2026-07-28',
  2
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO portfolio_auth (id, admin_id, admin_password)
VALUES ('main', 'admin', 'admin1234')
ON CONFLICT (id) DO NOTHING;
