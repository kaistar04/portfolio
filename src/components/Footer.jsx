import React from 'react';
import { Shield } from 'lucide-react';

export default function Footer({ isLoggedIn, onOpenLogin, onGoAdmin }) {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-canvas)',
      borderTop: '1px solid var(--border-subtle)',
      padding: '32px 0',
      textAlign: 'center',
      fontSize: '14px',
      color: 'var(--text-muted)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          © {new Date().getFullYear()} kaistar04 Portfolio. Built with React & LocalStorage.
        </div>

        <div>
          {isLoggedIn ? (
            <button className="btn btn-sm btn-outline" onClick={onGoAdmin}>
              <Shield size={14} color="var(--primary-500)" /> 관리자 대시보드
            </button>
          ) : (
            <button className="btn btn-sm btn-ghost" onClick={onOpenLogin}>
              <Shield size={14} /> 관리자 로그인
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
