import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function InfoPage() {
  const [isHeaderShrunk, setIsHeaderShrunk] = useState(false);
  const basePath = import.meta.env.BASE_URL;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderShrunk(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="info-page">
      <header className={isHeaderShrunk ? 'shrink' : ''}>
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <img src={`${basePath}logo.png`} alt="Logo Unesp" />
            </Link>
          </div>
          <div className="titles">
            <h1>Aves da Unesp</h1>
            <h2>Câmpus Araraquara</h2>
          </div>
        </div>
        <div className="back-nav">
          <Link to="/" className="back-link">
            ← Voltar ao Guia
          </Link>
        </div>
      </header>

      <main className="main-info">
        <div className="container-info">
          <h2>Sobre o Guia</h2>

          <p>
            Este guia virtual apresenta as espécies de aves registradas no câmpus da
            <strong> Universidade Estadual Paulista (Unesp)</strong> em Araraquara, abrangendo
            suas diversas áreas e endereços: Câmpus, Instituto de Química, Centro de Ciências de Araraquara
            e a região dos prédios localizados na área central da cidade, como a Faculdade de Odontologia e a
            Faculdade de Ciências Farmacêuticas.
          </p>

          <h3>Metodologia</h3>
          <p>
            A lista de espécies foi elaborada a partir de diferentes fontes de informação:
          </p>
          <ul>
            <li>Registros nos hotspots locais da plataforma <a href="https://ebird.org" target="_blank" rel="noopener noreferrer">eBird</a></li>
            <li>Observações documentadas no <a href="https://www.wikiaves.com.br" target="_blank" rel="noopener noreferrer">WikiAves</a></li>
            <li>Relatos de observadores e funcionários da universidade</li>
          </ul>
          <p>
            Essa metodologia combinada garante maior abrangência e fidelidade ao retrato
            da avifauna presente nas áreas estudadas.
          </p>

          <h3>Informações Apresentadas</h3>
          <p>Cada espécie é apresentada com informações essenciais:</p>
          <ul>
            <li><strong>Nome científico e popular</strong>: Identificação taxonômica e nome comum em português</li>
            <li><strong>Ordem e família</strong>: Classificação taxonômica</li>
            <li><strong>Autor e ano da descrição</strong>: Referência histórica da descrição da espécie</li>
            <li><strong>Nome em inglês</strong>: Nome comum internacional</li>
            <li><strong>Período de atividade</strong>: Diurno, noturno ou crepuscular</li>
            <li><strong>Dimorfismo sexual</strong>: Diferenças visíveis entre machos e fêmeas</li>
            <li><strong>Estado de conservação (IUCN)</strong>: Classificação de risco de extinção</li>
            <li><strong>Endemismo</strong>: Se a espécie é exclusiva do Brasil</li>
            <li><strong>Habitats</strong>: Ambientes onde a espécie pode ser encontrada</li>
            <li><strong>Dieta</strong>: Principais itens alimentares</li>
          </ul>

          <h3>Hotspots do eBird</h3>

          <ul>
            <li><a href="https://ebird.org/hotspot/L9052540/bird-list" target="_blank"
              rel="noopener noreferrer">Araraquara--Campus UNESP</a>
            </li>
            <li><a href="https://ebird.org/hotspot/L9846089/bird-list" target="_blank"
              rel="noopener noreferrer">Araraquara--Unesp IQ</a></li>
            <li><a href="https://ebird.org/hotspot/L9737054/bird-list" target="_blank"
              rel="noopener noreferrer">Araraquara--Centro de
              Ciências
              Unesp</a></li>
            <li><a href="https://ebird.org/hotspot/L39291864/bird-list" target="_blank"
              rel="noopener noreferrer">Araraquara--Unesp (Faculdade
              de
              Ciências Farmacêuticas)</a></li>
          </ul>

          <h3>Fotografias</h3>
          <p>
            Serão incluídas fotos das aves e, nas espécies com dimorfismo sexual acentuado,
            o guia trará duas imagens, uma de cada sexo, para destacar as diferenças entre
            machos e fêmeas.
          </p>

          <h3>Números do Guia</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">116</span>
              <span className="stat-label">Espécies catalogadas</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4</span>
              <span className="stat-label">Áreas do câmpus</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">3</span>
              <span className="stat-label">Fontes de dados</span>
            </div>
          </div>

          <h3>Áreas Abrangidas</h3>
          <ul>
            <li>Câmpus</li>
            <li>Instituto de Química (IQ)</li>
            <li>Centro de Ciências de Araraquara (CCA)</li>
            <li>Unidades na área central de Araraquara e seus arredores</li>
          </ul>

          <h3>Principais Referências</h3>

          <ul>
            <li>COMITÊ BRASILEIRO DE REGISTROS ORNITOLÓGICOS. <em>Lista de aves do Brasil: 13ª edição, 2021</em>.
              Disponível em: <a href="https://www.cbro.org.br/listas/" target="_blank"
                rel="noopener noreferrer">https://www.cbro.org.br/listas/</a>.
              Acesso em: 15 jul. 2025.
            </li>
            <li>CORNELL LAB OF ORNITHOLOGY. <em>eBird</em>. Disponível em: <a href="https://ebird.org/"
              target="_blank" rel="noopener noreferrer">https://ebird.org/</a>. Acesso em: continuamente.</li>
            <li>GWYNNE, John A.; RIDGELY, Robert S.; TUDOR, Guy; ARGEL, Martha. <em>Aves do Brasil: Pantanal e
              Cerrado</em>. São Paulo: Horizonte, 2010.</li>
            <li>MELLO, Daniel; MELLO, Gabriel; MALLET-RODRIGUES, Francisco; LIMA, Luciano. <em>Aves do sudeste do
              Brasil: guia de identificação</em>. 1. ed. Rio de Janeiro: Gabriel Jorge de Menezes Mello, 2020.</li>
            <li>RIDGELY, Robert S.; GWYNNE, John A.; TUDOR, Guy; ARGEL, Martha. <em>Aves do Brasil: Mata Atlântica
              do
              sudeste</em>. São Paulo: Horizonte, 2015.</li>
            <li>WIKIAVES. <em>WikiAves - A Enciclopédia das Aves do Brasil</em>. Disponível em: <a
              href="https://www.wikiaves.com.br/" target="_blank"
              rel="noopener noreferrer">https://www.wikiaves.com.br/</a>.
              Acesso em: continuamente.</li>
          </ul>

          <h3>Créditos</h3>
          <p>
            Desenvolvimento e fotografias por <strong>Celso Modesto Jr.</strong>
          </p>

          <p>Celso Modesto Jr. é bacharel em Ciências da Computação pela Unesp de Rio Claro e radicado em Araraquara
            desde 2010. Observador de aves desde 2018, é membro do Clube de Observadores de Aves de Araraquara (COA
            Araraquara). Todas as fotografias apresentadas neste guia são de sua autoria.</p>

          <p>Siga nas redes:

            <ul>
              <li>Celso Modesto Jr.: <a href="https://instagram.com/cnmodesto.birds" target="_blank"
                rel="noopener noreferrer">Instagram</a></li>
              <li>COA Araraquara: <a href="https://instagram.com/coa.araraquara" target="_blank"
                rel="noopener noreferrer">Instagram</a> | <a href="https://facebook.com/coa.araraquara"
                  target="_blank" rel="noopener noreferrer">Facebook</a></li>
            </ul>
          </p>

          <p>
            Para mais informações sobre as espécies, acesse o perfil de cada ave no
            <a href="https://www.wikiaves.com.br" target="_blank" rel="noopener noreferrer"> WikiAves</a>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
