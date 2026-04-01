import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ave } from '../data/aves';

interface BirdListItemProps {
  ave: Ave;
  onOpenModal: () => void;
}

export default function BirdListItem({ ave, onOpenModal }: BirdListItemProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  const basePath = import.meta.env.BASE_URL;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleClick = () => {
    if (isMobile) {  // Usa o estado diretamente (sem parênteses)
      navigate(`/ave/${ave.particula}`);
    } else {
      onOpenModal();
    }
  };

  // Função para obter a cor do status de conservação
  const getConservationClass = (status: string): string => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('pouco preocupante') || statusLower.includes('least concern')) {
      return 'conservation-lc';
    }
    if (statusLower.includes('quase ameaçada') || statusLower.includes('near threatened')) {
      return 'conservation-nt';
    }
    if (statusLower.includes('vulnerável') || statusLower.includes('vulnerable')) {
      return 'conservation-vu';
    }
    if (statusLower.includes('em perigo') || statusLower.includes('endangered')) {
      return 'conservation-en';
    }
    if (statusLower.includes('criticamente') || statusLower.includes('critically')) {
      return 'conservation-cr';
    }
    return 'conservation-default';
  };

  const getImageSrc = () => {
    if (ave.fotos && ave.fotos.length > 0) {
      return `${basePath}photos/${ave.fotos[0].src}`;
    }
    return `${basePath}not_available.svg`;
  };

  const getPeriodoLabel = (periodo: string): string => {
    const labels: Record<string, string> = {
      'diurno': '☀️ Diurno',
      'noturno': '🌙 Noturno',
      'crepuscular': '🌅 Crepuscular',
    };
    return labels[periodo] || periodo;
  };

  return (
    <div className="list-item" onClick={handleClick}>
      <div className="list-item-image">
        {!imageLoaded && (
          <div className="skeleton-loader">
            <div className="skeleton-shimmer"></div>
          </div>
        )}
        <img
          src={getImageSrc()}
          alt={ave.nomeComumBrasileiro}
          className={imageLoaded ? 'loaded' : 'loading'}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        <div className="list-item-badges">
          {ave.endemicaBrasil === 'sim' && (
            <span className="badge badge-endemica" title="Endêmica do Brasil">🇧🇷</span>
          )}
          {ave.dimorfismo === 'sim' && (
            <span className="badge badge-dimorfismo" title="Dimorfismo sexual">♂♀</span>
          )}
        </div>
      </div>

      <div className="list-item-content">
        <div className="list-item-header">
          <h3 className="list-item-title">{ave.nomeComumBrasileiro}</h3>
          {/* <span className={`conservation-badge-small ${getConservationClass(ave.estadoConservacaoIucn)}`}>
            {ave.estadoConservacaoIucn}
          </span> */}
        </div>

        <p className="list-item-scientific">{ave.nomeCientifico}</p>
        <p className="list-item-english">{ave.nomeComumIngles}</p>

        {!isMobile && (
          <div className="list-item-meta">
            <span className="list-item-tag">
              <span className="tag-icon">📁</span>
              {ave.familia}
            </span>
            <span className="list-item-tag">
              <span className="tag-icon">📋</span>
              {ave.ordem}
            </span>
            <span className="list-item-tag">
              {getPeriodoLabel(ave.periodoAtividade)}
            </span>
            <span className={`conservation-badge-small ${getConservationClass(ave.estadoConservacaoIucn)}`}>
              {ave.estadoConservacaoIucn}
            </span>
          </div>
        )}

        {/* <div className="list-item-details">
          <div className="list-item-detail">
            <span className="detail-label">Habitat:</span>
            <span className="detail-value">{ave.habitats.slice(0, 2).join(', ')}{ave.habitats.length > 2 ? '...' : ''}</span>
          </div>
          <div className="list-item-detail">
            <span className="detail-label">Alimentação:</span>
            <span className="detail-value">{ave.dieta.slice(0, 2).join(', ')}{ave.dieta.length > 2 ? '...' : ''}</span>
          </div>
        </div> */}
      </div>

      {/* <div className="list-item-actions">
        <button className="list-item-btn">
          Ver detalhes
          <span className="btn-arrow">→</span>
        </button>
      </div> */}
    </div>
  );
}
