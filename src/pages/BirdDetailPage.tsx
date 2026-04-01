import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { aves, Ave } from '../data/aves';
import ScrollToTop from '../components/ScrollToTop';

export default function BirdDetailPage() {
  const { particula } = useParams<{ particula: string }>();
  const navigate = useNavigate();
  const [ave, setAve] = useState<Ave | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const basePath = import.meta.env.BASE_URL;

  useEffect(() => {
    const foundAve = aves.find(a => a.particula === particula);
    if (foundAve) {
      setAve(foundAve);
    } else {
      navigate('/', { replace: true });
    }
  }, [particula, navigate]);

  useEffect(() => {
    setImageLoaded(false);
  }, [currentImageIndex]);

  if (!ave) {
    return (
      <div className="detail-loading">
        <div className="skeleton-loader">
          <div className="skeleton-shimmer"></div>
        </div>
      </div>
    );
  }

  const hasPhotos = ave.fotos && ave.fotos.length > 0;
  const fotos = hasPhotos ? ave.fotos : [{ src: '', legenda: '' }];
  const currentFoto = fotos[currentImageIndex];
  const imageSrc = hasPhotos ? `${basePath}/photos/${currentFoto.src}` : `${basePath}/not_available.svg`;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + fotos.length) % fotos.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % fotos.length);
  };

  const getConservationClass = (status: string): string => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('pouco preocupante') || statusLower.includes('least concern')) {
      return 'conservation-lc';
    } else if (statusLower.includes('quase ameaçada') || statusLower.includes('near threatened')) {
      return 'conservation-nt';
    } else if (statusLower.includes('vulnerável') || statusLower.includes('vulnerable')) {
      return 'conservation-vu';
    } else if (statusLower.includes('em perigo') || statusLower.includes('endangered')) {
      return 'conservation-en';
    } else if (statusLower.includes('criticamente') || statusLower.includes('critically')) {
      return 'conservation-cr';
    }
    return 'conservation-lc';
  };

  const getPeriodoIcon = (periodo: string): string => {
    const p = periodo.toLowerCase();
    if (p.includes('noturno') && p.includes('diurno')) return '🌓';
    if (p.includes('noturno')) return '🌙';
    return '☀️';
  };

  return (
    <div className="detail-page page-transition">
      {/* Header estilo shrink */}
      <header className="detail-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Voltar
        </button>
        <Link to="/" className="detail-header-content">
          <div className="detail-header-logo">
            <img src={`${basePath}logo.png`} alt="Logo Unesp" />
          </div>
          <div className="detail-header-titles">
            <h1>Aves da Unesp</h1>
            <h2>Câmpus Araraquara</h2>
          </div>
        </Link>
      </header>

      {/* Imagem */}
      <div className="detail-image-container">
        {fotos.length > 1 && (
          <button className="detail-arrow detail-arrow-left" onClick={handlePrevImage}>
            &#10094;
          </button>
        )}
        
        <div className="detail-image-wrapper">
          {!imageLoaded && (
            <div className="skeleton-loader">
              <div className="skeleton-shimmer"></div>
            </div>
          )}
          <img
            src={imageSrc}
            alt={ave.nomeComumBrasileiro}
            className={imageLoaded ? 'loaded' : 'loading'}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/not_available.svg';
              setImageLoaded(true);
            }}
          />
          {currentFoto.legenda && (
            <span className="detail-image-caption">{currentFoto.legenda}</span>
          )}
        </div>

        {fotos.length > 1 && (
          <button className="detail-arrow detail-arrow-right" onClick={handleNextImage}>
            &#10095;
          </button>
        )}

        {/* Indicadores */}
        {fotos.length > 1 && (
          <div className="detail-image-dots">
            {fotos.map((_: { src: string; legenda: string }, index: number) => (
              <span
                key={index}
                className={`detail-dot ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="detail-content">
        <div className="detail-title-section">
          <h1>{ave.nomeComumBrasileiro}</h1>
          <h2><em>{ave.nomeCientifico}</em> ({ave.descricao})</h2>
        </div>

        {/* Taxonomia */}
        <div className="detail-section">
          <h3 className="detail-section-title">🔬 Taxonomia</h3>
          <div className="detail-info-grid">
            <div className="detail-info-item">
              <span className="detail-label">📚 Ordem:</span>
              <span className="detail-value">{ave.ordem}</span>
            </div>
            <div className="detail-info-item">
              <span className="detail-label">📖 Família:</span>
              <span className="detail-value">{ave.familia}</span>
            </div>
            <div className="detail-info-item">
              <span className="detail-label">🌐 Nome em Inglês:</span>
              <span className="detail-value">{ave.nomeComumIngles}</span>
            </div>
          </div>
        </div>

        {/* Comportamento */}
        <div className="detail-section">
          <h3 className="detail-section-title">🦅 Comportamento</h3>
          <div className="detail-info-grid">
            <div className="detail-info-item">
              <span className="detail-label">{getPeriodoIcon(ave.periodoAtividade)} Período de Atividade:</span>
              <span className="detail-value">{ave.periodoAtividade}</span>
            </div>
            <div className="detail-info-item">
              <span className="detail-label">♂♀ Dimorfismo Sexual:</span>
              <span className="detail-value">{ave.dimorfismo}</span>
            </div>
          </div>
        </div>

        {/* Habitats */}
        <div className="detail-section">
          <h3 className="detail-section-title">🏞️ Habitat</h3>
          <div className="detail-info-item">
            <ul className="detail-list">
              {ave.habitats.map((habitat: string, index: number) => (
                <li key={index}>{habitat}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dieta */}
        <div className="detail-section">
          <h3 className="detail-section-title">🍽️ Dieta</h3>
          <div className="detail-info-item">
            <ul className="detail-list">
              {ave.dieta.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Conservação */}
        <div className="detail-section">
          <h3 className="detail-section-title">🛡️ Conservação</h3>
          <div className="detail-info-grid">
            <div className="detail-info-item">
              <span className="detail-label">📊 IUCN:</span>
              <span className={`detail-conservation-badge ${getConservationClass(ave.estadoConservacaoIucn)}`}>
                {ave.estadoConservacaoIucn}
              </span>
            </div>
            <div className="detail-info-item">
              <span className="detail-label">{ave.endemicaBrasil === 'Sim' ? '🇧🇷' : '🌎'} Endêmica do Brasil:</span>
              <span className="detail-value">{ave.endemicaBrasil}</span>
            </div>
          </div>
        </div>

        {/* Botão WikiAves */}
        <a
          href={`https://www.wikiaves.com.br/${ave.particula}`}
          target="_blank"
          rel="noopener noreferrer"
          className="primary-btn detail-wikiaves-btn"
        >
          🔗 Ver no WikiAves
        </a>
      </div>

      <ScrollToTop />
    </div>
  );
}
