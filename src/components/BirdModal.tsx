import { useState, useEffect, useCallback } from 'react';
import { Ave } from '../data/aves';

interface BirdModalProps {
  ave: Ave;
  onClose: () => void;
}

// Função para obter a cor do status de conservação
const getConservationColor = (status: string): string => {
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

export default function BirdModal({ ave, onClose }: BirdModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const basePath = import.meta.env.BASE_URL;

  const getImages = () => {

    if (ave.fotos && ave.fotos.length > 0) {
      return ave.fotos.map(f => ({
        src: `${basePath}/photos/${f.src}`,
        legenda: f.legenda
      }));
    }
    return [{ src: `${basePath}/not_available.svg`, legenda: '' }];
  };

  const images = getImages();
  const hasMultipleImages = images.length > 1;

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasMultipleImages) prevImage();
      if (e.key === 'ArrowRight' && hasMultipleImages) nextImage();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, hasMultipleImages, nextImage, prevImage]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = `${basePath}/not_available.svg`;
  };

  const conservationClass = getConservationColor(ave.estadoConservacaoIucn);

  return (
    <div className="modal" onClick={handleBackdropClick}>
      <div className="modal-card modal-compact">
        <button className="close" onClick={onClose} aria-label="Fechar">
          &times;
        </button>

        {/* Imagem com carrossel */}
        <div className="modal-image-container">
          {hasMultipleImages && (
            <button className="arrow left" onClick={prevImage} aria-label="Imagem anterior">
              &#10094;
            </button>
          )}
          
          <div className="modal-image-wrapper">
            <div className="image-with-caption">
              <img 
                src={images[currentImageIndex].src} 
                alt={ave.nomeComumBrasileiro}
                onError={handleImageError}
                draggable="false"
              />
              {images[currentImageIndex].legenda && (
                <span className="image-caption">
                  {images[currentImageIndex].legenda}
                </span>
              )}
            </div>
          </div>

          {hasMultipleImages && (
            <button className="arrow right" onClick={nextImage} aria-label="Próxima imagem">
              &#10095;
            </button>
          )}

          {/* Indicadores de imagem */}
          {hasMultipleImages && (
            <div className="image-indicators">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Ir para imagem ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Corpo do modal compacto */}
        <div className="modal-body compact">
          {/* Cabeçalho */}
          <div className="modal-header-info">
            <h1>{ave.nomeComumBrasileiro}</h1>
            <h2>{ave.nomeCientifico} ({ave.descricao})</h2>
          </div>

          {/* Layout em duas colunas */}
          <div className="modal-two-columns">
            {/* Coluna Esquerda */}
            <div className="modal-column">
              {/* Taxonomia */}
              <div className="info-group">
                <span className="info-group-title">🔬 Taxonomia</span>
                <div className="info-row">
                  <span className="info-label">📚 Ordem:</span>
                  <span className="info-value">{ave.ordem}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">📖 Família:</span>
                  <span className="info-value">{ave.familia}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">🌐 Inglês:</span>
                  <span className="info-value">{ave.nomeComumIngles}</span>
                </div>
              </div>

              {/* Comportamento */}
              <div className="info-group">
                <span className="info-group-title">🦅 Comportamento</span>
                <div className="info-row">
                  <span className="info-label">
                    {ave.periodoAtividade.includes('Noturno') && ave.periodoAtividade.includes('Diurno') 
                      ? '🌓' 
                      : ave.periodoAtividade.includes('Noturno') 
                      ? '🌙' 
                      : '☀️'} Atividade:
                  </span>
                  <span className="info-value">{ave.periodoAtividade}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">♂♀ Dimorfismo:</span>
                  <span className="info-value">
                    {ave.dimorfismo === 'Sim' ? 'Acentuado' : 'Não acentuado'}
                  </span>
                </div>
              </div>

              {/* Conservação */}
              <div className="info-group">
                <span className="info-group-title">🛡️ Conservação</span>
                <div className="info-row">
                  <span className="info-label">📊 IUCN:</span>
                  <span className={`info-value conservation-badge ${conservationClass}`}>
                    {ave.estadoConservacaoIucn}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">{ave.endemicaBrasil === 'Sim' ? '🇧🇷' : '🌎'} Endêmica BR:</span>
                  <span className="info-value">{ave.endemicaBrasil}</span>
                </div>
              </div>
            </div>

            {/* Coluna Direita */}
            <div className="modal-column">
              {/* Habitats */}
              <div className="info-group">
                <span className="info-group-title">🏞️ Habitats</span>
                <ul className="info-list-compact">
                  {ave.habitats.map((habitat, index) => (
                    <li key={index}>{habitat}</li>
                  ))}
                </ul>
              </div>

              {/* Dieta */}
              <div className="info-group">
                <span className="info-group-title">🍽️ Dieta</span>
                <ul className="info-list-compact">
                  {ave.dieta.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Botão WikiAves */}
          <a 
            className="primary-btn modal-body-btn" 
            href={`https://www.wikiaves.com.br/${ave.particula}`}
            target="_blank" 
            rel="noopener noreferrer"
          >
            🔗 Ver no WikiAves
          </a>
        </div>
      </div>
    </div>
  );
}
