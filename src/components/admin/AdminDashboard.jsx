import React, { useState } from 'react';
import { User, FolderGit2, KeyRound, Database, ArrowLeft, LogOut, ShieldCheck, Eye } from 'lucide-react';
import ProfileEditor from './ProfileEditor';
import ProjectManager from './ProjectManager';
import AccountSettings from './AccountSettings';
import BackupReset from './BackupReset';
import { logoutAdmin } from '../../utils/storage';

export default function AdminDashboard({ profile, projects, onLogout, onGoHome, onToast }) {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'projects' | 'account' | 'backup'

  const navItems = [
    { id: 'profile', label: '자기소개 및 프로필', icon: User },
    { id: 'projects', label: '작업물(프로젝트) 관리', icon: FolderGit2 },
    { id: 'account', label: '계정 & 보안 설정', icon: KeyRound },
    { id: 'backup', label: '데이터 백업 / 초기화', icon: Database },
  ];

  return (
    <div className="admin-layout">
      {/* Admin Header Topbar */}
      <header className="admin-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button className="btn btn-sm btn-outline" onClick={onGoHome} title="메인 웹사이트로 돌아가기">
            <ArrowLeft size={16} /> 메인으로
          </button>
          <div style={{ height: '24px', width: '1px', backgroundColor: 'var(--border-subtle)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={20} color="var(--primary-500)" />
            <span style={{ fontWeight: '700', fontSize: '17px', color: 'var(--text-main)' }}>
              포트폴리오 관리자 대시보드
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn btn-sm btn-ghost" onClick={onGoHome}>
            <Eye size={16} /> 포트폴리오 미리보기
          </button>
          <button className="btn btn-sm btn-danger" onClick={onLogout}>
            <LogOut size={16} /> 로그아웃
          </button>
        </div>
      </header>

      {/* Admin Body Container */}
      <div className="admin-body">
        {/* Sidebar Nav */}
        <aside className="admin-sidebar">
          <div style={{ padding: '8px 16px 16px', fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            관리자 메뉴
          </div>

          {navItems.map(item => {
            const IconComp = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <IconComp size={18} color={isActive ? 'var(--primary-500)' : 'var(--text-muted)'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Main Content Area */}
        <main className="admin-content">
          {activeTab === 'profile' && (
            <ProfileEditor profile={profile} onToast={onToast} />
          )}

          {activeTab === 'projects' && (
            <ProjectManager projects={projects} onToast={onToast} />
          )}

          {activeTab === 'account' && (
            <AccountSettings onToast={onToast} />
          )}

          {activeTab === 'backup' && (
            <BackupReset onToast={onToast} />
          )}
        </main>
      </div>
    </div>
  );
}
