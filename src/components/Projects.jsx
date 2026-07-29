import React, { useState } from 'react';
import { FolderGit2, ExternalLink, Github, Search, PlusCircle, X } from 'lucide-react';

export default function Projects({ projects, isLoggedIn, onGoAdmin }) {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('ALL');
  const [activeModalProject, setActiveModalProject] = useState(null);

  // Collect unique tags
  const allTags = ['ALL', ...new Set(projects.flatMap(p => p.tags || []))];

  // Filter logic
  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.summary.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag === 'ALL' || (p.tags && p.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  return (
    <section id="projects" style={{ padding: '80px 0', backgroundColor: 'var(--bg-canvas)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FolderGit2 size={28} color="var(--primary-500)" /> Featured Projects
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
              직접 기획하고 개발한 주요 작업물 목록입니다. (총 {projects.length}개)
            </p>
          </div>

          {isLoggedIn && (
            <button className="btn btn-sm btn-primary" onClick={onGoAdmin}>
              <PlusCircle size={16} /> 새 프로젝트 추가 (관리자)
            </button>
          )}
        </div>

        {/* Filter & Search Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '32px',
          flexWrap: 'wrap'
        }}>
          {/* Tag Filter Chips */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: '600',
                  border: '1px solid',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)',
                  borderColor: selectedTag === tag ? 'var(--primary-500)' : 'var(--border-subtle)',
                  backgroundColor: selectedTag === tag ? 'var(--primary-500)' : 'var(--bg-surface)',
                  color: selectedTag === tag ? '#FFFFFF' : 'var(--text-body)'
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', width: '240px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-input"
              placeholder="프로젝트 검색..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            검색 결과와 일치하는 프로젝트가 없습니다.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '28px'
          }}>
            {filteredProjects.map((project) => (
              <div key={project.id} className="project-card">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="project-thumbnail"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600';
                  }}
                />
                <div className="project-content">
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    {project.tags && project.tags.map((tag, idx) => (
                      <span key={idx} className="tech-badge">{tag}</span>
                    ))}
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>
                    {project.title}
                  </h3>

                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '20px', flex: 1 }}>
                    {project.summary}
                  </p>

                  <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                    <button
                      className="btn btn-sm btn-outline"
                      style={{ flex: 1 }}
                      onClick={() => setActiveModalProject(project)}
                    >
                      상세보기
                    </button>
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
                        <ExternalLink size={14} /> Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-ghost">
                        <Github size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {activeModalProject && (
        <div className="modal-overlay" onClick={() => setActiveModalProject(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setActiveModalProject(null)}
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
              <X size={24} />
            </button>

            <img
              src={activeModalProject.thumbnail}
              alt={activeModalProject.title}
              style={{
                width: '100%',
                aspectRatio: '16/9',
                objectFit: 'cover',
                borderRadius: '12px',
                marginBottom: '20px'
              }}
            />

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
              {activeModalProject.tags?.map((t, i) => (
                <span key={i} className="tech-badge">{t}</span>
              ))}
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px' }}>
              {activeModalProject.title}
            </h2>

            <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              작성일: {activeModalProject.createdAt}
            </div>

            <div style={{
              whiteSpace: 'pre-line',
              fontSize: '15px',
              color: 'var(--text-body)',
              lineHeight: '1.7',
              marginBottom: '24px'
            }}>
              {activeModalProject.description || activeModalProject.summary}
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              {activeModalProject.githubUrl && (
                <a href={activeModalProject.githubUrl} target="_blank" rel="noreferrer" className="btn btn-md btn-outline">
                  <Github size={16} /> GitHub 저장소
                </a>
              )}
              {activeModalProject.demoUrl && (
                <a href={activeModalProject.demoUrl} target="_blank" rel="noreferrer" className="btn btn-md btn-primary">
                  <ExternalLink size={16} /> 시연 사이트 방문
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
