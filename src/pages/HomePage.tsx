import { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { aves, Ave } from '../data/aves';
import { compararTaxonomia } from '../data/taxonomia';
import BirdCard from '../components/BirdCard';
import BirdModal from '../components/BirdModal';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';
import Filters, { FilterState, SortOption } from '../components/Filters';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAve, setSelectedAve] = useState<Ave | null>(null);
  const [isHeaderShrunk, setIsHeaderShrunk] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    familia: '',
    periodo: '',
    dimorfismo: '',
    endemica: ''
  });
  const [sortOption, setSortOption] = useState<SortOption>('taxonomia');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const basePath = import.meta.env.BASE_URL;

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderShrunk(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      || window.matchMedia('(max-width: 768px)').matches;

    if (!isMobile) {
      searchInputRef.current?.focus();
    }
  }, []);

  // Função de ordenação
  const sortAves = (avesToSort: Ave[], option: SortOption): Ave[] => {
    const sorted = [...avesToSort];
    
    switch (option) {
      case 'taxonomia':
        return sorted.sort((a, b) => compararTaxonomia(a, b));
      case 'nome-az':
        return sorted.sort((a, b) => 
          a.nomeComumBrasileiro.localeCompare(b.nomeComumBrasileiro, 'pt-BR')
        );
      case 'nome-za':
        return sorted.sort((a, b) => 
          b.nomeComumBrasileiro.localeCompare(a.nomeComumBrasileiro, 'pt-BR')
        );
      case 'cientifico-az':
        return sorted.sort((a, b) => 
          a.nomeCientifico.localeCompare(b.nomeCientifico)
        );
      case 'cientifico-za':
        return sorted.sort((a, b) => 
          b.nomeCientifico.localeCompare(a.nomeCientifico)
        );
      case 'familia':
        return sorted.sort((a, b) => {
          const familiaCompare = a.familia.localeCompare(b.familia, 'pt-BR');
          if (familiaCompare !== 0) return familiaCompare;
          return a.nomeComumBrasileiro.localeCompare(b.nomeComumBrasileiro, 'pt-BR');
        });
      case 'ordem':
        return sorted.sort((a, b) => {
          const ordemCompare = a.ordem.localeCompare(b.ordem, 'pt-BR');
          if (ordemCompare !== 0) return ordemCompare;
          const familiaCompare = a.familia.localeCompare(b.familia, 'pt-BR');
          if (familiaCompare !== 0) return familiaCompare;
          return a.nomeComumBrasileiro.localeCompare(b.nomeComumBrasileiro, 'pt-BR');
        });
      default:
        return sorted;
    }
  };

  // Filtrar e ordenar aves
  const filteredAves = useMemo(() => {
    let result = aves;

    // Aplicar busca por texto
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(ave =>
        ave.nomeComumBrasileiro.toLowerCase().includes(term) ||
        ave.nomeCientifico.toLowerCase().includes(term) ||
        ave.nomeComumIngles.toLowerCase().includes(term) ||
        ave.familia.toLowerCase().includes(term) ||
        ave.ordem.toLowerCase().includes(term)
      );
    }

    // Aplicar filtros
    if (filters.familia) {
      result = result.filter(ave => ave.familia === filters.familia);
    }
    if (filters.periodo) {
      result = result.filter(ave => ave.periodoAtividade === filters.periodo);
    }
    if (filters.dimorfismo) {
      result = result.filter(ave => ave.dimorfismo === filters.dimorfismo);
    }
    if (filters.endemica) {
      result = result.filter(ave => ave.endemicaBrasil === filters.endemica);
    }

    // Aplicar ordenação
    result = sortAves(result, sortOption);

    return result;
  }, [searchTerm, filters, sortOption]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchInputRef.current?.blur();
  };

  const clearSearch = () => {
    setSearchTerm('');
    searchInputRef.current?.focus();
  };

  const handleTitleClick = () => {
    setSearchTerm('');
    setFilters({
      familia: '',
      periodo: '',
      dimorfismo: '',
      endemica: ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={isHeaderShrunk ? 'shrink' : ''}>
        <div className="header-content">
          <div className="logo">
            <a href="#" onClick={(e) => { e.preventDefault(); handleTitleClick(); }}>
              <img src={`${basePath}logo.png`} alt="Logo Unesp" />
            </a>
          </div>
          <div className="titles">
            <h1 onClick={handleTitleClick}>Aves da Unesp</h1>
            <h2 onClick={handleTitleClick}>
              Câmpus Araraquara
              <Link to="/info" className="info-link" title="Informações sobre o guia">
                ℹ️
              </Link>
            </h2>
          </div>
        </div>

        <div className="search-box">
          <form id="searchForm" onSubmit={handleSearch}>
            <div className="search-wrapper">
              <span className="search-icon">🔍</span>
              <input
                ref={searchInputRef}
                type="text"
                id="search"
                placeholder="Busque por nome, família ou ordem..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="button"
                id="clearSearch"
                aria-label="Limpar busca"
                onClick={clearSearch}
                style={{ display: searchTerm ? 'block' : 'none' }}
              >
                &times;
              </button>
            </div>
            <button type="submit">Pesquisar</button>
          </form>
        </div>
      </header>

      <main>
        <Filters
          onFilterChange={setFilters}
          onSortChange={setSortOption}
          totalResults={filteredAves.length}
          totalSpecies={aves.length}
        />

        <div className="grid" id="birdGrid">
          {filteredAves.length > 0 ? (
            filteredAves.map(ave => (
              <BirdCard
                key={ave.id}
                ave={ave}
                onOpenModal={() => setSelectedAve(ave)}
              />
            ))
          ) : (
            <div className="no-results">
              <p>😕 Nenhuma ave encontrada</p>
              <p>Tente ajustar os filtros ou o termo de busca.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <ScrollToTop />

      {selectedAve && (
        <BirdModal
          ave={selectedAve}
          onClose={() => setSelectedAve(null)}
        />
      )}
    </>
  );
}
