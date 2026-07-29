import React, { useState } from 'react';
import { X, Lock, UserCheck, KeyRound } from 'lucide-react';
import { loginAdmin } from '../utils/storage';

export default function LoginModal({ isOpen, onClose, onSuccessLogin }) {
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const res = loginAdmin(adminId, adminPassword);
    if (res.success) {
      setAdminId('');
      setAdminPassword('');
      onSuccessLogin();
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '420px' }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '16px',
            backgroundColor: 'var(--primary-50)',
            color: 'var(--primary-600)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px'
          }}>
            <Lock size={26} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>
            관리자 로그인
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
            포트폴리오 내용 및 프로젝트 관리를 위한 로그인입니다.
          </p>
        </div>

        {errorMsg && (
          <div style={{
            backgroundColor: 'var(--danger-50)',
            border: '1px solid var(--danger-500)',
            color: 'var(--danger-600)',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '13px',
            marginBottom: '16px'
          }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">관리자 아이디</label>
            <input
              type="text"
              className="form-input"
              placeholder="예: admin"
              value={adminId}
              onChange={e => setAdminId(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">비밀번호</label>
            <input
              type="password"
              className="form-input"
              placeholder="예: admin1234"
              value={adminPassword}
              onChange={e => setAdminPassword(e.target.value)}
              required
            />
          </div>

          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '10px 12px',
            fontSize: '12px',
            color: 'var(--text-muted)',
            marginBottom: '20px',
            lineHeight: '1.5'
          }}>
            🔑 <strong>초기 계정 안내</strong><br />
            아이디: <code>admin</code> / 비밀번호: <code>admin1234</code><br />
            (관리자 페이지 접속 후 설정에서 변경 가능)
          </div>

          <button type="submit" className="btn btn-lg btn-primary" style={{ width: '100%' }}>
            <UserCheck size={18} /> 로그인하고 접속하기
          </button>
        </form>
      </div>
    </div>
  );
}
