import React from 'react';
import { ArrowDown, Github, Mail, Edit3 } from 'lucide-react';

export default function Hero({ profile, isLoggedIn, onGoAdmin }) {
  return (
    <section style={{ padding: '80px 0 60px', backgroundColor: 'var(--bg-canvas)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span className="tech-badge">AVAILABLE FOR WORK</span>
              {isLoggedIn && (
                <span className="cms-badge" onClick={onGoAdmin} style={{ cursor: 'pointer' }}>
                  <Edit3 size={12} /> 관리자 편집 모드
                </span>
              )}
            </div>

            <h1 style={{
              fontSize: '2.75rem',
              fontWeight: '700',
              lineHeight: '1.2',
              color: 'var(--text-main)',
              marginBottom: '16px'
            }}>
              안녕하세요,<br />
              <span style={{ color: 'var(--primary-500)' }}>{profile.name}</span>입니다.
            </h1>

            <p style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--secondary-500)',
              marginBottom: '16px'
            }}>
              {profile.title}
            </p>

            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-body)',
              lineHeight: '1.6',
              marginBottom: '32px',
              maxWidth: '540px'
            }}>
              {profile.bio}
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="#projects" className="btn btn-lg btn-primary">
                프로젝트 보기 <ArrowDown size={18} />
              </a>
              <a href={profile.contacts?.github || '#'} target="_blank" rel="noreferrer" className="btn btn-lg btn-outline">
                <Github size={18} /> GitHub
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              position: 'relative',
              width: '280px',
              height: '280px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              border: '4px solid var(--bg-canvas)'
            }}>
              <img 
                src={profile.avatar} 
                alt={profile.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
