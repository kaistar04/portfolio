import { supabase } from './supabaseClient';

// LocalStorage Storage Keys (Used as secondary backup/cache)
const STORAGE_KEYS = {
  PROFILE: 'portfolio_profile',
  PROJECTS: 'portfolio_projects',
  AUTH: 'portfolio_auth',
};

// Initial Seed Data
const DEFAULT_PROFILE = {
  name: '김개발',
  title: 'Frontend Developer & UI/UX Craftsman',
  bio: '사용자 경험과 모던 웹 기술을 바탕으로 신뢰성 높은 인터페이스를 구축합니다.',
  about: '안녕하세요! React, TypeScript 및 클린 아키텍처 기술을 기반으로 직관적이고 빠르게 동작하는 웹 서비스를 만드는 프론트엔드 개발자입니다.\n\n사용자의 첫인상을 좌우하는 UI/UX 디자인 시스템 구축부터, 유지보수가 용이한 컴포넌트 설계에 깊은 관심이 있습니다.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500',
  skills: ['React', 'TypeScript', 'JavaScript', 'HTML5/CSS3', 'Vite', 'Git', 'Tailwind CSS', 'REST API', 'Supabase'],
  contacts: {
    email: 'kaistar04@example.com',
    github: 'https://github.com/kaistar04',
    blog: 'https://velog.io/@kaistar04',
    linkedin: 'https://linkedin.com/in/kaistar04'
  }
};

const DEFAULT_PROJECTS = [
  {
    id: 'proj_1',
    title: '포트폴리오 & Supabase 클라우드 연동',
    summary: 'Supabase 데이터베이스 기반 실시간 편집 개인 포트폴리오 웹사이트',
    description: 'Vite와 React를 활용하여 구축된 개인 포트폴리오 및 관리자 템플릿입니다. Supabase 클라우드 데이터베이스와 연동되어 자기소개, 스킬 태그, 프로젝트 CRUD(추가/수정/삭제)를 완벽하게 지원합니다.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
    tags: ['React', 'Vite', 'CSS3', 'Supabase', 'PostgreSQL'],
    demoUrl: 'https://github.com/kaistar04/portfolio',
    githubUrl: 'https://github.com/kaistar04/portfolio',
    createdAt: '2026-07-29',
    sort_order: 1
  },
  {
    id: 'proj_2',
    title: '인터랙티브 포춘쿠키 웹 애플리케이션',
    summary: '3D 쪼개짐 애니메이션과 사운드가 적용된 감성 웹 서비스',
    description: '쿠키 클릭 시 동적인 물리 애니메이션 및 효과음과 함께 오늘의 명언, 행운의 번호, 히스토리 컬렉션 기능을 제공하는 인터랙티브 웹 앱입니다.',
    thumbnail: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600',
    tags: ['JavaScript', 'HTML5 Canvas', 'Web Audio API', 'CSS3'],
    demoUrl: 'https://github.com/kaistar04',
    githubUrl: 'https://github.com/kaistar04',
    createdAt: '2026-07-28',
    sort_order: 2
  }
];

const DEFAULT_AUTH = {
  adminId: 'admin',
  adminPassword: 'admin1234',
  isLoggedIn: false
};

// Helper: Initialize LocalStorage Cache
export const initLocalStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.PROFILE)) {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEFAULT_PROFILE));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(DEFAULT_PROJECTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.AUTH)) {
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(DEFAULT_AUTH));
  }
};

// ==========================================================================
// 1. Profile APIs (Supabase DB + LocalStorage Fallback)
// ==========================================================================

export const fetchProfile = async () => {
  initLocalStorage();
  try {
    const { data, error } = await supabase
      .from('portfolio_profile')
      .select('*')
      .eq('id', 'main')
      .maybeSingle();

    if (!error && data) {
      const profile = {
        name: data.name,
        title: data.title,
        bio: data.bio,
        about: data.about,
        avatar: data.avatar,
        skills: typeof data.skills === 'string' ? JSON.parse(data.skills) : (data.skills || []),
        contacts: typeof data.contacts === 'string' ? JSON.parse(data.contacts) : (data.contacts || {})
      };
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
      return profile;
    }
  } catch (err) {
    console.warn('Supabase fetchProfile fallback:', err);
  }
  // Fallback to local
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILE)) || DEFAULT_PROFILE;
};

export const updateProfile = async (profileData) => {
  // Update LocalStorage
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profileData));
  window.dispatchEvent(new Event('portfolio_storage_change'));

  // Sync to Supabase DB
  try {
    await supabase.from('portfolio_profile').upsert({
      id: 'main',
      name: profileData.name,
      title: profileData.title,
      bio: profileData.bio,
      about: profileData.about,
      avatar: profileData.avatar,
      skills: profileData.skills,
      contacts: profileData.contacts,
      updated_at: new Date().toISOString()
    });
  } catch (err) {
    console.error('Supabase updateProfile error:', err);
  }
};

// ==========================================================================
// 2. Projects APIs (Supabase DB + LocalStorage Fallback)
// ==========================================================================

export const fetchProjects = async () => {
  initLocalStorage();
  try {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!error && data && data.length > 0) {
      const projects = data.map((p, idx) => ({
        id: p.id,
        title: p.title,
        summary: p.summary,
        description: p.description,
        thumbnail: p.thumbnail,
        tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : (p.tags || []),
        demoUrl: p.demo_url,
        githubUrl: p.github_url,
        createdAt: p.created_at,
        sort_order: p.sort_order ?? idx + 1
      }));
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
      return projects;
    }
  } catch (err) {
    console.warn('Supabase fetchProjects fallback:', err);
  }
  // Fallback
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS)) || DEFAULT_PROJECTS;
};

export const saveProjects = async (projects) => {
  // Update LocalStorage
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  window.dispatchEvent(new Event('portfolio_storage_change'));

  // Sync to Supabase
  try {
    const rows = projects.map((p, idx) => ({
      id: p.id,
      title: p.title,
      summary: p.summary,
      description: p.description,
      thumbnail: p.thumbnail,
      tags: p.tags,
      demo_url: p.demoUrl,
      github_url: p.githubUrl,
      created_at: p.createdAt || new Date().toISOString().split('T')[0],
      sort_order: idx + 1,
      updated_at: new Date().toISOString()
    }));
    await supabase.from('portfolio_projects').upsert(rows);
  } catch (err) {
    console.error('Supabase saveProjects error:', err);
  }
};

export const addProject = async (newProj) => {
  const current = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS)) || DEFAULT_PROJECTS;
  const projectToAdd = {
    ...newProj,
    id: `proj_${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
    sort_order: current.length + 1
  };
  const updated = [projectToAdd, ...current];
  await saveProjects(updated);
  return updated;
};

export const updateProject = async (id, updatedFields) => {
  const current = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS)) || DEFAULT_PROJECTS;
  const updated = current.map(p => p.id === id ? { ...p, ...updatedFields } : p);
  await saveProjects(updated);
  return updated;
};

export const deleteProject = async (id) => {
  const current = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS)) || DEFAULT_PROJECTS;
  const updated = current.filter(p => p.id !== id);
  await saveProjects(updated);

  // Sync delete to Supabase
  try {
    await supabase.from('portfolio_projects').delete().eq('id', id);
  } catch (err) {
    console.error('Supabase deleteProject error:', err);
  }
  return updated;
};

// ==========================================================================
// 3. Auth APIs (Supabase DB + LocalStorage Fallback)
// ==========================================================================

export const fetchAuth = async () => {
  initLocalStorage();
  try {
    const { data, error } = await supabase
      .from('portfolio_auth')
      .select('*')
      .eq('id', 'main')
      .maybeSingle();

    if (!error && data) {
      const authObj = {
        adminId: data.admin_id,
        adminPassword: data.admin_password,
        isLoggedIn: JSON.parse(localStorage.getItem(STORAGE_KEYS.AUTH))?.isLoggedIn || false
      };
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(authObj));
      return authObj;
    }
  } catch (err) {
    console.warn('Supabase fetchAuth fallback:', err);
  }
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.AUTH)) || DEFAULT_AUTH;
};

export const getAuth = () => {
  initLocalStorage();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.AUTH)) || DEFAULT_AUTH;
  } catch {
    return DEFAULT_AUTH;
  }
};

export const loginAdmin = (inputID, inputPassword) => {
  const auth = getAuth();
  if (inputID === auth.adminId && inputPassword === auth.adminPassword) {
    const updated = { ...auth, isLoggedIn: true };
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(updated));
    window.dispatchEvent(new Event('portfolio_storage_change'));
    return { success: true };
  }
  return { success: false, message: '아이디 또는 비밀번호가 올바르지 않습니다.' };
};

export const logoutAdmin = () => {
  const auth = getAuth();
  const updated = { ...auth, isLoggedIn: false };
  localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(updated));
  window.dispatchEvent(new Event('portfolio_storage_change'));
};

export const updateAdminAccount = async (newId, newPassword) => {
  const auth = getAuth();
  const updated = { ...auth, adminId: newId, adminPassword: newPassword };
  localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(updated));
  window.dispatchEvent(new Event('portfolio_storage_change'));

  try {
    await supabase.from('portfolio_auth').upsert({
      id: 'main',
      admin_id: newId,
      admin_password: newPassword,
      updated_at: new Date().toISOString()
    });
  } catch (err) {
    console.error('Supabase updateAdminAccount error:', err);
  }
};

// Synchronous getters for immediate UI render before async fetch finishes
export const getProfile = () => {
  initLocalStorage();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILE)) || DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
};

export const getProjects = () => {
  initLocalStorage();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS)) || DEFAULT_PROJECTS;
  } catch {
    return DEFAULT_PROJECTS;
  }
};

// Backup & Reset
export const exportDataJSON = () => {
  const data = {
    profile: getProfile(),
    projects: getProjects(),
    exportDate: new Date().toISOString()
  };
  return JSON.stringify(data, null, 2);
};

export const importDataJSON = async (jsonString) => {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.profile && parsed.projects) {
      await updateProfile(parsed.profile);
      await saveProjects(parsed.projects);
      return { success: true };
    }
    return { success: false, message: '올바르지 않은 백업 파일 형식입니다.' };
  } catch (err) {
    return { success: false, message: 'JSON 파싱 오류: ' + err.message };
  }
};

export const resetToDefaultData = async () => {
  await updateProfile(DEFAULT_PROFILE);
  await saveProjects(DEFAULT_PROJECTS);
};
