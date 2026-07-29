import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, ExternalLink, Github, Upload, X, Save } from 'lucide-react';
import { addProject, updateProject, deleteProject, saveProjects } from '../../utils/storage';

export default function ProjectManager({ projects, onToast }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // null means adding new

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    description: '',
    thumbnail: '',
    tags: [],
    demoUrl: '',
    githubUrl: ''
  });

  const [tagInput, setTagInput] = useState('');

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      summary: '',
      description: '',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
      tags: ['React', 'CSS'],
      demoUrl: '',
      githubUrl: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (proj) => {
    setEditingId(proj.id);
    setFormData({
      title: proj.title || '',
      summary: proj.summary || '',
      description: proj.description || '',
      thumbnail: proj.thumbnail || '',
      tags: proj.tags || [],
      demoUrl: proj.demoUrl || '',
      githubUrl: proj.githubUrl || ''
    });
    setIsModalOpen(true);
  };

  // Image Upload (Base64)
  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('이미지 크기는 2MB 이하만 업로드 가능합니다.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, thumbnail: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Tag Add / Remove
  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tagToRemove) }));
  };

  // Save Project (Add or Edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateProject(editingId, formData);
      onToast(`'${formData.title}' 프로젝트 정보가 수정되었습니다.`);
    } else {
      addProject(formData);
      onToast(`'${formData.title}' 프로젝트가 새로 추가되었습니다.`);
    }
    setIsModalOpen(false);
  };

  // Delete Project
  const handleDelete = (proj) => {
    if (window.confirm(`정말로 '${proj.title}' 프로젝트를 삭제하시겠습니까?`)) {
      deleteProject(proj.id);
      onToast(`'${proj.title}' 프로젝트가 삭제되었습니다.`);
    }
  };

  // Reorder Projects (Up / Down)
  const handleMove = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= projects.length) return;
    const reordered = [...projects];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;
    saveProjects(reordered);
    onToast('프로젝트 순서가 변경되었습니다.');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>
            📁 작업물(프로젝트) 관리
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
            포트폴리오에 전시될 프로젝트를 추가, 수정, 삭제하거나 순서를 변경할 수 있습니다.
          </p>
        </div>

        <button className="btn btn-md btn-primary" onClick={openAddModal}>
          <Plus size={16} /> 새 프로젝트 등록
        </button>
      </div>

      {/* Projects List Table / Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {projects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'var(--bg-surface)', borderRadius: '12px' }}>
            등록된 프로젝트가 없습니다. '새 프로젝트 등록' 버튼을 눌러 추가해보세요!
          </div>
        ) : (
          projects.map((proj, idx) => (
            <div
              key={proj.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                backgroundColor: 'var(--bg-canvas)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                gap: '16px',
                flexWrap: 'wrap'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: '280px' }}>
                <img
                  src={proj.thumbnail}
                  alt={proj.title}
                  style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600';
                  }}
                />
                <div>
                  <div style={{ fontWeight: '700', fontSize: '16px', color: 'var(--text-main)' }}>
                    {proj.title}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    {proj.summary}
                  </div>
                  <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
                    {proj.tags?.map((t, i) => (
                      <span key={i} className="tech-badge" style={{ fontSize: '11px', padding: '2px 8px' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => handleMove(idx, -1)}
                  disabled={idx === 0}
                  title="위로 이동"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => handleMove(idx, 1)}
                  disabled={idx === projects.length - 1}
                  title="아래로 이동"
                >
                  <ArrowDown size={14} />
                </button>
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => openEditModal(proj)}
                >
                  <Edit2 size={14} /> 수정
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(proj)}
                >
                  <Trash2 size={14} /> 삭제
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <button
              onClick={() => setIsModalOpen(false)}
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

            <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '20px' }}>
              {editingId ? '✏️ 프로젝트 정보 수정' : '➕ 새 프로젝트 추가'}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">프로젝트 제목</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="예: 인터랙티브 포춘쿠키 웹 앱"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">한 줄 요약 (카드 메인에 표시)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="예: 3D 애니메이션과 사운드가 포함된 감성 웹 서비스"
                  value={formData.summary}
                  onChange={e => setFormData({ ...formData, summary: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">상세 설명 (모달 상세보기 클릭 시 표시)</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  placeholder="프로젝트 기획 목적, 주요 기술 스택, 트러블슈팅 경험 등을 기재하세요."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* Thumbnail Image */}
              <div className="form-group">
                <label className="form-label">썸네일 이미지</label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '8px' }}>
                  <img
                    src={formData.thumbnail}
                    alt="Preview"
                    style={{ width: '120px', height: '70px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600';
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="이미지 URL 직접 입력"
                      value={formData.thumbnail}
                      onChange={e => setFormData({ ...formData, thumbnail: e.target.value })}
                      style={{ marginBottom: '8px' }}
                    />
                    <label className="btn btn-sm btn-outline" style={{ cursor: 'pointer', display: 'inline-flex' }}>
                      <Upload size={14} /> 파일 선택 (Base64)
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailUpload}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="form-group">
                <label className="form-label">사용 기술 태그</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="태그 입력 후 추가 (예: React)"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag(e);
                      }
                    }}
                  />
                  <button type="button" className="btn btn-md btn-outline" onClick={handleAddTag}>
                    추가
                  </button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {formData.tags.map((tag, idx) => (
                    <span key={idx} className="tech-badge" style={{ gap: '4px', paddingRight: '6px' }}>
                      {tag}
                      <X size={12} style={{ cursor: 'pointer' }} onClick={() => handleRemoveTag(tag)} />
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Live Demo URL</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://..."
                    value={formData.demoUrl}
                    onChange={e => setFormData({ ...formData, demoUrl: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">GitHub 저장소 URL</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://github.com/..."
                    value={formData.githubUrl}
                    onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="btn btn-md btn-outline" onClick={() => setIsModalOpen(false)}>
                  취소
                </button>
                <button type="submit" className="btn btn-md btn-primary">
                  <Save size={16} /> 프로젝트 저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
