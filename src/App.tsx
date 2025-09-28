import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
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
          <Route path="/" element={<Navigate to="/inicial" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          
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
          
          {/* Rotas públicas */}
          <Route path="/ajuda" element={<AjudaSuporte />} />
          <Route path="/sobre" element={<Sobre />} />

          {/* Rotas para páginas em desenvolvimento */}
          <Route path="/plantas/nova" element={
            <ProtectedRoute>
              <div className="page-container">
                <h1>Nova Planta - Em desenvolvimento</h1>
                <p>Esta funcionalidade estará disponível em breve!</p>
                <a href="/plantas">← Voltar para Plantas</a>
              </div>
            </ProtectedRoute>
          } />

          <Route path="/estufas/nova" element={
            <ProtectedRoute>
              <div className="page-container">
                <h1>Nova Estufa - Em desenvolvimento</h1>
                <p>Esta funcionalidade estará disponível em breve!</p>
                <a href="/estufas">← Voltar para Estufas</a>
              </div>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;