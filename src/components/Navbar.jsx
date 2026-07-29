import React from 'react';
import { Shield, ShieldCheck, LogOut, UserCheck } from 'lucide-react';

export default function Navbar({ isLoggedIn, onOpenLogin, onGoAdmin, currentView, onGoHome }) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px'
      }}>
        <div 
          onClick={onGoHome} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: 'var(--primary-500)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '700',
            fontSize: '18px'
          }}>
            P
          </div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '16px', color: 'var(--text-main)' }}>
              Developer Portfolio
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {isLoggedIn ? '● 관리자 로그인 상태' : 'Public View'}
            </div>
          </div>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {currentView === 'home' ? (
            <>
              <a href="#about" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-body)' }}>소개</a>
              <a href="#projects" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-body)' }}>프로젝트</a>
              <a href="#contact" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-body)' }}>연락처</a>
            </>
          ) : (
            <button className="btn btn-sm btn-outline" onClick={onGoHome}>
              ← 메인 포트폴리오로 이동
            </button>
          )}

          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {currentView !== 'admin' && (
                <button className="btn btn-sm btn-primary" onClick={onGoAdmin}>
                  <ShieldCheck size={16} /> 관리자 페이지
                </button>
              )}
            </div>
          ) : (
            <button className="btn btn-sm btn-ghost" onClick={onOpenLogin} title="관리자 로그인">
              <Shield size={16} /> 관리자 로그인
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
