import React, { useState } from 'react';
import { Save, Plus, X, Upload, Image as ImageIcon } from 'lucide-react';
import { updateProfile } from '../../utils/storage';

export default function ProfileEditor({ profile, onToast }) {
  const [formData, setFormData] = useState({
    name: profile.name || '',
    title: profile.title || '',
    bio: profile.bio || '',
    about: profile.about || '',
    avatar: profile.avatar || '',
    skills: profile.skills || [],
    contacts: {
      email: profile.contacts?.email || '',
      github: profile.contacts?.github || '',
      blog: profile.contacts?.blog || '',
      linkedin: profile.contacts?.linkedin || ''
    }
  });

  const [newSkill, setNewSkill] = useState('');

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleContactChange = (field, val) => {
    setFormData(prev => ({
      ...prev,
      contacts: { ...prev.contacts, [field]: val }
    }));
  };

  // Image File Upload (Base64)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('이미지 크기는 2MB 이하만 업로드 가능합니다.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Skill Add / Remove
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    onToast('자기소개 및 프로필 정보가 성공적으로 저장되었습니다!');
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>
          👤 자기소개 및 프로필 편집
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
          메인 포트폴리오 첫 화면과 About 섹션에 표시될 자기소개 정보를 수정합니다.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Profile Image & Avatar Upload */}
        <div className="form-group">
          <label className="form-label">프로필 이미지</label>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '2px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-surface)'
            }}>
              <img
                src={formData.avatar}
                alt="Profile Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500';
                }}
              />
            </div>

            <div style={{ flex: 1, minWidth: '240px' }}>
              <input
                type="text"
                className="form-input"
                placeholder="이미지 URL 직접 입력 (https://...)"
                value={formData.avatar}
                onChange={e => handleChange('avatar', e.target.value)}
                style={{ marginBottom: '10px' }}
              />

              <label className="btn btn-sm btn-outline" style={{ cursor: 'pointer', display: 'inline-flex' }}>
                <Upload size={14} /> 내 컴퓨터에서 이미지 선택 (Base64)
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">이름</label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={e => handleChange('name', e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">직무 / 타이틀</label>
            <input
              type="text"
              className="form-input"
              placeholder="예: Frontend Developer"
              value={formData.title}
              onChange={e => handleChange('title', e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">한 줄 소개 (Bio)</label>
          <input
            type="text"
            className="form-input"
            placeholder="메인 메인페이지에 크게 표시될 한 줄 소개"
            value={formData.bio}
            onChange={e => handleChange('bio', e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">상세 자기소개 (About Me)</label>
          <textarea
            className="form-textarea"
            rows={5}
            placeholder="개발 철학, 경력 사항, 학력 및 관심 분야를 적어주세요."
            value={formData.about}
            onChange={e => handleChange('about', e.target.value)}
          />
        </div>

        {/* Skills Tag Manager */}
        <div className="form-group">
          <label className="form-label">기술 스택 (Tech Stack Skills)</label>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <input
              type="text"
              className="form-input"
              placeholder="새 기술 입력 (예: React, TypeScript)"
              value={newSkill}
              onChange={e => setNewSkill(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill(e);
                }
              }}
            />
            <button type="button" className="btn btn-md btn-outline" onClick={handleAddSkill}>
              <Plus size={16} /> 추가
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {formData.skills.map((skill, index) => (
              <span key={index} className="tech-badge" style={{ gap: '6px', paddingRight: '8px' }}>
                {skill}
                <X
                  size={14}
                  style={{ cursor: 'pointer', color: 'var(--danger-500)' }}
                  onClick={() => handleRemoveSkill(skill)}
                />
              </span>
            ))}
          </div>
        </div>

        {/* Social Contacts */}
        <div style={{ marginTop: '24px', borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '16px' }}>
            📬 소셜 및 연락처 링크
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">이메일 주소</label>
              <input
                type="email"
                className="form-input"
                value={formData.contacts.email}
                onChange={e => handleContactChange('email', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">GitHub URL</label>
              <input
                type="url"
                className="form-input"
                value={formData.contacts.github}
                onChange={e => handleContactChange('github', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">기술 블로그 URL</label>
              <input
                type="url"
                className="form-input"
                value={formData.contacts.blog}
                onChange={e => handleContactChange('blog', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">LinkedIn URL</label>
              <input
                type="url"
                className="form-input"
                value={formData.contacts.linkedin}
                onChange={e => handleContactChange('linkedin', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-lg btn-primary">
            <Save size={18} /> 설정 저장하기
          </button>
        </div>
      </form>
    </div>
  );
}
