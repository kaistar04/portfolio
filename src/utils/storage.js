// LocalStorage Storage Keys
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
  skills: ['React', 'TypeScript', 'JavaScript', 'HTML5/CSS3', 'Vite', 'Git', 'Tailwind CSS', 'REST API'],
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
    title: '포트폴리오 & 실시간 관리자 시스템',
    summary: '로컬 스토리지 기반의 실시간 편집이 가능한 개발자 포트폴리오 웹사이트',
    description: 'Vite와 React를 활용하여 구축된 개인 포트폴리오 및 관리자 템플릿입니다. 별도의 백엔드 서버 없이 브라우저의 localStorage를 활용하여 자기소개, 스킬 태그, 프로젝트 CRUD(추가/수정/삭제)를 완벽하게 지원합니다.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
    tags: ['React', 'Vite', 'CSS3', 'LocalStorage'],
    demoUrl: 'https://github.com/kaistar04/portfolio',
    githubUrl: 'https://github.com/kaistar04/portfolio',
    createdAt: '2026-07-29'
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
    createdAt: '2026-07-28'
  }
];

const DEFAULT_AUTH = {
  adminId: 'admin',
  adminPassword: 'admin1234',
  isLoggedIn: false
};

// Helper: Initialize Storage if empty
export const initStorage = () => {
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

// Profile APIs
export const getProfile = () => {
  initStorage();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILE)) || DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
};

export const updateProfile = (profileData) => {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profileData));
  window.dispatchEvent(new Event('portfolio_storage_change'));
};

// Projects APIs
export const getProjects = () => {
  initStorage();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS)) || DEFAULT_PROJECTS;
  } catch {
    return DEFAULT_PROJECTS;
  }
};

export const saveProjects = (projects) => {
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  window.dispatchEvent(new Event('portfolio_storage_change'));
};

export const addProject = (newProj) => {
  const projects = getProjects();
  const projectToAdd = {
    ...newProj,
    id: `proj_${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0]
  };
  const updated = [projectToAdd, ...projects];
  saveProjects(updated);
  return updated;
};

export const updateProject = (id, updatedFields) => {
  const projects = getProjects();
  const updated = projects.map(p => p.id === id ? { ...p, ...updatedFields } : p);
  saveProjects(updated);
  return updated;
};

export const deleteProject = (id) => {
  const projects = getProjects();
  const updated = projects.filter(p => p.id !== id);
  saveProjects(updated);
  return updated;
};

// Auth APIs
export const getAuth = () => {
  initStorage();
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

export const updateAdminAccount = (newId, newPassword) => {
  const auth = getAuth();
  const updated = { ...auth, adminId: newId, adminPassword: newPassword };
  localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(updated));
  window.dispatchEvent(new Event('portfolio_storage_change'));
};

// Backup & Reset APIs
export const exportDataJSON = () => {
  const data = {
    profile: getProfile(),
    projects: getProjects(),
    exportDate: new Date().toISOString()
  };
  return JSON.stringify(data, null, 2);
};

export const importDataJSON = (jsonString) => {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.profile && parsed.projects) {
      updateProfile(parsed.profile);
      saveProjects(parsed.projects);
      return { success: true };
    }
    return { success: false, message: '올바르지 않은 백업 파일 형항입니다.' };
  } catch (err) {
    return { success: false, message: 'JSON 파싱 오류: ' + err.message };
  }
};

export const resetToDefaultData = () => {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEFAULT_PROFILE));
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(DEFAULT_PROJECTS));
  window.dispatchEvent(new Event('portfolio_storage_change'));
};
