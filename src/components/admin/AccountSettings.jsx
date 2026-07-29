import React, { useState } from 'react';
import { KeyRound, Shield, CheckCircle } from 'lucide-react';
import { getAuth, updateAdminAccount } from '../../utils/storage';

export default function AccountSettings({ onToast }) {
  const auth = getAuth();
  const [adminId, setAdminId] = useState(auth.adminId || 'admin');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (currentPassword !== auth.adminPassword) {
      setErrorMsg('현재 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (newPassword.length < 4) {
      setErrorMsg('새 비밀번호는 최소 4자 이상이어야 합니다.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('새 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    updateAdminAccount(adminId, newPassword);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    onToast('관리자 계정 정보 및 비밀번호가 성공적으로 변경되었습니다!');
  };

  return (
    <div style={{ maxWidth: '600px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>
          🔐 관리자 계정 및 보안 설정
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
          관리자 페이지 로그인에 사용되는 ID 및 비밀번호를 변경합니다.
        </p>
      </div>

      {errorMsg && (
        <div style={{
          backgroundColor: 'var(--danger-50)',
          border: '1px solid var(--danger-500)',
          color: 'var(--danger-600)',
          padding: '12px 16px',
          borderRadius: '8px',
          fontSize: '14px',
          marginBottom: '20px'
        }}>
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">관리자 ID</label>
          <input
            type="text"
            className="form-input"
            value={adminId}
            onChange={e => setAdminId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">현재 비밀번호</label>
          <input
            type="password"
            className="form-input"
            placeholder="기존 비밀번호 입력"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">새 비밀번호</label>
            <input
              type="password"
              className="form-input"
              placeholder="새 비밀번호 (4자 이상)"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">새 비밀번호 확인</label>
            <input
              type="password"
              className="form-input"
              placeholder="새 비밀번호 재입력"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div style={{ marginTop: '24px' }}>
          <button type="submit" className="btn btn-lg btn-primary">
            <KeyRound size={18} /> 계정 정보 변경 저장
          </button>
        </div>
      </form>
    </div>
  );
}
