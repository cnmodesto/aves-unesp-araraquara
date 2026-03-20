import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InfoPage from './pages/InfoPage';
import { useContentProtection } from './hooks/useContentProtection';

function App() {
  // Ativa proteção de conteúdo (desabilita clique direito, atalhos, etc.)
  useContentProtection();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/info" element={<InfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
