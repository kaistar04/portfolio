import React, { useRef } from 'react';
import { Download, Upload, RefreshCw, Database } from 'lucide-react';
import { exportDataJSON, importDataJSON, resetToDefaultData } from '../../utils/storage';

export default function BackupReset({ onToast }) {
  const fileInputRef = useRef(null);

  // Download JSON
  const handleExport = () => {
    const jsonStr = exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio_backup_${new Date().toISOString().slice(0,10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    onToast('백업 파일(JSON)이 다운로드 되었습니다!');
  };

  // Import JSON File
  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const res = importDataJSON(event.target.result);
        if (res.success) {
          onToast('백업 데이터가 성공적으로 복구되었습니다!');
        } else {
          alert('데이터 복구 실패: ' + res.message);
        }
      };
      reader.readAsText(file);
    }
  };

  // Reset Data
  const handleReset = () => {
    if (window.confirm('정말로 모든 데이터를 초기 샘플 데이터로 리셋하시겠습니까? (이 작업은 되돌릴 수 없습니다)')) {
      resetToDefaultData();
      onToast('모든 데이터가 초기 샘플 데모 상태로 초기화되었습니다.');
    }
  };

  return (
    <div style={{ maxWidth: '700px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>
          💾 데이터 백업 및 초기화
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
          브라우저 LocalStorage에 저장된 자기소개 및 프로젝트 데이터를 파일로 보관하거나 복구합니다.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        {/* Export JSON Card */}
        <div style={{
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-canvas)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '4px' }}>
              📥 백업 파일 다운로드 (Export JSON)
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              현재 설정된 자기소개와 모든 프로젝트 데이터를 JSON 파일로 컴퓨터에 저장합니다.
            </p>
          </div>
          <button className="btn btn-md btn-primary" onClick={handleExport}>
            <Download size={16} /> JSON 백업 다운로드
          </button>
        </div>

        {/* Import JSON Card */}
        <div style={{
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-canvas)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '4px' }}>
              📤 백업 파일에서 복구 (Import JSON)
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              기존에 다운로드한 JSON 백업 파일을 업로드하여 데이터를 덮어씌웁니다.
            </p>
          </div>
          <div>
            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              onChange={handleImportFile}
              style={{ display: 'none' }}
            />
            <button className="btn btn-md btn-outline" onClick={() => fileInputRef.current?.click()}>
              <Upload size={16} /> 백업 파일 선택
            </button>
          </div>
        </div>

        {/* Reset Card */}
        <div style={{
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid var(--danger-500)',
          backgroundColor: 'var(--danger-50)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--danger-600)', marginBottom: '4px' }}>
              ⚠️ 초기 데모 데이터로 리셋
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-body)' }}>
              모든 커스텀 데이터를 지우고 기본 샘플 자기소개 및 프로젝트로 초기화합니다.
            </p>
          </div>
          <button className="btn btn-md btn-danger" onClick={handleReset}>
            <RefreshCw size={16} /> 데이터 초기화
          </button>
        </div>
      </div>
    </div>
  );
}
