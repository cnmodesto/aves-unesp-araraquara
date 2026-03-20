import { useState } from 'react';
import { aves } from '../data/aves';

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
  onSortChange: (sort: SortOption) => void;
  totalResults: number;
  totalSpecies: number;
}

export interface FilterState {
  familia: string;
  periodo: string;
  dimorfismo: string;
  endemica: string;
}

export type SortOption = 'nome-az' | 'nome-za' | 'cientifico-az' | 'cientifico-za' | 'familia' | 'ordem';

// Extrair famílias únicas dos dados
const familiasUnicas = [...new Set(aves.map(ave => ave.familia))].sort();

export default function Filters({ onFilterChange, onSortChange, totalResults, totalSpecies }: FiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    familia: '',
    periodo: '',
    dimorfismo: '',
    endemica: ''
  });
  const [sort, setSort] = useState<SortOption>('nome-az');

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (value: SortOption) => {
    setSort(value);
    onSortChange(value);
  };

  const clearFilters = () => {
    const emptyFilters: FilterState = {
      familia: '',
      periodo: '',
      dimorfismo: '',
      endemica: ''
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== '');

  return (
    <div className="filters-container">
      <div className="filters-header">
        <button 
          className="filters-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="filter-icon">⚙️</span>
          Filtros e Ordenação
          <span className={`arrow-icon ${isExpanded ? 'expanded' : ''}`}>▼</span>
        </button>
        
        <div className="results-count">
          {totalResults === totalSpecies ? (
            <span>{totalSpecies} espécies</span>
          ) : (
            <span>{totalResults} de {totalSpecies} espécies</span>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="filters-content">
          <div className="filters-section">
            <h4>Filtrar por:</h4>
            <div className="filters-grid">
              <div className="filter-group">
                <label htmlFor="filter-familia">Família</label>
                <select 
                  id="filter-familia"
                  value={filters.familia}
                  onChange={(e) => handleFilterChange('familia', e.target.value)}
                >
                  <option value="">Todas as famílias</option>
                  {familiasUnicas.map(familia => (
                    <option key={familia} value={familia}>{familia}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="filter-periodo">Período de Atividade</label>
                <select 
                  id="filter-periodo"
                  value={filters.periodo}
                  onChange={(e) => handleFilterChange('periodo', e.target.value)}
                >
                  <option value="">Todos os períodos</option>
                  <option value="Diurno">🌞 Diurno</option>
                  <option value="Noturno">🌙 Noturno</option>
                  <option value="Diurno, Noturno">🌓 Diurno e Noturno</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="filter-dimorfismo">Dimorfismo Sexual</label>
                <select 
                  id="filter-dimorfismo"
                  value={filters.dimorfismo}
                  onChange={(e) => handleFilterChange('dimorfismo', e.target.value)}
                >
                  <option value="">Todos</option>
                  <option value="Sim">♂♀ Com dimorfismo</option>
                  <option value="Não">Sem dimorfismo</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="filter-endemica">Endemismo</label>
                <select 
                  id="filter-endemica"
                  value={filters.endemica}
                  onChange={(e) => handleFilterChange('endemica', e.target.value)}
                >
                  <option value="">Todas</option>
                  <option value="Sim">🇧🇷 Endêmicas do Brasil</option>
                  <option value="Não">Não endêmicas</option>
                </select>
              </div>
            </div>

            {hasActiveFilters && (
              <button className="clear-filters-btn" onClick={clearFilters}>
                ✕ Limpar filtros
              </button>
            )}
          </div>

          <div className="sort-section">
            <h4>Ordenar por:</h4>
            <div className="sort-options">
              <select 
                value={sort}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="sort-select"
              >
                <option value="nome-az">Nome popular (A-Z)</option>
                <option value="nome-za">Nome popular (Z-A)</option>
                <option value="cientifico-az">Nome científico (A-Z)</option>
                <option value="cientifico-za">Nome científico (Z-A)</option>
                <option value="familia">Família</option>
                <option value="ordem">Ordem taxonômica</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Chips de filtros ativos */}
      {hasActiveFilters && !isExpanded && (
        <div className="active-filters-chips">
          {filters.familia && (
            <span className="filter-chip">
              {filters.familia}
              <button onClick={() => handleFilterChange('familia', '')}>×</button>
            </span>
          )}
          {filters.periodo && (
            <span className="filter-chip">
              {filters.periodo === 'Diurno' ? '🌞' : filters.periodo === 'Noturno' ? '🌙' : '🌓'} {filters.periodo}
              <button onClick={() => handleFilterChange('periodo', '')}>×</button>
            </span>
          )}
          {filters.dimorfismo && (
            <span className="filter-chip">
              {filters.dimorfismo === 'Sim' ? '♂♀ Com dimorfismo' : 'Sem dimorfismo'}
              <button onClick={() => handleFilterChange('dimorfismo', '')}>×</button>
            </span>
          )}
          {filters.endemica && (
            <span className="filter-chip">
              {filters.endemica === 'Sim' ? '🇧🇷 Endêmica' : 'Não endêmica'}
              <button onClick={() => handleFilterChange('endemica', '')}>×</button>
            </span>
          )}
          <button className="clear-all-chip" onClick={clearFilters}>
            Limpar todos
          </button>
        </div>
      )}
    </div>
  );
}
