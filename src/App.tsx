import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import InfoPage from './pages/InfoPage';
import BirdDetailPage from './pages/BirdDetailPage';
import { useContentProtection } from './hooks/useContentProtection';

// Componente para gerenciar transições de página
function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll para o topo ao mudar de página
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <div className="page-transition">{children}</div>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
      <Route path="/info" element={<PageWrapper><InfoPage /></PageWrapper>} />
      <Route path="/ave/:particula" element={<PageWrapper><BirdDetailPage /></PageWrapper>} />
    </Routes>
  );
}

function App() {
  // Ativa proteção de conteúdo (desabilita clique direito, atalhos, etc.)
  useContentProtection();

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <AppRoutes />
    </Router>
  );
}

export default App;
