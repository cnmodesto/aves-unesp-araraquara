import { useState } from 'react';
import { Ave } from '../data/aves';

interface BirdCardProps {
  ave: Ave;
  onClick: () => void;
}

export default function BirdCard({ ave, onClick }: BirdCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const getImageSrc = () => {
    if (ave.fotos && ave.fotos.length > 0) {
      return `/photos/${ave.fotos[0].src}`;
    }
    return '/not_available.svg';
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/not_available.svg';
    setImageLoaded(true);
  };

  const isNoturno = ave.periodoAtividade.toLowerCase().includes('noturno');
  const isDiurnoNoturno = ave.periodoAtividade.toLowerCase().includes('diurno') && isNoturno;
  const hasDimorfismo = ave.dimorfismo === 'Sim';
  const isEndemica = ave.endemicaBrasil === 'Sim';
  const fotoCount = ave.fotos?.length || 0;

  return (
    <div className="card" onClick={onClick}>
      <div className="card-image-container">
        {/* Skeleton loader */}
        {!imageLoaded && (
          <div className="skeleton-loader">
            <div className="skeleton-shimmer"></div>
          </div>
        )}
        
        <img 
          src={getImageSrc()} 
          alt={ave.nomeComumBrasileiro}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
          draggable="false"
          className={imageLoaded ? 'loaded' : 'loading'}
        />
        
        {/* Badges no canto superior */}
        <div className="card-badges">
          {isEndemica && (
            <span className="badge badge-endemica" title="Endêmica do Brasil">
              🇧🇷
            </span>
          )}
          {isDiurnoNoturno ? (
            <span className="badge badge-periodo" title="Atividade diurna e noturna">
              🌓
            </span>
          ) : isNoturno ? (
            <span className="badge badge-noturno" title="Atividade noturna">
              🌙
            </span>
          ) : null}
          {hasDimorfismo && (
            <span className="badge badge-dimorfismo" title="Dimorfismo sexual acentuado">
              ♂♀
            </span>
          )}
        </div>

        {/* Contador de fotos */}
        {fotoCount > 1 && (
          <span className="photo-count" title={`${fotoCount} fotos disponíveis`}>
            📷 {fotoCount}
          </span>
        )}
      </div>

      <div className="card-content">
        <div>
          <h3 className="headline">{ave.nomeComumBrasileiro}</h3>
          <h4 className="subhead">
            <em>{ave.nomeCientifico}</em>
          </h4>
        </div>
        <button className="primary-btn">
          Mais detalhes
        </button>
      </div>
    </div>
  );
}
