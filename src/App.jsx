import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import AdminDashboard from './components/admin/AdminDashboard';
import {
  getProfile,
  getProjects,
  getAuth,
  fetchProfile,
  fetchProjects,
  fetchAuth,
  logoutAdmin
} from './utils/storage';
import { CheckCircle2, RefreshCw } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState(getProfile());
  const [projects, setProjects] = useState(getProjects());
  const [auth, setAuth] = useState(getAuth());
  const [isLoading, setIsLoading] = useState(true);

  const [currentView, setCurrentView] = useState('home'); // 'home' | 'admin'
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Initial load from Supabase DB
  useEffect(() => {
    let isMounted = true;
    const loadFromSupabase = async () => {
      try {
        const [profData, projData, authData] = await Promise.all([
          fetchProfile(),
          fetchProjects(),
          fetchAuth()
        ]);
        if (isMounted) {
          if (profData) setProfile(profData);
          if (projData) setProjects(projData);
          if (authData) setAuth(authData);
        }
      } catch (err) {
        console.warn('Initial Supabase load error:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadFromSupabase();

    const handleStorageChange = () => {
      setProfile(getProfile());
      setProjects(getProjects());
      setAuth(getAuth());
    };

    window.addEventListener('portfolio_storage_change', handleStorageChange);
    return () => {
      isMounted = false;
      window.removeEventListener('portfolio_storage_change', handleStorageChange);
    };
  }, []);

  // Show toast notification
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg('');
    }, 3000);
  };

  const handleOpenLogin = () => {
    setIsLoginModalOpen(true);
  };

  const handleSuccessLogin = () => {
    setIsLoginModalOpen(false);
    setCurrentView('admin');
    showToast('관리자로 성공적으로 로그인하였습니다.');
  };

  const handleLogout = () => {
    logoutAdmin();
    setCurrentView('home');
    showToast('관리자 계정에서 로그아웃 되었습니다.');
  };

  const handleGoAdmin = () => {
    if (auth.isLoggedIn) {
      setCurrentView('admin');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleGoHome = () => {
    setCurrentView('home');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {currentView === 'admin' && auth.isLoggedIn ? (
        <AdminDashboard
          profile={profile}
          projects={projects}
          onLogout={handleLogout}
          onGoHome={handleGoHome}
          onToast={showToast}
        />
      ) : (
        <>
          <Navbar
            isLoggedIn={auth.isLoggedIn}
            onOpenLogin={handleOpenLogin}
            onGoAdmin={handleGoAdmin}
            currentView={currentView}
            onGoHome={handleGoHome}
          />

          <main style={{ flex: 1 }}>
            <Hero profile={profile} isLoggedIn={auth.isLoggedIn} onGoAdmin={handleGoAdmin} />
            <About profile={profile} isLoggedIn={auth.isLoggedIn} onGoAdmin={handleGoAdmin} />
            <Projects projects={projects} isLoggedIn={auth.isLoggedIn} onGoAdmin={handleGoAdmin} />
            <Contact profile={profile} />
          </main>

          <Footer
            isLoggedIn={auth.isLoggedIn}
            onOpenLogin={handleOpenLogin}
            onGoAdmin={handleGoAdmin}
          />
        </>
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccessLogin={handleSuccessLogin}
      />

      {/* Toast Notification */}
      {toastMsg && (
        <div className="toast-msg">
          <CheckCircle2 size={18} color="var(--primary-500)" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
