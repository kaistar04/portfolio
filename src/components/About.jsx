import React from 'react';
import { User, Code2, Edit } from 'lucide-react';

export default function About({ profile, isLoggedIn, onGoAdmin }) {
  return (
    <section id="about" style={{ padding: '80px 0', backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <User size={28} color="var(--primary-500)" /> About Me
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
              개발 철학 및 핵심 기술 스택
            </p>
          </div>
          {isLoggedIn && (
            <button className="btn btn-sm btn-outline" onClick={onGoAdmin}>
              <Edit size={14} /> 자기소개 수정
            </button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {/* Detailed About Text in CMS Card style */}
          <div className="cms-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-main)' }}>
                상세 소개
              </h3>
              {isLoggedIn && <span className="cms-badge">✏️ CMS 편집 가능</span>}
            </div>
            <div style={{
              whiteSpace: 'pre-line',
              lineHeight: '1.7',
              color: 'var(--text-body)',
              fontSize: '15px'
            }}>
              {profile.about || profile.bio}
            </div>
          </div>

          {/* Tech Stack Skills */}
          <div className="cms-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Code2 size={20} color="var(--secondary-500)" /> 기술 스택 (Tech Stack)
              </h3>
              {isLoggedIn && <span className="cms-badge">✏️ CMS 편집 가능</span>}
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              프로젝트 개발에 주로 사용하는 라이브러리 및 도구입니다.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {profile.skills && profile.skills.map((skill, index) => (
                <span key={index} className="tech-badge" style={{ padding: '6px 14px', fontSize: '13px' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
