import React from 'react';
import { Mail, Github, Globe, Linkedin, Send } from 'lucide-react';

export default function Contact({ profile }) {
  const contacts = profile.contacts || {};

  return (
    <section id="contact" style={{ padding: '80px 0', backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '12px' }}>
            Get In Touch
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            새로운 프로젝트 기회나 협업 제안은 언제든지 환영합니다. 아래 채널로 연락해주세요!
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <a
            href={`mailto:${contacts.email}`}
            className="btn btn-lg btn-outline"
            style={{ height: '70px', flexDirection: 'column', gap: '4px', textTransform: 'none' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
              <Mail size={18} color="var(--primary-500)" /> Email
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{contacts.email}</span>
          </a>

          <a
            href={contacts.github || '#'}
            target="_blank"
            rel="noreferrer"
            className="btn btn-lg btn-outline"
            style={{ height: '70px', flexDirection: 'column', gap: '4px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
              <Github size={18} color="var(--text-main)" /> GitHub
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>저장소 구경하기</span>
          </a>

          {contacts.blog && (
            <a
              href={contacts.blog}
              target="_blank"
              rel="noreferrer"
              className="btn btn-lg btn-outline"
              style={{ height: '70px', flexDirection: 'column', gap: '4px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
                <Globe size={18} color="var(--secondary-500)" /> Tech Blog
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>블로그 글 읽기</span>
            </a>
          )}

          {contacts.linkedin && (
            <a
              href={contacts.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn btn-lg btn-outline"
              style={{ height: '70px', flexDirection: 'column', gap: '4px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
                <Linkedin size={18} color="#0A66C2" /> LinkedIn
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>프로필 보기</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
