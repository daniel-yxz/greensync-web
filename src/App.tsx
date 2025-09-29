import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Index } from './pages/Index';
import { SobreIndex } from './pages/SobreIndex'; // Nova página
import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';
import { Inicial } from './pages/Inicial';
import { Plantas } from './pages/Plantas';
import { Estufas } from './pages/Estufas';
import { Perfil } from './pages/Perfil';
import { Configuracoes } from './pages/Configuracoes';
import { AjudaSuporte } from './pages/AjudaSuporte';
import { Sobre } from './pages/Sobre';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rota raiz - Página Index */}
          <Route path="/" element={<Index />} />
          
          {/* Nova rota para Sobre do Index */}
          <Route path="/sobre-index" element={<SobreIndex />} />
          
          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/ajuda" element={<AjudaSuporte />} />
          <Route path="/sobre" element={<Sobre />} />
          
          {/* Rotas protegidas */}
          <Route path="/inicial" element={
            <ProtectedRoute>
              <Inicial />
            </ProtectedRoute>
          } />
          <Route path="/plantas" element={
            <ProtectedRoute>
              <Plantas />
            </ProtectedRoute>
          } />
          <Route path="/estufas" element={
            <ProtectedRoute>
              <Estufas />
            </ProtectedRoute>
          } />
          <Route path="/perfil" element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          } />
          <Route path="/configuracoes" element={
            <ProtectedRoute>
              <Configuracoes />
            </ProtectedRoute>
          } />
          
          {/* Rota fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;