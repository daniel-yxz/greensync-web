import { useAuth } from '../contexts/AuthContext';
import { BottomNavigation } from '../components/BottomNavigation';
import './Perfil.css';

export function Perfil() {
  const { user, userData, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="perfil-container">
      <header className="perfil-header">
        <h1>Meu Perfil</h1>
      </header>

      <div className="perfil-content">
        <div className="user-card">
          <div className="user-avatar">
            {userData?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          
          <div className="user-info">
            <h2>{userData?.name || 'Usuário'}</h2>
            <p className="user-email">{user?.email}</p>
            <p className="member-since">
              Membro desde {formatDate(userData?.createdAt || new Date().toISOString())}
            </p>
          </div>
        </div>

        <div className="info-section">
          <h3>Informações da Conta</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">ID do Usuário</span>
              <span className="info-value">{user?.uid?.substring(0, 8)}...</span>
            </div>
            <div className="info-item">
              <span className="info-label">Status da Conta</span>
              <span className="status-badge active">Ativa</span>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <h3>Minhas Estatísticas</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">12</span>
              <span className="stat-label">Plantas</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">3</span>
              <span className="stat-label">Estufas</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">Sucesso</span>
            </div>
          </div>
        </div>

        <div className="actions-section">
          <h3>Ações Rápidas</h3>
          <div className="actions-list">
            <button className="action-btn">
              ✏️ Editar Perfil
            </button>
            <button className="action-btn">
              ⚙️ Configurações
            </button>
            <button className="action-btn">
              ❓ Ajuda & Suporte
            </button>
            <button className="action-btn logout-btn" onClick={handleLogout}>
              🚪 Sair da Conta
            </button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}